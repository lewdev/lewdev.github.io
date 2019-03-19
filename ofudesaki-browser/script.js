var f=["verse","group","search"],h=f.indexOf("verse"),l=f.indexOf("group"),m=f.indexOf("search"),n=document.getElementById("verseDisplay"),p=document.getElementById("partSelect"),q=document.getElementById("verseSelect"),r=document.getElementById("verseGroupSelect"),t=document.getElementById("verseNavTop"),u=document.getElementById("verseNavBottom"),v=t.cloneNode(!0),w=document.querySelector(".verse-options"),x=document.getElementById("searchTxt"),y=document.getElementById("searchBtn"),z=document.getElementById("searchResults"),
A=document.getElementById("groupView"),B={view:0,selectedPart:1,selectedVerse:1,selectedVerseGroup:"1:1-20",searchStr:"",verseOptions:{showRomanized:!0,showJapanese:!0,showEnglish:!0,showKanji:!0,showEnglish2:!1},groupOptions:{showRomanized:!0,showJapanese:!0,showEnglish:!1,showKanji:!1,showEnglish2:!1},searchOptions:{showRomanized:!1,showJapanese:!0,showEnglish:!0,showKanji:!1,showEnglish2:!1},isDataLoaded:!1},D=null,E=null;
function F(){p.onchange=function(){G(parseInt(p.value,10))};q.onchange=function(){H(parseInt(q.value,10))};r.onchange=function(){I(r.value)};I(B.selectedVerseGroup);G(B.selectedPart);H(B.selectedVerse);J(B.view);x.onkeyup=function(a){13===a.keyCode&&K()};x.value=B.searchStr;y.onclick=function(){K()}}function K(){B.searchStr=x.value.trim();L()}function M(){B.view===h?N():B.view===l?O():B.view===m&&L()}function G(a){B.selectedPart=a;p.value=B.selectedPart;B.selectedVerse=1;P(a);N()}
function H(a){B.selectedVerse=a;q.value=B.selectedVerse;N()}function I(a){B.selectedVerseGroup=a;r.value=B.selectedVerseGroup;O()}function Q(a){var b=D.verses.length;return 0>=a?D.verses[b-1]:a>b?D.verses[0]:D.verses[a-1]}function R(a,b){for(var c=D.verses.length,d=0;d<c;d++){var e=D.verses[d];if(e.part===a&&e.verse===b)return e}return null}
function J(a){f.map(function(a){var b=document.getElementById(a+"View");b&&(b.style.display="none");a=document.querySelectorAll("."+a+"-view");for(b=0;b<a.length;b++)a[b].style.display="none"});var b=f[a];document.getElementById(b+"View").style.display="block";b=document.querySelectorAll("."+b+"-view");for(var c=0;c<b.length;c++)b[c].style.display="table-row";a=a===m;t.style.display=a?"none":"block";u.style.display=a?"none":"block";M()}
function N(){var a=B.selectedPart,b=B.selectedVerse;(E=R(a,b))?(S(),n.innerHTML=T(E,"verse",null)):n.innerHTML="Verse "+a+":"+b+" not found!"}
function O(){var a=B.selectedVerseGroup.split(":"),b=parseInt(a[0],10);a=a[1];var c=a.split("-"),d=parseInt(c[1],10),e=[];for(c=parseInt(c[0],10);c<=d;c++)e.push(T(R(b,c),"group",null));A.innerHTML=e.join("");var g="",k="";d=D.verseGroups[b-1];e=d.groups.length;for(c=0;c<e;c++)a===d.groups[c]&&(0<c?g=b+":"+d.groups[c-1]:1===b?(g=D.verseGroups[16].groups,g="17:"+g[g.length-1]):(g=b-1,k=D.verseGroups[g-1].groups,g=g+":"+k[k.length-1]),k=c<e-1?b+":"+d.groups[c+1]:17===b?"1:"+D.verseGroups[0].groups[0]:
b+1+":"+D.verseGroups[b].groups[0]);console.log("prevVerseGroupStr="+g+", nextVerseGroupStr="+k);U(g,k)}function L(){var a=B.searchStr;if(a){for(var b=0,c=[],d=D.verses.length,e=0;e<d;e++){var g=D.verses[e];(g.ro+g.en_6th_ed+g.jp1+g.jp2+g.kanji).match(new RegExp(a,"i"))&&(b++,c.push(T(g,"search",a)))}c.unshift('<p>Search "'+a+'" yields '+b+" results.</p>");z.innerHTML=c.join("")}else z.innerHTML="<p>Enter a search term.</p>"}
function V(){var a=[];D.verseGroups.map(function(b){var c=b.part;a.push('<option value="" disabled="true">- Part '+c+" -</option>");b.groups.map(function(b){b=c+":"+b;a.push('<option value="'+b+'">'+b+"</option>")})});r.innerHTML=a.join("")}function U(a,b){function c(){B.selectedVerseGroup=b;O()}function d(){B.selectedVerseGroup=a;O()}W(t,B.selectedVerseGroup,d,c);W(u,B.selectedVerseGroup,d,c)}
function S(){function a(){G(e.part);H(e.verse)}function b(){G(d.part);H(d.verse)}var c="Verse "+E.part+":"+E.verse,d=Q(E.id-1),e=Q(E.id+1);W(t,c,b,a);W(u,c,b,a)}function W(a,b,c,d){a.innerHTML=v.innerHTML;var e=a.getElementsByClassName("verse-nav-next-btn")[0],g=a.getElementsByClassName("verse-nav-middle")[0];a.getElementsByClassName("verse-nav-prev-btn")[0].onclick=c;e.onclick=d;g.innerHTML=b}
function T(a,b,c){c=c||!1;if(a){var d=a.part+":"+a.verse,e=new RegExp(c,"i"),g='<span class="highlight">'+c+"</span>";c=a.ro.split(/\s{2,}/g).join("<br/>").replace(e,g);var k=a.kanji.split(/\s{2,}/g).join("<br/>").replace(e,g),C=a.en_6th_ed.replace(e,g);e=(a.jp1+"<br/>"+a.jp2).replace(e,g);return'<div class="verse-display">'+(B[b+"Options"].showRomanized?"<blockquote>"+c+"</blockquote>":"")+(B[b+"Options"].showJapanese?"<blockquote>"+e+"</blockquote>":"")+(B[b+"Options"].showEnglish?"<blockquote>"+
C+"</blockquote>":"")+(B[b+"Options"].showKanji?"<blockquote>"+k+"</blockquote>":"")+'<table class="full-width"><tbody><tr><td>In Life of Oyasama?: '+(a.in_life_of_oyasama?"&#9989;":"&#10060;")+"In Doctrine?: "+(a.in_doctrine?"&#9989;":"&#10060;")+"</td><td>"+d+"</td></tr></tbody></table></div>"}return"Verse not found."}
function X(){f.map(function(a){var b=w.cloneNode(!0);b.className=b.className.replace("verse-view",a+"-view");for(var c=b.querySelectorAll("input"),d=b.querySelectorAll("label"),e={},g=0;g<c.length;e={a:e.a},g++){var k=c[g],C=k.id.replace("-verse","-"+a);e.a=k.id.replace("-verse","").replace("show","").replace("Cbx","");k.id=C;k.onchange=function(b){return function(){var c=b.a,d=document.getElementById("show"+c+"Cbx-"+a);if(d){var e=B[a+"Options"]["show"+c];"undefined"!==e&&(B[a+"Options"]["show"+
c]=!e,d.checked=!e)}M()}}(e);k.checked=B[a+"Options"]["show"+e.a]}for(c=0;c<d.length;c++)d[c].htmlFor=d[c].htmlFor.replace("-verse","-"+a);d=document.createElement("td");d.colSpan="2";d.appendChild(b);b=document.getElementById(a+"OptionsRow");b.innerHTML="";b.appendChild(d);document.getElementById(a+"ViewMenuItem").onclick=function(){var b=f.indexOf(a);B.view=b;J(b);console.log("view selected index="+b+", viewName="+a)}})}
function P(a){var b=[];D.verses.map(function(c){c.part===parseInt(a,10)&&(c=c.verse,b.push('<option value="'+c+'">'+c+"</option>"))});q.innerHTML=b.join("")}window.onload=function(){var a=window.localStorage.getItem("ofudesaki-browser");a&&(a=JSON.parse(a))&&(B=a,B.isDataLoaded=!0);Y();X()};window.addEventListener("unload",function(){B.isDataLoaded&&window.localStorage.setItem("ofudesaki-browser",JSON.stringify(B))});
function Y(){fetch("ofudesaki.json").then(function(a){return a.json()}).then(function(a){(D=a)||alert('"ofudesaki.json" not loaded');a=[];for(var b=1;18>=b;b++)a.push('<option value="'+b+'">'+b+"</option>");p.innerHTML=a.join("");V();F()})}function Z(a){for(var b=a.className.split(/\s+/),c=b.length,d=0;d<c;d++)if("active"===b[d]){b.splice(d,1);break}c===b.length&&b.push("active");a.className=b.join(" ")}
(function(a,b){var c=b.getElementById("layout"),d=b.getElementById("menu"),e=b.getElementById("menuLink");a=b.getElementById("main");e.onclick=function(a){a.preventDefault();Z(c);Z(d);Z(e)};a.onclick=function(a){-1!==d.className.indexOf("active")&&(a.preventDefault(),Z(c),Z(d),Z(e))}})(window,window.document);