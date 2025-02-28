import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Bookmark, User, Search, Calendar, List, Bot, LogOut, Moon, Sun, BarChart3, Menu } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = ({ isOpen, toggleSidebar, user }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <motion.div
    animate={{ width: isOpen ? 250 : 80 }}
    className="sidebar d-flex flex-column bg-dark text-white vh-100 p-3 shadow"
    style={{
      position: "fixed",
      left: 0,
      top: 0,
      bottom: 0,
      transition: "width 0.3s ease-in-out",
      zIndex: 1000, // Keeps the sidebar above the content
    }}
    >
      {/* Sidebar Toggle Button */}
      <button className="btn btn-outline-light mb-3 w-100" onClick={toggleSidebar}>
        <Menu />
      </button>

      {/* User Info */}
      <div className="d-flex align-items-center mb-4">
        {user && isOpen && (
          <img src={user.avatar || "/default-avatar.png"} alt="Avatar" className="rounded-circle me-2" width={40} />
        )}
        {isOpen && <span className="fw-bold">{user?.username || "Guest"}</span>}
      </div>
      
      {/* Navigation Links */}
      <nav>
        <ul className="list-unstyled">
          <li className="mb-3">
            <Link to="/dashboard" className="text-white text-decoration-none d-flex align-items-center">
              <Home className="me-2" /> {isOpen && "Home"}
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/saved-recipes" className="text-white text-decoration-none d-flex align-items-center">
              <Bookmark className="me-2" /> {isOpen && "Saved Recipes"}
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/profile" className="text-white text-decoration-none d-flex align-items-center">
              <User className="me-2" /> {isOpen && "Profile"}
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/explore" className="text-white text-decoration-none d-flex align-items-center">
              <Search className="me-2" /> {isOpen && "Explore Recipes"}
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/meal-planner" className="text-white text-decoration-none d-flex align-items-center">
              <Calendar className="me-2" /> {isOpen && "Meal Planner"}
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/shopping-list" className="text-white text-decoration-none d-flex align-items-center">
              <List className="me-2" /> {isOpen && "Shopping List"}
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/ai-assistant" className="text-white text-decoration-none d-flex align-items-center">
              <Bot className="me-2" /> {isOpen && "AI Cooking Assistant"}
            </Link>
          </li>
        </ul>
      </nav>
      
      {/* Admin Panel (if user is admin) */}
      {user?.role === "admin" && (
        <nav className="mt-auto">
          <h6 className="text-white">Admin Panel</h6>
          <ul className="list-unstyled">
            <li className="mb-3">
              <Link to="/admin/manage-recipes" className="text-white text-decoration-none d-flex align-items-center">
                <BarChart3 className="me-2" /> {isOpen && "Manage Recipes"}
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/admin/analytics" className="text-white text-decoration-none d-flex align-items-center">
                <BarChart3 className="me-2" /> {isOpen && "User Analytics"}
              </Link>
            </li>
          </ul>
        </nav>
      )}

      {/* Theme Toggle & Logout */}
      <div className="mt-auto">
        <button className="btn btn-outline-light w-100 mb-3" onClick={toggleTheme}>
          {theme === "light" ? <Moon /> : <Sun />} {isOpen && "Toggle Theme"}
        </button>
        <button className="btn btn-danger w-100" onClick={handleLogout}>
          <LogOut className="me-2" /> {isOpen && "Logout"}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
