import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js"; // Import your User model

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
          return res.status(400).json({ message: "All fields are required" });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
          username,
          email,
          password: hashedPassword,
      });

      // Save to MongoDB
      await newUser.save();

      res.status(201).json({ message: "User registered successfully!" });

  } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "1h" });
    res.json({ success: true, user: { username: user.username, email: user.email, token } });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
