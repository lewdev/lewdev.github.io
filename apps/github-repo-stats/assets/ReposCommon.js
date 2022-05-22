
const getRepoLink = (repo, user) => {
  const repoName = `${user.login}/${repo.name}`;
  return `<a href="https://github.com/${repoName}/graphs/traffic" target="_blank">${repoName}</a>`;
};

const getRepoAnchor = repo => `<a href="#${repo.name}">${repo.name}</a>`;

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

