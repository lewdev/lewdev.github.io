/**
 * TODO:
 *   * randomly generate puzzles
 *   * have static puzzles
 *   * save each game and earn points per game
 */

let mousedown = false;
let disableGrid = false;

const APP_DATA_KEY = "gram-e-pic";

const MODE = {
  INTRO: 1,
  EDITOR: 2,
  GAME: 3,
  END_GAME: 4,
  MENU: 5,
  MENU_LIST: 6,
  EDITOR_MENU: 7,
};

const MODE_ARR = Object.keys(MODE).map(key => MODE[key]);

const START_LIVES = 3;

let data = {
  points: 0,
  blackOrWhite: "Black",
  selectedMode: MODE.INTRO,
  selectedSize: 5,
  selectedPicName: Pics[0].name,
  editor: {},
  currGame: {},
  ramdomPics: [],
  customPics: [],
  solved: [],
};

const gramepic = (() => {
  const intro = document.getElementById("intro");
  const menu = document.getElementById("menu");
  const menuList = document.getElementById("menuList");
  const game = document.getElementById("game");
  const gameGridTbody = game.querySelector(".grid");
  const gameGrid = document.getElementById("gameGrid");
  const editor = document.getElementById("editor");
  const endGame = document.getElementById("endGame");
  const endGameGridTbody = endGame.querySelector(".grid");
  const gameInfo = document.getElementById("gameInfo");
  const toggleBtn = document.getElementById("toggleBtn");
  const toggleBtnDiv = document.getElementById("toggleBtnDiv");

  //menus
  const picMenu = document.getElementById("picMenu");
  const editorMenu = document.getElementById("editorMenu");

  const play = id => {
    const pic = Pics.find(a => a.id === id) || data.customPics.find(a => a.id === id);
    if (!pic) {
      notify("danger", `😡 Pic "${id}" not found.`);
      return;
    }
    setUrlParam(`mode=${data.selectedMode}&id=${pic.id}`);

    let processedPic;
    if (!pic.grid) {
      const picIndex = Pics.indexOf(a => a.id === id);
      processedPic = PicUtil.process(pic);
      if (data.solved.includes(pic.id)) processedPic.solved = true;
      Pics[picIndex] = processedPic; //cache the processed version.
    }
    else processedPic = pic;

    data.currGame = {
      lives: START_LIVES,
      pic: processedPic,
      playerGrid: processedPic.grid.map(a => a.map(() => "")),
      score: 0,
    };
    disableGrid = false;
    data.blackOrWhite = "Black";
    data.selectedMode = MODE.GAME;
    render();
  };

  const init = () => {
    loadData(() => {
      //to enable click drag
      document.addEventListener("touchstart", e => {e.stopPropagation(); mousedown = true;});
      document.addEventListener("touchend", e => {e.stopPropagation(); mousedown = false;});
      document.body.onmouseup = e => {e.stopPropagation(); mousedown = false; };
      document.body.onmousedown = () => mousedown = true;
      //press space to toggle Black/White
      document.body.onkeyup = e => { if (e.key === " ") gramepic.toggle(); };

      //process all pics
      Pics.forEach((pic, i) => {
        if (!pic.grid) Pics[i] = PicUtil.process(pic); //cache the processed version.
      });

      data.customPics.forEach((pic, i) => {
        if (!pic.grid) data.customPics[i] = PicUtil.process(pic); //cache the processed version.
      });

      //handle URL parameters
      const share = getUrlParam("s");
      if (share) {
        if (PicUtil.processShared(share)) {
          notify("success", "Successfully imported shared pic.");
        }
        else {
          notify("danger", "Failed to import shared pic.");
        }
        data.selectedMode = MODE.EDITOR_MENU;
        setUrlParam(`mode=${data.selectedMode}`);
      } 
      else {
        const mode = getUrlParam("mode");
        if (mode && MODE_ARR.includes(mode)) {
          data.selectedMode = mode;
        }

        const id = getUrlParam("id");
        if (id) {
          if (mode && mode === MODE.EDITOR) PicEditor.edit(id);
          else play(id);
        }
      }

      render();
    });
  };


  const render = () => {
    const { selectedMode } = data;
    const isIntro = selectedMode === MODE.INTRO;
    const isMenu = selectedMode === MODE.MENU;
    const isMenuList = selectedMode === MODE.MENU_LIST;
    const isEditor = selectedMode === MODE.EDITOR;
    const isEditorMenu = selectedMode === MODE.EDITOR_MENU;
    const isGame = selectedMode === MODE.GAME;
    const isEndGame = selectedMode === MODE.END_GAME;
    intro.style.display = isIntro ? '' : 'none';
    menu.style.display = isMenu ? '' : 'none';
    menuList.style.display = isMenuList ? '' : 'none';
    game.style.display = isGame ? '' : 'none';
    editor.style.display = isEditor ? '' : 'none';
    editorMenu.style.display = isEditorMenu ? '' : 'none';
    endGame.style.display = isEndGame ? '' : 'none';
    toggleBtnDiv.style.display = isGame || isEditor ? '' : 'none';
    switch(selectedMode) {
      case MODE.GAME:
        renderGame();
        break;
      case MODE.END_GAME:
        renderEndGame();
        break;
      case MODE.EDITOR:
        PicEditor.render();
        break;
      case MODE.EDITOR_MENU:
        PicEditor.renderMenu();
        break;
      case MODE.MENU:
        setUrlParam(`mode=${selectedMode}`);
        renderMenu();
        break;
      case MODE.MENU_LIST: 
        setUrlParam(`mode=${selectedMode}&size=${data.selectedSize}`);
        renderMenuList();
        break;
      default:
      case MODE.INTRO: setUrlParam("");
    }
    renderToggleBtn();
  };

  const renderGame = () => {
    gameGrid.className = `full-grid grid-size-${data.currGame.pic.colCount}`;
    gameGridTbody.innerHTML = PicUtil.drawGame(data.currGame, true);

    //enable click-drag
    const cells = gameGridTbody.querySelectorAll(".cell");
    cells.forEach(cell => {
      cell.addEventListener("mouseover", () => { if (mousedown) cell.onmousedown(); })
      cell.addEventListener("touchmove", () => { if (mousedown) cell.onmousedown(); })
    });
    if (!disableGrid) gameInfo.innerHTML = `${data.currGame.lives} ❤`;
  };

  const renderEndGame = () => {
    endGameGridTbody.innerHTML = PicUtil.drawGame(data.currGame);

    if (data.currGame.lives <= 0)
      endGameMessage.innerHTML = `<span class="text-danger">Game Over</span>`;
    else {
      endGameMessage.innerHTML = `<span class="text-success">Complete!</span>`;
    }
  };

  const renderMenu = () => {
    picMenu.innerHTML = [5, 10, 15, 20].map(size => {
      const solvedCount = Pics.filter(p => p.colCount === size && data.solved.includes(p.id)).length;
      return `<div class="col-md-4 mb-2">
        <div class="mt-2">
          <button class="btn btn-primary btn-lg btn-block" onclick="gramepic.selectSize(${size})">
            ${size} x ${size}
            ${solvedCount ? `<span class="badge badge-success" title="Solved Pics">${solvedCount}</span>` : ''}
            <span class="badge badge-secondary" title="Total Pics">${Pics.filter(p => p.colCount === size).length}</span>
          </button>
        </div>
      </div>`;
    }).join("");
  };

  const renderMenuList = () => {
    picMenuList.innerHTML = `<div class="col-12"><span class="badge badge-dark btn-lg">${data.selectedSize}x${data.selectedSize}</span></div>`
     + Pics.map(pic => (`<div class="col-md-4 mb-2">
        ${data.solved.includes(pic.id) ? `${pic.name} ✅ ${PicUtil.drawPicWithTable(pic)}` : '? ? ? ? ?'}
        <div class="mt-2">
          <button class="btn btn-primary" onclick="gramepic.play('${pic.id}')">▶ Play</button>
        </div>
      </div>`)).join("");
  };

  const checkIfDone = () => {
    const { playerGrid } = data.currGame;
    let row = 0, col;
    for (; row < playerGrid.length; row++) {
      for (col = 0; col < playerGrid[row].length; col++) {
        if (!playerGrid[row][col]) return false;
      }
    }
    return true;
  };

  window.onload = init;

  const loadData = callback => {
    const localData = window.localStorage.getItem(APP_DATA_KEY);
    if (localData) {
      const parsedData = JSON.parse(localData);
      if (parsedData) {
        data = parsedData;
        callback();
      }
    }
    else callback();
  };

  const saveData = () => {
    data.lastSaved = (new Date()).toISOString();
    window.localStorage.setItem(APP_DATA_KEY, JSON.stringify(data));
  };

  const renderToggleBtn = () => {
    const isBlack = data.blackOrWhite === "Black";
    toggleBtn.innerHTML = data.blackOrWhite;
    toggleBtn.className = `border btn btn-lg btn-block ${isBlack ?
      'btn-dark text-light' : 'btn-light text-dark'}`;
  };

  return {
    play,
    mousedown,
    render,
    select: (row, col) => {
      if (disableGrid || data.selectedMode !== MODE.GAME) return;
      const { currGame } = data;
      const { playerGrid } = currGame;
      if (data.blackOrWhite === "Black" && currGame.pic.grid[row][col] === '1') {
        playerGrid[row][col] = "1";
      }
      else if (data.blackOrWhite === "White" && currGame.pic.grid[row][col] === ' ') {
        playerGrid[row][col] = " ";
      }
      else {
        currGame.lives--;
        if (currGame.lives <= 0) {
          data.selectedMode = MODE.END_GAME;
          setUrlParam(`mode=${data.selectedMode}&id=${data.currGame.pic.id}`);
        }
        else {
          //alert(`Wrong! ${row}, ${col} ${data.blackOrWhite}`);
          disableGrid = true;
          gameInfo.innerHTML = `<span class="text-danger text-nowrap">-1 ❤😢</span>`;
          notify("danger", "Wrong Cell! -1 ❤");
          setTimeout(() => {
            disableGrid = false;
            renderGame();
          }, 2000);
        }
      }
      if (checkIfDone()) {
        data.selectedMode = MODE.END_GAME;
        const endPic = Pics.find(p => p.id === currGame.pic.id);
        if (endPic) endPic.solved = true;
        data.solved.push(currGame.pic.id);
        saveData();
        render();
        return;
      }
      renderGame();
    },
    goMenu: () => {
      data.selectedMode = MODE.MENU;
      setUrlParam(`mode=${data.selectedMode}`);
      render();
    },
    goEditorMenu: () => {
      data.selectedMode = MODE.EDITOR_MENU;
      setUrlParam(`mode=${data.selectedMode}`);
      render();
    },
    goIntro: () => {
      data.selectedMode = MODE.INTRO;
      setUrlParam(`mode=${data.selectedMode}&id=${data.currGame.pic.id}`);
      render();
    },
    selectSize: size => {
      data.selectedMode = MODE.MENU_LIST;
      data.selectedSize = size;
      setUrlParam(`mode=${data.selectedMode}&size=${size}`);
      render();
    },
    toggle: () => {
      data.blackOrWhite = data.blackOrWhite === "Black" ? "White" : "Black";
      renderToggleBtn();
    },
    exportCustomPics: () => {
      const d = new Date();
      const pad2 = num => num < 10 ? `0${num}` : num;
      const dateStr = d.getFullYear() + pad2(d.getMonth() + 1) + pad2(d.getDate()) + "-" + pad2(d.getHours()) + pad2(d.getMinutes()) + pad2(d.getSeconds())
      const exportPics = data.customPics.map(p => ({id: p.id, name: p.name, str: p.str}));
      downloadTextFile(`gram-e-pic-export-${dateStr}.json`, JSON.stringify(exportPics));
    },
    saveData,
  };
})();