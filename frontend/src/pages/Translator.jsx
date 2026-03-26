import { useState } from "react";
import axios from "axios";

export const Translator = () => {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [language, setLanguage] = useState("es");
  const [isTranslating, setIsTranslating] = useState(false);
  const token = localStorage.getItem("token");

  const LANGUAGES = {
    af: "Afrikaans", ar: "Arabic", bn: "Bengali", bg: "Bulgarian",
    "zh-cn": "Chinese (Simplified)", "zh-tw": "Chinese (Traditional)",
    hr: "Croatian", cs: "Czech", da: "Danish", nl: "Dutch", en: "English",
    et: "Estonian", fi: "Finnish", fr: "French", de: "German", el: "Greek",
    gu: "Gujarati", he: "Hebrew", hi: "Hindi", hu: "Hungarian", is: "Icelandic",
    id: "Indonesian", it: "Italian", ja: "Japanese", kn: "Kannada", ko: "Korean",
    lv: "Latvian", lt: "Lithuanian", ms: "Malay", ml: "Malayalam", mr: "Marathi",
    ne: "Nepali", no: "Norwegian", fa: "Persian", pl: "Polish", pt: "Portuguese",
    pa: "Punjabi", ro: "Romanian", ru: "Russian", sr: "Serbian", si: "Sinhala",
    sk: "Slovak", sl: "Slovenian", es: "Spanish", sw: "Swahili", sv: "Swedish",
    ta: "Tamil", te: "Telugu", th: "Thai", tr: "Turkish", uk: "Ukrainian",
    ur: "Urdu", vi: "Vietnamese",
  };

  const handleCopy = () => {
    if (translated) {
      navigator.clipboard.writeText(translated);
      alert("Copied to clipboard!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsTranslating(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/translate/response",
        { text, target_lang: language },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTranslated(response.data.translate);
    } catch (error) {
      console.error("Translation error:", error);
      alert("Translation failed. Check your connection.");
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-indigo-600/10 blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-5xl z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white tracking-tight mb-3">
            Universal <span className="text-indigo-400">Translator</span>
          </h1>
          <p className="text-slate-400">Break barriers and expand your vocabulary instantly.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative">
          
          {/* Input Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4 px-2">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Source: Auto-Detect</span>
              <button 
                onClick={() => setText("")}
                className="text-xs text-slate-500 hover:text-white transition-colors"
              >
                Clear
              </button>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste text here..."
              className="w-full h-64 bg-transparent text-xl text-white placeholder:text-slate-600 resize-none outline-none custom-scrollbar"
            />
          </div>

          {/* Central Action Icon (Desktop only) */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-indigo-600 rounded-full items-center justify-center shadow-lg border-4 border-[#020617]">
             <span className="text-white text-xl">⇄</span>
          </div>

          {/* Output Panel */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-sm">
            <div className="flex justify-between items-center mb-4 px-2">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-xs font-bold uppercase tracking-widest text-indigo-400 outline-none cursor-pointer hover:text-indigo-300"
              >
                {Object.entries(LANGUAGES).map(([code, name]) => (
                  <option key={code} value={code} className="bg-slate-900 text-white">
                    Target: {name}
                  </option>
                ))}
              </select>
              {translated && (
                <button 
                  onClick={handleCopy}
                  className="text-xs text-slate-500 hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>📋</span> Copy
                </button>
              )}
            </div>
            <div className="w-full h-64 text-xl text-indigo-100 overflow-y-auto custom-scrollbar">
              {isTranslating ? (
                <div className="flex items-center gap-2 text-slate-500 animate-pulse">
                   <span>Translating...</span>
                </div>
              ) : translated ? (
                <p className="leading-relaxed">{translated}</p>
              ) : (
                <p className="text-slate-600 italic">Translation will appear here...</p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={handleSubmit}
            disabled={isTranslating}
            className="group relative px-12 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-indigo-900/40 transition-all transform active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isTranslating ? "PROCESSING..." : "ACTIVATE TRANSLATION"}
              {!isTranslating && <span className="group-hover:translate-x-1 transition-transform">→</span>}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
          </button>
        </div>
      </div>
    </div>
  );
};