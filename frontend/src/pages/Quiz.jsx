import { useState } from "react";
import axios from "axios";

export const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [loading, setLoading] = useState(false);

  // Dynamic fields
  const [language, setLanguage] = useState("english");
  const [topic, setTopic] = useState("vocabulary");
  const [level, setLevel] = useState("Beginner");
  const [noOfQuestion, setNoOfQuestion] = useState(10);

  const languages = ["English", "Hindi", "French", "Spanish", "German", "Italian", "Chinese", "Japanese", "Korean", "Arabic", "Russian", "Portuguese", "Turkish", "Bengali", "Urdu", "Tamil", "Telugu", "Gujarati", "Punjabi", "Marathi"];

  const token = localStorage.getItem("token");

  // --- REFINED FETCH FUNCTION ---
  const fetchQuiz = async () => {
    setLoading(true);
    try {
      // Ensure the parameters match exactly what your Spring Boot/Node API expects
      const response = await axios.get("http://localhost:8080/api/quizzes", {
        params: { 
          language: language.toLowerCase(), 
          topic: topic.toLowerCase(), 
          level: level, 
          noOfQuestion: parseInt(noOfQuestion) 
        },
        headers: {
          Authorization: `Bearer ${token}` // Good practice to include token even on GET
        }
      });
      
      setQuestions(response.data);
      setCurrent(0);
      setScore(0);
      setSelected(null);
      setShowResult(false);
    } catch (error) {
      console.error("Error fetching quiz:", error);
      alert("Failed to load quiz. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (option) => setSelected(option);

  const handleNext = async () => {
    if (!selected) {
      alert("Please select an answer!");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8080/api/quizzes/submit",
        {
          questionId: questions[current].questionId,
          selectedAnswer: selected,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { score: newScore, currentStreak, longestStreak } = response.data;
      setScore(newScore);
      setCurrentStreak(currentStreak);
      setLongestStreak(longestStreak);

      setSelected(null);

      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        setShowResult(true);
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const progress = questions.length > 0 ? ((current + 1) / questions.length) * 100 : 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 px-6 py-12">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-3xl text-white">
        
        <h1 className="text-3xl font-black mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-400">
          Quiz Arena
        </h1>

        {/* Dynamic Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase text-teal-400 ml-1">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 transition-all outline-none"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang.toLowerCase()}>{lang}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase text-teal-400 ml-1">Topic</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 transition-all outline-none"
            >
              <option value="vocabulary">Vocabulary</option>
              <option value="grammar">Grammar</option>
              <option value="culture">Culture</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase text-teal-400 ml-1">Difficulty</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 transition-all outline-none"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase text-teal-400 ml-1">Question Count</label>
            <input
              type="number"
              value={noOfQuestion}
              onChange={(e) => setNoOfQuestion(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 transition-all outline-none"
              min="1" max="20"
            />
          </div>
        </div>

        <button
          onClick={fetchQuiz}
          disabled={loading}
          className="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold py-4 rounded-xl shadow-lg transition-all transform active:scale-95 mb-10"
        >
          {loading ? "Generating Quest..." : "START CHALLENGE"}
        </button>

        {/* Active Quiz Section */}
        {!showResult && questions.length > 0 && (
          <div className="space-y-6 animate-in fade-in duration-500">
             {/* Progress Bar Component */}
             <div className="mb-6">
                <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                  <span>QUEST PROGRESS</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3 p-1 border border-slate-700">
                  <div
                    className="bg-gradient-to-r from-teal-500 to-blue-500 h-full rounded-full transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <h2 className="text-xl font-bold text-white mb-6 bg-slate-800/50 p-6 rounded-2xl border border-white/5">
                {questions[current].question}
              </h2>

              <div className="grid grid-cols-1 gap-3">
                {questions[current].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className={`text-left px-6 py-4 rounded-xl border-2 transition-all ${
                      selected === option
                        ? "border-teal-400 bg-teal-400/10 text-white shadow-[0_0_15px_rgba(45,212,191,0.2)]"
                        : "border-slate-700 bg-slate-800/40 hover:border-slate-500 text-slate-300"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center mt-8">
                <div className="flex items-center gap-2 text-orange-400 font-bold">
                  <span>🔥</span> Streak: {currentStreak}
                </div>
                <button
                  onClick={handleNext}
                  className="bg-white text-slate-900 font-black px-10 py-3 rounded-xl hover:bg-teal-50 transition-all transform active:scale-95 shadow-xl"
                >
                  {current + 1 < questions.length ? "NEXT" : "FINISH"}
                </button>
              </div>
          </div>
        )}

        {/* Results Page */}
        {showResult && (
          <div className="text-center py-10 animate-in zoom-in duration-300">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-4xl font-black text-white mb-2">Quest Complete!</h2>
            <p className="text-teal-400 text-xl font-bold mb-6">Final Score: {score}</p>
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 inline-block px-12">
               <p className="text-slate-400 text-sm uppercase font-bold tracking-widest mb-1">Max Streak</p>
               <p className="text-3xl font-black text-orange-500">{longestStreak}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};