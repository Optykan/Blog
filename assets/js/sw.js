'use strict';
const CACHE = 'syang';

importScripts('/javascripts/vendor/cache-polyfill.js');

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (cache) {
    return cache.addAll([
      '/', 
      '/favicon.ico',
      '/stylesheets/bundle/bundle-home.css',
      '/javascripts/bundle-home.js', 
      '/images/compress/low-poly-texture-22.png', 
      '/images/webp/low-poly-texture-22.webp', 
      '/images/portfolio/avante-1.jpg', 
      '/images/portfolio/usc-1.jpg',
      '/images/portfolio/beat-1.jpg',
      '/images/portfolio/blog-1.jpg',
      '/images/portfolio/teachassist-1.jpg'
      ]);
  }));
});

self.addEventListener('fetch', function (event) {
  event.respondWith(fromNetwork(event.request, 400).catch(function () {
      return fromCache(event.request);
  }));
});

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function fromNetwork(request, timeout) {
  return new Promise(function (fulfill, reject) {
    var timeoutId = setTimeout(reject, timeout);
 
    fetch(request).then(function (response) {
      clearTimeout(timeoutId);
      fulfill(response); 
    }, reject);
  });
}