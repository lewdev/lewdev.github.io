const categories = [
  { name: "Apps", emoji: "📲" },
  { name: "Games", emoji: "👾" },
  { name: "Simulations", emoji: "⏯" },
  { name: "Tenrikyo", emoji: "🙏" },
];

const projects = [
// Apps
{
  title: "Math Homework Generator", name: "hw-gen", emoji: '📝',
  description: "Randomly generates printable worksheets.",
  category: "Apps",
},
{
  title: "Meta Tag Generator", name: "meta-tag-gen", emoji: '🤖',
  description: "Quickly generate your standard meta tags for social media and SEO.",
  category: "Apps",
},
{
  title: "ExText", name: "extext", emoji: '👨‍💻',
  description: "Minimal, fast web development in browser. Press Ctrl+Enter to run.",
  category: "Apps",
},
{
  title: "Pixmoji", name: "pixmoji", emoji: '🎨',
  description: "Draw pixel art with emoji squares.",
  category: "Apps",
},
{
  title: "Regex Find & Format Tool", name: "regex-text-finder", url: "https://lewdev.github.io/apps/regex-find-and-format", emoji: '🔍',
  description: "Perform regular expression search & replace operations on text.",
  category: "Apps",
},
// Games
{
  title: "Moonshot Commander", name: "moonshot-commander", emoji: '🕹️',
  description: "Top-down shooter released 11/30/2020 for Game Off 2020",
  category: "Games",
},
{
  title: "Burger Builder", name: "burger-builder", emoji: '🍔',
  description: "Quickly build the ordered burgers before the time runs out.",
  category: "Games",
},
{
  title: "Number Guessing Game", name: "number-guess", emoji: '🤔',
  description: "Guess your number while it tracks your guesses and time. Has multiple difficulties.",
  category: "Games",
},
{
  title: "Tick-Tack-Toe", name: "ticktacktoe",  emoji: '⭕', category: "Games",
  url: "https://lewdev.github.io/apps/ticktacktoe/v1/", hidden: true
},

// Tenrikyo
{
  title: "Tenrikyo Service Times", name: "service-times", emoji: '⏲️',
  description: "Look up the Tenrikyo Church Headquarters service times.",
  category: "Tenrikyo"
},
{
  title: "Anecdotes Browser", name: "anecdotes-browser", emoji: '📖',
  description: "Browse the Anecdotes of Oyasama in English and Japanese.",
  category: "Tenrikyo"
},
{
  title: "Ofudesaki Browser", name: "ofudesaki-browser", url: "https://lewdev.github.io/ofudesaki-browser/", emoji: '📕',
  description: "Browse and search a Tenrikyo scripture, the Ofudesaki.",
  category: "Tenrikyo",
},
{
  title: "Narimono App (prototype)", name: "narimono", emoji: '🎶', url: "https://lewdev.github.io/apps/narimono-prototype/",
  description: "A sound-board app of the instruments used in the Tenrikyo service. An unfinished project that was going to be a rhythm game.",
  category: "Tenrikyo",
},
{
  title: "Kanrodai App", name: "kanrodai-app", emoji: '🗺️',
  description: "Shows the location of the Kanrodai, a sacred location, relative to your location on a map.",
  category: "Tenrikyo",
},

//Simulations
{
  title: "Rock Paper Scissors Battle", name: "rock-paper-scissors-battle", emoji: '✂️',
  description: "Watch a simulation of emoji Rock, Paper, Scissors and other variations battle it out.",
  category: "Simulations",
},
{
  title: "Squid Game Level 5", name: "squid-game-lvl5", emoji: '🦑',
  description: "A JavaScript canvas simulation of Squid Game level 5 using emojis.",
  category: "Simulations",
},
];

const meLinks = [
  { title: "My resume", url: "https://docs.google.com/document/d/e/2PACX-1vSE8xfQwOKlVGXZPtW9wMp8-vwlNVz_z6LnrFje_E25GfbQjWWMgyNzQ1e4CjSfDWrsVtUGMhKuE9pU/pub"},
  { title: "Github Profile", url: "https://github.com/lewdev",},
  { title: "LinkedIn Profile", url: "https://www.linkedin.com/in/lewisnakao" },
  { title: "StackOverflow", url: "http://stackoverflow.com/cv/lewis.nakao" },
  { title: "Sponsor Me", url: "https://github.com/sponsors/lewdev" },
];