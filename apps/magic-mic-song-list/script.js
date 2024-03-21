
const app = (() => {
  let sortBy = "artist";
  let sortOrder = "asc";
  // --- Util Methods ---
  const compareVals = (a, b) => isNaN(a) ? (a + "").localeCompare(b + "") : a - b;
  const pathToLabel = path => {
    let label = (Array.isArray(path) ? path : path.split`.`).pop();
    return label ? (
      label.charAt(0).toUpperCase()
      + label.substring(1)
        .split(/(?=[A-Z][a-z])/)
        .map(a => a.split(/([A-Z][a-z]+)/).join` `)
        .join` `
    ) : "";
  };
  const showSortArrow = name => name === sortBy ? sortOrder === "asc" ? "🔺" : "🔻" : "";
  const dataToClass = (row, attr) => isNaN(row[attr]) ? "" : ` class="text-end"`;
  const jsonTable = (rows, noSort) => {
    if (!rows || !Array.isArray(rows) || rows.length <= 0) return "No results";
    const cols = Object.keys(rows[0]).map(c => ({name: c, label: pathToLabel(c)}));
    return `<table class="table table-striped table-hover table-bordered">
      <thead>${cols.map(c => `<th>${noSort ? c.label : `<a href="#${c.name}" onclick="app.setSortBy('${c.name}')">${c.label}</a>${showSortArrow(c.name)}`}</th>`).join``}</thead>
      <tbody>
        ${rows
        .sort((a, b) => noSort ? 0 : (sortOrder === "asc" ? compareVals(a[sortBy], b[sortBy]) : compareVals(b[sortBy], a[sortBy])))
        .map(r => `<tr>${cols.map(c => `<td${dataToClass(r, c.name)}>${r[c.name]}</td>`).join``}</tr>`)
        .join``}
      </tbody>
    </table>`;
  };
  // Source: https://stackoverflow.com/a/14991797/1675237
  const parseCSV = s => {
    const arr = [];
    let q = 0;
    for (let row = 0, col = 0, c = 0; c < s.length; c++) {
      let cc = s[c], nc = s[c + 1];
      arr[row] = arr[row] || [];
      arr[row][col] = arr[row][col] || '';
      if (cc == '"' && q && nc == '"') { arr[row][col] += cc; ++c; continue; }
      if (cc == '"') { q = !q; continue; }
      if (cc == ',' && !q) { ++col; continue; }
      if (cc == '\r' && nc == '\n' && !q) { ++row; col = 0; ++c; continue; }
      if (cc == '\n' && !q) { ++row; col = 0; continue; }
      if (cc == '\r' && !q) { ++row; col = 0; continue; }
      arr[row][col] += cc;
    }
    return arr;
  };
  const newObjectId = () => {
    const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
        return Math.floor(Math.random() * 16).toString(16);
    }).toLowerCase();
  };
  const notify = (type, message) => {
    const elem = document.createElement('div');
    elem.className = `notify badge bg-${type}`;
    elem.innerHTML = message;
    document.body.appendChild(elem);
    setTimeout(() => elem.parentNode.removeChild(elem), 5000);
  };
  // --- end Utils ---
  const LOCAL_STORAGE_KEY = "magic-mic-song-queue";
  const VIEWS_ARR = "Songs,Artists,Catalogs,SongQueue".split`,`;
  const [ Songs, Artists, Catalogs, SongQueue ] = VIEWS_ARR;

  let data;
  let searchStr = catalogFilter = artistFilter = "";
  let selectedView = Songs;

  const findSong = num => data.songs.find(s => s.num + "" === num + "");
  const renderNextSong = () => {
    let nextId = "";
    for (const queue of data.songQueue) {
      if (!nextId && !queue.done) { nextId = queue._id; break; }
    }
    const queue = nextId && data.songQueue.find(q => nextId === q._id);
    const { num, title, artist } = queue ? findSong(queue.num) : {};
    const { done } = queue;

    nextSong.innerHTML = queue ? `<h3>
      <b>Next Song:</b> (${num}) ${title} - ${artist}
      <button class="btn" onclick="app.toggleDone('${queue._id}')" title="Mark as ${done ? "un" : ""}done">${done ? "✅" : "⏹️"}</button>
    </h3>` : "";
  };
  const renderSelectView = () => (
    viewSelect.innerHTML = VIEWS_ARR.map(view => {
      const label = pathToLabel(view);
      const count = data.songQueue.length;
      const viewLabel = label + (view === "SongQueue" && count ? ` <span class="badge bg-info">${count}</span>` : "");
      return (
        `<button class="btn btn-${selectedView === view ? "primary" : "secondary"}"
          onclick="app.selectView('${view}')">${viewLabel}</button>`
      );
    }).join``
  );
  const renderTable = () => {
    o.innerHTML = jsonTable(data.songs.filter(({num, title, artist, catalog}) => (
      (!searchStr || (
        artist.toLowerCase().includes(searchStr)
        || title.toLowerCase().includes(searchStr)
        || num.includes(searchStr)
      ))
      && (!catalogFilter || catalog === catalogFilter)
      && (!artistFilter || artist === artistFilter)
    )))
  };
  const renderArtists = () => {
    o.innerHTML = jsonTable(data.artists.filter(({name, catalogs}) => (
      (!searchStr || name.toLowerCase().includes(searchStr))
      && (!catalogFilter || catalogs.includes(catalogFilter))
    )));
  };
  const renderCatalogs = () => o.innerHTML = jsonTable(data.catalogs);
  const renderSongQueue = () => {
    let nextId = "";
    for (const queue of data.songQueue) {
      if (!nextId && !queue.done) { nextId = queue._id; break; }
    }
    o.innerHTML = jsonTable(data.songQueue.map(({_id, num, done}) => {
      const found = findSong(num);
      if (found) {
        return {
          ...found,
          actions: `<button class="btn" onclick="app.removeSong('${_id}', '${found.title.replace(/'/, "\\'")}')" title="Remove song">➖</button>
          <button class="btn" onclick="app.toggleDone('${_id}')" title="Mark as ${done ? "un" : ""}done">${done ? "✅" : "⏹️"}</button>
          ${nextId === _id ? "👈🏻" : ""}`,
        };
      }
      return 0;
    }).filter(s => s), true) + (
      data.songQueue.length ? `<button class="btn btn-info m-2" onclick="app.clearQueue()">❌ Clear Queue</button>` : ""
    );
  };
  const render = () => {
    renderSelectView();
    renderNextSong();
    artistFilterDiv.innerHTML = artistFilter ? (
      `<button class="btn btn-round" onclick="app.clearArtistFilter();return 0" title="Clear this filter">${artistFilter} ❌</button>`
    ) : '';
    artistFilterDiv.style.display = artistFilter ? "" : "none";
    searchStr = searchStr.toLowerCase();
    switch (selectedView) {
      case Songs: renderTable(); break;
      case Artists: renderArtists(); break;
      case Catalogs: renderCatalogs(); break;
      case SongQueue: renderSongQueue(); break;
      default:
    }
  };
  const loadData = () => {
    Promise.all("default,christmas,folk-hymns,hawaiian,japanese".split`,`.map(filename => (
      fetch(`./csv/${filename}.csv`).then(r => r.text()).then(parseCSV).then(rows => {
        const catalog = pathToLabel(filename);
        const obj = {};
        obj[catalog] = rows.map(([num, title, artist]) => ({num, title, artist, catalog,
          actions: `<button class="btn btn-round" onclick="app.addSong(${num}, '${title.replace(/'/, "\\'")}')">➕</button>`,
        }));
        return obj;
      })
    ))).then(catalogObjs => {
      const songs = catalogObjs.reduce((prev, curr) => {
        const catalog = Object.keys(curr)[0];
        return [...prev, ...curr[catalog]];
      }, []);
      const catalogs = catalogObjs.map(cat => {
        const name = Object.keys(cat)[0];
        const count = cat[name].length;
        return {
          name, count,
          actions: `<button class="btn" onclick="app.setCatalogFilter('${name.replace(/'/, "\\'")}')">🔍</a>`,
        };
      });
      const artistMap = songs.reduce((prev, {artist, catalog}) => {
        if (!prev[artist]) prev[artist] = { count: 0, catalogs: [] };
        prev[artist].count += 1;
        if (!prev[artist].catalogs.includes(catalog)) prev[artist].catalogs.push(catalog);
        return prev;
      }, {});
      const artists = Object.keys(artistMap).map(artist => ({
        name: artist, count: artistMap[artist].count,
        catalogs: artistMap[artist].catalogs,
        actions: `<button class="btn" onclick="app.setArtistFilter('${artist.replace(/'/, "\\'")}')">🔍</a>`,
      }));
      const songQueue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
      data = {
        catalogs,
        songs,
        artists,
        numToSong: songs.reduce((prev, curr) => (prev[curr.num] = curr, prev), {}),
        songQueue,
      };
      //populate Catalogs Filter
      catalogSelect.innerHTML = `<option value="">- All -</option>`
        + catalogs.map(c => `<option value="${c.name}">${c.name} (${c.count})</option>`).join``;
      render();
    });
  };
  const saveQueue = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.songQueue));
    render();
  };
  onload = loadData;
  return {
    clearArtistFilter: () => { artistFilter = ""; render(); },
    setSearchStr: s => (searchStr = s, render()),
    setSortBy: s => (sortOrder = sortBy === s ? (sortOrder === "asc" ? "desc" : "asc") : sortOrder = "asc", sortBy = s, render()),
    setCatalogFilter: s => (catalogFilter = s, selectedView = Songs, catalogSelect.value = s, render()),
    setArtistFilter: s => (artistFilter = s, selectedView = Songs, render()),
    selectView: view => {selectedView = view; render()},
    addSong: (num, title) => {
      data.songQueue.push({_id: newObjectId(), num});
      notify("success", `➕ Added "${title}" to the Song Queue.`);
      saveQueue();
    },
    removeSong: _id => {
      const { num } = data.songQueue.find(s => s._id !== _id);
      const song = findSong(num);
      if (song) {
        data.songQueue = data.songQueue.filter(s => s._id !== _id);
        notify("warning", `➖ Removed "${song.title}" from the Song Queue.`);
        saveQueue();
      }
      else notify("danger", `❌ Song Queue ID "${_id}" not found.`);
    },
    toggleDone: _id => {
      const queue = data.songQueue.find(s => s._id === _id);
      const song = findSong(queue.num);
      if (song) {
        queue.done = !queue.done;
        notify("info", `${queue.done ? "✅" : "⏹️"} Marked "${song.title}" as ${queue.done ? "" : "un"}done.`);
        saveQueue();
      }
      else notify("danger", `❌ Song Queue ID "${_id}" not found.`);
    },
    clearQueue: () => {
      data.songQueue = [];
      notify("info", "❌ Cleared the queue");
      saveQueue();
    },
  };
})();