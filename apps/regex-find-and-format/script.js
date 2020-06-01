var d="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},k="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this;function l(a,b){if(b){var c=k;a=a.split(".");for(var e=0;e<a.length-1;e++){var f=a[e];f in c||(c[f]={});c=c[f]}a=a[a.length-1];e=c[a];b=b(e);b!=e&&null!=b&&d(c,a,{configurable:!0,writable:!0,value:b})}}
l("Object.is",function(a){return a?a:function(a,c){return a===c?0!==a||1/a===1/c:a!==a&&c!==c}});l("Array.prototype.includes",function(a){return a?a:function(a,c){var b=this;b instanceof String&&(b=String(b));var f=b.length;c=c||0;for(0>c&&(c=Math.max(c+f,0));c<f;c++){var g=b[c];if(g===a||Object.is(g,a))return!0}return!1}});
l("String.prototype.includes",function(a){return a?a:function(a,c){if(null==this)throw new TypeError("The 'this' value for String.prototype.includes must not be null or undefined");if(a instanceof RegExp)throw new TypeError("First argument to String.prototype.includes must not be a regular expression");return-1!==this.indexOf(a,c||0)}});
var m=document.getElementById("regexStr"),n=document.getElementById("text-body"),p=document.getElementById("format-text"),q=document.getElementById("output"),r=document.getElementById("formattedOutput"),t=document.getElementById("regexStrHist"),v=document.getElementById("showFormatDisplayCbx"),w=document.getElementById("clearBtn"),x=document.getElementById("findBtn"),y=document.getElementById("formatBtn"),z=document.getElementById("removeDuplicatesBtn"),A=document.getElementById("sortResultsBtn"),
B=new Audio("../public/app_alert-complete.mp3"),C=new Audio("../public/app_alert-error.mp3"),D={regexStr:"",regexStrHist:['<a href="([\\w/_-]+)"[\\w\\s/_="-]+title="([\\w\\s/_=-]+)">([\\w\\s]+)</a>','[a-z0-9_-]{3,16}','[a-z0-9_-]{6,18}','#?([a-f0-9]{6}|[a-f0-9]{3})','[a-z0-9-]+','([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})','(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?','(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)','^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$'],textBody:"<ul><li><a href=\"/wiki/Abstract_data_type\" title=\"Abstract data type\">Abstract data type</a></li>\n<li><a href=\"/wiki/Concurrent_data_structure\" title=\"Concurrent data structure\">Concurrent data structure</a></li>\n<li><a href=\"/wiki/Data_model\" title=\"Data model\">Data model</a></li>\n<li><a href=\"/wiki/Dynamization\" title=\"Dynamization\">Dynamization</a></li>\n<li><a href=\"/wiki/Linked_data_structure\" title=\"Linked data structure\">Linked data structure</a></li>\n<li><a href=\"/wiki/List_of_data_structures\" title=\"List of data structures\">List of data structures</a></li>\n<li><a href=\"/wiki/Persistent_data_structure\" title=\"Persistent data structure\">Persistent data structure</a></li>\n<li><a href=\"/wiki/Plain_old_data_structure\" class=\"mw-redirect\" title=\"Plain old data structure\">Plain old data structure</a></li>\n<li><a href=\"/wiki/Succinct_data_structure\" title=\"Succinct data structure\">Succinct data structure</a></li></ul>\n",formatResults:"{result}\n",results:[],soundFxOn:!0};
window.onload=function(){E();F();document.getElementById("regexStr").onkeypress=function(){var a=window.event;13===(a.charCode||a.keyCode)&&G()};t.onchange=function(){m.value=t.value};w.onclick=function(){D.regexStrHist&&(D.regexStrHist=[],t.innerHTML="",H(),F())};x.onclick=function(){G()};y.onclick=function(){var a=p.value;if(D.results&&a){for(var b=D.results.length,c="",e=0;e<b;e++){for(var f=D.results[e].length,g=a+"",h=0;h<f;h++)g=g.replace(new RegExp("{result"+(h?h:"")+"}","g"),D.results[e][h]);
c+=g}r.innerHTML="<strong>Formatted Results ("+b+'):</strong><textarea rows="10" class="full-width">'+c+"</textarea>"}H();v.checked=!0};z.onclick=function(){var a=[],b=[];if(D.results){for(var c=D.results.length,e=0;e<c;e++){var f=D.results[e][0];a.includes(f)||(a.push(f),b.push(D.results[e]))}D.results=b;H();F()}};A.onclick=function(){D.results=D.results.sort();F()}};
function G(){if(q&&m&&n){var a=m.value,b=null;if(a){try{b=new RegExp(a,"i")}catch(u){console.log(u);q.innerHTML=(u+u.stack).replace(/\n/g,"<br/>");I(C);return}if(D.regexStrHist.includes(a))for(var c=0;c<D.regexStrHist.length;c++)D.regexStrHist[c]===a&&D.regexStrHist.splice(c,1);D.regexStrHist.unshift(a);D.textBody=n.value;c=D.textBody.length;for(var e=[],f,g=0,h=!1;!h;)g>=c?h=!0:(f=D.textBody.substr(g),(f=f.match(b))?(e.push(f),g=f.index+g+f[0].length):h=!0);0<e.length?(D.regexStr=a,D.results=e,J(!0),
I(B),H(),F()):(J(!1),I(C),q.innerHTML="Nothing found")}}}function J(a){for(var b=document.querySelectorAll(".result-btn"),c=b.length,e=0;e<c;e++)b[e].style.display=a?"block":"none"}function E(){var a=window.localStorage.getItem("regex-text-finder");a&&(a=JSON.parse(a))&&(D=a)}
function F(){if(D){var a=D.regexStrHist?D.regexStrHist.length:0;if(0<a){var b=D.regexStrHist[0];m.value=b;t.value=b;t.innerHTML="";for(b=0;b<a;b++){var c=D.regexStrHist[b];t.innerHTML+='<option value="'+c.replace(/"/g,"&quot;")+'">'+K(c)+"</option>"}}n.value=D.textBody;p.value=D.formatResults;if(D.results){a=D.results.length;0<a&&J(!0);b=[];b.push("<strong>Results (");b.push(a);b.push("):</strong> <ol>");for(c=0;c<a;c++){b.push("<li>");b.push(K(D.results[c][0]));b.push("</li>");b.push("<ol>");for(var e=
D.results[c].length,f=1;f<e;f++)b.push("<li>"),b.push(K(D.results[c][f])),b.push("</li>");b.push("</ol>")}b.push("</ol>");q.innerHTML=b.join("")}}}function I(a){D.soundFxOn&&(a.pause(),a.currentTime=0,a.play())}function H(){D.formatResults=p.value;window.localStorage.setItem("regex-text-finder",JSON.stringify(D))}function K(a){return a?a.replace(/[\u00A0-\u9999<>&]/gim,function(a){return"&#"+a.charCodeAt(0)+";"}):""};