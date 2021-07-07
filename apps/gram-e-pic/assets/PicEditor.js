const PicEditor = (() => {
  const editor = document.getElementById("editor");
  const editorGridTbody = editor.querySelector(".grid");
  const customPicMenu = document.getElementById("customPicMenu");
  const nameInput = document.getElementById("nameInput");
  const authorInput = document.getElementById("authorInput");
  const sizeInput = document.getElementById("sizeInput");
  const isTwitterHandle = document.getElementById("isTwitterHandle");
  const editorGrid = document.getElementById("editorGrid");
  const gameInfo = document.getElementById("gameInfo");
  return {
    render: () => {
      const { pic } = data.editor;
      editorGrid.className = `full-grid grid-size-${pic.colCount}`;
      gameInfo.innerHTML = "";
      nameInput.value = pic.name;
      authorInput.value = pic.author || '';
      sizeInput.value = `${pic.rowCount}x${pic.colCount}`;
      isTwitterHandle.checked = pic.isTwitterHandle ? true : false;
      editorGridTbody.innerHTML = PicUtil.drawEditor(pic, true, isEditor = true)

      //enable click-drag
      const cells = editorGridTbody.querySelectorAll(".cell");
      cells.forEach(cell => cell.addEventListener("mouseover", () => {
        if (mousedown) cell.onmousedown();
      }));
    },
    renderMenu: () => {
      console.log(data.solved);
      customPicMenu.innerHTML = data.customPics.map(pic => {
        return `<div class="col-md-4 mb-2 grid-size-${pic.colCount}">
          ${pic.name} ${pic.solved ? '<span title="Solved">✅</span>' : ''}
          <div class="badge badge-dark">${pic.colCount}x${pic.rowCount}</div>
          ${PicUtil.drawPicWithTable(pic)}
          <div class="mt-2 text-center">
            <div class="ml-2 mr-2">
              <button class="btn btn-primary" onclick="gramepic.play('${pic.id}')" title="Play">▶</button>
              <button class="btn btn-secondary" onclick="PicEditor.edit('${pic.id}')" title="Edit">✏</button>
              <button class="btn btn-secondary" onclick="PicEditor.delete('${pic.id}')" title="Delete">⛔</button>
            </div>
            <button class="btn btn-block btn-secondary mr-3 mt-2 p-3" onclick="PicEditor.share('${pic.id}')" title="Share">🔁 Share</button>
          </div>
        </div>`;
      }).join("");
    },
    select: (row, col) => {
      if (data.selectedMode !== MODE.EDITOR) return;
      const { pic } = data.editor;
      if (!pic.grid[row][col]) {
        notify("warning", `⚠ Row=${row}, Col=${col} not found`);
        return;
      }
      // console.log(row, col);
      const newValue = data.blackOrWhite === "Black" ? "1" : " ";
      if (data.editor.pic.grid[row][col] === newValue) return;
      data.editor.pic.grid[row][col] = newValue;
      data.editor.pic.str = pic.grid.map(row => row.join("")).join("\n");
      data.editor.pic = PicUtil.process(pic);
      gramepic.render();
    },
    createPic: () => {
      data.editor.pic = PicUtil.createPic();
      data.selectedMode = MODE.EDITOR;
      gramepic.render();
    },
    edit: id => {
      const pic = data.customPics.find(a => a.id === id);
      if (!pic) {
        notify("danger", "⚠ Weird... Could not found pic to edit.");
        return;
      }
      data.editor.pic = pic;
      data.blackOrWhite = "Black";
      data.selectedMode = MODE.EDITOR;
      setUrlParam(`mode=${data.selectedMode}${pic && pic.id ? `&id=${pic.id}` : ''}`);
      gramepic.render();
    },
    share: id => {
      const pic = data.customPics.find(a => a.id === id);
      if (!pic) {
        notify("warn", "⚠ That's weird. Could not find pic!");
        return;
      }
      const trimmedPic = [
        pic.name,
        pic.author,
        pic.isTwitterHandle ? 1 : 0,
        pic.str
      ].join(",");
      const url = extractBaseUrl(window.location.href);
      copyText(`${url}?s=${crypt(SALT, JSON.stringify(trimmedPic))}`);

      /* Alert the copied text */
      notify("success", "📋 Copied Share Link");
    },
    delete: id => {
      const index = data.customPics.findIndex(a => a.id === id);
      if (index <= -1) {
        notify("warn", "⚠ That's weird. Could not find pic!");
        return;
      }
      if (confirm(`⛔ Are you sure you want to delete  "${data.customPics[index].name}"?`)) {
        data.customPics.splice(index, 1);
        gramepic.saveData();
        gramepic.render();
        notify("success", "👍 Deleted pic")
      }
    },
    updateInput: (e, attr) => {
      let value = e.value;
      //sanitize inputs
      value = value.replace(/[/\\@<>&%]+/ig, '');
      if (attr === "name" && value.length > 20) value = value.substr(0, 20);
      if (attr === "author") {
        value = value.replace(/[\W_]/ig, '');
        if (value.length > 15) value = value.substr(0, 15);
      }
      data.editor.pic[attr] = value;
      e.value = value;
    },
    updateIsTwitterHandle: e => data.editor.pic.isTwitterHandle = e.checked,
    updateSize: e => {
      const newSize = parseInt(e.value.split("x")[0], 10);
      const curSize = data.editor.pic.grid.length;
      if (newSize > curSize) {
        const diff = newSize - curSize;
        const rows = data.editor.pic.str.split("\n");
        data.editor.pic.str = rows.map(r => r += repeat(" ", diff)).join("\n");
        for (let i = 0; i < diff; i++) {
          data.editor.pic.str += "\n" + repeat(" ", newSize);
        }
        data.editor.pic = PicUtil.process(data.editor.pic);
      }
      else {
        const rows = data.editor.pic.str.split("\n").slice(0, newSize); //trim rows
        data.editor.pic.str = rows.map(r => r.substr(0, newSize)).join("\n");
        data.editor.pic = PicUtil.process(data.editor.pic);
      }
      console.log(data.editor.pic);
      gramepic.render();
    },
    save: () => {
      const { id } = data.editor.pic;
      if (!id) {
        data.editor.pic.id = objectId();
        data.customPics.push(data.editor.pic);
      }
      else {
        const picIndex = data.customPics.findIndex(a => a.id === id);
        data.customPics[picIndex] = data.editor.pic;
      }
      data.editor.pic = null;
      data.selectedMode = MODE.EDITOR_MENU;
      gramepic.saveData();
      gramepic.render();
    },
  };
})();
