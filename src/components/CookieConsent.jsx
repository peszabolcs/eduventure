import { useState, useEffect } from "react";
import { X } from "lucide-react";

const CookieConsent = ({ onAccept, onDecline }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Ellenőrizzük, hogy a felhasználó már döntött-e a sütikről
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (cookieConsent === null) {
      // Ha még nem döntött, megjelenítjük a bannert
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
    if (onAccept) onAccept();
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setVisible(false);
    if (onDecline) onDecline();
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gray-900 text-white shadow-lg border-t border-gray-700">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex-1 mr-4 mb-4 md:mb-0">
          <h3 className="font-semibold text-lg mb-1">
            Ez a weboldal sütiket használ
          </h3>
          <p className="text-sm text-gray-300">
            Az oldal böngészésével Ön beleegyezik a sütik használatába, amelyek
            segítenek nekünk javítani szolgáltatásainkat és felhasználói
            élményét. A sütik elutasítása esetén bizonyos funkciók, mint a
            bejelentkezés és regisztráció, nem lesznek elérhetőek.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleDecline}
            className="px-4 py-2 rounded bg-transparent border border-gray-500 hover:bg-gray-800 transition-colors"
          >
            Elutasítom
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 transition-colors"
          >
            Elfogadom
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
