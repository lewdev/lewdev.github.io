/*
/user/repos
/repos/:owner/:repo/traffic/clones
/repos/:owner/:repo/traffic/views
/repos/:owner/:repo/traffic/popular/referrers
*/
const app = (() => {
  const APP_ID = "my-github-stats-data"
  const d = document;
  const left = d.getElementById("left");
  const right = d.getElementById("right");
  let user = {};
  let repos = [];
  let stats = [];

  const cap = s => s.charAt(0).toUpperCase() + s.substr(1);

  const createStatsTable = (attr, repo) => {
    const arr = repo[attr];
    const header = `<h5>${cap(attr)}</h5>`;
    if (!arr || arr.length === 0) return "";
    const cols = Object.keys(arr[0]);
		return `${header}<div class="card mb-3"><table class="table mb-0"><thead><tr>${cols.map(c => `<th>${cap(c)}</th>`).join("")}</thead>
      <tbody>${arr.map(o => `<tr>${cols.map(a => `<td>${o[a]}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  };
  const isEmpty = arr => !arr || arr.length === 0;

  const render = () => {
    const repoList = repos.filter(r => !r.private);
    left.innerHTML = `<h3 class="mt-4 mb-1 pb-1 border-secondary border-bottom">List</h3><ul>${repoList.map(r => `<li>${r.name}</li>`).join("")}</ul>`;
    right.innerHTML = `<div>${repoList.map(repo => {
      const r = stats.find(s => s.name === repo.name);
      if (!r || (isEmpty(r.views) && isEmpty(r.clones) && isEmpty(r.referrers))) return '';
      return `<h3 class="mt-4 mb-1 pb-1 border-secondary border-bottom">${r.name}</h3>${["views", "clones", "referrers"].map(a => createStatsTable(a, r)).join("")}`;
    }).join("")}</div>`;
  };

	window.onload = () => {
    const userStr = localStorage.getItem(`${APP_ID}-user`);
    const statsStr = localStorage.getItem(`${APP_ID}-stats`);
    const reposStr = localStorage.getItem(`${APP_ID}-repos`);
    if (userStr) user = JSON.parse(userStr);
    if (statsStr) stats = JSON.parse(statsStr);
    if (reposStr) repos = JSON.parse(reposStr);
    render();
  };
  
  return {
    "reload": () => GithubApi.getUser(userData => {
      if (!userData) {
        alert("You need to login to Github first!");
        return;
      }
      user = userData;
      localStorage.setItem(`${APP_ID}-user`, JSON.stringify(user));

      GithubApi.getRepos(reposData => {
        const promises = [];
        for (const repo of reposData) {
          const { name } = repo;
          if (!repo.private) {
            let repoStats = stats.find(s => s.name === name) || { name };
            promises.push(new Promise(res => GithubApi.getAllRepoStats(repoStats, statsData => res(statsData))));
          }
        }
        Promise.all(promises).then(data => {
          for (const statData of data) {
            if (stats.find(s => s.name === statData.name)) {
              stats = stats.map(s => s.name === statData.name ? statData : s);
            }
            else stats.push(statData);
          }
          repos = reposData.filter(r => !r.private);
          localStorage.setItem(`${APP_ID}-repos`, JSON.stringify(reposData));
          localStorage.setItem(`${APP_ID}-stats`, JSON.stringify(stats));
          t.value = JSON.stringify(stats);
          render();
        });
      })
    })
  };
})();