const CACHE_NAME = "eduventure-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/eduventurelogohatternelkul.svg",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  // CSS és JS fájlok automatikusan hozzáadódnak a build során
];

// Service Worker telepítése
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache opened");
      return cache.addAll(urlsToCache);
    })
  );
});

// Hálózati kérések kezelése
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Cache találat - visszaadjuk a cache-elt választ
        if (response) {
          return response;
        }

        // Nincs cache találat - hálózati kérést küldünk
        return fetch(event.request).then((response) => {
          // Ellenőrizzük, hogy érvényes-e a válasz
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Klónozzuk a választ, mert a response stream csak egyszer olvasható
          const responseToCache = response.clone();

          // Elmentsük a választ a cache-be
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
      .catch(() => {
        // Offline fallback - itt lehetne speciális offline oldalt mutatni
        return caches.match("/index.html");
      })
  );
});

// Régi cache-ek törlése
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
