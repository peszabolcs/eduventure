import { motion } from "framer-motion";

const UniversityListItem = ({ university, onClick }) => {
  // Function to get placeholder image if university logo is missing
  const getLogoUrl = (logo) => {
    // If logo path exists and doesn't start with http, prepend the public path
    if (logo && !logo.startsWith("http")) {
      // Try to load the image or fallback to a placeholder
      return `/placeholder-university.png`;
    }
    return logo || "/placeholder-university.png";
  };

  // Calculate rating stars
  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={`full-${i}`}
            className="w-4 h-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}

        {hasHalfStar && (
          <svg
            className="w-4 h-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <defs>
              <linearGradient id="halfStarList">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#CBD5E0" />
              </linearGradient>
            </defs>
            <path
              fill="url(#halfStarList)"
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        )}

        {[...Array(emptyStars)].map((_, i) => (
          <svg
            key={`empty-${i}`}
            className="w-4 h-4 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}

        <span className="ml-1 text-white text-sm">
          {university.rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-white/20 cursor-pointer"
    >
      <div className="p-4 md:p-6 flex flex-col sm:flex-row gap-4">
        {/* Logo */}
        <div className="flex-shrink-0 h-20 w-20 sm:h-24 sm:w-24 rounded-lg overflow-hidden bg-white/10">
          <img
            src={getLogoUrl(university.logo)}
            alt={`${university.name} logo`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <div>
              <h2 className="text-xl font-bold text-white">
                {university.name}
              </h2>
              <p className="text-purple-200 text-sm">
                {university.shortName} • {university.location}
              </p>
            </div>
            <div className="flex items-center">
              {renderRatingStars(university.rating)}
            </div>
          </div>

          <p className="text-purple-200 text-sm mb-4 line-clamp-2">
            {university.description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1">
              {university.fields.slice(0, 5).map((field, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 bg-indigo-500/30 text-xs text-indigo-100 rounded-full"
                >
                  {field}
                </span>
              ))}
              {university.fields.length > 5 && (
                <span className="inline-block px-2 py-1 bg-purple-500/30 text-xs text-purple-100 rounded-full">
                  +{university.fields.length - 5}
                </span>
              )}
            </div>

            <div className="flex gap-4 text-sm text-purple-200">
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                {university.faculties} kar
              </span>

              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {university.students.toLocaleString()} hallgató
              </span>

              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Alapítva: {university.foundedYear}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UniversityListItem;
