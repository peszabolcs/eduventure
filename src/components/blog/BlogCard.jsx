import { Link } from "react-router-dom";
import { formatDate } from "../utils/dateUtils";
import { Calendar, Clock, Tag, ChevronRight, Image } from "lucide-react";
import { useState } from "react";

function BlogCard({ article }) {
  const {
    id,
    title,
    summary,
    images,
    author,
    publishDate,
    category,
    readTime,
  } = article;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formattedDate = formatDate(publishDate);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleNextImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg">
      <Link to={`/blog/${id}`} className="relative group">
        <div className="relative">
          <img
            src={images?.[currentImageIndex] || "/placeholder.jpg"}
            alt={title}
            className="w-full h-48 object-cover"
          />
          {images?.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ←
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                →
              </button>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm flex items-center">
                <Image className="w-4 h-4 mr-1" />
                {currentImageIndex + 1}/{images.length}
              </div>
            </>
          )}
        </div>
      </Link>

      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-4 text-sm text-purple-200">
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formattedDate}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {readTime} perc
            </span>
          </div>
          <div className="mt-2 flex items-center">
            <Tag className="w-4 h-4 mr-1 text-purple-300" />
            <span className="text-purple-300">{category}</span>
          </div>
        </div>

        <Link to={`/blog/${id}`}>
          <h3 className="text-xl font-bold text-white mb-2 hover:text-purple-300 transition-colors">
            {title}
          </h3>
        </Link>

        <p className="text-purple-200 mb-4 line-clamp-3">{summary}</p>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              src={author.avatar ? `${API_URL}${author.avatar}` : "/blank.webp"}
              alt={author.name}
              className="w-8 h-8 rounded-full mr-2"
            />
            <div>
              <p className="text-white text-sm">{author.name}</p>
            </div>
          </div>

          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
