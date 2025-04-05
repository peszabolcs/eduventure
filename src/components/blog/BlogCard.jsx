import { Link } from "react-router-dom";
import { formatDate } from "../utils/dateUtils";
import { Calendar, Clock, Tag, ChevronRight } from "lucide-react";

function BlogCard({ article }) {
  const { id, title, summary, image, author, publishDate, category, readTime } =
    article;

  const formattedDate = formatDate(publishDate);
  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg">
      <Link to={`/blog/${id}`}>
        <img
          src={image || "/placeholder.jpg"}
          alt={title}
          className="w-full h-48 object-cover"
        />
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
