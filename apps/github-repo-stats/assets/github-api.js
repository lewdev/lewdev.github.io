//https://stackoverflow.com/a/66938952/1675237
const crypt = (salt, text) => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
  return text
    .split("")
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join("");
};

const decrypt = (salt, encoded) => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded
    .match(/.{1,2}/g)
    .map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
};

const GithubApi = (() => {
  let username = null;
  const tokenStr = "434c547b4755651c161c5456535c50611d4b45694e137c486c6b577563104b1d4f651410434e524c";
  const salt = "f2q23";
  const TOKEN = decrypt(salt, tokenStr);
  const API_URL = "https://api.github.com";

  const get = path => fetch(
      `${API_URL}${path}`,
      {headers: {Authorization: `token ${TOKEN}`}
    })
    .then(r => r.json())
    .then(r => {if (r.message) alert(r.message); return r;})
    .catch(error => err.innerHTML = error)
  ;
  const handleCb = (data, cb) => {
    if (cb) cb(data);
    return data;
  };
  return {
    getUser: cb => get("/user").then(data => {
      username = data.login;
      return handleCb(data, cb);
    }),
    getGists: cb => get(`/users/${username}/gists`)
      .then(data => (
        data.map(d => {
          const { url, files, description } = d;
          return {
              url, description, files: Object.keys(files).map(key => {
              const { filename, raw_url } = files[key];
              return { filename, raw_url, public: d.public };
            })
          };
        })
      ))
      .then(data => handleCb(data, cb))
    ,
    getRepos: cb => get(`/user/repos`)
      .then(data => (
        data.map(d => {
          const { id, name, description, html_url, created_at, updated_at, stargazers_count, watchers, forks } = d;
          return { id, name, description, html_url, private: d.private, created_at, updated_at, stargazers_count, watchers, forks };
        })
      ))
      .then(data => handleCb(data, cb))
    ,
    // const getRepo = (repo, cb) => get(`/repos/${username}/${repo}`).then(data => handleCb(data, cb)),
    getTraffic: (repo, cb) => get(`/repos/${username}/${repo}/traffic/views`).then(data => handleCb(data, cb)),
    getClones: (repo, cb) => get(`/repos/${username}/${repo}/traffic/clones`).then(data => handleCb(data, cb)),
    getReferrers: (repo, cb) => get(`/repos/${username}/${repo}/traffic/popular/referrers`).then(data => handleCb(data, cb)),
    getAllRepoStats: (repo, cb) => {
      if (!repo) return;
      const { name } = repo;
      const { getTraffic, applyStats, getClones, getReferrers } = GithubApi;
      getTraffic(name, data => {
        if (!data) return;
        applyStats(repo, "views", data);
        getClones(name, data => {
          applyStats(repo, "clones", data);
          getReferrers(name, data => {
            // if (!repo) return;
            if (!repo.referrers) repo.referrers = data;
            // else {
            //   for (const referrer of data) {
            //     repo.referrer = repo.referrer.map(v => v.referrer === referrer.referrer ? referrer : v);
            //   }
            // }
          });
          if (cb) cb(repo);
        });
      });
    },
    applyStats: (repo, attr, data) => {
      if (!repo[attr]) repo[attr] = data[attr];
      else {
        //merge data
        for (const day of data[attr]) {
          repo[attr] = repo[attr].map(v => v.timestamp === day.timestamp ? day : v);
        }
      }
    }
  };
})();