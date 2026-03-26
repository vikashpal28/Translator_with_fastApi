import { NavLink } from "react-router-dom";

export const Features = () => {
  const featureList = [
    {
      title: "Quiz Arena",
      path: "/quiz",
      desc: "Challenge yourself with interactive quests and climb the leaderboard.",
      icon: "🎯",
      color: "from-green-500 to-emerald-700",
      shadow: "shadow-green-900/20",
      border: "border-green-500/30",
    },
    {
      title: "AI Translator",
      path: "/translator",
      desc: "Instantly decode any phrase and add it to your personal grimoire.",
      icon: "🌐",
      color: "from-blue-500 to-indigo-700",
      shadow: "shadow-blue-900/20",
      border: "border-blue-500/30",
    },
    {
      title: "Chat Mentor",
      path: "/chat",
      desc: "Practice real-time conversations with our supportive AI guide.",
      icon: "💬",
      color: "from-teal-500 to-cyan-700",
      shadow: "shadow-teal-900/20",
      border: "border-teal-500/30",
    },
    {
      title: "Feedback Hub",
      path: "/feedback",
      desc: "Report bugs or suggest new features to earn 'Contributor' XP.",
      icon: "✉️",
      color: "from-pink-500 to-rose-700",
      shadow: "shadow-pink-900/20",
      border: "border-pink-500/30",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#020617] py-20 px-6 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Choose Your <span className="text-amber-400">Activity</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Select a mode to start earning XP. Every interaction brings you one step closer to fluency.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureList.map((item, index) => (
            <NavLink key={index} to={item.path} className="group">
              <div className={`h-full bg-slate-900 border ${item.border} rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-300 transform group-hover:-translate-y-3 group-hover:shadow-2xl ${item.shadow}`}>
                
                {/* Icon Circle */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl mb-6 shadow-inner`}>
                  {item.icon}
                </div>

                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h2>
                
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.desc}
                </p>

                {/* "Play" Action Hint */}
                <div className="mt-auto pt-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">
                    Start Entry →
                  </span>
                </div>
              </div>
            </NavLink>
          ))}
        </div>

        {/* Pro Tip Box */}
        <div className="mt-16 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-2xl">💡</span>
            <p className="text-slate-400 text-sm">
              <strong>Pro Tip:</strong> Completing a <strong>Quiz Arena</strong> session gives double XP on weekends!
            </p>
          </div>
          <button className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-tighter">
            View Schedule
          </button>
        </div>
      </div>
    </div>
  );
};