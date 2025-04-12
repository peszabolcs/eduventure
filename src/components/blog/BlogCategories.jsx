"use client";

function BlogCategories({ selectedCategory, onCategoryChange }) {
  const categories = [
    { id: "osszes", name: "Összes" },
    { id: "it-es-programozas", name: "IT és Programozás" },
    { id: "mernoki-szakmak", name: "Mérnöki Szakmák" },
    { id: "orvostudomany", name: "Orvostudomány" },
    { id: "uzlet-es-menedzsment", name: "Üzlet és Menedzsment" },
    { id: "oktatas", name: "Oktatás" },
    { id: "muveszetek", name: "Művészetek" },
    { id: "termeszettudomanyok", name: "Természettudományok" },
    { id: "palyaorientacio", name: "Pályaorientáció" },
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
