/**
 * Common Methods used for repos
 */

const getRepoLink = (repo, user) => {
  const repoName = `${user.login}/${repo.name}`;
  return `<a href="https://github.com/${repoName}/graphs/traffic" target="_blank">📦 ${repoName}</a>`;
};

const getRepoAnchor = repo => {
  const repoName = `${user.login}/${repo.name}`;
  return `<a href="#${repo.name}">${repo.name}</a> <a href="https://github.com/${repoName}" target="_blank" title="View ${repoName}">📦</a>`;
};

const cap = s => s.charAt(0).toUpperCase() + s.substr(1);

const formatVal = val => {
  if ((""+val).includes("T00:00:00Z")) {
    return new Date(val).toLocaleString("en", { year: "numeric", month: "numeric", day: "numeric", });
  }
  // else if (!isNaN(val)) 
  return val;
};

const isEmpty = arr => !arr || arr.length === 0;

// This is independent on the rest of the app. It just displays/hides a scroll to top button.
const handleTopBtn = () => {
  let topBtn = document.getElementById("topBtn");
  if (!topBtn) {
    topBtn = document.createElement("div");
    topBtn.id = "topBtn";
    topBtn.style.position = "fixed";
    topBtn.style.top = "20px";
    topBtn.style.right = "20px";
    topBtn.innerHTML = `<a href="#">⬆️ Back to top</a>`;
    document.body.appendChild(topBtn);
  }
  topBtn.style.display = window.pageYOffset > 200 ? "block" : "none";
};
handleTopBtn();

window.addEventListener("scroll", handleTopBtn, false);

const getEmoji = attr => {
  switch (attr) {
    case "views": return "👁";
    case "clones": return "📋";
    case "referrers": return "↩";
  }
  return "";
};

const createStatsTable = (attr, repo) => {
  const arr = repo[attr];
  if (!arr) return `No ${attr} data.`;
  //{views: {views: 0, uniques: 0}, clones: {clones: 0, uniques: 0}};
  const overall = arr.reduce((prev, curr) => {
    prev.count += curr.count;
    prev.uniques += curr.uniques;
    return prev;
  }, {count: 0, uniques: 0});
  const header = `<h5>${getEmoji(attr)} ${cap(attr)} (${["count", "uniques"].map(name => `${overall[name]} ${name}`).join(", ")})</h5>`;
  if (!arr || arr.length === 0) return "";
  const cols = Object.keys(arr[0]);
  return `${header}<details><div class="card mb-3">${createTable(arr)}</div></details>`;
};

const createTable = arr => {
  const cols = Object.keys(arr[0]);
  return (
  `<table class="table mb-0">
    <thead><tr>${cols.map(col => `<th${isNaN(arr[0][col]) ? "" : ` class="text-end"`}>${cap(col)}</th>`).join("")}</thead>
    <tbody>
      ${arr.map(row => `<tr>${cols.map(col => `<td${isNaN(row[col]) ? "" : ` class="text-end"`}>${formatVal(row[col])}</td>`).join("")}</tr>`).join("")}
      <tr>${cols.map(col => {
        const isNum = !isNaN(arr[0][col]);
        return `<td${isNum ? ` class="text-end"` : ""}>
          ${isNum ? arr.reduce((prev, curr) => prev + parseInt(curr[col]), 0) : "<b>Total</b>"}
        </td>`;
      }).join``}</tr>
    </tbody>
  </table>`
  );
};