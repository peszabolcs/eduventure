"use client";

import { useState, useEffect } from "react";
import BlogSearch from "../components/blog/BlogSearch";
import BlogCategories from "../components/blog/BlogCategories";
import BlogCard from "../components/blog/BlogCard";
import { getAllArticles } from "../services/blogService";

function Blog() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const data = await getAllArticles();
        setArticles(data);
        setFilteredArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
        // Itt lehetne egy hibaüzenetet megjeleníteni a felhasználónak
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    let result = articles;

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(
        (article) => article.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.summary.toLowerCase().includes(query) ||
          article.content.toLowerCase().includes(query)
      );
    }

    setFilteredArticles(result);
  }, [selectedCategory, searchQuery, articles]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4 py-8 pt-20 relative z-10">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-1/4">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 sticky top-20">
              <BlogSearch onSearch={handleSearch} />
              <BlogCategories
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>
          </div>

          <div className="w-full md:w-3/4">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <BlogCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 text-center">
                <p className="text-white text-xl">
                  Nincs találat a keresési feltételeknek megfelelően.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
