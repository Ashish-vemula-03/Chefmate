import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Star } from "lucide-react";
import Sidebar from "../components/Sidebar"; // Adjust path if needed

const Dashboard = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "ccab842f1fa040e5b40a77f6902ece2d"; // Replace with your actual API key

  const fetchRecipes = async () => {
    if (!query.trim()) {
      setRecipes([]);
      setError("Please enter a search term.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Fetching recipes for:", query); // Debugging log

      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=5&apiKey=${API_KEY}`
      );
      const data = await response.json();

      console.log("API Response:", data); // Debugging log

      if (data.results && data.results.length > 0) {
        setRecipes(data.results);
      } else {
        setRecipes([]);
        setError("No recipes found.");
      }
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to fetch recipes. Try again.");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (query.trim()) fetchRecipes();
  }, [query]); // Auto-fetch when query changes

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 w-full">
        {/* Hero Section */}
        <div
          className="relative h-64 bg-cover bg-center text-white flex items-center justify-center"
          style={{ backgroundImage: `url('/hero-image.jpg')` }} // Use a valid image path
        >
          <motion.h1
            className="text-4xl font-bold bg-black bg-opacity-50 px-4 py-2 rounded-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Welcome to ChefMATE!
          </motion.h1>
        </div>

        {/* Search Bar */}
        <div className="m-6 flex items-center bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <Search className="text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Search recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-2 focus:outline-none"
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Recommended Recipes */}
        <h2 className="text-2xl font-semibold mb-4 ml-6">Recommended Recipes</h2>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="spinner border-t-4 border-blue-500 border-solid w-10 h-10 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <motion.div
                  key={recipe.id}
                  className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <h3 className="text-lg font-bold mt-2">{recipe.title}</h3>
                  <p className="flex items-center text-yellow-500 mt-1">
                    <Star className="mr-1" /> N/A
                  </p>
                </motion.div>
              ))
            ) : (
              !loading && <p className="text-center text-gray-500">No recipes to display</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
