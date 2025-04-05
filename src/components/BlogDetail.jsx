"use client";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  Share2,
  Bookmark,
  ChevronLeft,
  Tag,
} from "lucide-react";
import { getArticleById } from "../services/blogService";
import { formatDate } from "../utils/dateUtils";
import RelatedArticles from "../components/blog/RelatedArticles";
import SocialShare from "../components/blog/SocialShare";

function BlogDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticleById(id);
        setArticle(data);
        setIsLoading(false);
        // Scroll to top when article loads
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error fetching article:", error);
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Cikk nem található
          </h2>
          <Link
            to="/blog"
            className="text-purple-300 hover:text-white flex items-center justify-center no-underline"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Vissza a bloghoz
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <Link
          to="/blog"
          className="inline-flex items-center text-purple-300 hover:text-white mb-6 no-underline"
        >
          <ChevronLeft className="h-5 w-5 mr-2" />
          Vissza a bloghoz
        </Link>

        <article className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg overflow-hidden">
          <img
            src={article.image || "/placeholder.jpg"}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover"
          />

          <div className="p-6 md:p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-purple-600 text-white text-sm font-semibold rounded-full">
                {article.category}
              </span>
              {article.tags &&
                article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-purple-500 bg-opacity-50 text-white text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {article.title}
            </h1>

            <div className="flex items-center mb-6">
              <img
                src={
                  article.author.avatar
                    ? `${API_URL}${article.author.avatar}`
                    : "/blank.webp"
                }
                alt={article.author.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="text-white font-medium">{article.author.name}</p>
                <p className="text-purple-300 text-sm">
                  {formatDate(article.publishDate)} • {article.readTime} perc
                  olvasás
                </p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-purple-100 mb-8">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>

            <SocialShare article={article} />
          </div>
        </article>

        <RelatedArticles
          currentArticleId={article.id}
          category={article.category}
        />
      </div>
    </div>
  );
}

export default BlogDetail;
