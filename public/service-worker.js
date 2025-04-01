const CACHE_NAME = "eduventure-cache-v1";
const STATIC_CACHE_NAME = "eduventure-static-cache-v1";

// Statikus erőforrások, amiket mindig cache-elünk
const staticUrlsToCache = [
  "/manifest.json",
  "/eduventurelogohatternelkul.svg",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  // CSS és JS fájlok automatikusan hozzáadódnak a build során
];

// Service Worker telepítése
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      console.log("Static cache opened");
      return cache.addAll(staticUrlsToCache);
    })
  );
});

// Hálózati kérések kezelése
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Statikus erőforrások esetén Cache First stratégia
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return (
          response ||
          fetch(event.request).then((response) => {
            return caches.open(STATIC_CACHE_NAME).then((cache) => {
              cache.put(event.request, response.clone());
              return response;
            });
          })
        );
      })
    );
    return;
  }

  // Dinamikus tartalom esetén Network First stratégia
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Csak sikeres válaszokat cache-elünk
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Offline esetben visszatérünk a cache-elt tartalomhoz
        return caches.match(event.request);
      })
  );
});

// Régi cache-ek törlése
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME, STATIC_CACHE_NAME];

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

// Segédfüggvény a statikus erőforrások azonosításához
function isStaticAsset(url) {
  const staticExtensions = [
    ".css",
    ".js",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".svg",
    ".ico",
    ".woff",
    ".woff2",
    ".ttf",
    ".eot",
  ];
  return staticExtensions.some((ext) =>
    url.pathname.toLowerCase().endsWith(ext)
  );
}
