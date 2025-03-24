// Süti hozzájárulás állapotok
export const COOKIE_STATUS = {
  ACCEPTED: "accepted",
  DECLINED: "declined",
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

// Annak ellenőrzése, hogy a felhasználó elfogadta-e a sütiket
export const hasCookieConsent = () => {
  return getCookieConsent() === COOKIE_STATUS.ACCEPTED;
};
