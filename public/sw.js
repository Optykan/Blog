'use strict';

importScripts('/javascripts/vendor/cache-polyfill.js');

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open('syang').then(function (cache) {
    return cache.addAll(['/', '/javascripts/bundle-home.js', '/stylesheets/bundle.css', '/images/compress/low-poly-texture-22.png', '/images/webp/low-poly-texture-22.webp', '/images/portfolio/avante-1.jpg', '/images/portfolio/usc-1.jpg']);
  }));
});

self.addEventListener('fetch', function (event) {
  console.log(event.request.url);
  event.respondWith(caches.match(event.request).then(function (response) {
    return response || fetch(event.request);
  }));
});