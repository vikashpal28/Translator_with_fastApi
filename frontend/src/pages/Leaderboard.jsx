import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/auth/leaderboard", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchLeaders();
  }, [token]);

  if (!token) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 py-16 px-6 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-amber-500/10 blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto z-10 relative">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
            Global <span className="text-amber-400">Champions</span>
          </h1>
          <p className="text-slate-400">Battle for the top spot and earn legendary status.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-amber-400/20 border-t-amber-400 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {players.map((player, index) => {
              // Special styling for Top 3
              const isTopThree = index < 3;
              const rankIcon = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1;

              return (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 transform hover:scale-[1.01] ${
                    index === 0 
                    ? "bg-amber-400/10 border-amber-400/40 shadow-[0_0_20px_rgba(251,191,36,0.1)]" 
                    : "bg-slate-900 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-6">
                    {/* Rank Indicator */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${
                      index === 0 ? "bg-amber-400 text-slate-900" : "bg-slate-800 text-slate-400"
                    }`}>
                      {rankIcon}
                    </div>

                    {/* Player Info */}
                    <div>
                      <h3 className={`font-bold text-lg ${index === 0 ? "text-amber-400" : "text-white"}`}>
                        {player.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Player Profile</span>
                        <span className="text-orange-500 text-xs font-black flex items-center gap-1">
                          🔥 {player.currentStreak} Day Streak
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Score / XP Section */}
                  <div className="text-right">
                    <p className="text-2xl font-black text-white tracking-tighter">
                      {player.score.toLocaleString()}
                    </p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total XP</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer Motivation */}
        <div className="mt-12 p-6 bg-slate-900/50 border border-slate-800 rounded-3xl text-center">
          <p className="text-sm text-slate-400 italic">
            "The only person you should try to be better than is the person you were yesterday."
          </p>
        </div>
      </div>
    </div>
  );
};