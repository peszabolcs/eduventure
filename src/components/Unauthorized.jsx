import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

function Unauthorized() {
  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <div className="bg-red-500 bg-opacity-10 backdrop-blur-sm rounded-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Hozzáférés megtagadva
          </h1>
          <p className="text-red-100 mb-6">
            Nincs jogosultsága az oldal megtekintéséhez.
          </p>
          <Link
            to="/"
            className="inline-flex items-center text-white hover:text-red-200 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Vissza a főoldalra
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
