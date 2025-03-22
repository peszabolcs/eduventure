import { motion } from "framer-motion";

const UniversityCard = ({ university, onClick }) => {
  // Function to get placeholder image if university logo is missing
  const getLogoUrl = (logo) => {
    return logo;
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
              <linearGradient id="halfStar">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#CBD5E0" />
              </linearGradient>
            </defs>
            <path
              fill="url(#halfStar)"
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
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-white/20 cursor-pointer h-full flex flex-col"
    >
      <div className="h-40 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 to-transparent z-10"></div>
        <img
          src={getLogoUrl(university.logo)}
          alt={`${university.name} logo`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white truncate">
              {university.shortName}
            </h3>
            {renderRatingStars(university.rating)}
          </div>
        </div>
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
          {university.name}
        </h2>
        <p className="text-purple-200 text-sm mb-4 line-clamp-3">
          {university.description}
        </p>

        <div className="mt-auto">
          <div className="flex items-center text-sm text-purple-200 mb-2">
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {university.location}
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            {university.fields.slice(0, 3).map((field, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 bg-indigo-500/30 text-xs text-indigo-100 rounded-full"
              >
                {field}
              </span>
            ))}
            {university.fields.length > 3 && (
              <span className="inline-block px-2 py-1 bg-purple-500/30 text-xs text-purple-100 rounded-full">
                +{university.fields.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-3 border-t border-white/10 bg-indigo-600/20">
        <div className="flex justify-between items-center">
          <span className="text-white text-xs">
            Alapítva: {university.foundedYear}
          </span>
          <span className="text-white text-xs flex items-center">
            <svg
              className="w-3 h-3 mr-1"
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
        </div>
      </div>
    </motion.div>
  );
};

export default UniversityCard;
