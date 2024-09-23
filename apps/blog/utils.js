
const getUrlParam = param => {
  const urlArr = document.location.href.split`?`;
  const paramArr = urlArr.length > 1 ? urlArr[1].split`&` : [];
  const dataPair = paramArr.find(a => a.indexOf(param + "=") === 0);
  return dataPair ? dataPair.split`=`[1].replace(/%20/g, " ") : false;
};
const setUrlParam = param =>  {
  const url = document.location.href.split`?`[0].split("#")[0];
  window.history.pushState({ param }, param, `${url}${param ? "?" + param : ""}`);
  return false;
};

const TIME = [1e3, "s", 6e4, "min", 36e5, "hr", 864e5, "d", 2592e6, "wk", 2592e6, "mo", 31536e6, "yr"];
const dateDistance = dateStr => {
  const now = new Date().getTime();
  let diff = now - new Date(dateStr).getTime();
  let agoOrUntil = " ago";
  if (diff < 0) { agoOrUntil = " until"; diff = Math.abs(diff); }
  for (let i = 12; i >= 0; i-=2) {
    const t = TIME[i];
    if (diff >= t) return ~~(diff / t) + TIME[i + 1] + agoOrUntil;
  }
  return diff + "ms" + agoOrUntil;
};

const notify = (type, message) => {
  const elem = document.createElement('div');
  elem.className = `notify badge bg-${type}`;
  elem.innerHTML = message;
  document.body.appendChild(elem);
  setTimeout(() => elem.parentNode.removeChild(elem), 5000);
};