// The build fills in version and files, see astro.config.mjs
const version = 'dev'
const files = []

self.addEventListener('install', e => {
  e.waitUntil(caches.open(version).then(c => c.addAll(files)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== version).map(k => caches.delete(k)))))
})

// Cache first, so weak signal doesn't leave you staring at a spinner
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request)))
})
