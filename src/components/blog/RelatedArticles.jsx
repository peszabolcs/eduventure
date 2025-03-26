"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRelatedArticles } from "../../services/blogService";
import { ChevronRight, Calendar, Clock } from "lucide-react";

// eslint-disable-next-line react/prop-types
function RelatedArticles({ currentArticleId, category }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      try {
        const data = await getRelatedArticles(currentArticleId, category);
        setArticles(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching related articles:", error);
        setIsLoading(false);
      }
    };

    fetchRelatedArticles();
  }, [currentArticleId, category]);

  if (isLoading) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">
          Kapcsolódó cikkek
        </h2>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-white mb-6">Kapcsolódó cikkek</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/blog/${article.id}`}
            className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 hover:transform hover:scale-105"
          >
            <img
              src={article.image || "/placeholder.jpg"}
              alt={article.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">
                {article.title}
              </h3>
              <p className="text-purple-300 text-sm line-clamp-2">
                {article.summary}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RelatedArticles;
