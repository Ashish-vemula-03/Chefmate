// ✅ Third-Party Libraries First
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// ✅ Components Next
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import ProtectedRoute from "./utils/ProtectedRoute";

// ✅ Pages Last
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Recipes from "./pages/Recipes";





function App() {
  return (
    <Router>
      <Navbar /> {/* Keep Navbar outside Routes for global navigation */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/recipes" element={<Recipes />} /> {/* Add Recipes Route */}
          <Route path="/protected" element={<ProtectedRoute />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
