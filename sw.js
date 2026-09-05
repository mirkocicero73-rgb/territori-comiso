/* Interruttore di spegnimento.
   Il vecchio service worker teneva in cache l'applicazione e poteva servire
   versioni superate: era la ragione per cui gli aggiornamenti non arrivavano
   sul telefono. Questo file lo sostituisce, cancella tutte le cache, si
   disiscrive e ricarica le finestre aperte. Non intercetta piu' nulla:
   ogni richiesta va sempre in rete. */
self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(e){
  e.waitUntil((async function(){
    const ks = await caches.keys();
    await Promise.all(ks.map(function(k){ return caches.delete(k); }));
    await self.registration.unregister();
    const cs = await self.clients.matchAll({ type: 'window' });
    cs.forEach(function(c){ try { c.navigate(c.url); } catch(err){} });
  })());
});
