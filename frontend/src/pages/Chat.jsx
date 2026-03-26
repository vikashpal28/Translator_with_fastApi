import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm your Expert Coach. Type a sentence in English, and I'll help you refine it!", score: null }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  
  const token = localStorage.getItem("token");

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (!token) return <Navigate to="/login" replace />;

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    try {
      // Calling your Flask Route
      const response = await axios.post("http://localhost:5000/chat", { 
        message: currentInput 
      });

      // Flask returns { "reply": "...", "score": 85 }
      const aiMessage = { 
        role: "assistant", 
        content: response.data.reply, 
        score: response.data.score 
      };

      setMessages((prev) => [...prev, aiMessage]);

      // OPTIONAL: Update backend XP based on score
      // await axios.post("http://localhost:8080/api/user/add-xp", { points: response.data.score });

    } catch (error) {
      console.error("Flask/Groq Error:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "My brain stalled! Is the Flask server running on port 5000?", score: 0 }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-screen bg-[#020617] flex flex-col md:flex-row overflow-hidden font-sans text-slate-200">
      
      {/* Sidebar: Score Tracking */}
      <div className="hidden md:flex w-72 bg-slate-900 border-r border-slate-800 flex-col p-6">
        <h2 className="text-xl font-black text-white mb-8 tracking-tighter">
          Lingu<span className="text-indigo-500">Quest</span> Mentor
        </h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Session Performance</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your Mentor analyzes grammar, tone, and vocabulary in real-time.
            </p>
          </div>
          
          <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700 text-center">
             <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Last Message Score</p>
             <span className="text-4xl font-black text-white">
                {messages[messages.length - 1]?.score || "--"}
             </span>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`relative max-w-[85%] md:max-w-[70%] p-5 rounded-2xl ${
                msg.role === "user" 
                ? "bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-900/20" 
                : "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none"
              }`}>
                {/* Score Badge for AI feedback */}
                {msg.role === "assistant" && msg.score !== null && (
                  <div className="absolute -top-3 -right-3 bg-teal-500 text-[#020617] text-[10px] font-black px-2 py-1 rounded-md shadow-lg">
                    SCORE: {msg.score}
                  </div>
                )}
                
                {/* Preserve line breaks for AI formatting (1., 2., 3., etc) */}
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
             <div className="flex justify-start items-center gap-2 text-slate-500 text-xs italic ml-2">
                <div className="w-1 h-1 bg-slate-500 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <span>Mentor is analyzing...</span>
             </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* Input Field */}
        <div className="p-6 bg-[#020617] border-t border-slate-800/50">
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex gap-3">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write something (e.g., 'I has a apple')"
              className="flex-1 bg-slate-900 border border-slate-800 text-white rounded-xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className="bg-white text-slate-900 font-bold px-6 rounded-xl hover:bg-indigo-400 hover:text-white transition-all disabled:opacity-30"
            >
              SEND
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};