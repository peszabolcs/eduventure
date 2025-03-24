// Süti hozzájárulás állapotok
export const COOKIE_STATUS = {
  ACCEPT_ALL: "accept_all", // Minden süti elfogadása
  ESSENTIAL_ONLY: "essential_only", // Csak a kötelező sütik elfogadása
  UNKNOWN: null,
};

// Süti hozzájárulás lekérdezése
export const getCookieConsent = () => {
  return localStorage.getItem("cookieConsent") || COOKIE_STATUS.UNKNOWN;
};

// Süti hozzájárulás beállítása
export const setCookieConsent = (status) => {
  localStorage.setItem("cookieConsent", status);
  return status;
};

// Süti hozzájárulás törlése
export const clearCookieConsent = () => {
  localStorage.removeItem("cookieConsent");
};

// Annak ellenőrzése, hogy a felhasználó elfogadott-e minden sütit
export const hasAcceptedAllCookies = () => {
  return getCookieConsent() === COOKIE_STATUS.ACCEPT_ALL;
};

// Annak ellenőrzése, hogy a felhasználó legalább a kötelező sütiket elfogadta-e
export const hasAcceptedEssentialCookies = () => {
  const status = getCookieConsent();
  return (
    status === COOKIE_STATUS.ESSENTIAL_ONLY ||
    status === COOKIE_STATUS.ACCEPT_ALL
  );
};
