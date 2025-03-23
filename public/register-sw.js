// Service Worker regisztrálása
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      // Service worker regisztráció előtt töröljük a régi cache-eket
      if (window.caches) {
        // A cache-ek listázása és törlése
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(async (cacheName) => {
            console.log(`Clearing cache: ${cacheName}`);
            return await caches.delete(cacheName);
          })
        );
        console.log("All caches cleared");
      }

      // Regisztráljuk az új service workert
      const registration = await navigator.serviceWorker.register(
        "/service-worker.js",
        {
          scope: "/",
        }
      );
      console.log(
        "ServiceWorker registration successful with scope:",
        registration.scope
      );

      // Értesítés küldése, hogy a service worker telepítve lett
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }

      // Ha van active service worker, kényszerítjük az oldal frissítését
      if (registration.active) {
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "activated") {
              // Új service worker aktív lett, frissítsük az oldalt
              window.location.reload();
            }
          });
        });
      }
    } catch (error) {
      console.error("ServiceWorker registration failed:", error);
    }
  });
}

// Amikor az oldal betöltődik, ellenőrizzük, hogy van-e frissítés
// és frissítsük az oldalt, hogy a legfrissebb tartalmat mutassa
if (window.performance && performance.navigation.type === 1) {
  // Az oldal frissült, törölhetjük a cache-t
  if ("caches" in window) {
    caches.keys().then((cacheNames) => {
      cacheNames.forEach((cacheName) => {
        console.log(`Attempting to delete cache on reload: ${cacheName}`);
        caches.delete(cacheName);
      });
    });
  }
}
