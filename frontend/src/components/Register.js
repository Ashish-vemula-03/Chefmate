import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register", // Ensure this URL is correct
        { username, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        alert("Registration successful!");

        // Wait for alert completion before navigating
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        alert(response.data.message || "Registration failed!");
      }
    } catch (error) {
      console.error("Registration failed:", error);

      if (!error.response) {
        alert("Cannot connect to the server. Make sure the backend is running!");
      } else {
        alert(error.response.data.message || "An error occurred during registration.");
      }
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
        <h2 className="text-center fw-bold text-white mb-3">Create Account</h2>
        <form onSubmit={handleRegister} className="d-flex flex-column">
          <div className="mb-3">
            <input
              type="text"
              className="form-control p-3 border-0 rounded-pill"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-3 text-white">
          Already have an account?{" "}
          <span
            className="fw-bold text-dark"
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
