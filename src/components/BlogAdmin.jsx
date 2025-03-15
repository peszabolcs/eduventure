"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import { getAllArticles, deleteArticle } from "../services/blogService";
import { Plus, Pencil, Trash2, Eye, Search } from "lucide-react";

function BlogAdmin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "CTO") {
      navigate("/unauthorized");
      return;
    }

    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const data = await getAllArticles();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError(
          "Nem sikerült betölteni a cikkeket. Kérjük, próbálja újra később."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [user, navigate]);

  const handleDelete = async (id) => {
    try {
      await deleteArticle(id);
      setArticles(articles.filter((article) => article.id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Nem sikerült törölni a cikket. Kérjük, próbálja újra később.");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen relative">
        <div className="container mx-auto px-4 py-8 pt-20 relative z-10">
          <div className="bg-red-500 bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-center">
            <p className="text-red-300 text-xl">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Blog Adminisztráció</h1>
          <Link
            to="/blog/admin/new"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors no-underline"
          >
            <Plus className="h-5 w-5 mr-2" />
            Új cikk
          </Link>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : articles.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-purple-700">
                <thead className="bg-purple-800 bg-opacity-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                      Cím
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                      Kategória
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                      Szerző
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                      Publikálva
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                      Műveletek
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-700">
                  {articles.map((article) => (
                    <tr
                      key={article.id}
                      className="hover:bg-purple-800 hover:bg-opacity-30 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">
                          {article.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-600 text-white">
                          {article.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-purple-200">
                          {article.author.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-purple-200">
                          {new Date(article.publishDate).toLocaleDateString(
                            "hu-HU"
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            to={`/blog/${article.id}`}
                            className="text-purple-300 hover:text-white transition-colors"
                            title="Megtekintés"
                          >
                            <Eye className="h-5 w-5" />
                          </Link>
                          <Link
                            to={`/blog/admin/edit/${article.id}`}
                            className="text-purple-300 hover:text-white transition-colors"
                            title="Szerkesztés"
                          >
                            <Pencil className="h-5 w-5" />
                          </Link>
                          <button
                            onClick={() => setDeleteConfirm(article.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                            title="Törlés"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-white text-xl mb-4">Még nincsenek cikkek.</p>
              <Link
                to="/blog/admin/new"
                className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                Új cikk létrehozása
              </Link>
            </div>
          )}
        </div>
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-purple-900 rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Cikk törlése</h3>
            <p className="text-purple-200 mb-6">
              Biztosan törölni szeretnéd ezt a cikket? Ez a művelet nem
              visszavonható.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Mégsem
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Törlés
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogAdmin;
