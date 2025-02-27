import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// ✅ Components
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import ProtectedRoute from "./utils/ProtectedRoute";

// ✅ Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Recipes from "./pages/Recipes";

function App() {
  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      fetchUserFromAPI();
    }
  }, []);

  // ✅ Fetch user details from API (Modify the endpoint if needed)
  const fetchUserFromAPI = async () => {
    try {
      const token = localStorage.getItem("token"); // ✅ Ensure token is included
      if (!token) return;

      const response = await fetch("http://your-backend-api.com/api/user", {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error("Failed to fetch user:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <Router>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<><Navbar /><Home /></>} />
          <Route path="/register" element={<><Navbar /><Register /></>} />
          <Route path="/login" element={<><Navbar /><Login setUser={setUser} /></>} />
          
          {/* ✅ Pass user & setUser for updates */}
          <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/protected" element={<ProtectedRoute />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
