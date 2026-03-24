import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";

export const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);

  // Redirect if no token
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("User response:", response);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="h-150 flex flex-col items-center justify-center bg-linear-to-r from-green-600 via-teal-600 to-blue-600 text-white px-6">
      <div className="bg-white text-gray-800 rounded-lg shadow-lg p-8 w-full max-w-2xl text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-teal-700">
          Welcome to Your Dashboard
        </h1>

        {user ? (
          <div className="mb-6">
            <p className="text-lg font-semibold">Hello, {user.name || "User"} 👋</p>
            <p className="text-sm text-gray-600">Username: {user.username || "N/A"}</p>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-green-100 rounded-lg p-4 shadow">
                <h3 className="text-xl font-bold text-green-700">Score</h3>
                <p className="text-2xl font-semibold">{user.score ?? 0}</p>
              </div>
              <div className="bg-yellow-100 rounded-lg p-4 shadow">
                <h3 className="text-xl font-bold text-yellow-700">Current Streak</h3>
                <p className="text-2xl font-semibold">{user.currentStreak ?? 0}</p>
              </div>
              <div className="bg-blue-100 rounded-lg p-4 shadow">
                <h3 className="text-xl font-bold text-blue-700">Longest Streak</h3>
                <p className="text-2xl font-semibold">{user.longestStreak ?? 0}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-lg mb-6 text-gray-600">Loading your profile...</p>
        )}

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleLogout}
            className="bg-amber-400 hover:bg-amber-500 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition transform hover:scale-105"
          >
            Logout
          </button>
          <NavLink to="/features">
       <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition transform hover:scale-105"
          >
            Features
          </button>
          </NavLink>
         
        </div>
      </div>
    </div>
  );
};
