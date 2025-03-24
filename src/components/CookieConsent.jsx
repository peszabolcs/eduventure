import { useState, useEffect } from "react";
import { X, Info } from "lucide-react";

const CookieConsent = ({ onAcceptAll, onEssentialOnly }) => {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Ellenőrizzük, hogy a felhasználó már döntött-e a sütikről
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (cookieConsent === null) {
      // Ha még nem döntött, megjelenítjük a bannert
      setVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookieConsent", "accept_all");
    setVisible(false);
    if (onAcceptAll) onAcceptAll();
  };

  const handleEssentialOnly = () => {
    localStorage.setItem("cookieConsent", "essential_only");
    setVisible(false);
    if (onEssentialOnly) onEssentialOnly();
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gray-900 text-white shadow-lg border-t border-gray-700">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
          <div className="flex-1 mr-4 mb-4 md:mb-0">
            <h3 className="font-semibold text-lg mb-1">
              Ez a weboldal sütiket használ
            </h3>
            <p className="text-sm text-gray-300">
              Az oldal böngészésével Ön beleegyezik a sütik használatába,
              amelyek elengedhetetlenek a weboldal működéséhez és segítenek
              nekünk javítani szolgáltatásainkat és felhasználói élményét. Az
              "Összes elfogadása" választásával hosszabb ideig marad
              bejelentkezve.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={toggleExpanded}
              className="px-4 py-2 rounded bg-transparent border border-gray-500 hover:bg-gray-800 transition-colors text-sm"
            >
              {expanded ? "Kevesebb információ" : "Több információ"}
            </button>
          </div>
        </div>

        {expanded && (
          <div className="mb-4 p-4 bg-gray-800 rounded-lg">
            <div className="mb-4">
              <h4 className="font-semibold text-white mb-2 flex items-center">
                <Info size={16} className="mr-2" /> Süti típusok
              </h4>
              <div className="pl-6 space-y-4">
                <div>
                  <h5 className="font-medium text-white">Kötelező sütik</h5>
                  <p className="text-sm text-gray-300">
                    Ezek a sütik elengedhetetlenek a weboldal alapvető
                    működéséhez és a felhasználói fiók kezeléséhez. A kötelező
                    sütik nélkül nem tudjuk biztosítani a bejelentkezést és a
                    regisztrációt. Ezekkel a sütikkel bejelentkezhet és
                    használhatja az oldal összes funkcióját, de a böngésző
                    bezárása után automatikusan kijelentkezik.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-white">Preferencia sütik</h5>
                  <p className="text-sm text-gray-300">
                    Ezek a sütik lehetővé teszik számunkra, hogy megjegyezzük a
                    beállításokat és preferenciákat, így a böngésző bezárása és
                    újranyitása után is bejelentkezve maradhat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-end gap-2">
          <button
            onClick={handleEssentialOnly}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Csak kötelezők
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 transition-colors"
          >
            Összes elfogadása
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
