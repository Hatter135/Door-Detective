// This file runs in the background and makes your app work offline
 
// Give your cache a name - change this if you update your app files
const CACHE_NAME = 'door-detective-cache-v7';
 
// List every file your app needs to work
const FILES_TO_CACHE = [
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './Logo.jpg',
  './images/game-stuff/start-menu/door-detective-start-menu.png',
  './images/middle-room/middle-room.png',
  './images/middle-room/computer/computer-mk2.png',
  './images/middle-room/computer/computer-login.png',
  './images/middle-room/right-room/right-room-bathroom.png',
  './images/middle-room/right-room/toilet.png',
  './images/middle-room/keypad.png'
];
 
// INSTALL - runs once when the app is first visited
// Downloads and saves all your files into the cache
self.addEventListener('install', event => {
  self.skipWaiting();
  console.log('[SW] Installing, cache:', CACHE_NAME);
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Cache opened, adding files...');
      return cache.addAll(FILES_TO_CACHE).catch(err => {
        console.error('[SW] Cache failed:', err);
        throw err;
      });
    }).catch(err => {
      console.error('[SW] Install failed:', err);
      self.skipWaiting();
    })
  );
});
 
// ACTIVATE - runs when a new version of this file is detected
// Deletes old caches so users get your updated files
self.addEventListener('activate', event => {
  self.clients.claim();
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});
 
// FETCH - runs every time the app requests a file
// Tries the cache first, falls back to the internet if not found
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});