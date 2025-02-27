import React, { useEffect, useState } from "react";

const RecipeList = ({ searchQuery }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "ccab842f1fa040e5b40a77f6902ece2d"; // Replace with your actual API key

  useEffect(() => {
    if (!searchQuery) return; // Do nothing if searchQuery is empty

    const fetchRecipes = async () => {
      setLoading(true);
      setError("");

      try {
        console.log("Fetching recipes for:", searchQuery); // Debugging log

        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&number=5&apiKey=${API_KEY}`
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          setRecipes(data.results);
        } else {
          setRecipes([]);
          setError("No recipes found.");
        }

        console.log("API Response:", data.results); // Debugging log
      } catch (err) {
        setError("Failed to fetch recipes. Try again.");
      }

      setLoading(false);
    };

    fetchRecipes();
  }, [searchQuery]); // Fetch recipes whenever searchQuery changes

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Recipes</h2>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Recipe List */}
      <div className="mt-4">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id} className="p-4 border rounded mb-2">
              <h3 className="text-lg font-semibold">{recipe.title}</h3>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-32 h-32 mt-2 rounded"
              />
              <a
                href={`https://spoonacular.com/recipes/${recipe.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 mt-2 block"
              >
                View Recipe
              </a>
            </div>
          ))
        ) : (
          !loading && <p>No recipes to display</p>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
