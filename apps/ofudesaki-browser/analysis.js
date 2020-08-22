var g="function"==typeof Object.defineProperties?Object.defineProperty:function(b,a,c){b!=Array.prototype&&b!=Object.prototype&&(b[a]=c.value)},k="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this;function l(b,a){if(a){var c=k;b=b.split(".");for(var d=0;d<b.length-1;d++){var e=b[d];e in c||(c[e]={});c=c[e]}b=b[b.length-1];d=c[b];a=a(d);a!=d&&null!=a&&g(c,b,{configurable:!0,writable:!0,value:a})}}
l("Object.is",function(b){return b?b:function(a,c){return a===c?0!==a||1/a===1/c:a!==a&&c!==c}});l("Array.prototype.includes",function(b){return b?b:function(a,c){var d=this;d instanceof String&&(d=String(d));var e=d.length;c=c||0;for(0>c&&(c=Math.max(c+e,0));c<e;c++){var f=d[c];if(f===a||Object.is(f,a))return!0}return!1}});
l("String.prototype.includes",function(b){return b?b:function(a,c){if(null==this)throw new TypeError("The 'this' value for String.prototype.includes must not be null or undefined");if(a instanceof RegExp)throw new TypeError("First argument to String.prototype.includes must not be a regular expression");return-1!==this.indexOf(a,c||0)}});
var m=document.getElementById("wordView"),p=document.getElementById("roWordView"),q=document.getElementById("keyword"),r=document.getElementById("verseList"),t=document.getElementById("verseDisplay"),u=document.getElementById("englishViewBtn"),v=document.getElementById("englishCountViewBtn"),w=document.getElementById("romanizedViewBtn"),x=document.getElementById("romanizedCountViewBtn"),y={},z={},A=null,B={selectedView:"word",selectedWordStr:"",selectedPartVerse:"",wordSortBy:"count",selectedRoWordStr:"",
selectedRoPartVerse:"",roWordSortBy:"count",isDataLoaded:!1};window.onload=function(){C();D()};function D(){u.onclick=function(){B.selectedView="word";B.wordSortBy="A-Z";E()};v.onclick=function(){B.selectedView="word";B.wordSortBy="count";E()};w.onclick=function(){B.selectedView="roWord";B.roWordSortBy="A-Z";E()};x.onclick=function(){B.selectedView="roWord";B.roWordSortBy="count";E()}}
function F(b,a){A.verses.map(function(c){var d=c.part+":"+c.verse;c=c[b].replace(/[^\w\s']/g,"").toLowerCase().split(/\s+/g);for(var e=c.length,f=0;f<e;f++)f<e-2&&c.push(c[f]+" "+c[f+1]);c.map(function(h){h&&(a[h]?(a[h].count++,h=a[h].verses,h.includes(d)||h.push(d)):a[h]={count:1,verses:[d]})})});Object.keys(a).map(function(c){1===a[c].count&&delete a[c]})}function E(){m.style.display="none";p.style.display="none";"word"===B.selectedView?G("word",y):"roWord"===B.selectedView&&G("roWord",z)}
function G(b,a){var c=document.getElementById(b+"View"),d=B[b+"SortBy"],e=Object.keys(a),f=[];c.style.display="block";c.innerHTML="";("count"===d?e.sort(function(h,n){return a[n].count-a[h].count}):e.sort()).map(function(h){f.push("<a href='#verse' class='word'>"+h+" ("+a[h].count+")</a>")});c.innerHTML=f.length+" "+("word"===b?"English":"Romanized")+" words and word-pairs found (Sorted by "+d+").<br/>"+f.join("");b=c.querySelectorAll(".word");c=b.length;d={};for(e=0;e<c;d={a:d.a},e++)d.a=b[e],d.a.onclick=
function(h){return function(){var n=h.a.innerHTML;H(n.substr(0,n.lastIndexOf(" ")),a)}}(d)}
function H(b,a){console.log(b);if(b){B.selectedWordStr=b;var c=a[b].count;q.innerHTML="<strong>Keyword:</strong> "+b;r.innerHTML="<strong>Found in "+c+" verses:</strong> <a href='#verse' class='verse-link'>"+a[b].verses.join("</a>, <a href='#verse' class='verse-link'>")+"</a>";a=r.querySelectorAll(".verse-link");c=a.length;for(var d={},e=0;e<c;d={b:d.b},e++){var f=a[e];d.b=f.innerHTML;f.onclick=function(h){return function(){I(h.b,b)}}(d)}I(a[0].innerHTML,b)}}
function I(b,a){B.selectedPartVerse=b;a:{if(b){var c=b.split(":");var d=parseInt(c[0],10);c=parseInt(c[1],10);for(var e=A.verses.length,f=0;f<e;f++){var h=A.verses[f];if(d===h.part&&c===h.verse){d=h;break a}}}d=null}d&&(c=J(d.ro.split(/\s{2,}/g).join("<br/>"),a),e=d.jp1+"<br/>"+d.jp2,a=J(d.en_6th_ed,a),t.innerHTML="<blockquote>"+c+"</blockquote><blockquote>"+e+"</blockquote><blockquote>"+a+"</blockquote><blockquote>"+d.kanji.split(/\s{2,}/g).join("<br/>")+"</blockquote>In Life of Oyasama?: "+(d.in_life_of_oyasama?
"&#9989;":"&#10060;")+"In Doctrine?: "+(d.in_doctrine?"&#9989;":"&#10060;")+"<span style='float: right;'>"+b+"</span>")}function J(b,a){if(!a)return b;a=new RegExp(a,"i");var c='<span class="highlight">'+b.match(a)+"</span>";return b.replace(a,c)}
function C(){fetch("ofudesaki.json").then(function(b){return b.json()}).then(function(b){(A=b)?((b=window.localStorage.getItem("ofudesaki-analysis"))&&(b=JSON.parse(b))&&(B=b),F("en_6th_ed",y),F("ro",z),H(B.selectedWordStr,y),I(B.selectedPartVerse,B.selectedWordStr),H(B.selectedRoWordStr,z),I(B.selectedRoPartVerse,B.selectedRoWordStr),B.isDataLoaded=!0,E()):alert("data not loaded")})}window.onunload=function(){B.isDataLoaded&&window.localStorage.setItem("ofudesaki-analysis",JSON.stringify(B))};
function K(b){for(var a=b.className.split(/\s+/),c=a.length,d=0;d<c;d++)if("active"===a[d]){a.splice(d,1);break}c===a.length&&a.push("active");b.className=a.join(" ")}(function(b,a){var c=a.getElementById("layout"),d=a.getElementById("menu"),e=a.getElementById("menuLink");b=a.getElementById("main");e.onclick=function(f){f.preventDefault();K(c);K(d);K(e)};b.onclick=function(f){-1!==d.className.indexOf("active")&&(f.preventDefault(),K(c),K(d),K(e))}})(window,window.document);
