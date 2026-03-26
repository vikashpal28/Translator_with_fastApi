export const About = () => {
  const features = [
    {
      title: "Speech to Text",
      icon: "🎤",
      desc: "Powered by Google Cloud, our engine transcribes your spoken words in real-time, allowing for hands-free practice.",
      accent: "from-blue-500 to-indigo-600",
    },
    {
      title: "Text to Speech",
      icon: "🔊",
      desc: "Hear the perfect accent. Our AI generates natural, human-like speech so you can master pronunciation.",
      accent: "from-purple-500 to-pink-600",
    },
    {
      title: "Multilingual Tutor",
      icon: "🌍",
      desc: "A true polyglot companion. Practice English, Hindi, French, Spanish, and 20+ other languages seamlessly.",
      accent: "from-amber-400 to-orange-600",
      fullWidth: true,
    },
  ];

  return (
    <section className="min-h-screen bg-[#020617] py-20 px-6 relative overflow-hidden flex flex-col items-center">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-pink-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-5xl w-full z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-[0.3em] mb-4">The Technology</h2>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400">LinguQuest</span> Works
          </h1>
          <p className="mt-6 text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            We combine state-of-the-art AI models with gamified mechanics to create 
            an immersive language environment that actually sticks.
          </p>
        </div>

        {/* Features Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, idx) => (
            <div 
              key={idx} 
              className={`group bg-slate-900/50 border border-slate-800 rounded-3xl p-8 hover:border-slate-700 transition-all duration-300 ${f.fullWidth ? 'md:col-span-2 flex flex-col md:flex-row items-center gap-8' : ''}`}
            >
              <div className={`w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br ${f.accent} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base italic md:not-italic">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="mt-20 p-10 bg-gradient-to-r from-indigo-900/20 to-slate-900 border border-indigo-500/20 rounded-[2rem] text-center">
          <h3 className="text-white font-bold text-xl mb-4">Our Mission</h3>
          <p className="text-slate-300 max-w-3xl mx-auto italic font-serif">
            "To break down language barriers by making fluency a game that everyone wants to play."
          </p>
        </div>
      </div>
    </section>
  );
};