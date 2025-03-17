"use client";

import { useLanguage } from "../LanguageContext";

function BlogCategories({ selectedCategory, onCategoryChange }) {
  const { t } = useLanguage();

  const categories = [
    { id: "all", name: t("blog.categories.all") },
    { id: "it", name: t("blog.categories.it") },
    { id: "engineering", name: t("blog.categories.engineering") },
    { id: "medicine", name: t("blog.categories.medicine") },
    { id: "business", name: t("blog.categories.business") },
    { id: "education", name: t("blog.categories.education") },
    { id: "arts", name: t("blog.categories.arts") },
    { id: "science", name: t("blog.categories.science") },
  ];

  return (
    <div className="mt-6">
      <h3 className="text-white text-xl font-semibold mb-3">
        {t("blog.categoriesTitle")}
      </h3>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <button
              onClick={() => onCategoryChange(category.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? "bg-purple-600 text-white"
                  : "text-purple-200 hover:bg-white hover:bg-opacity-10"
              }`}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogCategories;
