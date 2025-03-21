// Service Worker regisztrálása
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
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
    } catch (error) {
      console.error("ServiceWorker registration failed:", error);
    }
  });
}
