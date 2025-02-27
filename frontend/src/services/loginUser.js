import axios from "axios";

const loginUser = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:5000/api/user/login", {
      email,
      password,
    });

    return response.data; // ✅ Return token & user data
  } catch (error) {
    console.error("Login Error:", error.response?.data?.message || error.message);
    throw error;
  }
};

export default loginUser;
