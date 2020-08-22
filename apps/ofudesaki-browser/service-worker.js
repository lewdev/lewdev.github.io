const cacheName = 'cache-v1';
const precacheResources = [
  'index.html',
  'style.css',
  'script.js',
  'analysis.js',
  'analysis.html',
  'keywords.json',
  'ofudesaki.json',
  //css
  'css/animate.min.css',
  'css/fontawesome-v5.7.2.css',
  'css/pure-min.css',
  //images
  'img/android-chrome-192x192.png',
  'img/apple-touch-icon.png',
  'img/browserconfig.xml',
  'img/favicon.ico',
  'img/favicon-16x16.png',
  'img/favicon-32x32.png',
  'img/mstile-150x150.png',
  'img/ofudesaki-browser.png',
  'img/safari-pinned-tab.svg',
  'img/site.webmanifest',
  //fontawesome
  'webfonts/fa-brands-400.eot',
  'webfonts/fa-brands-400.svg',
  'webfonts/fa-brands-400.ttf',
  'webfonts/fa-brands-400.woff',
  'webfonts/fa-brands-400.woff2',
  'webfonts/fa-regular-400.eot',
  'webfonts/fa-regular-400.svg',
  'webfonts/fa-regular-400.ttf',
  'webfonts/fa-regular-400.woff',
  'webfonts/fa-regular-400.woff2',
  'webfonts/fa-solid-900.eot',
  'webfonts/fa-solid-900.svg',
  'webfonts/fa-solid-900.ttf',
  'webfonts/fa-solid-900.woff',
  'webfonts/fa-solid-900.woff2',
];

self.addEventListener('install', event => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(precacheResources);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Service worker activate event!');
});

self.addEventListener('fetch', event => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
    );
});