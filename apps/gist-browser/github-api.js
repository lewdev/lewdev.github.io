const MyCrypt = (() => {
  const textToChars = s => s.split("").map(c => c.charCodeAt(0));
  const applySaltToChar = (code, salt) => textToChars(salt).reduce((a, b) => a ^ b, code);
  const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
  return {
    decrypt: (salt, encoded) => (
      encoded.match(/.{1,2}/g).map(hex => parseInt(hex, 16)).map(c => applySaltToChar(c, salt))
        .map(charCode => String.fromCharCode(charCode)).join``
    ),
    crypt: (salt, text) => (
      text.split``.map(textToChars).map(c => applySaltToChar(c, salt)).map(byteHex).join``
    ),
  };
})();

const showPromptBtn = label => (
  `<button class="btn btn-light btn-sm" onclick="GithubApi.showTokenPrompt()" title="Set Github Token">🎟${label ? " " + label : ""}</button>`
);
const HOW_TO_GEN_TOKEN =
`<div id="tokenInstructions" class="p-3 bg-light rounded border border-secondary"
  style="position:fixed; top:10%; left:20%; width: 60%;">
  <div class="d-flex justify-content-between">
    <h2>🐙 How to generate a Github Token</h2>
    <button class="btn btn-light btn-sm" title="Close" onclick="tokenInstructions.style.display='none'">✖</button>
  </div>
  <ol>
    <li>Login to Github</li>
    <li>Create a new token <a href="https://github.com/settings/personal-access-tokens/new" target="_blank">here</a></li>
    <li>Expand "Account Permissions"</li>
    <li>Under <code>Gists</code> add "Read and write" access</li>
    <li>Click <code>Generate token</code></li>
    <li>
      Paste token here:
      <input id="tokenPromptStr" type="text" class="form-control my-1"
        onkeyup="event.keyCode==13?GithubApi.setToken(this.value):0"
        placeholder="github_pat_XXX... or ghp_XXX..." />
    </li>
    <li>Press <code>Enter</code> to set token</li>
  </ol>
</div>`;

const GithubApi = (() => {
  const STORAGE_KEY = "github-token";
  const API_URL = "https://api.github.com";
  const SALT = "f2q23";

  let username, tokenStr, token = null;

  const handleError = error => {
    console.error(error);
    if (err) err.innerHTML = error;
    if ((error + "").includes("Unauthorized")) showTokenPrompt();
  };

  const postFetch = fetchPromise => fetchPromise.then(r => {
    if (r.ok) return r.json();
    const isUnauthorized = r.statusText === "Unauthorized";
    return Promise.reject(`${r.status} ${r.statusText}${isUnauthorized ? ` (invalid token) ${showPromptBtn("Set Token")}` : ""}`)
  }).catch(handleError);

  const getHeader = (header = {}) => ({Authorization: token ? `token ${token}` : "", ...header});

  const get = (path, header = {}) => postFetch(fetch(`${API_URL}${path}`,{headers: getHeader(header)}));

  const patch = (url, body) => postFetch(fetch(url, {method: 'PATCH', headers: getHeader(), body: JSON.stringify(body)}));

  const showTokenPrompt = (show = true) => {
    let div = document.getElementById("tokenInstructions");
    if (div) div.style.display = show ? "block" : "none";
    else document.body.innerHTML += show ? HOW_TO_GEN_TOKEN : "";
  };

  const formatGistData = data => {
    if (!Array.isArray(data)) return [];
    return (data || []).map(({ id, url, description, public, created_at, updated_at, files }) => ({
      id, url, description, public, created_at, updated_at, 
      files: Object.keys(files).map(key => {
        const { filename, raw_url, size, content } = files[key];
        return { filename, raw_url, size, content };
      })
    }))
  };


  return {
    init: loadDataArg => new Promise(res => {
      tokenStr = localStorage.getItem(STORAGE_KEY);
      loadData = loadDataArg;
      if (!tokenStr) { if (loadData) loadData(); res(); return; }
      token = MyCrypt.decrypt(SALT, tokenStr);
      res();
    }).then(_ => GithubApi.getUser().then(loadData ? loadData : 0)),
    handleError,
    showPromptBtn,
    showTokenPrompt,
    hideTokenPrompt: () => showTokenPrompt(false),
    setToken: str => {
      if (!str) return;
      token = str;
      tokenStr = MyCrypt.crypt(SALT, str);
      localStorage.setItem(STORAGE_KEY, tokenStr);
      showTokenPrompt(false);
      GithubApi.init(loadData);
    },
    getToken: () => token,
    getUsername: () => username,
    getUser: () => get("/user").then(data => {
      username = data ? data.login : "";
      return data;
    }),
    getGists: (page = 1) => get(`/gists?per_page=100&page=${page}`).then(formatGistData),
    getGistById: gistId => get(`/gists/${gistId}`).then(r => formatGistData([r])[0]),
    // getGistsByUser: user => get(`/users/${user}/gists?per_page=100`).then(formatGistData),
    saveGist: (gistId, body) => patch(`${API_URL}/gists/${gistId}`, body),
    saveFile: (gistId, filename, content) => {
      const files = {};
      files[filename] = { content };
      return GithubApi.saveGist(gistId, {files});
    },
    // getRepos: cb => get(`/user/repos?per_page=100&type=public`)
    //   .then(data => data.map(d => (
    //     "id, name, description, html_url, created_at, updated_at, stargazers_count, watchers, forks, private".split`, `
    //     .reducer((obj, attr) => {obj[attr] = d[attr]; return obj;}, {})
    //   )))
    //   .then(data => handleCb(data, cb))
    // ,
    // getRepo: (repo, cb) => get(`/repos/${username}/${repo}`).then(data => handleCb(data, cb)),
  };
})();
