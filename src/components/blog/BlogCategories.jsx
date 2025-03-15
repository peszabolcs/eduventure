"use client";

function BlogCategories({ selectedCategory, onCategoryChange }) {
  const categories = [
    { id: "all", name: "Összes" },
    { id: "it", name: "IT és Programozás" },
    { id: "engineering", name: "Mérnöki Szakmák" },
    { id: "medicine", name: "Orvostudomány" },
    { id: "business", name: "Üzlet és Menedzsment" },
    { id: "education", name: "Oktatás" },
    { id: "arts", name: "Művészetek" },
    { id: "science", name: "Természettudományok" },
  ];

  return (
    <div className="mt-6">
      <h3 className="text-white text-xl font-semibold mb-3">Kategóriák</h3>
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
