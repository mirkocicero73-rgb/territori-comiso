/* Service worker: l'app parte dalla cache (istantanea, anche senza rete) e
   in sottofondo scarica la versione nuova, che entra in vigore alla riapertura. */
const V = 'territori-comiso-v2';
const SHELL = ['./', './index.html', './app.enc', './manifest.webmanifest',
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
  e.respondWith(caches.open(V).then(async cache => {
    const hit = await cache.match(r, { ignoreSearch: true });
    const net = fetch(r).then(res => { if (res && res.ok) cache.put(r, res.clone()); return res; })
                        .catch(() => null);
    return hit || (await net) || cache.match('./index.html');
  }));
});
