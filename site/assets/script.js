/**
 * @public
 * @nocollapse
 */
 window['main'] = (() => {
  const APP_DATA_KEY = "lewis-nakao-site";
  const APPS_URL = "https://lewdev.github.io/apps";
  const SRC_URL = "https://github.com/lewdev";

  const projectsDiv = document.getElementById("projects");
  const navbar = document.getElementById("navbar");
  const navbarToggleBtn = document.getElementById("navbarToggleBtn");
  const sitemap = document.getElementById("sitemap");

  let data = {};

  window.onload = () => {
    loadData();
    displayData();

    const OPEN_CLASS = 'show';
    const addOffClick = (e, callback) => {
      const offClick = evt => {
        if (e !== evt) {
          callback();
          document.removeEventListener('click', offClick)
        }
      }
      document.addEventListener('click', offClick)
    };
    const handleClick = (e) => {
      const toggleMenu = () => navbar.classList.toggle(OPEN_CLASS)
      //e.stopPropagation()
      if (!navbar.classList.contains(OPEN_CLASS)) {
        toggleMenu();
        addOffClick(e, toggleMenu)
      }
    };
    navbarToggleBtn.onclick = handleClick;
  };
  const displayData = () => {
    const arr = [];
    categories.map(c => {
      arr.push(`<div class="col-md-6"><h2 class="mt-3">${c.emoji} ${c.name}</h2>`, displayCategory(c.name), "</div>");
    });
    projectsDiv.innerHTML = arr.join("");
  };
  const displayCategory = category => {
    return displayDataInTable(projects.filter(p => p.category === category && !p.hidden));
  };
  const displayDataInTable = data => {
    const arr = ['<div class="card card-body p-0"><table class="table no-top-border mb-0"><tbody>'];
    data.forEach(p => {
      let url = p.url ? p.url : p.name ? `${APPS_URL}/${p.name}/` : false;
      let srcUrl = p.name ? `${SRC_URL}/${p.name}` : false;
      arr.push(`
      <tr>
        <td>
          <a href="${url}" target="_blank" title="Try ${p.title} now!">${p.emoji} ${p.title}</a>
          <div class="text-secondary">${p.description}</div>
        </td>
        <td class="text-center">
          ${srcUrl ? `<a href="${srcUrl}" target="_blank">👨‍💻️ Source</a>` : '-'}
        </td>
      </tr>
    `)});
    arr.push('</tbody></table></div>');
    return arr.join("");
  };
  const loadData = () => {
    const localData = window.localStorage.getItem(APP_DATA_KEY);
    if (localData) {
      const parsedData = JSON.parse(localData);
      if (parsedData) data = parsedData;
    }
  };
  const saveData = () => window.localStorage.setItem(APP_DATA_KEY, JSON.stringify(data));
  const clearData = () => window.localStorage.setItem(APP_DATA_KEY, JSON.stringify(data));
  return {
    "showSitemap": () => {
      sitemap.style.display = "block";
      sitemap.innerHTML = `
<textarea><?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<url><loc>https://lewdev.github.io/</loc></url>
${projects.map(p => {
  let url = p.url ? p.url : p.name ? `${APPS_URL}/${p.name}/` : false;
  return url ? `<url><loc>${url}</loc></url>` : '';
}).join("\n")}
</urlset></textarea>
<button class="btn btn-primary" onclick="this.parentNode.style.display='none'">❌ Close</button>`;
      return false;
    },
  }
})();

function notifyMe() {
  console.log("notifyMe");
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    console.log("notifyMe 1");
    alert("This browser does not support desktop notification");
  }
  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    console.log("notifyMe 2");
    // If it's okay let's create a notification
    var notification = new Notification("Hi there!");
  }
  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    console.log("notifyMe 3");
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  }
  console.log("notifyMe 4");
  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}