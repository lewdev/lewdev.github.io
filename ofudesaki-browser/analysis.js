const APP_DATA_KEY = "ofudesaki-analysis";

const WORD_VIEW = "word";
const RO_WORD_VIEW = "roWord";

const wordView = document.getElementById("wordView");
const roWordView = document.getElementById("roWordView");
const keywordDiv = document.getElementById("keyword");
const verseListDiv = document.getElementById("verseList");
const verseDisplayDiv = document.getElementById("verseDisplay");

const englishViewBtn = document.getElementById("englishViewBtn");
const englishCountViewBtn = document.getElementById("englishCountViewBtn");
const romanizedViewBtn = document.getElementById("romanizedViewBtn");
const romanizedCountViewBtn = document.getElementById("romanizedCountViewBtn");

const EM_HEAVY_CHECK = "&#9989;"; //✅
const EM_CROSS_MARK = "&#10060;"; //❌
let words = {};
let roWords = {};
let ofData = null;
let data = {
  'selectedView': WORD_VIEW,
  'selectedWordStr': "",
  'selectedPartVerse': "",
  'wordSortBy': 'count',

  'selectedRoWordStr': "",
  'selectedRoPartVerse': "",
  'roWordSortBy': 'count',
  'isDataLoaded': false
};
window.onload = function() {
  initJsonData();
  initUi();
};
function loadData() {
  loadLocalStorageData();
  generateWordHash('en_6th_ed', words);
  generateWordHash('ro', roWords);
  showWordModal(data['selectedWordStr'], words);
  showVerse(data['selectedPartVerse'], data['selectedWordStr']);
  showWordModal(data['selectedRoWordStr'], roWords);
  showVerse(data['selectedRoPartVerse'], data['selectedRoWordStr']);
  data['isDataLoaded'] = true;
}
function initUi() {
  englishViewBtn.onclick = function() {
    data['selectedView'] = WORD_VIEW;
    data['wordSortBy'] = 'A-Z';
    displayData();
  };
  englishCountViewBtn.onclick = function() {
    data['selectedView'] = WORD_VIEW;
    data['wordSortBy'] = 'count';
    displayData();
  };
  romanizedViewBtn.onclick = function() {
    data['selectedView'] = RO_WORD_VIEW;
    data['roWordSortBy'] = 'A-Z';
    displayData();
  };
  romanizedCountViewBtn.onclick = function() {
    data['selectedView'] = RO_WORD_VIEW;
    data['roWordSortBy'] = 'count';
    displayData();
  };

}
function generateWordHash(verseLang, hashObj) {
  ofData['verses'].map(verse => {
    const partVerse = verse['part'] + ":" + verse['verse'];
    const wordArr = verse[verseLang].replace(/[^\w\s']/g,"").toLowerCase().split(/\s+/g);
    const size = wordArr.length;
    for (let i = 0; i < size; i++) {
      if (i < size - 2) {
        wordArr.push(wordArr[i] + " " + wordArr[i + 1]);
      }
    }
    wordArr.map(word => {
      if (word) {
        if (hashObj[word]) {
          hashObj[word]['count']++;
          const verses = hashObj[word]['verses'];
          if (!verses.includes(partVerse)) {
            verses.push(partVerse);
          }
        }
        else {
          hashObj[word] = { 'count': 1, 'verses': [partVerse] };
        }
      }
    });
  });
  //remove single instances
  Object.keys(hashObj).map(key => {
    if (hashObj[key]['count'] === 1) {
      delete hashObj[key];
    }
  });
}
function displayData() {
  wordView.style.display = "none";
  roWordView.style.display = "none";
  if (data['selectedView'] === WORD_VIEW) {
    displayWordHash("word", words);
  }
  else if (data['selectedView'] === RO_WORD_VIEW) {
    displayWordHash("roWord", roWords);
  }
}
function displayWordHash(viewStr, hashObj) {
  const view = document.getElementById(viewStr + "View");
  const sortBy = data[viewStr + "SortBy"];
  const arr = Object.keys(hashObj);
  const textOutput = [];
  view.style.display = "block";
  view.innerHTML = "";
  (sortBy === 'count' ? arr.sort(function(a,b){return hashObj[b]['count']-hashObj[a]['count']}) : arr.sort())
  .map(key => {
    textOutput.push("<a href='#verse' class='word'>" + key + " (" + hashObj[key]['count'] + ")</a>");
  });
  view.innerHTML = textOutput.length + " " + (viewStr === 'word' ? 'English' : 'Romanized')
    + " words and word-pairs found (Sorted by " + sortBy + ").<br/>" + textOutput.join("");

  //add keyword onclick functionality
  const wordLinks = view.querySelectorAll(".word");
  const size = wordLinks.length;
  for (let i = 0; i < size; i++) {
    const keywordLink = wordLinks[i];
    keywordLink.onclick = function() {
      const text = keywordLink.innerHTML;
      //showWordModal(text.substr(0, text.lastIndexOf(" ") - 1), hashObj);
      showWordModal(text.substr(0, text.lastIndexOf(" ")), hashObj);
    };
  }
}
function showWordModal(wordStr, hashObj) {
  console.log(wordStr);
  if (!wordStr) {
    return;
  }
  data['selectedWordStr'] = wordStr;
  const count = hashObj[wordStr]['count'];
  const linkStart = "<a href='#verse' class='verse-link'>";
  const linkEnd = "</a>";
  keywordDiv.innerHTML = "<strong>Keyword:</strong> " + wordStr;
  verseListDiv.innerHTML = "<strong>Found in " + count + " verses:</strong> "
    + linkStart + hashObj[wordStr]['verses'].join(linkEnd + ", " + linkStart) + linkEnd;

  const verseLinks = verseListDiv.querySelectorAll('.verse-link');
  const size = verseLinks.length;
  for (let j = 0; j < size; j++) {
    const verseLink = verseLinks[j];
    const versePart = verseLink.innerHTML;
    verseLink.onclick = function() { showVerse(versePart, wordStr); };
  }
  showVerse(verseLinks[0].innerHTML, wordStr);
}
function showVerse(versePart, wordStr) {
  data['selectedPartVerse'] = versePart;
  const verse = getByVersePart(versePart);
  if (verse) {
    const ro = highlightText(verse['ro'].split(/\s{2,}/g).join("<br/>"), wordStr);
    const jp = verse['jp1'] + "<br/>" + verse['jp2'];
    const en = highlightText(verse['en_6th_ed'], wordStr);
    const kanji = verse['kanji'].split(/\s{2,}/g).join("<br/>");
    verseDisplayDiv.innerHTML = "<blockquote>" + ro + "</blockquote>"
      + "<blockquote>" + jp + "</blockquote>"
      + "<blockquote>" + en + "</blockquote>"
      + "<blockquote>" + kanji + "</blockquote>"
      + "In Life of Oyasama?: " + (verse['in_life_of_oyasama']  ? EM_HEAVY_CHECK : EM_CROSS_MARK)
      + "In Doctrine?: " + (verse['in_doctrine']  ? EM_HEAVY_CHECK : EM_CROSS_MARK)
      + "<span style='float: right;'>" + versePart + "</span>"
    ;
  }
}
function highlightText(str, search) {
  if (!search) {
    return str;
  }
  const re = new RegExp(search, "i");
  const highlight = '<span class="highlight">' + str.match(re) + '</span>';
  return str.replace(re, highlight);
}
function getByVersePart(versePart) {
  if (versePart) {
    const versePartArr = versePart.split(":");
    const partNum = parseInt(versePartArr[0], 10);
    const verseNum = parseInt(versePartArr[1], 10);
    const size = ofData['verses'].length;
    for (let i = 0; i < size; i++) {
      const verse = ofData['verses'][i];
      if (partNum === verse['part'] && verseNum === verse['verse']) {
        return verse;
      }
    }
  }
  return null;
}
function initJsonData() {
  fetch('ofudesaki.json')
    .then(response => {
      return response.json();
    })
    .then(myJson => {
      ofData = myJson;
      if (ofData) {
        loadData();
        displayData();
      }
      else {
        alert('data not loaded');
      }
    })
  ;
}
function loadLocalStorageData() {
  const localData = window.localStorage.getItem(APP_DATA_KEY);
  if (localData) {
    const parsedData = JSON.parse(localData);
    if (parsedData) {
      data = parsedData;
    }
  }
}
function saveData() {
  if (data['isDataLoaded']) {
    window.localStorage.setItem(APP_DATA_KEY, JSON.stringify(data));
  }
}
window.onunload = function() {
  saveData();
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
