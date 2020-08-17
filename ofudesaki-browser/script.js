const APP_DATA_KEY = "ofudesaki-browser";
const FAV_DATA_KEY = "ofudesaki-browser-favorites";

const VIEWS = ["verse", "group", "search", "favorites"];
const LANGUAGES = ["Romanized", "Japanese", "English", "Portuguese", "Kanji"];
const VERSE_VIEW = "verse";
const READ_VIEW = "group";
const SEARCH_VIEW = "search";
const FAVORITES_VIEW = "favorites";
const VERSE_VIEW_INDEX = VIEWS.indexOf(VERSE_VIEW);
const READ_VIEW_INDEX = VIEWS.indexOf(READ_VIEW);
const SEARCH_VIEW_INDEX = VIEWS.indexOf(SEARCH_VIEW);
const FAVORITES_VIEW_INDEX = VIEWS.indexOf(FAVORITES_VIEW);
const LAST_VERSE_GROUP_PART = 17;
const PART_COUNT = 18;

const EM_HEAVY_CHECK = "&#9989;"; //✅
const EM_CROSS_MARK = "&#10060;"; //❌

const verseDisplay = document.getElementById("verseDisplay");
const partSelect = document.getElementById("partSelect");
const verseSelect = document.getElementById("verseSelect");
const verseGroupSelect = document.getElementById("verseGroupSelect");

const verseNavTop = document.getElementById("verseNavTop");
const verseNavBottom = document.getElementById("verseNavBottom");
const verseNavTemplate = verseNavTop.cloneNode(true);

//favorites
const bookmarkDisplay = document.getElementById("bookmarkDisplay");
const favoritesDisplay = document.getElementById("favoritesDisplay");

//const verseOptionTemplate = document.getElementById("verseOptionsRow");
const verseOptionTemplate = document.querySelector(".verse-options");

const searchTxt = document.getElementById("searchTxt");
const searchBtn = document.getElementById("searchBtn");
const searchClearBtn = document.getElementById("searchClearBtn");
const searchResults = document.getElementById("searchResults");

const groupView = document.getElementById("groupView");
const favoritesView = document.getElementById("favoritesView");

const hideButtonLabelCbx = document.getElementById("hideButtonLabelCbx");

let count = 0;
let data = {
  'view': 0,
  'selectedPart': 1,
  'selectedVerse': 1,
  'selectedVerseGroup': "1:1-20",
  'searchStr': "",
  'hideButtonLabel': false,
  'verseOptions': {
    'showRomanized': true,
    'showJapanese': true,
    'showEnglish': true,
    'showPortuguese': true,
    'showKanji': true,
    'showEnglish2': false
  },
  'groupOptions': {
    'showRomanized': true,
    'showJapanese': true,
    'showEnglish': true,
    'showPortuguese': true,
    'showKanji': false,
    'showEnglish2': false
  },
  'searchOptions': {
    'showRomanized': true,
    'showJapanese': true,
    'showEnglish': true,
    'showPortuguese': true,
    'showKanji': true,
    'showEnglish2': false
  },
  'favoritesOptions': {
    'showRomanized': true,
    'showJapanese': true,
    'showEnglish': true,
    'showPortuguese': true,
    'showKanji': true,
    'showEnglish2': false
  },
  "isDataLoaded": false, // "localStorage" with default data is prevented.
};
let favoritesData = {
  'favorites': [],
  'bookmark': 0
};
let ofData = null;
let keywords = null;
let selectedVerse = null;

function myParseInt(str) {
  return parseInt(str, 10);
}
function initUi() {
  const modalWin = document.querySelector('.modal-window');
  if (modalWin) modalWin.onclick = () => { window.location = "#"; };
  partSelect.onchange = function(e) {
    selectPart(myParseInt(partSelect.value));
    selectVerse(1);
    displayVerseView();
  };
  verseSelect.onchange = function() {
    selectVerse(myParseInt(verseSelect.value));
    displayVerseView();
  };
  verseGroupSelect.onchange = function() {
    selectVerseGroup(verseGroupSelect.value);
    displayReadView();
  };
  selectVerseGroup(data['selectedVerseGroup']);
  selectPart(data['selectedPart']);
  selectVerse(data['selectedVerse']);
  displayView(data['view']);
  searchTxt.onkeyup = function(e) {
    if (e.keyCode === 13) { search(); }
  };
  searchTxt.value = data['searchStr'];
  searchBtn.onclick = function() { search(); };
  searchClearBtn.onclick = function() {
    searchTxt.value = "";
    searchTxt.focus();
  };
  initMenuLabels();
}
function initMenuLabels() {
  const menuDiv = document.querySelector(".of-bottom-menu");
  if (data['hideButtonLabel']) {
    addClassName(menuDiv, 'of-hide-labels');
  }
  hideButtonLabelCbx.checked = data['hideButtonLabel'];
  hideButtonLabelCbx.onclick = function() {
    let optionFlag = data['hideButtonLabel'];
    if (optionFlag === 'undefined') {
      optionFlag = false;
    }
    data['hideButtonLabel'] = !optionFlag;
    hideButtonLabelCbx.checked = !optionFlag;
    if (!optionFlag) {
      addClassName(menuDiv, 'of-hide-labels');
    }
    else {
      removeClassName(menuDiv, 'of-hide-labels');
    }
    saveConfigData();
  };
}
function search() {
  data['searchStr'] = searchTxt.value.trim();
  displaySearchView();
}
function renderView() {
  if (data['view'] === VERSE_VIEW_INDEX) {
    displayVerseView();
  }
  else if (data['view'] === READ_VIEW_INDEX) {
    displayReadView();
  }
  else if (data['view'] === SEARCH_VIEW_INDEX) {
    displaySearchView();
  }
  else if (data['view'] === FAVORITES_VIEW_INDEX) {
    displayFavoritesView();
  }
}
function selectPart(part) {
  data['selectedPart'] = part;
  partSelect.value = data['selectedPart'];
  displayVerseSelect(part);
}
function selectVerse(verseNum) {
  data['selectedVerse'] = verseNum;
  verseSelect.value = data['selectedVerse'];
}
function selectVerseGroup(verseGroupStr) {
  data['selectedVerseGroup'] = verseGroupStr;
  verseGroupSelect.value = data['selectedVerseGroup'];
}
function getById(id) {
  let size = ofData['verses'].length;
  if (id <= 0) {
    return ofData['verses'][size - 1]
  }
  else if (id > size) {
    return ofData['verses'][0];
  }
  return ofData['verses'][id - 1];
}
function getByPartAndVerse(partNum, verseNum) {
  let size = ofData['verses'].length;
  for (let i = 0; i < size; i++) {
    const verse = ofData['verses'][i];
    if (verse['part'] === partNum && verse['verse'] === verseNum) {
      return verse;
    }
  }
  return null;
}
function displayView(viewCode) {
  data['view'] = viewCode;
  //hide other views
  VIEWS.map(viewName => {
    const viewDiv = document.getElementById(viewName + "View");
    if (viewDiv) {
      viewDiv.style.display = "none";
    }
    const viewDivs = document.querySelectorAll("." + viewName + "-view");
    for (let i = 0; i < viewDivs.length; i++) {
      viewDivs[i].style.display = "none";
    }
    const menuItem = document.getElementById(viewName + "ViewMenuItem");
    if (!menuItem) {
      console.log(viewName + "ViewMenuItem not found.");
    }
    removeClassName(menuItem, "selected");
  });
  const viewName = VIEWS[viewCode];
  const viewDiv = document.getElementById(viewName + "View");
  const viewElems = document.querySelectorAll("." + viewName + "-view");
  viewDiv.style.display = "";
  viewDiv.classList.add('animated', 'fadeIn');
  viewDiv.addEventListener('animationend', function() {  });
  for (let i = 0; i < viewElems.length; i++) {
    viewElems[i].style.display = "";
  }
  const menuItem = document.querySelector("#" + viewName + "ViewMenuItem");
  addClassName(menuItem, "selected");
  saveConfigData();
  renderView();
}
function displayVerseView() {
  const partNum = data['selectedPart'];
  const verseNum = data['selectedVerse'];
  selectedVerse = getByPartAndVerse(partNum, verseNum);
  //id,part,verse,in_doctrine,in_life_of_oyasama,en_6th_ed,romanization,jp1,jp2,kanji,en
  if (selectedVerse) {
    const verseStr = "Verse " + selectedVerse['part'] + ":" + selectedVerse['verse']
    displayVerseNavBtns(verseStr);
    verseDisplay.innerHTML = displayVerseByViewStr(selectedVerse, VERSE_VIEW, null);
    applyVerseControls(verseDisplay, selectedVerse);
  }
  else {
    verseDisplay.innerHTML = "Verse " + partNum + ":" + verseNum + " not found!";
  }
}
function applyVerseControls(verseDisplay, selectedVerse) {
  if (!verseDisplay || !selectedVerse) {
    return;
  }
  const verseBtn = verseDisplay.querySelector(".verse-btn");
  const readBtn = verseDisplay.querySelector(".read-btn");
  const favoriteBtn = verseDisplay.querySelector(".favorite-btn");
  const bookmarkBtn = verseDisplay.querySelector(".bookmark-btn");
  const part = selectedVerse['part'];
  const verse = selectedVerse['verse'];
  const partVerse = `${part}:${verse}`;
  if (verseBtn) {
    verseBtn.onclick = function() {
      selectPart(part);
      selectVerse(verse);
      displayView(VERSE_VIEW_INDEX);
    };
  }
  if (readBtn) {
    const verseGroup = getVerseGroupByPartVerse(part, verse);
    readBtn.onclick = function() {
      selectVerseGroup(verseGroup);
      displayView(READ_VIEW_INDEX);
      window.location.hash = "verse" + part + "-" + verse;
    };
  }
  const favorites = favoritesData['favorites'];
  if (favorites.includes(partVerse)) {
    favoriteBtn.classList.add('favorited');
    favoriteBtn.title = "Remove from Favorites";
  }
  else {
    favoriteBtn.title = "Add to Favorites";
  }
  if (partVerse === favoritesData['bookmark']) {
    bookmarkBtn.classList.add('favorited');
    bookmarkBtn.title = "Remove Bookmark";
  }
  else {
    bookmarkBtn.title = "Bookmark";
  }
  favoriteBtn.addEventListener('animationend', () => {
    favoriteBtn.classList.remove('animated', 'pulse', 'tada');
    renderView();
  });
  bookmarkBtn.addEventListener('animationend', () => {
    bookmarkBtn.classList.remove('animated', 'pulse', 'tada');
    renderView();
  });
  favoriteBtn.onclick = function() {
    const favorites = favoritesData['favorites'];
    if (favorites.includes(partVerse)) {
      const favIndex = favoritesData['favorites'].indexOf(partVerse);
      favoritesData['favorites'].splice(favIndex, 1);
      favoriteBtn.classList.remove('favorited');
      favoriteBtn.classList.add('animated', 'pulse');
    }
    else {
      favoritesData['favorites'].push(partVerse);
      favoritesData['favorites'].sort(verseSort);
      favoriteBtn.classList.add('favorited', 'animated', 'tada');
    };
    saveFavData();
  };
  bookmarkBtn.onclick = function() {
    if (favoritesData["bookmark"] === partVerse) {
      favoritesData['bookmark'] = false;
      bookmarkBtn.classList.remove('favorited');
      bookmarkBtn.classList.add('animated', 'pulse');
    }
    else if (favoritesData["bookmark"] !== partVerse) {
      favoritesData['bookmark'] = partVerse;
      bookmarkBtn.classList.add('favorited', 'animated', 'tada');
    }
    saveFavData();
  };
}
const parsePartVerseStr = partVerse => {
  if (partVerse && partVerse.indexOf(":") > -1) {
    const arr = partVerse.split(":");
    return { part: myParseInt(arr[0]), verse: myParseInt(arr[1]) };
  }
  return null;
};
const verseSort = (a, b) => {
  const partVerseA = parsePartVerseStr(a);
  const partVerseB = parsePartVerseStr(b);
  if (partVerseA.part < partVerseB.part) return -1;
  else if (partVerseA.part > partVerseB.part) return 1;
  if (partVerseA.verse < b.verse) return -1;
  else if (partVerseA.verse > partVerseB.verse) return 1;
  return 0;
};
function getVerseGroupByPartVerse(part, verse) {
  if (!part || !verse) {
    console.log("ERROR: getVerseGroupByPartVerse parameters (part, verse) are not valid.")
    return;
  }
  const groups = ofData['verseGroups'][part - 1]['groups'];
  if (groups) {
    for (let i = 0; i < groups.length; i++) {
      const verseGroupStr = groups[i];
      const verseStrArr = verseGroupStr.split("-");
      const startVerse = myParseInt(verseStrArr[0]);
      const endVerse = myParseInt(verseStrArr[1]);
      if (verse >= startVerse && verse <= endVerse) {
        return part + ":" + verseGroupStr;
      }
    }
  }
  console.log("ERROR: getVerseGroupByPartVerse parameters (" + part + ", " + verse + ") not found.")
  return null;
}
function parseVerseGroup(partVerseGroupStr) {
  if (!partVerseGroupStr) {
    return null;
  }
  const partVerseGroupArr = partVerseGroupStr.split(":");
  const partNum = myParseInt(partVerseGroupArr[0]);
  const verseGroupStr = partVerseGroupArr[1];
  const verseGroupArr = verseGroupStr.split("-");
  const startVerseNum = myParseInt(verseGroupArr[0]);
  const endVerseNum = myParseInt(verseGroupArr[1]);
  return {
    part: partNum,
    startVerse: startVerseNum,
    endVerse: endVerseNum,
    verseGroup: verseGroupStr //i.e. 1-21
  }
}
function displayReadView() {
  verseNavTop.style.display = '';
  verseNavBottom.style.display = '';
  const partVerseGroupStr = data['selectedVerseGroup'];
  const verseGroup = parseVerseGroup(partVerseGroupStr);
  if (verseGroup) {
    groupView.innerHTML = "";
    for (let verseNum = verseGroup.startVerse; verseNum <= verseGroup.endVerse; verseNum++) {
      const verse = getByPartAndVerse(verseGroup.part, verseNum);
      const elem = document.createElement("div");
      elem.innerHTML = displayVerseByViewStr(verse, READ_VIEW, null);
      applyVerseControls(elem, verse);
      groupView.appendChild(elem);
    }
    displayReadNavBtns(verseGroup.part, verseGroup.verseGroup);
  }
}
function displayReadNavBtns(partNum, verseGroupStr) {
  let prevVerseGroupStr = "";
  let nextVerseGroupStr = "";
  const verseGroup = ofData['verseGroups'][partNum - 1];
  const size = verseGroup['groups'].length;
  for (let j = 0; j < size; j++) {
    const group = verseGroup['groups'][j];
    if (verseGroupStr === group) {
      //prev
      if (j > 0) {
        prevVerseGroupStr = partNum + ":" + verseGroup['groups'][j - 1];
      }
      else {
        if (partNum === 1) {
          const lastVerseGroups = ofData['verseGroups'][LAST_VERSE_GROUP_PART - 1]['groups'];
          prevVerseGroupStr = LAST_VERSE_GROUP_PART + ":" + lastVerseGroups[lastVerseGroups.length - 1];
        }
        else {
          const prevPart = partNum - 1;
          const prevVerseGroups = ofData['verseGroups'][prevPart - 1]['groups'];
          prevVerseGroupStr = prevPart + ":" + prevVerseGroups[prevVerseGroups.length - 1];
        }
      }
      //next
      if (j < size - 1) {
        nextVerseGroupStr = partNum + ":" + verseGroup['groups'][j + 1];
      }
      else {
        if (partNum === LAST_VERSE_GROUP_PART) {
          const firstVerseGroups = ofData['verseGroups'][0]['groups'];
          nextVerseGroupStr = 1 + ":" + firstVerseGroups[0];
        }
        else {
          const nextVerseGroups = ofData['verseGroups'][partNum]['groups'];
          nextVerseGroupStr = (partNum + 1) + ":" + nextVerseGroups[0];
        }
      }
    }
  }
  displayVerseGroupNavBtns(prevVerseGroupStr, nextVerseGroupStr);
}
function displayFavoritesView() {
  //hide stuff
  verseNavTop.style.display = 'none';
  verseNavBottom.style.display = 'none';
  const bookmark = favoritesData['bookmark'];
  const favorites = favoritesData['favorites'];
  if (!bookmark && (!favorites || favorites.length === 0)) {
    bookmarkDisplay.innerHTML = "Bookmark nor favorites have been set.";
    favoritesDisplay.innerHTML = "";
    return;
  }
  if (bookmark) {
    //display book mark
    const bookmarkPartVerse = parsePartVerseStr(favoritesData['bookmark']);
    const partVerse = getByPartAndVerse(bookmarkPartVerse.part, bookmarkPartVerse.verse);
    bookmarkDisplay.innerHTML = '<h3>Bookmark</h3>' + displayVerseByViewStr(partVerse, 'favorites', '');
    applyVerseControls(bookmarkDisplay, bookmarkPartVerse);
  }
  else {
    bookmarkDisplay.innerHTML = '';
  }
  if (favorites && favorites.length > 0) {
    favoritesDisplay.innerHTML = '<h3 style="border-bottom: 1px solid gray;">Favorites</h3>';
    favorites.map(a => {
      const favPartVerse = parsePartVerseStr(a);
      const partVerse = getByPartAndVerse(favPartVerse.part, favPartVerse.verse);
      const elem = document.createElement("div");
      elem.innerHTML = displayVerseByViewStr(partVerse, 'favorites', '');
      applyVerseControls(elem, favPartVerse);
      favoritesDisplay.appendChild(elem);
    });
  }
}
function displaySearchView() {
  //hide stuff
  verseNavTop.style.display = 'none';
  verseNavBottom.style.display = 'none';

  const searchStr = data['searchStr'];
  if (searchStr) {
    let count = 0;
    let resultDivArr = [];
    let size = ofData['verses'].length;
    searchResults.innerHTML = "";
    for (let i = 0; i < size; i++) {
      const verse = ofData['verses'][i];
      const re = new RegExp(searchStr, 'i');
      const elem = document.createElement("div");
      const searchBodyArr = [];
      if (data['searchOptions']['showRomanized']) { searchBodyArr.push(verse['ro']); }
      if (data['searchOptions']['showJapanese']) { searchBodyArr.push(verse['jp1'] + verse['jp2']); }
      if (data['searchOptions']['showEnglish']) { searchBodyArr.push(verse['en_6th_ed']); }
      if (data['searchOptions']['showPortuguese']) { searchBodyArr.push(verse['pt']); }
      if (data['searchOptions']['showKanji']) { searchBodyArr.push(verse['kanji']); }
      const matchResult = (searchBodyArr.join(" ")).match(re);
      if (matchResult) {
        count++;
        elem.innerHTML = displayVerseByViewStr(verse, SEARCH_VIEW, searchStr);
        applyVerseControls(elem, verse);
        resultDivArr.push(elem);
      }
    }
    const yieldsDiv = document.createElement("div");
    yieldsDiv.innerHTML = '<p>Search "' + searchStr + '" yields ' + count + ' results.</p>';
    searchResults.appendChild(yieldsDiv);
    for (let i = 0; i < resultDivArr.length; i++) {
      searchResults.appendChild(resultDivArr[i]);
    }
  }
  else {
    searchResults.innerHTML = "<p>Enter a search term.</p>";
  }
  searchTxt.select();
}
function displayVerseGroupSelect() {
  let options = [];
  ofData['verseGroups'].map(verseGroup => {
    const part = verseGroup['part'];
    options.push('<option value="" disabled="true">- Part ' + part + ' -</option>');
    verseGroup['groups'].map(group => {
      const partVerseGroup = part + ":" + group;
      options.push('<option value="' + partVerseGroup + '">' + partVerseGroup + '</option>');
    });
  });
  verseGroupSelect.innerHTML = options.join("");
}
function displayVerseGroupNavBtns(prevVerseGroupStr, nextVerseGroupStr) {
  const prevFunc = function() {
    groupView.classList.add('animated', 'slideOutRight');
    groupView.addEventListener('animationend', function() {
      selectVerseGroup(prevVerseGroupStr);
      displayReadView();
      groupView.className = "";
      groupView.classList.add('animated', 'slideInLeft');
      groupView.addEventListener('animationend', function() {
        groupView.className = "";
      });
    });
  };
  const nextFunc = function() {
    groupView.classList.add('animated', 'slideOutLeft');
    groupView.addEventListener('animationend', function() {
      selectVerseGroup(nextVerseGroupStr);
      displayReadView();
      groupView.className = "";
      groupView.classList.add('animated', 'slideInRight');
      groupView.addEventListener('animationend', function() {
        groupView.className = "";
      });
    });
  };
  setupNav(verseNavTop, data['selectedVerseGroup'], prevFunc, nextFunc);
  setupNav(verseNavBottom, data['selectedVerseGroup'], prevFunc, nextFunc);
}
function displayVerseNavBtns(verseStr) {
  const prevVerse = getById(selectedVerse.id - 1);
  const nextVerse = getById(selectedVerse.id + 1);
  const prevFunc = function() {
    selectPart(prevVerse['part']);
    selectVerse(prevVerse['verse']);
    displayVerseView();
  };
  const nextFunc = function() {
    selectPart(nextVerse['part']);
    selectVerse(nextVerse['verse']);
    displayVerseView();
  };
  setupNav(verseNavTop, verseStr, prevFunc, nextFunc);
  setupNav(verseNavBottom, verseStr, prevFunc, nextFunc);
}
function setupNav(versNav, middleStr, prevFunc, nextFunc) {
  //copy template
  versNav.innerHTML = verseNavTemplate.innerHTML;
  //find the buttons and middle elements
  const prevVerseBtn = versNav.getElementsByClassName('verse-nav-prev-btn')[0];
  const nextVerseBtn = versNav.getElementsByClassName('verse-nav-next-btn')[0];
  const verseMiddle = versNav.getElementsByClassName('verse-nav-middle')[0];
  prevVerseBtn.onclick = prevFunc;
  nextVerseBtn.onclick = nextFunc;
  verseMiddle.innerHTML = middleStr;
}
function displayVerseByViewStr(verse, viewName, highlight) {
  highlight = highlight || false;
  if (verse) {
    const verseStr = verse['part'] + ":" + verse['verse'];
    const ro = highlightText(verse['ro'].split(/\s{2,}/g).join("<br/>"), highlight);
    const kanji = highlightText(verse['kanji'].split(/\s{2,}/g).join("<br/>"), highlight);
    const english = highlightText(verse['en_6th_ed'], highlight);
    const pt = highlightText(verse['pt'], highlight);
    const japanese = highlightText(verse['jp1'] + "<br/>" + verse['jp2'], highlight);
    return '<div class="verse-display">'
      + (data[viewName + 'Options']['showRomanized'] ? "<blockquote>" + ro + "</blockquote>" : '')
      + (data[viewName + 'Options']['showJapanese'] ? "<blockquote>" + japanese + "</blockquote>" : '')
      + (data[viewName + 'Options']['showEnglish'] ?  "<blockquote>" + english + "</blockquote>" : '')
      //+ (data[viewName + 'Options']['showEnglish2'] ?  "<blockquote>" + verse['en'] + "</blockquote>" : '')
      + (data[viewName + 'Options']['showPortuguese'] ?  "<blockquote>" + pt + "</blockquote>" : '')
      + (data[viewName + 'Options']['showKanji'] ? "<blockquote>" + kanji + "</blockquote>" : '')
      + '<table class="of-verse-controls"><tbody><tr>'
      + '<td>'
      + '<button class="favorite-btn btn circle"><i class="fa fa-fw fa-star"></i></button>'
      + '<button class="bookmark-btn btn circle"><i class="fa fa-fw fa-bookmark"></i></button>'
      + '</td>'
      + '<td>'
      + (verse['in_life_of_oyasama']  ? '<span class="of-tag">Life of Oyasama</span>' : '')
      +  (verse['in_doctrine']  ? '<span class="of-tag">Doctrine</span>' : '')
      + "</td><td>" + verseStr + '</td>'
      + '<td>'
      + (viewName !== 'group' ? '<button class="read-btn btn circle" title="View in Read"><i class="fab fa-fw fa-readme"></i></button>' : "")
      + (viewName !== 'verse' ? '<button class="verse-btn btn circle" title="View in Browse"><i class="fa fa-fw fa-eye"></i></button>' : "")
      + '</td>'
      + '</tr></tbody></table>'
      + "</div>"
    ;
  }
  return "Verse not found.";
}
function highlightText(str, search) {
  if (!search) {
    return str;
  }
  const re = new RegExp(search, "i");
  const highlight = '<span class="highlight">' + str.match(re) + '</span>';
  return str.replace(re, highlight);
}
function initViewOptions() {
  VIEWS.map(viewName => {
    //create show toggle tables
    const optionsDiv = verseOptionTemplate.cloneNode(true);
    const inputs = optionsDiv.querySelectorAll("input");
    const labels = optionsDiv.querySelectorAll("label");
    for (let j = 0; j < inputs.length; j++) {
      const input = inputs[j];
      const id = input.id.replace("-verse", "-" + viewName);
      const optionName = input.id.replace("-verse","").replace("show","").replace("Cbx","");
      input.id = id;
      input.onchange = function() { toggleOption(viewName, optionName); };
      input.checked = data[viewName + "Options"]["show" + optionName];
    }
    for (let j = 0; j < labels.length; j++) {
      labels[j].htmlFor = labels[j].htmlFor.replace("-verse", "-" + viewName);
    }
    let viewOptionsDiv = document.getElementById(viewName + "OptionsRow");
    viewOptionsDiv.innerHTML = "";
    viewOptionsDiv.appendChild(optionsDiv);

    //configure menu links
    const menuLink = document.getElementById(viewName + "ViewMenuItem")
    menuLink.onclick = function() {
      const index = VIEWS.indexOf(viewName);
      displayView(index);
    };
  });

}
function toggleOption(viewName, optionName) {
  const input = document.getElementById("show" + optionName + "Cbx-" + viewName);
  if (input) {
    let optionFlag = data[viewName + "Options"]["show" + optionName];
    if (optionFlag === 'undefined') {
      optionFlag = false;
    }
    data[viewName + "Options"]["show" + optionName] = !optionFlag;
    input.checked = !optionFlag;
  }
  renderView();
}
function displayPartSelect() {
  let options = [];
  for (let i = 1; i <= PART_COUNT; i++) {
    options.push('<option value="' + i + '">' + i + '</option>');
  }
  partSelect.innerHTML = options.join("");
}
function displayVerseSelect(part) {
  let options = [];
  ofData['verses'].map(verse => {
    if (verse['part'] === myParseInt(part)) {
      const verseNum = verse['verse'];
      const selected = data['selectedVerse'] === verseNum ? ' selected="selected"' : '';
      options.push('<option value="' + verseNum + '"' + selected + '>' + verseNum + '</option>');
    }
  });
  verseSelect.innerHTML = options.join("");
  verseSelect.value = data['selectedVerse'];
}
function displayData() {
  saveConfigData();
  displayPartSelect();
  displayVerseSelect(data['selectedPart']);
  displayVerseGroupSelect();
}
window.onload = function() {
  loadData().then(function() {
    return makeRequest('ofudesaki.json');
  })
  .then(function (request) {
    ofData = JSON.parse(request.responseText);
    return makeRequest('keywords.json');
  })
  .then(function (request) {
    keywords = JSON.parse(request.responseText);
    displayData();
    initUi();
    initViewOptions();
    data['isDataLoaded'] = true;
  })
  .catch(function (error) { console.log('Something went wrong.', error); });
};
window.onunload = function() {
  saveData();
};
/*
window.addEventListener("beforeunload", function (e) { saveData(); });
window.addEventListener("unload", function (e) { saveData(); });
*/
function loadData() {
  var promise = new Promise(function(resolve, reject) {
    const localData = window.localStorage.getItem(APP_DATA_KEY);
    const localFavData = window.localStorage.getItem(FAV_DATA_KEY);
    if (localData) {
      const parsedData = JSON.parse(localData);
      if (parsedData) {
        data = parsedData;
        correctData();
      }
      else {
        reject(Error("Failed to load data from local storage."));
      }
    }
    if (localFavData) {
      const parsedFavData = JSON.parse(localFavData);
      if (parsedFavData) {
        favoritesData = parsedFavData;
      }
      else {
        reject(Error("Failed to load fav data from local storage."));
      }
    }
    resolve("Data loaded from local storage.");
  });
  return promise;
}
function saveData() {
  //this prevents refreshing sequentially too fast from overwriting your saved data.
  if (data['isDataLoaded']) {
    saveConfigData();
    saveFavData();
  }
}
const saveConfigData = () => {
  window.localStorage.setItem(APP_DATA_KEY, JSON.stringify(data));
};
const saveFavData = () => {
  window.localStorage.setItem(FAV_DATA_KEY, JSON.stringify(favoritesData));
};
function correctData() {
  if (!data['favoritesOptions']) {
    data['favoritesOptions'] = {
      'showRomanized': true,
      'showJapanese': true,
      'showEnglish': true,
      'showPortuguese': true,
      'showKanji': true,
      'showEnglish2': false
    };
  }
}
/**
 * Promise-based XMLHttpRequest method.
 * @param {string} url Expected location of REST URL.
 * @param {string} method Possible values: GET, POST, PUT
 */
const makeRequest = function (url, method = "GET") {
  var request = new XMLHttpRequest();
  return new Promise(function (resolve, reject) {
    // Setup our listener to process compeleted requests
    request.onreadystatechange = function () {
      // Only run if the request is complete
      if (request.readyState !== 4) return;
      // Process the response
      if (request.status >= 200 && request.status < 300) {
        // If successful
        resolve(request);
      }
      else {
        // If failed
        reject({
          status: request.status,
          statusText: request.statusText
        });
      }
    };
    request.open(method || 'GET', url, true);
    request.send();
  });
};
function toggleClass(elem, className) {
  let classes = elem.className.split(/\s+/);
  let length = classes.length;
  for (let i = 0; i < length; i++) {
    if (classes[i] === className) {
      classes.splice(i, 1);
      break;
    }
  }
  if (length === classes.length) {//The className is not found
    classes.push(className);
  }
  elem.className = classes.join(' ');
}
function removeClassName(elem, className) {
  let classes = elem.className.split(/\s+/);
  let length = classes.length;
  for (let i = 0; i < length; i++) {
    if (classes[i] === className) {
      classes.splice(i, 1);
      break;
    }
  }
  elem.className = classes.join(' ');
}
function addClassName(elem, className) {
  let classes = elem.className.split(/\s+/);
  classes.push(className);
  elem.className = classes.join(' ');
}

//ui.js, source: PureCSS
(function (window, document) {
  var layout = document.getElementById('layout'),
    menu = document.getElementById('menu'),
    menuLink = document.getElementById('menuLink'),
    content = document.getElementById('main')
  ;
  function toggleAll(e) {
    var active = 'active';
    e.preventDefault();
    toggleClass(layout, active);
    toggleClass(menu, active);
    toggleClass(menuLink, active);
  }
  menuLink.onclick = function (e) {
    toggleAll(e);
  };
  content.onclick = function (e) {
    if (menu.className.indexOf('active') !== -1) {
      toggleAll(e);
    }
  };
}
(window, window.document));
