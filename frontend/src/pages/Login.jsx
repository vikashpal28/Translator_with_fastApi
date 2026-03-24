import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const token = localStorage.getItem("token");
  if (token) return <Navigate to="/dashboard" replace />;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "username") setUsername(value);
    if (name == "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      console.log("All the filed necessary to be field");
      alert("Fill all the filed");
    }

    console.log("Get the data : ", { username, password });

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          username,
          password,
        },
      );

      localStorage.setItem("token", response.data.token);
      console.log("Successfully Login : ", response.data);
       alert("Successfully login");
      window.location.href = "/dashboard";
    } catch (error) {
      console.log("error", error);
       alert("check your username and password");
    }
  };

  return (
    <div className="h-150 flex items-center justify-center bg-linear-to-r from-indigo-700 via-purple-700 to-pink-600 px-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        {/* Form */}
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="Username"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="bg-amber-400 hover:bg-amber-500 text-black font-semibold px-6 py-2 rounded-lg shadow-md transition transform hover:scale-105"
          >
            Login
          </button>
        </form>

        {/* Extra Links */}
        <p className="text-sm text-gray-600 text-center mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};
