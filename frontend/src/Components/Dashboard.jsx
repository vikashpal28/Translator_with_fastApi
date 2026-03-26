import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [leaders, setLeaders] = useState([]); // Dynamic Leaderboard State
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        // Fetching User Profile and Leaderboard in parallel for speed
        const [userRes, leaderRes] = await Promise.all([
          axios.get("http://localhost:8080/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8080/api/auth/leaderboard", {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        setUser(userRes.data);
        // Only show top 5 on the dashboard teaser
        setLeaders(leaderRes.data.slice(0, 5)); 
      } catch (error) {
        console.error("Data fetch error:", error);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!token) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Welcome back, <span className="text-amber-400">{user?.name || "Player"}!</span>
            </h1>
            <p className="text-slate-400 mt-1">Ready for today's language challenges?</p>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={handleLogout}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-red-900/30 hover:text-red-400 border border-slate-700 transition-all font-medium text-sm"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Stats & Continue Learning */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {/* Total XP Card */}
               <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="text-6xl">🏆</span>
                </div>
                <p className="text-slate-500 uppercase text-xs font-bold tracking-widest">Total XP</p>
                <h3 className="text-4xl font-black text-white mt-2">{user?.score ?? 0}</h3>
                <div className="mt-4 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 w-2/3 shadow-[0_0_10px_#fbbf24]"></div>
                </div>
              </div>

              {/* Current Streak Card */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity text-6xl">🔥</div>
                <p className="text-slate-500 uppercase text-xs font-bold tracking-widest">Day Streak</p>
                <h3 className="text-4xl font-black text-orange-500 mt-2">{user?.currentStreak ?? 0}</h3>
              </div>

              {/* Longest Streak Card */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity text-6xl">⭐</div>
                <p className="text-slate-500 uppercase text-xs font-bold tracking-widest">Best Streak</p>
                <h3 className="text-4xl font-black text-blue-400 mt-2">{user?.longestStreak ?? 0}</h3>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 shadow-xl shadow-blue-900/20">
              <div className="max-w-md">
                <h2 className="text-2xl font-bold text-white mb-2">Continue Quest</h2>
                <p className="text-blue-100 mb-6">Pick up where you left off and maintain your streak!</p>
                <NavLink to="/features">
                  <button className="bg-white text-indigo-600 font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-all transform active:scale-95 shadow-lg">
                    Jump Back In
                  </button>
                </NavLink>
              </div>
            </div>
          </div>

          {/* Right Column: Profile & DYNAMIC LEADERBOARD */}
          <div className="lg:col-span-1 space-y-6">
            {/* Player Profile */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h4 className="text-white font-bold mb-4">Player Profile</h4>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-amber-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <div>
                  <p className="text-white font-bold">{user?.name || "Player"}</p>
                  <p className="text-slate-500 text-sm">@{user?.username || "username"}</p>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Status</span>
                <span className="text-green-400 font-medium">Online</span>
              </div>
            </div>
            
            {/* DYNAMIC GLOBAL LEADERBOARD */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-white font-bold text-sm">Global Leaderboard</h4>
                <NavLink to="/leaderboard" className="text-xs text-amber-400 hover:underline">View All</NavLink>
              </div>

              <div className="space-y-4">
                {loading ? (
                  <p className="text-xs text-slate-600 animate-pulse">Loading leaders...</p>
                ) : (
                  leaders.map((player, index) => (
                    <div key={index} className="flex items-center justify-between text-sm group">
                      <div className="flex items-center gap-3">
                        <span className={`font-black w-4 ${
                          index === 0 ? "text-amber-400" : 
                          index === 1 ? "text-slate-400" : 
                          index === 2 ? "text-orange-600" : "text-slate-600"
                        }`}>
                          {index + 1}.
                        </span>
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400 border border-slate-700">
                          {player.name?.charAt(0)}
                        </div>
                        <span className={`font-medium ${player.name === user?.name ? "text-amber-400" : "text-slate-300"}`}>
                          {player.name} {player.name === user?.name && "(You)"}
                        </span>
                      </div>
                      <span className="text-slate-500 font-mono text-xs">{player.score.toLocaleString()} XP</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};