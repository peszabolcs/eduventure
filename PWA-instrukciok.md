# EduVenture PWA implementáció

## Jelenlegi állapot

A PWA (Progressive Web App) funkcionalitást sikeresen integráltuk az EduVenture projektbe. A következő komponensek már beállításra kerültek:

1. **Web App Manifest** (`public/manifest.json`): Tartalmazza az alkalmazás nevét, leírását, ikonjait és egyéb beállításait.
2. **Service Worker** (`public/service-worker.js`): Lehetővé teszi az offline működést és a tartalom gyorsítótárazását.
3. **Service Worker regisztráció** (`public/register-sw.js`): A service worker inicializálásáért felelős.
4. **Vite PWA Plugin**: A `vite.config.js` frissítésre került, ami automatikusan kezeli a PWA funkcionalitást a build során.
5. **HTML meta tagek**: Az `index.html` fájlban hozzáadtuk a szükséges PWA meta tageket és hivatkozásokat.

## Még hátralevő feladatok

A PWA teljes működéséhez még a következő feladatokat kell elvégezni:

1. **Ikonok létrehozása**:

   - Konvertáld a `public/eduventurelogohatternelkul.svg` vagy a `public/logo.webp` fájlt a következő méretű PNG ikonokká:
     - 192x192 pixel - mentsd `public/icons/icon-192x192.png` néven
     - 512x512 pixel - mentsd `public/icons/icon-512x512.png` néven

   Ezt megteheted bármely online képszerkesztő eszközzel vagy a `public/icons/README.txt` fájlban ajánlott online szolgáltatásokkal.

2. **PWA tesztelése**:

   - Építsd újra a projektet az ikonok elkészítése után: `npm run build`
   - Indítsd el a buildet előnézetben: `npm run preview`
   - Nyisd meg egy modern böngészőben, és ellenőrizd a PWA telepíthetőségét
   - Chrome DevTools > Applications > Manifest és Service Workers szekcióban ellenőrizd, hogy minden megfelelően működik-e

3. **Hogyan lehet telepíteni az alkalmazást PWA-ként**:
   - Amikor egy felhasználó meglátogatja az oldalt, a modern böngészők automatikusan felajánlják a telepítés lehetőségét (általában egy kis ikon jelenik meg a címsorban vagy egy értesítés)
   - Mobil eszközökön a "Add to Home Screen" (Hozzáadás a kezdőképernyőhöz) opciót válasszák a felhasználók
   - Kompatibilis böngészők: Chrome, Edge, Firefox, Safari (iOS 16.4+), Opera

## Hasznos erőforrások

- [PWA Builder](https://www.pwabuilder.com/)
- [Google PWA Dokumentáció](https://web.dev/progressive-web-apps/)
- [Vite PWA Plugin Dokumentáció](https://vite-pwa-org.netlify.app/)

## Megjegyzések

- A PWA csak HTTPS környezetben működik megfelelően, így győződj meg róla, hogy az éles környezet támogatja ezt
- Ha további testreszabást szeretnél, a `vite.config.js` fájlban a VitePWA plugin konfigurációját módosíthatod
