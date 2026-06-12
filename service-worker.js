// This file runs in the background and makes your app work offline
 
// Give your cache a name - change this if you update your app files
const CACHE_NAME = 'door-detective-cache-v1';
 
// List every file your app needs to work
const FILES_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './Logo.jpg',
  './audio/effects/computer-boot.mp3',
  './audio/effects/door-open-sound-effect.mp3',
  './audio/effects/got-mail.wav',
  './audio/effects/horray.mp3',
  './audio/effects/keyboard-sound-effect.mp3',
  './audio/effects/walking-sound-effect.mp3',
  './audio/effects/windows-xp-error-sound.mp3',
  './audio/effects/XP-Shutdown-Sound.mp3',
  './audio/effects/yippee-sound-effect.wav',
  './audio/music/intense-music.mp3',
  './audio/music/main-theme.ogg',
  './audio/music/menu-music.mp3',
  './images/game-stuff/start-menu/door-detective-start-menu.png',
  './images/middle-room/computer-hitbox.png',
  './images/middle-room/key-pad-door-hitbox.png',
  './images/middle-room/key-pad-hitbox.png',
  './images/middle-room/keypad.png',
  './images/middle-room/middle-door.png',
  './images/middle-room/middle-room.png',
  './images/middle-room/right-door-hitbox.png',
  './images/middle-room/computer/computer-booting-up.png',
  './images/middle-room/computer/computer-emails-icon.png',
  './images/middle-room/computer/computer-error.png',
  './images/middle-room/computer/computer-login-error.png',
  './images/middle-room/computer/computer-login.png',
  './images/middle-room/computer/computer-mail.png',
  './images/middle-room/computer/computer-mk2.png',
  './images/middle-room/computer/computer-new-mail.png',
  './images/middle-room/computer/email-dialog-01.png',
  './images/middle-room/computer/email-dialog-02.png',
  './images/middle-room/right-room/right-room-bathroom.png',
  './images/middle-room/right-room/shower.png',
  './images/middle-room/right-room/toilet-hitbox.png',
  './images/middle-room/right-room/toilet.png',
  './images/middle-room/right-room/Wall (2).png',
  './images/middle-room/right-room/wall-hitbox.png',
  './images/middle-room/right-room/wall.png',
  './video/celebration-fixed.mp4'
];
 
// INSTALL - runs once when the app is first visited
// Downloads and saves all your files into the cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});
 
// ACTIVATE - runs when a new version of this file is detected
// Deletes old caches so users get your updated files
self.addEventListener('activate', event => {
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