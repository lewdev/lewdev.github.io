
var buttonListDiv = document.getElementById("buttonList");
var displaySongDiv = document.getElementById("displaySong");
var instrumentList = ["Hyoshigi", "Chanpon", "Kotsuzumi", "Taiko", "Surigane", "Fue", "Koto"];
var soundNameList = [
  "Signal", "Hyoshigi", "Chanpon", "Kotsuzumi", "Taiko",
  "Surigane-1", "Surigane-2",
  "Fue-2", "Fue-3", "Fue-5", "Fue-5-high", "Fue-6", "Fue-6-high", "Fue-7",
  "Koto-13", "Koto-12", "Koto-11", "Koto-10", "Koto-9",
  "Koto-8", "Koto-7", "Koto-6", "Koto-5", "Koto-4", "Koto-3",
  "Koto-2", "Koto-1",
];
var shortcutRef = {
  "s": "Signal",
  "h": "Hyoshigi",
  "c": "Chanpon",
  "k": "Kotsuzumi",
  "t": "Taiko",
  "g": "Surigane-1",
  "h": "Surigane-2",
  "1": "Koto-1",
  "2": "Koto-2",
  "3": "Koto-3",
  "4": "Koto-4",
  "5": "Koto-5",
  "6": "Koto-6",
  "7": "Koto-7",
  "8": "Koto-8",
  "9": "Koto-9",
  "0": "Koto-10",
  "-": "Koto-11",
  "=": "Koto-12",
  "]": "Koto-13"
}
var INTERVAL_MS = 500;
var songs = {
  "start": {
    name: "Start",
    lyrics: [[0, 0, "(eh)", 0]],
    Signal: [[1,    0, 0, 0]]
  },
  "section1": {
    name: "Section 1",
    lyrics: [ ["A",    "shi","ki",  "o",  "ha",   "ro", "(o)", "te","ta", "",   "su", "ke", "ta",  "",  "ma",  "e"],
              ["Ten",  "",   "ri",  "",   "-O-",  "",   "no",  "",  "Mi", "",   "ko", "",   "to",  "",   ""]],
    Fue: [    [2,     0,  0,  2,    2,      0, 0,  3,   5,    0, 0, 3,    3,     0, 2,    7],
              [3,     0,  3,     0, 2,      0, 6,    0, 7,    0, 2,   0,  2,     0, 0]],
    Hyoshigi: [[1,    0,  0,  0, 1,      0, 0, 0, 1,    0, 0, 0, 1,     0,  0, 0],
              [1,     0,  0,  0, 1,      0, 0, 0, 1,    0, 0, 0, 1,     0,  0]],
    Chanpon: [[0,  0, 1,      0, 0,   0, 1,    0, 0, 0, 1,    0, 0,  0,  1,    0],
              [0,  0, 1,      0, 0,   0, 1,    0, 0, 0, 1,    0, 0,  0,  0]],
  }
};
var audioList = {};

function playSoundByName(name) {
  //stop other fue sounds if fue is going to be played next.
  var arr = name.split("-");
  var nameStart = arr[0];
  if (nameStart === "Fue") {
    for (var i = 0; i < soundNameList.length; i++) {
      var soundName = soundNameList[i];
      if (soundName.startsWith("Fue")) {
        var audio = audioList[soundName].audio;
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      }
    }
  }

  var audio = audioList[name].audio;
  // stop the sound of it previously playing the same sound.
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}

function displaySong(songName) {
  var song = songs[songName];
  if (song) {
    //displaySong
    var songLinesLength = song.lyrics.length;
    var table = document.createElement("table");
    for (var i = 0; i < song.lyrics.length; i++) {
      var tr = document.createElement("tr");
      for (var j = 0; j < song.lyrics[i].length; j++) {
        var td = document.createElement("td");
        td.id = songName + i + "-" + j;
        td.innerHTML = song.lyrics[i][j];
        tr.append(td);
      }
      table.append(tr);
    }
    displaySongDiv.append(table);
  }
}

var songInterval;
function playSong(songName, instrument) {
  var song = songs[songName];
  if (song) {
    displaySongDiv.innerHTML = "";
    displaySong(songName);
    var songLinesLength = song.lyrics.length;

    //play song
    clearInterval(songInterval);
    var lineIndex = 0;
    var lyricIndex = 0;
    songInterval = setInterval(function() {
      if (lineIndex < songLinesLength) {
        var td = document.getElementById(songName + lineIndex + "-" + lyricIndex);
        if (td) {
          td.style.color = "red";
        }
        var note = song[instrument][lineIndex][lyricIndex++];
        //console.log("note=" + note + ", instrument=" + instrument + ", lineIndex=" + lineIndex + ", lyricIndex=" + lyricIndex);
        if (note) {
          if (instrument === "Hyoshigi"
            || instrument === "Taiko"
            || instrument === "Chanpon"
            || instrument === "Kotsuzumi"
            || instrument === "Signal"
          ) {
            playSoundByName(instrument);
          }
          else {
            playSoundByName(instrument + "-" + note);
          }
        }
        if (lyricIndex >= song.lyrics[lineIndex].length) {
          lineIndex++;
          lyricIndex = 0;
        }
      }
      else {
        clearInterval(songInterval);
      }
    }, INTERVAL_MS);
  }
}

function createButton(name) {
  //console.log(name);
  var btn = document.createElement('button');
  var audio = new Audio("./sounds/" + name + '.mp3');
  btn.innerHTML = name;
  btn.className = "narimono-btn btn btn-secondary";
  btn.onclick = function() { playSoundByName(name); };
  audioList[name] = { name: name, audio: audio };
  return btn;
}

function init() {
  //generate list of all sounds
  var ul = document.createElement("ul");
  for (var i = 0; i < soundNameList.length; i++) {
    var soundName = soundNameList[i];
    var li = document.createElement('li');
    li.className = "narimono-list-item";
    li.append(createButton(soundName));

    var shortcutKey = null;
    for(var key in shortcutRef) {
      if (shortcutRef[key] === soundName) {
        shortcutKey = key;
      }
    }
    if (shortcutKey) {
      var span = document.createElement("span");
      span.className = "narimono-shortcut-ref";
      span.innerHTML = "Press '" + shortcutKey + "'";
      li.append(span);
    }
    ul.append(li);
  }
  buttonListDiv.append(ul);

  displaySong('section1');

  //add keyboard shortcuts
  document.addEventListener("keypress", function(e) {
    var soundName = shortcutRef[e.key];
    if (soundName) {
      playSoundByName(soundName);
    }
  });
}
