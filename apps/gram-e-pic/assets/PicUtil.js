const BASE_PIC = {
  name: "",
  colCount: 5, rowCount: 5,
  colHints: [[]],
  rowHints: [[]],
  grid: [[]],
  createdAt: null, updatedAt: null,
  str: "     \n     \n     \n     \n     ",
};
const repeat = (str, x) => {
  return isNaN(x) ? '' : (new Array(x)).fill().map(() => str).join("")
};

const PicUtil = (() => {
  const getHints = arr => {
    const selectCounts = [];
    let count = 0;
    arr.forEach((block, i) => {
      if (block === "1") count++;
      else {
        if (count !== 0) {
          selectCounts.push(count);
          count = 0;
        }
      }
      if (i === arr.length - 1 && count !== 0) {
        selectCounts.push(count);
      }
    });
    if (selectCounts.length === 0) return 0;
    return selectCounts;
  };
  return {
    process: pic => {
      const picRowArr = pic.str.split("\n");
      const grid = picRowArr.map(a => a.split(""));
      const colCount = grid[0].length;
      const rowCount = picRowArr.length;
      const colHints = [];
      const rowHints = [];
      for (let colIndex = 0; colIndex < colCount; colIndex++) {
        colHints.push(getHints(grid.map(row => row[colIndex])));
      }
      for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        rowHints.push(getHints(grid[rowIndex]));
      }
      return Object.assign(pic, { colCount, rowCount, grid, colHints, rowHints, });
    },
    processShared: share => {
      if (!share) return false;
      const picArr = decrypt(share).split(",");
      const [name, author, isTwitterHandle, str] = picArr;
      if (picArr.length < 3) return false;
      if (!name) return false;
      if (!str) return false;
      const pic = { name, author, isTwitterHandle: isTwitterHandle === "1", str };
      pic.id = objectId();
      data.sharePics.push(PicUtil.process(pic));
      return true;
    },
    createPic: () => {
      const picsWithAuthors = data.customPics.filter(p => p.author);
      const customPicSize = picsWithAuthors.length;
      const authorPic = customPicSize > 0 ? picsWithAuthors[customPicSize - 1] : null;
      const newPic = {
        name: "new pic",
        str: BASE_PIC.str,
      };
      if (authorPic) {
        newPic.author = authorPic.author;
        newPic.isTwitterHandle = authorPic.isTwitterHandle;
      }
      return PicUtil.process(newPic);
    },
    drawEditor: pic => {
      const { colHints, rowHints } = pic;
      const headerHints = `<tr>
        <td></td>
        ${colHints.map(colHint => `<td class="align-bottom">
          ${!colHint ? '<div class="header-hint">0</div>' : colHint.map(a => `<div class="header-hint">${a}</div>`).join("")}
        </td>`).join("")}
      </tr>`;
      return `<table class="grid-table ml-auto mr-auto grid-size-${pic.colCount}"><tbody class="grid">
        ${headerHints}
        ${PicUtil.drawGrid(pic.grid, rowHints, isEditor = true)}
      </tbody></table>`
    },
    drawGame: (currGame, showHints) => {
      const { playerGrid } = currGame;
      const { colHints, rowHints } = currGame.pic;
      const headerHints = showHints ? `<tr>
        <td></td>
        ${colHints.map(colHint => `<td class="align-bottom">
          ${!colHint ? '<div class="header-hint">0</div>' : colHint.map(a => `<div class="header-hint">${a}</div>`).join("")}
        </td>`).join("")}
      </tr>` : '';
      return `<table class="grid-table ml-auto mr-auto grid-size-${currGame.pic.colCount}"><tbody class="grid">
        ${headerHints}
        ${PicUtil.drawGrid(playerGrid, showHints ? rowHints : 0)}
      </tbody></table>`
    },
    drawPicWithTable: (pic) => `<table class="grid-table ml-auto mr-auto grid-size-${pic.colCount}"><tbody class="grid">
      ${PicUtil.drawGrid(pic.grid)}
    </tbody></table>`,
    drawGrid: (grid, rowHints, isEditor) => grid.map((row, rowIndex) => {
      const clickAction = isEditor ? "PicEditor" : "gramepic";
      return `<tr>
        ${rowHints ? `<td class="text-right row-hint-cell">
          ${!rowHints[rowIndex] ? '<div class="row-hint">0</div>' : rowHints[rowIndex].map(a => `<div class="row-hint">${a}</div>`).join("")}
        </td>` : ''}
        ${row.map((a, colIndex) => {
          const boxClass = a === "1" ? 'Black' : a === " " ? "White" : 'notSelected';
          return `<td class="${boxClass} cell" onmousedown="${clickAction}.select(${rowIndex}, ${colIndex})"></td>`;
        }).join("")}</tr>`;
    }).join(""),
  };
})();

const downloadTextFile = (filename, text) => {
  var elem = document.createElement('a');
  elem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  elem.setAttribute('download', filename);

  elem.style.display = 'none';
  document.body.appendChild(elem);

  elem.click();

  document.body.removeChild(elem);
}