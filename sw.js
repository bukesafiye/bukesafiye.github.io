---
layout: null
---
// Keeps images and fonts in the browser so repeat visits don't download them again.
// GitHub Pages only lets the browser cache files for 10 minutes; this works around that.
// Stale-while-revalidate: a cached file is shown at once and quietly refreshed in the
// background, so a replaced screenshot appears on the visit after it is published.
var CACHE = 'mg-assets-v4';

self.addEventListener('install', function () { self.skipWaiting(); });

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  var url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  if (!/^\/assets\/(img|fonts)\//.test(url.pathname)) return;
  e.respondWith(caches.open(CACHE).then(function (cache) {
    return cache.match(e.request).then(function (hit) {
      var fresh = fetch(e.request).then(function (res) {
        if (res.ok) cache.put(e.request, res.clone());
        return res;
      });
      if (hit) { e.waitUntil(fresh.catch(function () {})); return hit; }
      return fresh;
    });
  }));
});
