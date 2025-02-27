import express from "express";
import { getUserProfile } from "../controllers/userController.js";  // ✅ Import Controller
import authMiddleware from "../middleware/auth.js"; // ✅ Authentication Middleware

const router = express.Router();

// Apply authentication middleware correctly
router.get("/profile", authMiddleware, getUserProfile);  

export default router;
