const [List,View] = VIEWS = ["List", "View"];

const DEBUG_ON = 0;
let page = 1;
let pageSize = 20;
let gists = [];
let selectedGist, selectedFilename, searchStr;
let isEditorMode = false;
let isListLoaded = false;

let EDITOR_VIEWS = ["Vert", "Horiz", "Text"];
let EDITOR_EMOJIS = ["↕️", "↔️", "📄"];
let editorViewIndex = 0;
const FILE_CACHE = {};

onload = _ => {
  const gistId = getUrlParam("id");
  if (gistId) selectGistById(gistId);
  else load(page);
};
const nextPage = _ => load(++page);
const escapeXml = s => s.replace(/[<>&'"]/g, c => `&${({'<':'lt','>':'gt','&':'amp',"'":'apos','"':'quot'})[c]};`);

const API_URL = "https://api.github.com";
const FAKE_URL = "./fake-data.json"
const load = p => fetch(DEBUG_ON ? FAKE_URL : `${API_URL}/users/lewdev/gists?pageSize=${pageSize}&page=${p}`)
  .then(d => d.json())
  .then(d => {
    isListLoaded = true;
    if (d.message) notify("danger", d.message);
    else gists.push(...d);
    search.focus();
    render();
  })
;

const adjustEditorHeight = () => {
  const iframe = document.getElementById("f");
  const editor = document.getElementById("editor");
  if (!iframe && !editor) return;
  const { y } = (iframe || editor).getBoundingClientRect();
  const height = `${innerHeight - y - 10}px`;
  if (iframe) iframe.style.height = height;
  if (editor) editor.style.height = height;
};

window.addEventListener("resize", adjustEditorHeight);

const selectGistById = gistId => {
  if (!gistId) return;
  isEditorMode = 0;

  const gist = gists.find(g => gistId === g.id);
  if (gist) {
    selectedGist = gist;
    selectedFilename = Object.keys(gist.files)[0];
    render();
  }
  else if (isListLoaded) console.error(gistId, " not found");
  else fetch(`https://api.github.com/gists/${gistId}`).then(d => d.json()).then(d => {
    if (d.message) notify("danger", d.message);
    selectedGist = d;
    selectedFilename = Object.keys(d.files)[0];
    render();
  });
};

const getFile = async (gistId, file) => {
  const index = `${gistId}-${file.filename}`;
  return FILE_CACHE[index] || await fetch(file.raw_url).then(r => r.text()).then(r => FILE_CACHE[index] = r);
};

const showTextareaEditor = (content, ext) => (
  `<textarea id="editor" spellcheck=false
    ${["html", "md"].includes(ext) ? ` onkeypress="runCode(this, event, '${ext}')"` : ''}
    style=resize:none;filter:invert(>${escapeXml(content)}</textarea>`
);

const showTextEditor = (content, ext) => showTextareaEditor(content, ext);

const showMdEditor = showHtmlEditor = (content, ext) => (
  `<div class="editor-div">
    ${showTextareaEditor(content, ext)}
    <iframe id="f" srcdoc="Press Ctrl + Enter to run HTML code"></iframe>
  </div>`
);

const runCode = (self, event, ext) => {
  const k = event.keyCode;
  if (ext === "md") f.srcdoc = marked.parse(self.value);
  else if ((event.ctrlKey && k == 13) || k == 10) {
    f.srcdoc = self.value;
  }
};

const toggleEditorView = () => {isEditorMode = !isEditorMode; render()};

const showEditor = (content, ext) => (
  ext === "md" ? showMdEditor(content, ext) : (
    ext === "html" ? showHtmlEditor(content, ext) : (
      showTextEditor(content, ext)
    )
  )
);

const showFile = (content, ext) => (
  ext === "md" ? `<div class="container mt-2 mb-5">${marked.parse(content)}</div>` : `<iframe id="f"></iframe>`
);

const showDate = (label, date) => (
`<span class="text-secondary text-sm font-italic" title="${new Date(date).toLocaleString()}">
  ${label}: ${dateDistance(date)}
</span>`
);

const goBack = () => {
  selectedGist = 0;
  setUrlParam("");
  if (!isListLoaded) load();
  else render();
};

const showGist = async () => {
  const { id, description, files, created_at, updated_at } = selectedGist || {};
  const content = await getFile(id, files[selectedFilename]);
  const ext = selectedFilename.split`.`.pop().toLowerCase();
  const fileEmoji = ext === "md" ? "⬇️" : ext === "html" ? "🟧" : ext === "css" ? "🟦" : ext === "js" ? "🟨" : "📄";
  const fileList = Object.keys(files);
  document.title = description;
  setUrlParam(`id=${id}`);
  return `<div class="justify-content-between d-flex">
      <div>
        <button class="btn btn-primary p-1 text-nowrap" onclick="goBack()">⬅️ Back</button>
        <button class="btn btn-${isEditorMode ? "primary" : "light"} p-1 my-2" title="Toggle Editor View" onclick="toggleEditorView()">
          ${isEditorMode ? "📃 View" : "✏️ Editor"}
        </button>
      </div>
      <div class="p-2 text-right">
        <a href="https://gist.github.com/${id}" target="_blank" title="View Gist">${description}</a>
        <div class="text-sm text-secondary">
          ${showDate("created", created_at)}, ${showDate("updated", updated_at)}
        </div>
      </div>
    </div>
    <div class="files-tab btn-group w-100 round">
      ${fileList.map(filename => (
        `<button class="text-nowrap overflow-hidden p-0 rounded-0 btn btn-${filename === selectedFilename ? 'primary' : 'dark text-secondary'}"
          title="${filename}"
          onclick="selectedFilename='${filename}';render()">${fileEmoji} ${filename}</button>`
      )).join``}
    </div>
    ${isEditorMode ? `<div class="pt-2">${showEditor(content, ext)}</div>` : showFile(content, ext)}
  `;
};

let delay = null;

const render = async _ => {
  const top = document.getElementById("top");
  if (top) top.className = selectedGist ? "d-none" : "row"
  o.innerHTML = selectedGist ? (
    await showGist()
  ) : (
    `<ul class="pl-2">${gists.filter(g => (
      !searchStr || (g.description.toLowerCase().includes(searchStr.toLowerCase()))
      )).map(({id, description, created_at, files}) => {
        const fileList = Object.keys(files);
        const fileCount = fileList.length;
        return (
          `<li>
            <a href="#" onclick="selectGistById('${id}');return false;">${escapeXml(description)}</a>
            ${fileCount > 1 ? `<span title="${fileList.join`\n`}" class="badge bg-light text-dark">📎${fileCount}</span>` : ''}
            ${showDate("created", created_at)}
          </li>`
        );
      }).join``}</ul>
    <div class="text-center">
      <button class="btn btn-secondary" onclick=nextPage()>🔻 More 🔻</button>
    </div>`
  );
  if (!isEditorMode) {
    p.style.display = "none";
    if (document.getElementById("f")) {
      const { id, files } = selectedGist || {};
      f.srcdoc = await getFile(id, files[selectedFilename]);
    }
  }
  if (document.getElementById("editor")) {
    p.style.display = "block"
    clearTimeout(delay);
    const d = editor;
    d.onkeyup = d.onclick = _ => {
      clearTimeout(delay);
      delay = setTimeout(_ => {
        let A = d.selectionStart, B = d.selectionEnd, V = d.value, E = V.substr(0,B).split`\n`;
        p.innerHTML = `Ln: ${E.length}, Col: ${E.pop().length+1}, ${A==B?"Pos: "+B:"Sel: "+(B-A)}, Len: ${V.length}`
      }, 99)
    };
  }
  adjustEditorHeight();
};
