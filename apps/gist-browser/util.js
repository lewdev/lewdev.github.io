const spanTitle = (content, title) => `<span title="${title}">${content}</span>`;

const formatNum = num => `<span class="badge bg-secondary" title="${num} chars">
  ${num > 1e3 ? ~~(num / 100) / 10 + "k" : num}
</span>`;

const dateDistance = dateStr => {
  const TIME = [1e3, "s", 6e4, "min", 36e5, "hr", 864e5, "d", 2592e6, "wk", 2592e6, "mo", 31536e6, "yr"];
  const now = new Date().getTime();
  const date = new Date(dateStr);
  const shortDateStr = date.toLocaleString();
  let diff = now - date.getTime();
  let agoOrUntil = " ago";
  if (diff < 0) { agoOrUntil = " until"; diff = Math.abs(diff); }
  for (let i = 12; i >= 0; i-=2) {
    const t = TIME[i];
    if (diff >= t) return spanTitle(~~(diff / t) + TIME[i + 1] + agoOrUntil, shortDateStr);
  }
  return spanTitle(diff + "ms" + agoOrUntil, shortDateStr);
};

const NOTIFY_STYLE = `<style id="notifyStyle">
.notify {
  position: fixed;
  top: -5rem;
  left: 20%;
  width: 60%;
  font-size: 1.5rem;
  display: block;
  white-space: normal;
  animation: 2s 2 alternate slidein ;
}
@keyframes slidein {
  from { top: -5rem; }
  50% { top: 5%; }
  to   { top: 5%; }
}
</style>`;

const NOTIFY_EMOJI = ["success", "🎉", "warning", "⚠️", "danger", "⛔", "info", "ℹ️"];

const notify = (type, message) => {
  if (!document.getElementById("notifyStyle")) document.head.innerHTML += NOTIFY_STYLE;
  const index = NOTIFY_EMOJI.indexOf(type);
  const elem = document.createElement('div');
  elem.className = `notify badge bg-${type}`;
  elem.innerHTML = (index >= 0 ? NOTIFY_EMOJI[index + 1] : "") + message;
  document.body.appendChild(elem);
  setTimeout(() => elem.parentNode.removeChild(elem), 5000);
};
