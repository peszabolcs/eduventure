// Töröljük a mock adatokat és helyettesítsük valódi API hívásokkal

// Get all articles
export const getAllArticles = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/backend/articles.php`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

// Get article by ID
export const getArticleById = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/backend/article.php?id=${id}`
    );
    if (!response.ok) {
      throw new Error("Article not found");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
};

// Get related articles
export const getRelatedArticles = async (currentId, category) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/backend/related-articles.php?id=${currentId}&category=${category}`
    );
    if (!response.ok) {
      throw new Error("Error fetching related articles");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching related articles:", error);
    throw error;
  }
};

// Create new article
export const createArticle = async (articleData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/backend/create-article.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(articleData),
      }
    );
    if (!response.ok) {
      throw new Error("Error creating article");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating article:", error);
    throw error;
  }
};

// Update article
export const updateArticle = async (id, articleData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/backend/update-article.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id, ...articleData }),
      }
    );
    if (!response.ok) {
      throw new Error("Error updating article");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
};

// Delete article
export const deleteArticle = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/backend/delete-article.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id }),
      }
    );
    if (!response.ok) {
      throw new Error("Error deleting article");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting article:", error);
    throw error;
  }
};
