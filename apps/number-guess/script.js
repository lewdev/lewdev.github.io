var B=function(){function p(a){return 10>a?"0"+a:a}var u="January February March April May June July August September October November December".split(" "),b="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");return{format:function(a,c){c||(c="M/d/yyyy");var q=a.getDate(),r=a.getMonth(),z=a.getFullYear(),h=a.getHours(),v=a.getMinutes(),t=a.getSeconds(),w=a.getMilliseconds(),A=h%12,x=p(A),E=p(h),k=p(v),y=p(t),D=12>h?"AM":"PM";a=b[a.getDay()];var e=a.substr(0,3),d=p(q),f=r+1,g=p(f);
r=u[r];var m=r.substr(0,3);z+="";var l=z.substr(2,2);c=c.replace("hh",x).replace("h",A).replace("HH",E).replace("H",h).replace("mm",k).replace("m",v).replace("ss",y).replace("s",t).replace("S",w).replace("dd",d).replace("d",q).replace("EEEE",a).replace("EEE",e).replace("yyyy",z).replace("yy",l).replace("aaa",D);return c=-1<c.indexOf("MMM")?c.replace("MMMM",r).replace("MMM",m):c.replace("MM",g).replace("M",f)}}}();var F=function(){function p(b,a){if(b=document.createElement(b)){try{var c=a instanceof HTMLElement}catch(q){c="object"===typeof a&&1===a.nodeType&&"object"===typeof a.style&&"object"===typeof a.ownerDocument}c?b.appendChild(a):b.innerHTML=a?a:""}return b}function u(b,a){if(b){if("function"===typeof Event)var c=new Event(a);else c=document.createEvent("Event"),c.initEvent(a,!0,!0);b.dispatchEvent(c)}}return{C:function(b,a,c,q){if(b&&(b=b.querySelectorAll("."+a),c=(c=c[a])?c:"",b)){var r,z=b.length;
for(r=0;r<z;r++){var h=b[r];if("I"===h.tagName)h.className=a+" "+("TRUE"===c?"far fa-check-square":"far fa-square");else if("INPUT"===h.tagName||"TEXTAREA"===h.tagName)"checkbox"===h.getAttribute("type")?h.checked="TRUE"===c:h.value=c;else if("SELECT"===h.tagName){var v=h.querySelectorAll("option"),t,w=v.length,A=-1;for(t=0;t<w;t++)if(c===v[t].value){v[t].selected=!0;A=t;break}h.value=c;h.selectedIndex=A;u(h,"change")}else c&&""!==(c+"").trim()?c=c.replace(/\n/g,"<br/>").replace(/\s\s/g,"&nbsp;"):
c=q?"":"N/A",h.innerHTML=c}}},l:p,v:function(b){return'<a href="mailto:'+b+'">'+b+"</a>"},A:function(b){var a=document.location.href.split("?");if(a=1<a.length?a[1]:!1){a=a.split("&");for(var c=0;c<a.length;c++){var q=a[c];if(0===q.indexOf(b+"="))return q.split("=")[1].replace(/%20/g," ")}}return!1},F:function(b){window.history.pushState({B:b},b,document.location.href.split("?")[0]+(b?"?"+b:""));return!1},f:function(b,a){for(var c=0;c<b.length;c++)a.push(b[c])},m:function(b,a){return['<a href="',
b,'">',a,"</a>"].join("")},o:function(b,a,c){return['<a title="',c,'" href="',b,'">',a,"</a>"].join("")},s:function(b,a,c,q){return['<a title="',c,'" href="',b,'" target="',q,'">',a,"</a>"].join("")},h:u,u:function(){var b=p("div",'<i class="fas fa-angle-double-up"></i>'),a=p("div",b);a.title="Scroll to top";a.className="scrollToTop";a.id="scrollToTop";a.onclick=function(){window.scrollTo(0,0)};window.addEventListener("scroll",function(){a.style.display=200<window.pageYOffset?"block":"none"});return a},
j:function(b){document.getElementById(b)?console.log("Modal already exists: "+b):document.body.appendChild(document.createTextNode(['<div class="modal-window" id="',b,'" role="dialog">\n<div>\n<a href="#" title="Close" class="modal-close">&#10006;</a>\n<div class="modal-body">\n</div>\n</div>\n</div>'].join("")))},offsetY:function(b){return b?!1:0},G:function(b){return b.trim().replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")},D:function(b){return b.replace(/&lt;/g,
"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&apos;/g,"'")},w:function(b,a,c){(b=b.querySelector("."+a))?"checkbox"===b.getAttribute("type")?c[a]=b.checked?"TRUE":"FALSE":c[a]=b.value:c[a]=""}}}();(function(){function p(){var d=document.querySelectorAll(".startBtn"),f=document.querySelectorAll(".gotoStartScreenBtn");if(d){var g,m=d.length;for(g=0;g<m;g++)d[g].onclick=a}if(f)for(g=f.length,d=0;d<g;d++)f[d].onclick=b;A.onclick=function(){c()};w.onkeyup=function(n){13===n.keyCode&&(n.preventDefault(),c());this.value=this.value.replace(/\D/g,"")};f=[];for(var l in y)F.f(['<option value="',l,'">',l," (",y[l][0],"-",y[l][1],")</option>"],f);x.innerHTML=f.join("");x.onchange=function(){e.selectedDifficulty=
x.value;u()};x.value=e.selectedDifficulty;F.h(x,"change")}function u(){w.focus();var d=e.currentView===k.c,f=e.currentView===k.b,g=e.currentView===k.g;z.style.display=e.currentView===k.a?"":"none";h.style.display=d?"":"none";v.style.display=f?"":"none";t.style.display=g?"":"none";g=null;switch(e.currentView){case k.a:g=z;break;case k.c:g=h;break;case k.b:g=v;break;case k.g:g=t}if(!g)console.error("currentView value NOT FOUND.");else if(e.currentGame){var m="",l=e.currentGame.number,n=e.currentGame.guessedNumber;
n&&(n<l?m+="Your guess: "+n+" was too low!":n>l?m+="Your guess: "+n+" was too high!":n===l&&(m+="Your guess: "+n+" was CORRECT!"));E.innerHTML=m;if(d||f)d=e.currentGame.guesses,g.querySelector(".prevGuesses").innerHTML=d&&0<d.length?"<strong>Previous Guesses:</strong> "+d.join(", ")+" ("+d.length+")":"",f=g.querySelector(".timeMs"),d=g.querySelector(".difficulty"),f&&(f.innerHTML="<strong>Time:</strong> "+e.currentGame.timeMs/1E3+" second(s)"),d&&(f=e.currentGame.difficulty,d.innerHTML="<strong>Difficulty:</strong> "+
f+" ("+y[f][0]+"-"+y[f][1]+') <i class="'+D[f]+'"></i>');r(g)}}function b(){e.currentView=k.a;x.value=e.selectedDifficulty;F.h(x,"change");u()}function a(){var d=e.selectedDifficulty;w.value="";e.currentView=k.c;var f=y[d][0];e.currentGame={number:Math.floor(Math.random()*Math.abs(y[d][1]-f))+f,guessedNumber:null,difficulty:d,guesses:[],startDate:new Date,timeMs:0};u()}function c(){var d=w.value;d?(e.currentGame.guessedNumber=parseInt(d,10),e.currentGame.guesses.push(e.currentGame.guessedNumber)):
e.currentGame.guessedNumber=null;w.focus();e.currentGame.guessedNumber===e.currentGame.number?q():u()}function q(){e.currentView=k.b;e.currentGame.timeMs=(new Date).getTime()-e.currentGame.startDate.getTime();e.history.push(e.currentGame);e.history.sort(function(d,f){return(new Date(f.i)).getTime()-(new Date(d.i)).getTime()});window.localStorage.setItem("number-guessing-game",JSON.stringify(e));u()}function r(d){if(d=d.querySelector(".playerHistory")){var f=e.selectedDifficulty,g=e.history.filter(function(G){return G.difficulty===
f}),m=[],l,n=g.length;F.f('<table class="table"><thead>;<th>Date</th>;<th>Difficulty</th>;<th>Guesses</th>;<th>Time</th>;</thead><tbody>'.split(";"),m);if(0<n)for(l=0;l<n;l++){var C=g[l];F.f(["<tr>","<td>",B.format(new Date(C.startDate),"M/dd/yyyy HH:mm"),"</td>","<td>",' <i class="'+D[C.difficulty]+'"></i></td>','<td><div title="',C.guesses.join(", "),'">',C.guesses.length,"</div></td>","<td>",C.timeMs/1E3,"s</td>","</tr>"],m)}else m.push('<tr><td colspan="4">No records found.</td></tr>');m.push("</tbody></table>");
d.innerHTML=m.join("")}}var z=document.getElementById("startScreen"),h=document.getElementById("gameScreen"),v=document.getElementById("endScreen"),t=document.getElementById("historyScreen"),w=document.getElementById("numberInput"),A=document.getElementById("guessBtn"),x=document.getElementById("difficultySelect"),E=document.getElementById("lastGuessResponse"),k={a:1,c:2,b:3,g:4},y={Easy:[1,10],Medium:[1,100],Hard:[1,1E3],Insane:[1,1E4],Nightmare:[1,1E6]},D={Easy:"far fa-laugh-beam",Medium:"far fa-smile",
Hard:"far fa-grin-beam-sweat",Insane:"far fa-grin-squint-tears",Nightmare:"fas fa-poo"},e={currentView:k.a,selectedDifficulty:"Easy",currentGame:null,history:[]};window.onload=function(){var d=window.localStorage.getItem("number-guessing-game");d&&(d=JSON.parse(d))&&(e=d);e.currentView=k.a;p();u()}})();
