"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getArticleById,
  createArticle,
  updateArticle,
} from "../services/blogService";
import RichTextEditor from "../components/blog/RichTextEditor";
import { Save, Image as ImageIcon, X, Upload } from "lucide-react";

function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    category: "",
    tags: "",
    image: "",
    readTime: 5,
  });

  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [editorKey, setEditorKey] = useState(0);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchArticle = async () => {
        try {
          const article = await getArticleById(id);
          setFormData({
            title: article.title,
            summary: article.summary,
            content: article.content,
            category: article.category,
            tags: article.tags ? article.tags.join(", ") : "",
            image: article.image,
            readTime: article.readTime,
          });
          setEditorKey((prev) => prev + 1);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching article:", error);
          setIsLoading(false);
        }
      };

      fetchArticle();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContentChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "A cím megadása kötelező";
    }

    if (!formData.summary.trim()) {
      newErrors.summary = "Az összefoglaló megadása kötelező";
    }

    if (!formData.content.trim()) {
      newErrors.content = "A tartalom megadása kötelező";
    }

    if (!formData.category.trim()) {
      newErrors.category = "A kategória kiválasztása kötelező";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    try {
      const articleData = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      if (isEditMode) {
        await updateArticle(id, articleData);
      } else {
        await createArticle(articleData);
      }

      navigate("/blog/admin");
    } catch (error) {
      console.error("Error saving article:", error);
      setSubmitError(
        "Nem sikerült menteni a cikket. Kérjük, próbálja újra később."
      );
      setIsSaving(false);
    }
  };

  const categories = [
    { id: "it", name: "IT és Programozás" },
    { id: "engineering", name: "Mérnöki Szakmák" },
    { id: "medicine", name: "Orvostudomány" },
    { id: "business", name: "Üzlet és Menedzsment" },
    { id: "education", name: "Oktatás" },
    { id: "arts", name: "Művészetek" },
    { id: "science", name: "Természettudományok" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-white mb-8">
            {isEditMode ? "Cikk szerkesztése" : "Új cikk létrehozása"}
          </h1>

          {submitError && (
            <div className="mb-6 p-4 bg-red-500 bg-opacity-10 border border-red-500 rounded-lg">
              <p className="text-red-300">{submitError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-white font-medium mb-2"
                >
                  Cím*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full bg-purple-900 bg-opacity-50 border ${
                    errors.title ? "border-red-500" : "border-purple-600"
                  } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  placeholder="Add meg a cikk címét"
                />
                {errors.title && (
                  <p className="mt-1 text-red-400 text-sm">{errors.title}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-white font-medium mb-2"
                >
                  Kategória*
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full bg-purple-900 bg-opacity-50 border ${
                    errors.category ? "border-red-500" : "border-purple-600"
                  } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                >
                  <option value="">Válassz kategóriát</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-red-400 text-sm">{errors.category}</p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="summary"
                className="block text-white font-medium mb-2"
              >
                Összefoglaló*
              </label>
              <textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                rows="3"
                className={`w-full bg-purple-900 bg-opacity-50 border ${
                  errors.summary ? "border-red-500" : "border-purple-600"
                } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="Rövid összefoglaló a cikkről (max. 200 karakter)"
                maxLength="200"
              ></textarea>
              {errors.summary && (
                <p className="mt-1 text-red-400 text-sm">{errors.summary}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="content"
                className="block text-white font-medium mb-2"
              >
                Tartalom*
              </label>
              <RichTextEditor
                key={id || "new-editor"}
                initialValue={formData.content}
                onChange={handleContentChange}
                error={errors.content}
              />
              {errors.content && (
                <p className="mt-1 text-red-400 text-sm">{errors.content}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="image"
                  className="block text-white font-medium mb-2"
                >
                  Kép URL
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full bg-purple-900 bg-opacity-50 border border-purple-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label
                  htmlFor="readTime"
                  className="block text-white font-medium mb-2"
                >
                  Olvasási idő (perc)
                </label>
                <input
                  type="number"
                  id="readTime"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  min="1"
                  max="60"
                  className="w-full bg-purple-900 bg-opacity-50 border border-purple-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="mb-8">
              <label
                htmlFor="tags"
                className="block text-white font-medium mb-2"
              >
                Címkék (vesszővel elválasztva)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full bg-purple-900 bg-opacity-50 border border-purple-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="pl. karrier, fizetés, egyetem"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/blog/admin")}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                disabled={isSaving}
              >
                <X className="h-5 w-5" />
                Mégsem
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    <Save className="h-5 w-5" />
                    Mentés...
                  </>
                ) : (
                  <Save className="h-5 w-5" />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BlogEditor;
