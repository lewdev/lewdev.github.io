//ui.js, source: PureCSS
(() => {
  var layout = document.getElementById('layout'),
    menu = document.getElementById('menu'),
    menuLink = document.getElementById('menuLink'),
    content = document.getElementById('main')
  ;
  const toggleClass = (elem, className) => {
    let classes = elem.className.split(/\s+/);
    let length = classes.length;
    for (let i = 0; i < length; i++) {
      if (classes[i] === className) {
        classes.splice(i, 1);
        break;
      }
    }
    if (length === classes.length) classes.push(className);
    elem.className = classes.join(' ');
  };
  const toggleAll = e => {
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
})();