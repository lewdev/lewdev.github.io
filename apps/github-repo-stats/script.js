/*
/user/repos
/repos/:owner/:repo/traffic/clones
/repos/:owner/:repo/traffic/views
/repos/:owner/:repo/traffic/popular/referrers
*/
let user = {};
window["app"] = (() => {
  const APP_ID = "my-github-stats-data"
  const d = document;
  const loading = d.getElementById("loading");
  const left = d.getElementById("left");
  const right = d.getElementById("right");
  let repos = [];
  let stats = [];

  const render = () => {
    left.innerHTML = `<h3 class="mt-4 mb-1 pb-1 border-secondary border-bottom">Repo List</h3><ul>${repos.map(r => `<li>${getRepoAnchor(r)} </li>`).join("")}</ul>`;
    right.innerHTML = ReposSummary.render()
     + `<div>${repos.map(repo => {
      const repoStats = stats.find(s => s.name === repo.name) || repo || {};
      const { name } = repoStats;
      return (
        `<h3 class="mt-4 mb-1 pb-1 border-secondary border-bottom"><a name="${name}"></a>${getRepoLink(repoStats, user)}</h3>
        <div>${"stargazers_count,watchers,forks".split`,`.map((a, i) => `<span title="${a}">${repo[a] + ["⭐","👀","🍴"][i]}</span>`).join`, `}</div>
        ${["views", "clones", "referrers"].map(a => createStatsTable(a, repoStats)).join("")}`
      );
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
    "render": render,
    "getRepos": () => repos,
    "getStats": () => stats,
    "reload": () => GithubApi.getUser(userData => {
      if (!userData) {
        alert("You need to login to Github first!");
        return;
      }
      loading.innerHTML = "🔃 Loading...";
      user = userData;
      localStorage.setItem(`${APP_ID}-user`, JSON.stringify(user));

      GithubApi.getRepos(reposData => {
        const promises = [];
        for (const repo of reposData.filter(r => !r.private)) {
          const { name } = repo;
          let repoStats = stats.find(s => s.name === name) || { name };
          promises.push(new Promise(res => GithubApi.getAllRepoStats(repoStats, statsData => res(statsData))));
        }
        Promise.all(promises).then(data => {
          for (let statData of data) {
            if (stats.find(s => s.name === statData.name)) {
              stats = stats.map(s => s.name === statData.name ? statData : s);
            }
            else stats.push(statData);
          }
          repos = reposData.filter(r => !r.private);
          localStorage.setItem(`${APP_ID}-repos`, JSON.stringify(reposData));
          localStorage.setItem(`${APP_ID}-stats`, JSON.stringify(stats));
          t.value = JSON.stringify(stats);
          loading.innerHTML = '';
          render();
        });
      })
    })
  };
})();