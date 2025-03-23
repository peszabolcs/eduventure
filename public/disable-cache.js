// Böngésző cache letiltása
(function () {
  // Cache API letiltása, ha elérhető
  if ("caches" in window) {
    // Létező cache-ek törlése
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
  }

  // HTTP Cache-Control fejlécek felülírása
  if (window.fetch) {
    const originalFetch = window.fetch;
    window.fetch = function (resource, options) {
      options = options || {};
      options.headers = options.headers || {};

      // Adjunk hozzá no-cache fejléceket
      options.headers["Pragma"] = "no-cache";
      options.headers["Cache-Control"] = "no-cache, no-store, must-revalidate";

      return originalFetch(resource, options);
    };
  }

  // AJAX kérések cache-elésének letiltása
  if (window.XMLHttpRequest) {
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (
      method,
      url,
      async,
      user,
      password
    ) {
      // Adjunk cache-busting paramétert a URL-hez
      url =
        url +
        (url.indexOf("?") === -1 ? "?" : "&") +
        "_nocache=" +
        new Date().getTime();
      return originalOpen.call(this, method, url, async, user, password);
    };
  }
})();
