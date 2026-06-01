// KILL-SWITCH: desactiva por completo cualquier caché antigua que quedara
// guardada en dispositivos. Se auto-elimina en la siguiente visita.
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    // Borrar todas las cachés
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
    // Desregistrar este service worker
    await self.registration.unregister();
    // Recargar las pestañas abiertas para que cojan la versión nueva
    const clients = await self.clients.matchAll({ type: "window" });
    clients.forEach((client) => client.navigate(client.url));
  })());
});
