const API_URL = "http://localhost:5000/api/recipes/fetch";

export const fetchRecipes = async (query) => {
  try {
    const response = await fetch(`${API_URL}?query=${query}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};
