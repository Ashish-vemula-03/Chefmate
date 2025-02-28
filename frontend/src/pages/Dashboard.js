import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Star, User, Calendar, List } from "lucide-react";
import Sidebar from "../components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = ({ user, setUser, isOpen, toggleSidebar }) => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState(user?.username || "Guest");

  const API_KEY = "ccab842f1fa040e5b40a77f6902ece2d"; // Replace with your actual API key

  // ✅ Fetch user details only if not available
  useEffect(() => {
    if (user?.username) return;

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch("http://localhost:5000/api/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data);
          setUserName(data.username || "Guest");
          localStorage.setItem("user", JSON.stringify(data));
        } else {
          setUserName("Guest");
        }
      } catch (error) {
        setUserName("Guest");
      }
    };

    fetchUserData();
  }, [user, setUser]);

  // ✅ Fetch recipes only when query changes
  useEffect(() => {
    if (!query.trim()) {
      setRecipes([]);
      setError("");
      return;
    }

    const fetchRecipes = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=5&apiKey=${API_KEY}`
        );
        const data = await response.json();
        setRecipes(data.results.length > 0 ? data.results : []);
        setError(data.results.length === 0 ? "No recipes found." : "");
      } catch (err) {
        setError("Failed to fetch recipes. Try again.");
      }
      setLoading(false);
    };

    fetchRecipes();
  }, [query]); // ✅ Ensure useEffect is triggered only when query changes

  return (
    <div className="d-flex bg-light min-vh-100">
      {/* ✅ Pass props to Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className={`main-content container-fluid p-4 ${isOpen ? "content-expanded" : "content-collapsed"}`}>

        {/* Hero Section */}
        <div className="text-center text-white bg-dark py-5 rounded shadow">
          <h1 className="fw-bold">
            Welcome, <span className="text-primary">{userName}</span>! 👋
          </h1>
          <p>Discover new recipes and plan your meals easily</p>
        </div>

        {/* Profile Section */}
        <div className="d-flex justify-content-between align-items-center my-4">
          <h2 className="fw-bold">Your Dashboard</h2>
          <button className="btn btn-primary">
            <User className="me-2" /> View Profile
          </button>
        </div>

        {/* Search & Filters */}
        <div className="input-group mb-3">
          <span className="input-group-text"><Search /></span>
          <input
            type="text"
            className="form-control"
            placeholder="Search recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Error Message */}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        {/* Recommended Recipes */}
        <h3 className="mb-3">Recommended Recipes</h3>
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <motion.div
                  key={recipe.id}
                  className="col-md-4 mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="card shadow-sm border-0">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{recipe.title}</h5>
                      <p className="text-warning">
                        <Star className="me-1" /> N/A
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-muted">No recipes to display</p>
            )}
          </div>
        )}

        {/* Additional Features */}
        <div className="row mt-5">
          <div className="col-md-4">
            <div className="card p-3 text-center shadow-sm">
              <Calendar size={40} className="mx-auto text-primary" />
              <h5 className="mt-3">Meal Planner</h5>
              <p>Plan your weekly meals with ease.</p>
              <button className="btn btn-outline-primary">View</button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 text-center shadow-sm">
              <List size={40} className="mx-auto text-success" />
              <h5 className="mt-3">Shopping List</h5>
              <p>Get a generated shopping list for recipes.</p>
              <button className="btn btn-outline-success">View</button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 text-center shadow-sm">
              <Star size={40} className="mx-auto text-warning" />
              <h5 className="mt-3">Favorites</h5>
              <p>Save and access your favorite recipes.</p>
              <button className="btn btn-outline-warning">View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
