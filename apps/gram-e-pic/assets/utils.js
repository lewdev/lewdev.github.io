function extractBaseUrl(url) {
  var baseUrl;
  //find & remove protocol (http, ftp, etc.) and get baseUrl

  if (url.indexOf("//") > -1) {
    const arr = url.split('//');
    const protocol = arr[0];
    const lastSlash = arr[1].lastIndexOf('/');
    if (lastSlash > -1) baseUrl = arr[1].substr(0, lastSlash);
    baseUrl = protocol + "//" + arr[1];
  }
  baseUrl = baseUrl.replace(/index\.html/g, "");
  baseUrl = baseUrl.split('?')[0];

  return baseUrl;
}

//https://stackoverflow.com/a/66938952/1675237
const SALT = "z9wpiu7xlajefhty9ypv";
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


const notify = (type, message) => {
  const elem = document.createElement('div');
  elem.className = `notify badge badge-${type}`;
  elem.innerHTML = message;
  document.body.appendChild(elem);
  setTimeout(() => elem.parentNode.removeChild(elem), 5000);
};


const copyText = text => {
  const input = document.createElement("input");
  input.type = "text";
  input.value = text;
  document.body.appendChild(input);
  input.select();
  input.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  document.execCommand("copy");

  input.parentNode.removeChild(input);
};


const getUrlParam = param => {
  const urlArr = document.location.href.split("?");
  const paramArr = urlArr.length > 1 ? urlArr[1].split("&") : [];
  const dataPair = paramArr.find(a => a.indexOf(param + "=") === 0);
  return dataPair ? dataPair.split('=')[1].replace(/%20/g, " ") : false;
};
const setUrlParam = param =>  {
  const url = document.location.href.split("?")[0].split("#")[0];
  window.history.pushState({ param }, param, `${url}${param ? "?" + param : ""}`);
  return false;
};



const objectId = () => {
  //found on stackoverflow
  var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g,
    () => (Math.random() * 16 | 0).toString(16)).toLowerCase();
};