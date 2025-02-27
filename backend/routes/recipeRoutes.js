import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import authMiddleware from "../middleware/auth.js"; // ✅ Default Import (Correct)

dotenv.config();
const router = express.Router();

// 🔹 Fetch recipes dynamically from Spoonacular API
router.get("/fetch", async (req, res) => {
  try {
    const { query } = req.query; // Get search query from request
    if (!query) return res.status(400).json({ error: "Query parameter is required" });

    const response = await axios.get("https://api.spoonacular.com/recipes/complexSearch", {
      params: {
        apiKey: process.env.SPOONACULAR_API_KEY,
        query,
        number: 10, // Fetch 10 recipes
        addRecipeInformation: true, // Get full details
      },
    });

    res.json(response.data.results); // Send recipes as response
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

// 🔹 Fetch a single recipe by ID from Spoonacular
router.get("/fetch/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get recipe ID from URL

    const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
      params: { apiKey: process.env.SPOONACULAR_API_KEY },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching recipe details:", error.message);
    res.status(500).json({ error: "Failed to fetch recipe details" });
  }
});

// 🔹 Example of a **Protected Route** (if needed)
router.get("/protected-route", authMiddleware, async (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

export default router; // ✅ Default Export
