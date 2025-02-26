import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  steps: [{ type: String, required: true }],
  image: { type: String }, // URL for uploaded image
  tags: [{ type: String }], // AI-generated tags
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

const Recipe = mongoose.model("Recipe", RecipeSchema);
export default Recipe;
