var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.createTemplateTagFirstArg=function(b){return b.raw=b};$jscomp.createTemplateTagFirstArgWithRaw=function(b,e){b.raw=e;return b};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.ISOLATE_POLYFILLS=!1;$jscomp.FORCE_POLYFILL_PROMISE=!1;$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(b,e,f){if(b==Array.prototype||b==Object.prototype)return b;b[e]=f.value;return b};$jscomp.getGlobal=function(b){b=["object"==typeof globalThis&&globalThis,b,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var e=0;e<b.length;++e){var f=b[e];if(f&&f.Math==Math)return f}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;$jscomp.polyfills={};$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";var $jscomp$lookupPolyfilledValue=function(b,e){var f=$jscomp.propertyToPolyfillSymbol[e];if(null==f)return b[e];f=b[f];return void 0!==f?f:b[e]};
$jscomp.polyfill=function(b,e,f,h){e&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(b,e,f,h):$jscomp.polyfillUnisolated(b,e,f,h))};$jscomp.polyfillUnisolated=function(b,e,f,h){f=$jscomp.global;b=b.split(".");for(h=0;h<b.length-1;h++){var m=b[h];if(!(m in f))return;f=f[m]}b=b[b.length-1];h=f[b];e=e(h);e!=h&&null!=e&&$jscomp.defineProperty(f,b,{configurable:!0,writable:!0,value:e})};
$jscomp.polyfillIsolated=function(b,e,f,h){var m=b.split(".");b=1===m.length;h=m[0];h=!b&&h in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var p=0;p<m.length-1;p++){var q=m[p];if(!(q in h))return;h=h[q]}m=m[m.length-1];f=$jscomp.IS_SYMBOL_NATIVE&&"es6"===f?h[m]:null;e=e(f);null!=e&&(b?$jscomp.defineProperty($jscomp.polyfills,m,{configurable:!0,writable:!0,value:e}):e!==f&&(void 0===$jscomp.propertyToPolyfillSymbol[m]&&(f=1E9*Math.random()>>>0,$jscomp.propertyToPolyfillSymbol[m]=$jscomp.IS_SYMBOL_NATIVE?
$jscomp.global.Symbol(m):$jscomp.POLYFILL_PREFIX+f+"$"+m),$jscomp.defineProperty(h,$jscomp.propertyToPolyfillSymbol[m],{configurable:!0,writable:!0,value:e})))};$jscomp.polyfill("Array.prototype.fill",function(b){return b?b:function(e,f,h){var m=this.length||0;0>f&&(f=Math.max(0,m+f));if(null==h||h>m)h=m;h=Number(h);0>h&&(h=Math.max(0,m+h));for(f=Number(f||0);f<h;f++)this[f]=e;return this}},"es6","es3");$jscomp.typedArrayFill=function(b){return b?b:Array.prototype.fill};
$jscomp.polyfill("Int8Array.prototype.fill",$jscomp.typedArrayFill,"es6","es5");$jscomp.polyfill("Uint8Array.prototype.fill",$jscomp.typedArrayFill,"es6","es5");$jscomp.polyfill("Uint8ClampedArray.prototype.fill",$jscomp.typedArrayFill,"es6","es5");$jscomp.polyfill("Int16Array.prototype.fill",$jscomp.typedArrayFill,"es6","es5");$jscomp.polyfill("Uint16Array.prototype.fill",$jscomp.typedArrayFill,"es6","es5");$jscomp.polyfill("Int32Array.prototype.fill",$jscomp.typedArrayFill,"es6","es5");
$jscomp.polyfill("Uint32Array.prototype.fill",$jscomp.typedArrayFill,"es6","es5");$jscomp.polyfill("Float32Array.prototype.fill",$jscomp.typedArrayFill,"es6","es5");$jscomp.polyfill("Float64Array.prototype.fill",$jscomp.typedArrayFill,"es6","es5");var d=document,o=document.getElementById("o"),c="⬛⬜\ud83d\udfe5\ud83d\udfe6\ud83d\udfe8\ud83d\udfe9\ud83d\udfe7\ud83d\udfea\ud83d\udfeb".split(/.*?/u),s=c[0],g=[],MAX_S=16,MIN_S=5,S=9,BRUSH=1,FILL=2,T=BRUSH,a=function(b,e){return Array(b).fill(e)};
n=function(b){g=a(S).map(function(e){return a(S,s)});r()};l=function(b){s=b;r()};k=function(b){T=T==BRUSH?FILL:BRUSH;r()};w=function(b,e,f){0<=b&&b<S&&0<=e&&e<S&&g[b][e]!==s&&(T===BRUSH?g[b][e]=s:(f||(f=g[b][e]),g[b][e]===f&&(g[b][e]=s,w(b-1,e,f),w(b,e-1,f),w(b+1,e,f),w(b,e+1,f))),r())};
z=function(b){0>b&&S<=MIN_S||0<b&&S>=MAX_S||(S+=b,isOdd=1===S%2,0>b?(index=isOdd?0:1,g=g.splice(index,S).map(function(e){return e.splice(index,S)})):(g.forEach(function(e){return isOdd?e.push(s):e.unshift(s)}),isOdd?g.push(a(S,s)):g.unshift(a(S,s))),r())};y=function(b){t=d.createElement("textarea");d.body.appendChild(t);t.value=g.map(function(e){return e.join("")}).join("\n");t.select();d.execCommand("copy");t.remove()};
r=function(b){return o.innerHTML='<div class="btn-row">\n<button onclick="k()" class=btn2'+(T==BRUSH?" disabled":"")+'>\ud83d\udd8c️\n</button><button onclick="k()" class=btn2'+(T==FILL?" disabled":"")+'>\ud83e\udea3</button>\n</div>\n<div class="btn-row colors">\n'+c.map(function(e){return"<button onclick=s='"+e+"';r()"+(s==e?" disabled":"")+">"+e+"</button>"}).join("")+'</div>\n</div>\n<table class="'+(12<S?"sm":"")+'">\n'+g.map(function(e,f){return"<tr>"+e.map(function(h,m){return'<td onclick="w('+
f+","+m+')">'+h+"</td>"}).join("")+"</tr>"}).join("")+"</table>\n<div style=text-align:center>"+S+"x"+S+'</div>\n<div>\n<button onclick="z(1)"class=btn2'+(S==MAX_S?" disabled":"")+'>➕</button><button onclick="z(-1)"class=btn2'+(S==MIN_S?" disabled":"")+">➖</button></div>\n"+[["y","\ud83d\udccb Copy"],["n","\ud83d\udd03 Reset"]].map(function(e){return'<button onclick="'+e[0]+'()"class=btn>'+e[1]+"</button>"}).join("")};n();s=c[5];r();
