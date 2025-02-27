import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

function Login({ setUser }) {  // ✅ Accept setUser prop to update state in App.js
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);  // ✅ New: Loading state
  const [errorMessage, setErrorMessage] = useState(""); // ✅ New: Error message state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });
  
      console.log("Login Response:", response.data); // ✅ Debugging: Check API response
  
      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user); 
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error);
      setErrorMessage(error.response?.data?.message || "Invalid credentials! Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-lg p-4 rounded-4 border-0 animate__animated animate__fadeInDown"
        style={{
          maxWidth: "400px",
          width: "100%",
          background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
        }}
      >
        <h2 className="text-center fw-bold text-white mb-3">Login</h2>
        
        {errorMessage && (  // ✅ Show error message if exists
          <div className="alert alert-danger text-center p-2">{errorMessage}</div>
        )}

        <form onSubmit={handleLogin} className="d-flex flex-column">
          <div className="mb-3">
            <input
              type="email"
              className="form-control p-3 border-0 rounded-pill"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control p-3 border-0 rounded-pill"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-dark fw-bold text-white p-3 rounded-pill w-100"
            style={{
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              border: "none",
            }}
            disabled={loading}  // ✅ Disable button when loading
          >
            {loading ? "Logging in..." : "Login"} {/* ✅ Show loading text */}
          </button>
        </form>

        <p className="text-center mt-3 text-white">
          Don't have an account?{" "}
          <span
            className="fw-bold text-dark"
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
