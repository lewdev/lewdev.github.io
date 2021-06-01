const main = (() => {
  const APP_DATA_KEY = "anecdotes-browser";
  const VIEW = { BROWSE: 1, KEYWORDS: 2, SEARCH: 3, FAVORITES: 4 };
  let anecdotes = [], anecdoteMap = {}, keywords = {};
  const d = document;
  const getElemById = id => d.getElementById(id);
  const en = getElemById("en");
  const jp = getElemById("jp");

  //read view
  const titleDiv = getElemById("title");
  const titleJaDiv = getElemById("titleJa");
  const keywordsDiv = getElemById("keywords");

  //left menu configurations
  const anecdoteNum = getElemById("anecdoteNum");
  const showEnCbx = getElemById("showEnCbx");
  const showJaCbx = getElemById("showJaCbx");

  //bottom menu buttons
  const navBottom = getElemById("navBottom");
  const navMiddle = navBottom.querySelector(".nav-middle");
  const nextBtn = navBottom.querySelector(".nav-next-btn");
  const prevBtn = navBottom.querySelector(".nav-prev-btn");
  const readViewMenuItem = getElemById("readViewMenuItem");
  const keywordsViewMenuItem = getElemById("keywordsViewMenuItem");
  const searchViewMenuItem = getElemById("searchViewMenuItem");
  const favoritesViewMenuItem = getElemById("favoritesViewMenuItem");

  //views
  // const readView = getElemById("readView");
  const keywordsView = getElemById("keywordsView");
  const searchView = getElemById("searchView");
  const favoritesView = getElemById("favoritesView");

  //Keywords
  const keywordHeader = keywordsView.querySelector(".my-header");
  const keywordResultCount = keywordsView.querySelector(".result-count");
  const keywordListTable = getElemById("keywordListTable");
  const keywordAnecdotesTable = getElemById("keywordAnecdotesTable");
  const searchKeywordsInput = getElemById("searchKeywordsInput");
  const clearKeywordBtn = getElemById("clearKeywordBtn");
  const seeAllBtn = getElemById("seeAllBtn");

  //Search
  const searchInput = getElemById("searchInput");
  const searchResultTable = getElemById("searchResultTable");
  const searchResultCount = searchView.querySelector(".result-count");

  //Favorites
  const favoriteBtn = getElemById("favoriteBtn");
  const favoritesTable = getElemById("favoritesTable");
  const favoritesCount = favoritesView.querySelector(".result-count");

  let data = {
    "show": {"en": true, "ja": true },
    "selectedView": VIEW.READ,
    "selectedKeyword": null,
    "selectedNum": 1,
    "search": "",
    "searchKeyword": "",
    "lastView": VIEW.BROWSE,
    "notes": {
      1: { text: "", lastUpdated: new Date().getTime() }
    },
    "favorites": [],
    "bookmark": 1,
  };
  const init = () => {
    initUrlParams();
    initLeftMenu();
    initBottomMenu();
    initKeywordView();
    initSearchView();
    render();
  };
  const initUrlParams = () => {
    const anecdoteNumParam = getUrlParam("a");
    const keywordParam = getUrlParam("k");
    if (anecdoteNumParam) {
      data["selectedView"] = VIEW.READ;
      data["selectedNum"] = parseInt(anecdoteNumParam);
    }
    else if (keywordParam) {
      data["selectedView"] = VIEW.KEYWORDS;
      data["selectedKeyword"] = parseInt(anecdoteNumParam);
    }
  };
  const initLeftMenu = () => {
    anecdoteNum.innerHTML = anecdotes.map(a => `<option>${a.num}</option>`);
    anecdoteNum.onchange = e => viewNum(parseInt(e.target.value));
    showEnCbx.checked = data["show"]["en"];
    showJaCbx.checked = data["show"]["ja"];
    showEnCbx.onclick = () => { data["show"]["en"] = !data["show"]["en"]; render(); };
    showJaCbx.onclick = () => { data["show"]["ja"] = !data["show"]["ja"]; render(); };
  };
  const initBottomMenu = () => {
    readViewMenuItem.onclick = () => { data["selectedView"] = VIEW.READ; render(); return false; }
    keywordsViewMenuItem.onclick = () => { data["selectedView"] = VIEW.KEYWORDS; render(); return false; }
    searchViewMenuItem.onclick = () => { data["selectedView"] = VIEW.SEARCH; render(); return false; }
    favoritesViewMenuItem.onclick = () => { data["selectedView"] = VIEW.FAVORITES; render(); return false; }
  };
  const initKeywordView = () => {
    searchKeywordsInput.onkeyup = () => { data["searchKeyword"] = searchKeywordsInput.value; render(); };
  };
  const initSearchView = () => {
    searchInput.onkeyup = () => search(searchInput.value.replace(/[<>]/g, ''));
  };
  const render = () => {
    const view = data["selectedView"];
    const isRead = view === VIEW.READ;
    const isKeywords = view === VIEW.KEYWORDS;
    const isSearch = view === VIEW.SEARCH;
    const isFavorites = view === VIEW.FAVORITES;
    const showEn = data["show"]["en"];
    const showJa = data["show"]["ja"];
    addOrRemoveClass(readViewMenuItem, isRead, "selected");
    addOrRemoveClass(keywordsViewMenuItem, isKeywords, "selected");
    addOrRemoveClass(searchViewMenuItem, isSearch, "selected");
    addOrRemoveClass(favoritesViewMenuItem, isFavorites, "selected");
    [].forEach.call(d.querySelectorAll(".read-view"), e => e.style.display = isRead ? '' : 'none');
    [].forEach.call(d.querySelectorAll(".keywords-view"), e => e.style.display = isKeywords ? '' : 'none');
    [].forEach.call(d.querySelectorAll(".search-view"), e => e.style.display = isSearch ? '' : 'none');
    [].forEach.call(d.querySelectorAll(".favorites-view"), e => e.style.display = isFavorites ? '' : 'none');
    [].forEach.call(d.querySelectorAll(".en"), e => e.style.display = showEn ? '' : 'none');
    [].forEach.call(d.querySelectorAll(".ja"), e => e.style.display = showJa ? '' : 'none');
    switch (data["selectedView"]) {
      case VIEW.READ: displayRead(); break;
      case VIEW.KEYWORDS: displayKeyword(); break;
      case VIEW.SEARCH: displaySearch(); break;
      case VIEW.FAVORITES: displayFavorites(); break;
    }
    saveData();
  };
  const addOrRemoveClass = (elem, isAdd, className) => {
    const arr = elem.className.split(/\s+/);
    if (isAdd) {
      if (!arr.includes(className)) arr.push(className);
    }
    else {
      const index = arr.indexOf(className);
      if (index >= 0) arr.splice(index, 1);
    }
    elem.className = arr.join(" ");
  };
  const viewNum = num => {
    data["selectedView"] = VIEW.READ;
    data["selectedNum"] = num;
    render();
  };
  const viewKeyword = keyword => {
    data["selectedView"] = VIEW.KEYWORDS;
    data["selectedKeyword"] = keyword;
    render();
  };
  const search = searchStr => {
    data["selectedView"] = VIEW.SEARCH;
    data["search"] = searchStr;
    render();
  };
  const displayRead = () => {
    const num = data["selectedNum"];
    setUrlParam(`a=${num}`);
    nextBtn.disabled = num >= anecdotes.length - 1;
    nextBtn.onclick = () => viewNum(num + 1);
    prevBtn.disabled = num <= 1;
    prevBtn.onclick = () => viewNum(num - 1);
    navMiddle.innerHTML = `Anecdote ${num}`;
    const anecdoteData = anecdoteMap[parseInt(num)];
    favoriteBtn.onclick = () => {favorite(num); render();}
    favoriteBtn.innerHTML = `Favorite${data["favorites"].includes(num) ? 'd' : ''}`;
    if (anecdoteData) {
      const showEn = data["show"]["en"];
      const showJa = data["show"]["ja"];
      const { ro, tgy, tgyTitle, tgy2, page } = anecdoteData;
      en.innerHTML = !showEn ? '' : `${anecdoteData.en}
        <p align="right"><i>Anecdotes of Oyasama #${num} (pg. ${page})</i></p>`;
      const extractedKeywords = extractKeywords(anecdoteData.en);
      anecdoteNum.value = num;
      titleDiv.innerHTML = !showEn ? '' : `${num}. ${anecdoteData.title}`;
      titleJaDiv.innerHTML = !showJa ? '' : `${anecdoteData.titleJa} (${ro})`;
      jp.innerHTML = !showJa ? '' : `${anecdoteData.ja}
        <p align="right"><i>稿本天理教教祖逸話篇 ${num}</i></p>`;
      keywordsDiv.innerHTML = extractedKeywords && extractedKeywords.length > 0 ? 
        `<p class="keywords">Keywords: ${extractedKeywords.map(k => 
        `<a href="#" title="${k.ref}" onclick="main.keyword('${k.text}'); return false;">${k.text}</a>`
      ).join(", ")}</p>` : '';
      anecdoteLinks.innerHTML = `
      ${createLiLink(`http://tenrikyology.com/${tgy}`, `Blogging the Anecdotes of Oyasama ${tgyTitle}`, '', "by Roy Forbes")}
      ${tgy2 ? createLiLink(`http://tenrikyology.com/${tgy2}`, `Blogging the Anecdotes of Oyasama ${tgyTitle} 2`, '', "by Roy Forbes") : ''}
      ${createLiLink(`http://en.tenrikyo-resource.com/wiki/Anecdotes_of_Oyasama_${num}`, `Anecdotes of Oyasama ${num}`, '', "Tenrikyo Resource Wiki")}
      `;
    }
    else alert(`Anecdote ${num} not found.`);
  };
  const displayKeyword = () => {
    const trArr = [];
    const kw = data["selectedKeyword"];
    // searchKeywordsInput.value = kw;
    setUrlParam(`k=${kw}`);
    keywordListTable.style.display = kw ? 'none' : '';
    keywordAnecdotesTable.style.display = !kw ? 'none' : '';
    searchKeywordsInput.style.display = kw ? 'none' : '';
    seeAllBtn.style.display = !kw ? 'none' : 'block';
    clearKeywordBtn.style.display = kw ? 'none' : 'block';
    keywordHeader.innerHTML = kw ? `Keyword: "${kw}"` : "Keywords";
    if (kw) {
      if (keywords[kw]) keywordAnecdotesTable.querySelector("tbody").innerHTML = keywords[kw].map(displayAnecdoteTrByNum).join("");
      const anecdoteCount = keywords[kw] ? keywords[kw].length : 0;
      keywordResultCount.innerHTML = `Found in ${anecdoteCount} Anecdote${anecdoteCount === 1 ? '' : 's'}`;
    }
    else {
      const list = Object.keys(keywords).filter(k => !data["searchKeyword"] || searchContent(k, data["searchKeyword"]));
      if (list.length === 0) trArr.push(NO_RESULTS_TR);
      list.sort();
      keywordListTable.querySelector("tbody").innerHTML = list.map(k => k ? `<tr><td class="nowrap">
        <a href="#" onclick="main.keyword('${k}'); return false;">${k}</a> (${keywords[k].length})
      </td>
      <td>${keywords[k].map(n => {
        const a = anecdoteMap[n];
        return `<a href="#" title="${removeXml(a.title)}" onclick="main.view(${n}); return false;">${n}</a>`;
      })
      .join(", ")}</td></tr>` : '').join("");
      const keywordCount = list ? list.length : 0;
      keywordResultCount.innerHTML = `${keywordCount} Keyword${keywordCount === 1 ? '' : 's'}`;
    }
  };
  let searchTimeout;
  const displaySearch = () => {
    searchInput.value = data["search"];
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      let result = '<tr><td colspan="3">Type into the Search field.</td></tr>';
      let countStr = "";
      if (data["search"]) {
        const list = anecdotes.filter(a => searchContent(a.en, data["search"])
          || searchContent(a.ja, data["search"])
          || searchContent(a.title, data["search"])
          || searchContent(a.titleJa, data["search"])
        );
        result = list.length > 0 ? list.map(displayAnecdoteTr).join("") : `<tr><td colspan="3">No results for "${data["search"]}"</td></tr>`;
        countStr = `${list.length} Anecdote${list.length === 1 ? '' : 's'}`
      }
      searchResultTable.querySelector("tbody").innerHTML = result;
      searchResultCount.innerHTML = countStr;
    }, 300);
  };
  const displayFavorites = () => {
    let result = '<tr><td colspan="3">You must add Favorites.</td></tr>';
    const favs = data["favorites"];
    const favCount = favs ? favs.length : 0;
    if (favCount) result = favs.map(displayAnecdoteTrByNum).join("");
    favoritesCount.innerHTML = `${favCount} Favorite${favCount === 1 ? '' : 's'}`;
    favoritesTable.querySelector("tbody").innerHTML = result;
  }
  const searchContent = (content, searchStr) => content && searchStr && content.toLowerCase().indexOf(searchStr.toLowerCase()) > -1;
  const NO_RESULTS_TR = '<tr><td colspan="3">No results</td></tr>';
  const displayAnecdoteTrByNum = n => displayAnecdoteTr(anecdoteMap[n]);
  const displayAnecdoteTr = a => a ? `<tr>
      <td>
        ${data["show"]["en"] ? `<a href="#" class="d-block" onclick="main.view(${a.num}); return false;">${a.num}. ${a.title}</a>` : ''}
        ${data["show"]["ja"] ? `<a href="#" class="d-block" onclick="main.view(${a.num}); return false;">${a.titleJa}</a>` : ''}
      </td>
      <td class="text-center">${a.page}</td>
    </tr>` : '';
  const favorite = num => {
    const favs = data["favorites"];
    if (favs.includes(num)) {
      const index = favs.indexOf(num);
      if (index > -1) data["favorites"].splice(index, 1);
    }
    else data["favorites"].push(num);
  };
  const removeXml = s => {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = s;
    return tmp.textContent || tmp.innerText || "";
  };
  const createLiLink = (url, label, title, source) => 
    `<li><a href="${url}"${title ? ` title="${title}"` : ''} target="_blank">🔗 ${label}</a>${source ? ` <i>${source}</i>` : ''}</li>`;
  const extractKeywords = () => {
    const keywordElems = en.querySelectorAll(".keyword");
    const extractedKeywords = [];
    [].forEach.call(keywordElems, e => {
      extractedKeywords.push({ref: e.title, text: e.innerHTML});
      e.addEventListener('click', function() {viewKeyword(e.title); return false;});
    });
    return extractedKeywords;
  };
  window.onload = () => loadData(() => fetchData(init));
  const fetchData = callback => {
    fetch("./assets/anecdotes.json").then(r => r.json()).then(rows => {
      anecdotes = rows;
      anecdoteMap = {};
      anecdotes.forEach(a => anecdoteMap[a.num] = a);
    }).then(() => {
      fetch("./assets/anecdote-keywords.json").then(r => r.json()).then(r => keywords = r).then(callback);
    });
  };
  const loadData = callback => {
    const localData = window.localStorage.getItem(APP_DATA_KEY);
    if (localData) {
      const parsedData = JSON.parse(localData);
      if (parsedData) data = parsedData;
      callback();
    }
    else callback();
  };
  const saveData = () => window.localStorage.setItem(APP_DATA_KEY, JSON.stringify(data));
  const getUrlParam = param => {
    const urlArr = document.location.href.split("?");
    const paramArr = urlArr.length > 1 ? urlArr[1].split("&") : [];
    const dataPair = paramArr.find(a => a.indexOf(param + "=") === 0);
    return dataPair ? dataPair.split('=')[1].replace(/%20/g, " ") : false;
  };
  const setUrlParam = param =>  {
    const url = document.location.href.split("?")[0].split("#")[0];
    window.history.pushState({ param }, param, `${url}${param ? "?" + param : ""}`);
    return false;
  };
  return {
    view: kw => viewNum(kw),
    keyword: kw => viewKeyword(kw),
    clearKeywordSearch: () => {data["searchKeyword"] = ""; searchKeywordsInput.value = ""; render();},
    search,
    clearFavorites: () => { if (confirm("Are you sure you want to clear your favorites?")) {data["favorites"] = []; saveData();}},
    bookmark: num => data["bookmark"] = num,
  };
})();