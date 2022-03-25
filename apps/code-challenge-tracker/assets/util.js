

const types = "info,primary,success,warning,danger".split(",");
const emojis = "ℹ️,ℹ️,🏆,⚠️,⛔,".split(",");

const notify = (message, type = "info") => {
  const index = types.indexOf(type);
  let emoji = emojis[0];
  if (index >= 0) {
    emoji = emojis[index];
  }
  else {
    type = 'info';
  }
  const elem = document.createElement('div');
  elem.className = `notify alert alert-${type}`;
  //onclick="this.parentNode.parentNode.parentNode.remove(this.parentNode.parentNode)"
  elem.innerHTML = `<div class="row justify-content-md-center w-100">
    <div class="col-10">${emoji} ${message}</div>
    <div class="col-2 text-right">
      <button class="btn" onclick="this.parentNode.parentNode.parentNode.className+=' fade-out'">❌</button>
    </div>
  </div>`;
  document.body.appendChild(elem);
  setTimeout(() => elem.parentNode.removeChild(elem), 5000);
};

const getUnique = (arr, fieldName) => (
  Object.keys(arr.reduce((prev, curr) => {
    prev[curr[fieldName]] = 1;
    return prev;
  }, {}))
);

const cap = s => s.includes("_") ? s.split("_").map(a => cap(a)).join(" ") : (s + "").charAt(0).toUpperCase() + (s ? s.substr(1) : '');

const showField = field => {
  const { name, type, placeholder, rows, min, max, step } = field;
  const baseAttr = ` name="${name}" class="form-control"`;
  switch (type) {
    case 'select': return `<select name="${name}" class="form-select"></select>`
    case 'number': return `<input type="number"${baseAttr} min="${min || 0}" max="${max || 100}" step="${step || 1}">`
    case 'textarea': return `<textarea${baseAttr} rows="${rows}"></textarea>`;
    case 'text':
    default:
  }
  return `<input type="text"${baseAttr} ${placeholder ? `placeholder="${placeholder}` : ''}/>`;
};

const displayField = field => {
  if (!field.label) field.label = cap(field.name);

  const { name, label, col, type } = field;

  if (type === 'checkbox') {
    return `
      <div class="col-${col || 6} mb-2">
        <label class="row mt-4">
          <div class="col-2 mt-2 pr-0">
            <span class="row-${name}"></span>
          </div>
          <div class="col-10 mt-2 fw-bold">${label}</div>
        </label>
      </div>
    `;
  }
  return `
    <div class="col-${col || 6} mb-2">
      <label class="fw-bold">${label}</label>
      <div class="row-${name}"></div>
    </div>
  `;
};

const displayFormField = field => {
  if (!field.label) field.label = cap(field.name);

  const { name, label, col, type } = field;

  if (type === 'checkbox') {
    return `
      <div class="col-${col || 6} mb-2">
        <label class="row mt-4">
          <div class="col-2 mt-2 pr-0">
            <input type="checkbox" name="${name}" class=" mt-1" />
          </div>
          <div class="col-10 mt-2">${label}</div>
        </label>
      </div>
    `;
  }
  return `
    <div class="col-${col || 6} mb-2">
      <label class="fw-bold">${label}</label>
      ${showField(field)}
    </div>
  `;
};

//https://stackoverflow.com/questions/10593337/is-there-any-way-to-create-mongodb-like-id-strings-without-mongodb
const newObjectId = () => (
  (new Date().getTime() / 1000 | 0).toString(16) // timestamp
    + new Array(16).fill().map(_ => (Math.random() * 16 | 0).toString(16)).join("") // 16 random hex chars
);