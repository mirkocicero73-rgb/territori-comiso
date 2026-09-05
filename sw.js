/* Il documento viene sempre chiesto alla rete per primo: così una versione
   nuova (o la schermata di sblocco) compare subito, non al secondo avvio.
   Il resto sta in cache, e l'app funziona anche senza campo. */
const V = 'territori-comiso-f3e5293ac260';
const SHELL = ['./', './index.html', './app.enc?v=f3e5293ac260', './manifest.webmanifest',
               './informativa/', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;

  if (r.mode === 'navigate' || r.destination === 'document'){
    e.respondWith(
      fetch(r).then(res => {
        if (res && res.ok) caches.open(V).then(c => c.put(r, res.clone()));
        return res;
      }).catch(() => caches.match(r).then(m => m || caches.match('./index.html')))
    );
    return;
  }
  e.respondWith(caches.open(V).then(async cache => {
    const hit = await cache.match(r);
    if (hit) return hit;
    const res = await fetch(r).catch(() => null);
    if (res && res.ok) cache.put(r, res.clone());
    return res || new Response('', { status: 504 });
  }));
});
