import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const Feedback = () => {
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("feature"); // New: Category selection
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    try {
      await axios.post(
        "http://localhost:8080/api/v2/feedback",
        { message, category },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubmitted(true);
      setMessage("");
    } catch (error) {
      console.error("Feedback error:", error);
      alert("Failed to send feedback. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-lg z-10">
        {!submitted ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-rose-500/10 rounded-2xl mb-4">
                <span className="text-3xl">✉️</span>
              </div>
              <h1 className="text-3xl font-black text-white">Share Your Thoughts</h1>
              <p className="text-slate-400 mt-2">Help us build the ultimate learning quest</p>
            </div>

            {/* Category Selection */}
            <div className="flex gap-2 mb-6">
              {["feature", "bug", "other"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold uppercase tracking-tighter transition-all ${
                    category === cat
                      ? "bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-900/20"
                      : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500"
                  }`}
                >
                  {cat === "feature" ? "💡 Idea" : cat === "bug" ? "🐞 Bug" : "💬 General"}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what's on your mind..."
                  rows="5"
                  className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !message.trim()}
                className={`w-full py-4 rounded-2xl font-black text-[#020617] transition-all transform active:scale-95 ${
                  message.trim() 
                    ? "bg-amber-400 hover:bg-amber-300 shadow-lg shadow-amber-900/20" 
                    : "bg-slate-700 text-slate-500 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? "SENDING..." : "SUBMIT FEEDBACK"}
              </button>
            </form>
          </div>
        ) : (
          /* SUCCESS STATE */
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center shadow-2xl animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✨</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-2">Message Received!</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Thanks for the feedback. Our team reviews every suggestion to make LinguQuest better for everyone.
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-colors"
            >
              SEND ANOTHER
            </button>
          </div>
        )}
      </div>
    </div>
  );
};