const emojis = "⚽️ 🏀 🏈 ⚾️ 🥎 🎾 🏐 🏉 🥏 🎱 🪀 🏓 🏸 🏒 🏑 🥍 🏏 🥅 ⛳️ 🚗 🚕 🚙 🚌 🚎 🏎 🚓 🚑 🚒 🚐 🚚 🚛 🚜 🚲 🛵 🏍 🛺 🚨 🚔 🚍 🚘 🚖 🚡 🚠 🚟 🚃 🚋 🚞 🚝 🚄 🚅 🚈 🚂 🚆 🚇 🚊 🚉 ✈️ 🛫 🛬 🛩 🛰 🚀 🛸 🚁 🛶 ⛵️ 🚤 🛥 🛳 ⛴ 🚢 ⚓️ ⛽️ 🚧 🚦 🚥 🗺 🗿 🗽 🗼 🏰 🏯 🏟 🎡 🎢 🎠 ⛲️ ⛱ 🏖 🏝 🏜 🌋 ⛰ 🏔 🗻 🏕 ⛺️ 🏠 🏡 🏘 🏚 🏗 🏭 🏢 🏬 🏣 🏤 🏥 🏦 🏨 🏪 🏫 🏩 💒 🏛 ⛪️ 🕌 🕍 🛕 🕋 ⛩ 🛤 🛣 🗾 🎑 🏞 🌅 🌄 🌠 🎇 🎆 🌇 🌆 🏙 🌃 🌌 🌉 🌁 🎪 🥁 🎮 🧩 🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🍈 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🍆 🥑 🥦 🥬 🥒 🌶 🌽 🥕 🧄 🧅 🥔 🍠 🥐 🥯 🍞 🥖 🥨 🧀 🥚 🍳 🧈 🥞 🧇 🥓 🥩 🍗 🍖 🦴 🌭 🍔 🍟 🍕 🥪 🥙 🧆 🌮 🌯 🥗 🥘 🍝 🍜 🍲 🍛 🍣 🍱 🥟 🦪 🍤 🍙 🍚 🍘 🍥 🥠 🥮 🍢 🍡 🍧 🍨 🍦 🥧 🧁 🍰 🎂 🍮 🍭 🍬 🍫 🍿 🍩 🍪 🌰 🥜 🍯 🥛 🧃 🥤 🕹 🔨 ⚒ 🛠 🧸 🎁 🎈 📓 📔 📒 📕 📗 📘 📙 📚 📖 🖋 🖌 🖍 ✏️ 🔎 ❤️ 🧡 💛 💚 💙 💜 🧑‍🎄 🐈‍⬛ 😺 🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐨 🐯 🦁 🐮 🐷 🐽 🐸 🐵 🙈 🙉 🙊 🐒 🐔 🐧 🐦 🐤 🐣 🐥 🦆 🦅 🦉 🦇 🐺 🐗 🐴 🦄 🐝 🐛 🦋 🐌 🐞 🐜 🦟 🦗 🕷 🕸 🦂 🐢 🐍 🦎 🦖 🦕 🐙 🦑 🦐 🦞 🦀 🐡 🐠 🐟 🐬 🐳 🐋 🦈 🐊 🐅 🐆 🦓 🦍 🦧 🐘 🦛 🦏 🐪 🐫 🦒 🦘 🐃 🐂 🐄 🐎 🐖 🐏 🐑 🦙 🐐 🦌 🐕 🐩 🦮 🐕‍🦺 🐈 🐓 🦃 🦚 🦜 🦢 🦩 🕊 🐇 🦝 🦨 🦡 🦦 🦥 🐁 🐀 🐿 🦔 🐾 🐉 🐲 🌵 🎄 🌲 🌳 🌴 🌱 🌿 ☘️ 🍀 🎍 🎋 🍃 🍂 🍁 🍄 🐚 🌾 💐 🌷 🌹 🌺 🌸 🌼 🌻 🌞 🌝 🌛 🌚 🌙 🌎 🌍 🌏 🪐 💫 ⭐️ 🌟 ✨ ⚡️ ☄️ 💥 🔥 🌪 🌈 ☀️ 🌤 ❄️ ☃️ ⛄️".split(" ");
const countable = "⚽️ 🏀 🏈 ⚾️ 🥎 🎾 🏐 🚗 🚕 🚙 🚌 🚎 🏎 🚓 🚑 🚒 🚐 🚚 🚛 🚜 🚲 🛵 🏍 🛺 🚔 🚍 🚘 🚖 🚡 🚠 🚟 🚃 🚋 🚞 🚝 🚄 🚅 🚈 🚂 🚆 🚇 🚊 ✈️ 🛩 🛰 🚀 🛸 🚁 🛶 ⛵️ 🚤 ⛴ 🚢 ⚓️ ⛽️ 🚧 🚦 🗿 🗽 🗼 🏰 🏯 🎡 🎢 🎠 ⛲️ ⛱ 🏖 🏝 🏜 🌋 ⛰ 🏔 🗻 🏕 ⛺️ 🏠 🏡 🏗 🏭 🏢 🏬 🏣 🏥 🏦 🏨 🏪 🏫 💒 🏛 ⛪️ 🕌 🕍 🛕 🕋 ⛩ 🌅 🌄 🌠 🎆 🌉 🌁 🎪 🥁 🎮 🧩 🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🍈 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🍆 🥑 🥦 🥬 🥒 🌶 🌽 🥕 🧄 🧅 🥔 🍠 🥐 🥯 🍞 🥖 🥨 🧀 🥚 🍳 🧈 🥞 🧇 🥓 🥩 🍗 🍖 🦴 🌭 🍔 🍟 🍕 🥪 🥙 🧆 🌮 🌯 🥗 🥘 🍝 🍜 🍲 🍛 🍣 🍱 🥟 🦪 🍤 🍙 🍚 🍘 🥠 🥮 🍢 🍡 🍧 🍨 🍦 🥧 🧁 🍰 🎂 🍮 🍭 🍬 🍫 🍿 🍩 🍪 🌰 🥜 🍯 🥛 🧃 🥤 🕹 🔨 ⚒ 🛠 🧸 🎁 🎈 📓 📔 📒 📕 📗 📘 📙 📚 📖 🖋 🖌 🖍 ✏️ 🔎 ❤️ 🧡 💛 💚 💙 💜 🧑‍🎄 🐈‍⬛ 😺 🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐨 🐯 🦁 🐮 🐷 🐽 🐸 🐵 🙈 🙉 🙊 🐒 🐔 🐧 🐦 🐤 🐣 🐥 🦆 🦅 🦉 🦇 🐺 🐗 🐴 🦄 🐝 🐛 🦋 🐌 🐞 🐜 🦟 🦗 🕷 🕸 🦂 🐢 🐍 🦎 🦖 🦕 🐙 🦑 🦐 🦞 🦀 🐡 🐠 🐟 🐬 🐳 🐋 🦈 🐊 🐅 🐆 🦓 🦍 🦧 🐘 🦛 🦏 🐪 🐫 🦒 🦘 🐃 🐂 🐄 🐎 🐖 🐏 🐑 🦙 🐐 🦌 🐕 🐩 🦮 🐕‍🦺 🐈 🐓 🦃 🦚 🦜 🦢 🦩 🐇 🦝 🦨 🦡 🦦 🦥 🐁 🐀 🦔 🐉 🐲 🌵 🎄 🌲 🌳 🌴 🌱 🌿 ☘️ 🍀 🎍 🎋 🍃 🍁 🍄 🐚 🌾 💐 🌷 🌹 🌺 🌸 🌼 🌻 🌞 🌝 🌛 🌚 🌙 🌎 🌍 🌏 🪐 💫 ⭐️ 🌟 ✨ ⚡️ ☄️ 💥 🔥 🌪 🌈 ☀️ ❄️ ☃️ ⛄️".split(" ");
const rand = max => Math.floor(Math.random() * max);
const randRange = (min, max) => rand(max - min) + min;
const randArr = arr => arr[rand(arr.length)];
const singleDigits = [2,3,4,5,6,7,8,9];
const randNoOnes = () => randArr(singleDigits);
const randRangeByDigits = digits => {
  if (digits === 1) return randNoOnes();
  if (digits < 1) return randRange(1, digits * 10);
  const start = Math.pow(10, digits - 1);
  const end = Math.pow(10, digits) - 1;
  return randRange(start, end);
};
const solution = (x, y, mathSymbol) => {
  switch (mathSymbol) {
    case "*": return x * y;
    case "/": return x / y;
    case "-": return x - y;
    default: return x + y;
  }
};
const getUrlParam = param => {
  const paramMap = {};
  const urlArr = document.location.href.split("?");
  const queryParam = urlArr.length > 1 ? urlArr[1] : false;
  if (queryParam) {
    var paramArr = queryParam.split("&");
    paramArr.map(paramSet => {
      if (paramSet.indexOf(param + "=") === 0) {
        paramMap[param] = paramSet.split("=")[1].replace(/%20/g, " ");
      }
    });
  }
  return paramMap[param] || false;
};
const setUrlParam = param => {
  const url = document.location.href.split("?")[0];
  window.history.pushState({ param: param }, param, url + (param ? "?" + param : ""));
  return false;
};
const strXTimes = (str, x) => {
  return new Array(x).fill().map((a, i) => str + (i > 0 && i % 4 === 0 ? '<br/>' : '')).join("")
};
