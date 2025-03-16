import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 bg-opacity-50 text-white py-3 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-2 md:mb-0">
            <h3 className="text-lg font-bold mb-1">EduVenture</h3>
            <p className="text-gray-300 text-sm">
              Innovatív pályaorientációs megoldások
            </p>
          </div>

          <div className="text-center md:text-center flex-grow mx-4">
            <div className="text-gray-400 text-xs">
              &copy; {new Date().getFullYear()} Perjési Szabolcs. Minden jog
              fenntartva.
            </div>
          </div>

          <div className="flex flex-col items-end">
            <Link
              to="/privacy-policy"
              className="text-gray-300 hover:text-white transition-colors text-sm mb-1"
            >
              Adatkezelési Tájékoztató
            </Link>
            <a
              href="mailto:info@eduventure.hu"
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              Kapcsolat
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
