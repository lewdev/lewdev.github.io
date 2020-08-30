"use strict";
function setOfCachedUrls(e) {
  return e.keys().then(function (e) {
    return e.map(function (e) {
      return e.url
    })
  }).then(function (e) {
    return new Set(e)
  })
}
var APP_PREFIX = "ofudesaki-browser-", VERSION = 'v1'
  , CACHE_NAME = APP_PREFIX + VERSION
  , precacheConfig = [
    ["./", "-214489181"]
    , ["index.html", "1763771178"]
    , ["style.css", "-516880381"]
    , ["script.js", "-2071138039"]
    , ["analysis.js", "-656011752"]
    , ["analysis.html", "932843706"]
    , ["keywords.json", "2097568233"]
    , ["ofudesaki.json", "-101958610"]
    //css
    , ["css/animate.min.css", "-1808909877"]
    , ["css/fontawesome-v5.7.2.css", "124202761"]
    , ["css/pure-min.css", "-272990015"]
    //images
    , ["img/android-chrome-192x192.png", "-1001836975"]
    , ["img/apple-touch-icon.png", "-158250428"]
    , ["img/browserconfig.xml", "-1573387900"]
    , ["img/favicon.ico", "-1513505428"]
    , ["img/favicon-16x16.png", "1121418251"]
    , ["img/favicon-32x32.png", "-821233205"]
    , ["img/mstile-150x150.png", "-1243791087"]
    , ["img/ofudesaki-browser.png", "-965979342"]
    , ["img/safari-pinned-tab.svg", "-672604684"]
    //font-awesome
    , ["webfonts/fa-brands-400.eot", "875758181"]
    , ["webfonts/fa-brands-400.svg", "875771839"]
    , ["webfonts/fa-brands-400.ttf", "875772737"]
    , ["webfonts/fa-brands-400.woff", "1379235741"]
    , ["webfonts/fa-brands-400.woff2", "-193364939"]
    , ["webfonts/fa-regular-400.eot", "-1318082871"]
    , ["webfonts/fa-regular-400.svg", "-1318069213"]
    , ["webfonts/fa-regular-400.ttf", "-1318068315"]
    , ["webfonts/fa-regular-400.woff", "2089639865"]
    , ["webfonts/fa-regular-400.woff2", "354326425"]
    , ["webfonts/fa-solid-900.eot", "600078749"]
    , ["webfonts/fa-solid-900.svg", "600092407"]
    , ["webfonts/fa-solid-900.ttf", "600093305"]
    , ["webfonts/fa-solid-900.woff", "1423107941"]
    , ["webfonts/fa-solid-900.woff2", "1166673261"]
  ]
  , ignoreUrlParametersMatching = [/^utm_/]
  , addDirectoryIndex = function (e, t) {
    var n = new URL(e);
    return "/" === n.pathname.slice(-1) && (n.pathname += t),
      n.toString()
  }
  , cleanResponse = function (e) {
    return e.redirected ? ("body" in e ? Promise.resolve(e.body) : e.blob()).then(function (t) {
      return new Response(t, {
        headers: e.headers,
        status: e.status,
        statusText: e.statusText
      })
    }) : Promise.resolve(e)
  }
  , createCacheKey = function (path, param, key, regex) {
    var url = new URL(path);
    return regex && url.pathname.match(regex) || (url.search += (url.search ? "&" : "") + encodeURIComponent(param) + "=" + encodeURIComponent(key)),
      url.toString();
  }
  , isPathWhitelisted = function (e, t) {
    if (0 === e.length)
      return !0;
    var n = new URL(t).pathname;
    return e.some(function (e) {
      return n.match(e)
    })
  }
  , stripIgnoredUrlParameters = function (e, t) {
    var url = new URL(e);
    return url.hash = "",
      url.search = url.search.slice(1).split("&").map(function (e) {
        return e.split("=")
      }).filter(function (e) {
        return t.every(function (t) {
          return !t.test(e[0])
        })
      }).map(function (e) {
        return e.join("=")
      }).join("&"),
      url.toString()
  }
  , HASH_PARAM_NAME = "precacheKey"
  , urlsToCacheKeys = new Map(precacheConfig.map(function (fileNameKey) {
    var fileName = fileNameKey[0],
      key = fileNameKey[1],
      url = new URL(fileName, self.location),
      cacheKey = createCacheKey(url, HASH_PARAM_NAME, key, /\.\w{8}\./);
    return [url.toString(), cacheKey]
  }))
;
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE_NAME).then(function (e) {
    return setOfCachedUrls(e).then(function (t) {
      return Promise.all(Array.from(urlsToCacheKeys.values()).map(function (n) {
        if (!t.has(n)) {
          var r = new Request(n, { credentials: "same-origin" });
          return fetch(r).then(function (t) {
            if (!t.ok)
              throw new Error("Request for " + n + " returned a response with status " + t.status);
            return cleanResponse(t).then(function (t) {
              return e.put(n, t)
            })
          })
        }
      }))
    })
  }).then(function () {
    return self.skipWaiting()
  }))
}), self.addEventListener("activate", function (e) {
  var urlSet = new Set(urlsToCacheKeys.values());
  e.waitUntil(caches.open(CACHE_NAME).then(function (e) {
    return e.keys().then(function (n) {
      return Promise.all(n.map(function (n) {
        if (!urlSet.has(n.url))
          return e.delete(n)
      }))
    })
  }).then(function () {
    return self.clients.claim()
  }))
}), self.addEventListener("fetch", function (e) {
  if ("GET" === e.request.method) {
    var t,
      n = stripIgnoredUrlParameters(e.request.url, ignoreUrlParametersMatching);
    (t = urlsToCacheKeys.has(n)) || (n = addDirectoryIndex(n, "index.html"), t = urlsToCacheKeys.has(n));
    !t && "navigate" === e.request.mode && isPathWhitelisted(["^(?!\\/__).*"], e.request.url) && (n = new URL("./index.html", self.location).toString(), t = urlsToCacheKeys.has(n)),
      t && e.respondWith(caches.open(CACHE_NAME).then(function (e) {
        return e.match(urlsToCacheKeys.get(n)).then(function (e) {
          if (e)
            return e;
          throw Error("The cached response that was expected is missing.")
        })
      }).catch(function (t) {
        return console.warn('Couldn\'t serve response for "%s" from cache: %O', e.request.url, t),
          fetch(e.request)
      }))
  }
});
