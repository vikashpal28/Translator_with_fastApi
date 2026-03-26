import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, NavLink } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (token) return <Navigate to="/dashboard" replace />;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const SubmitForm = async (e) => {
    e.preventDefault();
    const { name, username, password } = formData;

    if (!name || !username || !password) {
      setError("Please fill in all fields to start your journey.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/auth/signup", formData);
      
      // Auto-login after signup by storing the token
      localStorage.setItem("token", response.data.token);
      console.log("Signup Successful:", response.data);
      
      // Navigate to dashboard instead of window.location for smoother UX
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try a different username.");
      console.error("Signup error", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden px-6">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]"></div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8 w-full max-w-md z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white tracking-tight">Create Profile</h2>
          <p className="text-slate-400 text-sm mt-2">Join LinguQuest and start earning XP</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={SubmitForm}>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Alex Smith"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Username / Email</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="alex_quest"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-pink-900/20 transition-all transform active:scale-95 flex justify-center items-center"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              "Begin Adventure"
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <p className="text-slate-400 text-sm">
            Already a member?{" "}
            <NavLink to="/login" className="text-pink-500 hover:text-pink-400 font-bold ml-1 transition-colors">
              Sign In
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};