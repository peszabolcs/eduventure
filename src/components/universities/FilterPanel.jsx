import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FilterPanel = ({
  filters,
  onFilterChange,
  onSearch,
  fieldOptions,
  locationOptions,
  toggleViewMode,
  viewMode,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState(
    filters.location || []
  );
  const [selectedFields, setSelectedFields] = useState(filters.fields || []);
  const [minRating, setMinRating] = useState(filters.minRating || 0);

  // Apply the filters when they change
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onFilterChange({
        location: selectedLocations,
        fields: selectedFields,
        minRating,
      });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [selectedLocations, selectedFields, minRating]);

  // Apply search when searchTerm changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLocationChange = (location) => {
    setSelectedLocations((prev) => {
      if (prev.includes(location)) {
        return prev.filter((loc) => loc !== location);
      } else {
        return [...prev, location];
      }
    });
  };

  const handleFieldChange = (field) => {
    setSelectedFields((prev) => {
      if (prev.includes(field)) {
        return prev.filter((f) => f !== field);
      } else {
        return [...prev, field];
      }
    });
  };

  const handleRatingChange = (e) => {
    setMinRating(parseFloat(e.target.value));
  };

  const resetFilters = () => {
    setSelectedLocations([]);
    setSelectedFields([]);
    setMinRating(0);
    setSearchTerm("");
    onSearch("");
    onFilterChange({
      location: [],
      fields: [],
      minRating: 0,
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 sticky top-24">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden p-4 flex justify-between items-center border-b border-white/10">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center text-white gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm3 6a1 1 0 011-1h10a1 1 0 010 2H7a1 1 0 01-1-1zm4 6a1 1 0 011-1h4a1 1 0 010 2h-4a1 1 0 01-1-1z"
            />
          </svg>
          Szűrők{" "}
          {(selectedLocations.length > 0 ||
            selectedFields.length > 0 ||
            minRating > 0) && (
            <span className="bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {selectedLocations.length +
                selectedFields.length +
                (minRating > 0 ? 1 : 0)}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleViewMode}
            className="text-white p-2 rounded-md transition-colors hover:bg-white/10"
            aria-label={
              viewMode === "card"
                ? "Switch to list view"
                : "Switch to card view"
            }
          >
            {viewMode === "card" ? (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Filter Content */}
      <div
        className={`${
          showMobileFilters || !showMobileFilters ? "block" : "hidden"
        } lg:block p-4`}
      >
        {/* Search */}
        <div className="mb-6">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-purple-200 mb-2"
          >
            Keresés
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Egyetem neve..."
              className="w-full bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-4 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-purple-300/70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* View Toggle (Desktop) */}
        <div className="hidden lg:flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-white">Nézet</h3>
          <div className="flex border border-white/20 rounded-lg overflow-hidden">
            <button
              onClick={toggleViewMode}
              className={`p-2 transition ${
                viewMode === "card"
                  ? "bg-indigo-600 text-white"
                  : "bg-white/10 text-purple-200 hover:bg-white/20"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
            <button
              onClick={toggleViewMode}
              className={`p-2 transition ${
                viewMode === "list"
                  ? "bg-indigo-600 text-white"
                  : "bg-white/10 text-purple-200 hover:bg-white/20"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Location Filter */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-white mb-3">Város</h3>
          <div className="space-y-2">
            {locationOptions.map((location) => (
              <div key={location} className="flex items-center">
                <input
                  type="checkbox"
                  id={`location-${location}`}
                  checked={selectedLocations.includes(location)}
                  onChange={() => handleLocationChange(location)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`location-${location}`}
                  className="ml-2 block text-sm text-purple-200"
                >
                  {location}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Fields Filter */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-white mb-3">Szakterület</h3>
          <div className="space-y-2 max-h-56 overflow-y-auto pr-2 scrollbar">
            {fieldOptions.map((field) => (
              <div key={field} className="flex items-center">
                <input
                  type="checkbox"
                  id={`field-${field}`}
                  checked={selectedFields.includes(field)}
                  onChange={() => handleFieldChange(field)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`field-${field}`}
                  className="ml-2 block text-sm text-purple-200"
                >
                  {field}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-white">
              Minimum értékelés
            </h3>
            <span className="text-sm text-purple-200">
              {minRating.toFixed(1)}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={minRating}
            onChange={handleRatingChange}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-purple-300 mt-1">
            <span>0</span>
            <span>5</span>
          </div>
        </div>

        {/* Reset Filters */}
        {(selectedLocations.length > 0 ||
          selectedFields.length > 0 ||
          minRating > 0 ||
          searchTerm) && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={resetFilters}
            className="w-full py-2 px-4 bg-purple-600/50 hover:bg-purple-600/70 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Szűrők törlése
          </motion.button>
        )}
      </div>

      {/* Scrollbar styles */}
      <style jsx>{`
        .scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }

        .scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }

        .scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default FilterPanel;
