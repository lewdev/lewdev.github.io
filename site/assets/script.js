var e=[{name:"Apps",a:"\ud83d\udcf2"},{name:"Games",a:"\ud83d\udc7e"},{name:"Simulations",a:"⏯"},{name:"Tenrikyo",a:"\ud83d\ude4f"}],h=[{title:"Math Homework Generator",name:"hw-gen",a:"\ud83d\udcdd",description:"Randomly generates printable worksheets.",b:"Apps"},{title:"Meta Tag Generator",name:"meta-tag-gen",a:"\ud83e\udd16",description:"Quickly generate your standard meta tags for social media and SEO.",b:"Apps"},{title:"ExText",name:"extext",a:"\ud83d\udc68‍\ud83d\udcbb",description:"Minimal, fast web development in browser. Press Ctrl+Enter to run.",
b:"Apps"},{title:"Pixmoji",name:"pixmoji",a:"\ud83c\udfa8",description:"Draw pixel art with emoji squares.",b:"Apps"},{title:"Regex Find & Format Tool",name:"regex-text-finder",url:"https://lewdev.github.io/apps/regex-find-and-format",a:"\ud83d\udd0d",description:"Perform regular expression search & replace operations on text.",b:"Apps"},{title:"Moonshot Commander",name:"moonshot-commander",a:"\ud83d\udd79️",description:"Top-down shooter released 11/30/2020 for Game Off 2020",b:"Games"},{title:"Burger Builder",
name:"burger-builder",a:"\ud83c\udf54",description:"Quickly build the ordered burgers before the time runs out.",b:"Games"},{title:"Number Guessing Game",name:"number-guess",a:"\ud83e\udd14",description:"Guess your number while it tracks your guesses and time. Has multiple difficulties.",b:"Games"},{title:"Tick-Tack-Toe",name:"ticktacktoe",a:"⭕",b:"Games",url:"https://lewdev.github.io/apps/ticktacktoe/v1/",hidden:!0},{title:"Tenrikyo Service Times",name:"service-times",a:"⏲️",description:"Look up the Tenrikyo Church Headquarters service times.",
b:"Tenrikyo"},{title:"Anecdotes Browser",name:"anecdotes-browser",a:"\ud83d\udcd6",description:"Browse the Anecdotes of Oyasama in English and Japanese.",b:"Tenrikyo"},{title:"Ofudesaki Browser",name:"ofudesaki-browser",url:"https://lewdev.github.io/ofudesaki-browser/",a:"\ud83d\udcd5",description:"Browse and search a Tenrikyo scripture, the Ofudesaki.",b:"Tenrikyo"},{title:"Narimono App (prototype)",name:"narimono",a:"\ud83c\udfb6",url:"https://lewdev.github.io/apps/narimono-prototype/",description:"A sound-board app of the instruments used in the Tenrikyo service. An unfinished project that was going to be a rhythm game.",
b:"Tenrikyo"},{title:"Kanrodai App",name:"kanrodai-app",a:"\ud83d\uddfa️",description:"Shows the location of the Kanrodai, a sacred location, relative to your location on a map.",b:"Tenrikyo"},{title:"Rock Paper Scissors Battle",name:"rock-paper-scissors-battle",a:"✂️",description:"Watch a simulation of emoji Rock, Paper, Scissors and other variations battle it out.",b:"Simulations"},{title:"Squid Game Level 5",name:"squid-game-lvl5",a:"\ud83e\udd91",description:"A JavaScript canvas simulation of Squid Game level 5 using emojis.",
b:"Simulations"}];window.main=function(){function k(){var a=window.localStorage.getItem("lewis-nakao-site");a&&JSON.parse(a)}function l(a){var c=['<div class="card card-body p-0"><table class="table no-top-border mb-0"><tbody>'];a.forEach(function(b){var d=b.name?"https://github.com/lewdev/"+b.name:!1;c.push('\n      <tr>\n        <td>\n          <a href="'+(b.url?b.url:b.name?"https://lewdev.github.io/apps/"+b.name+"/":!1)+'" target="_blank" title="Try '+b.title+' now!">'+b.a+" "+b.title+'</a>\n          <div class="text-secondary">'+
b.description+'</div>\n        </td>\n        <td class="text-center">\n          '+(d?'<a href="'+d+'" target="_blank">\ud83d\udc68‍\ud83d\udcbb️ Source Code</a>':"-")+"\n        </td>\n      </tr>\n    ")});c.push("</tbody></table></div>");return c.join("")}function m(a){return l(h.filter(function(c){return c.b===a&&!c.hidden}))}function n(){var a=[];e.map(function(c){a.push('<h2 class="mt-3">'+c.a+" "+c.name+"</h2>");a.push(m(c.name))});p.innerHTML=a.join("")}var p=document.getElementById("projects"),
f=document.getElementById("navbar"),q=document.getElementById("navbarToggleBtn"),g=document.getElementById("sitemap");window.onload=function(){function a(c,b){function d(r){c!==r&&(b(),document.removeEventListener("click",d))}document.addEventListener("click",d)}k();n();q.onclick=function(c){function b(){return f.classList.toggle("show")}f.classList.contains("show")||(b(),a(c,b))}};return{showSitemap:function(){g.style.display="block";g.innerHTML='\n<textarea><?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n<url><loc>https://lewdev.github.io/</loc></url>\n'+
h.map(function(a){return(a=a.url?a.url:a.name?"https://lewdev.github.io/apps/"+a.name+"/":!1)?"<url><loc>"+a+"</loc></url>":""}).join("\n")+'\n</urlset></textarea>\n<button class="btn btn-primary" onclick="this.parentNode.style.display=\'none\'">❌ Close</button>';return!1}}}();
