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

  // Dynamic fields
  const [language, setLanguage] = useState("english");
  const [topic, setTopic] = useState("vocabulary");
  const [level, setLevel] = useState("Beginner");
  const [noOfQuestion, setNoOfQuestion] = useState(10);

  const languages = [
    "English",
    "Hindi",
    "French",
    "Spanish",
    "German",
    "Italian",
    "Chinese",
    "Japanese",
    "Korean",
    "Arabic",
    "Russian",
    "Portuguese",
    "Turkish",
    "Bengali",
    "Urdu",
    "Tamil",
    "Telugu",
    "Gujarati",
    "Punjabi",
    "Marathi",
  ];

  const token = localStorage.getItem("token");

  const fetchQuiz = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/quizzes", {
        params: { language, topic, level, noOfQuestion },
      });
      setQuestions(response.data);
      setCurrent(0);
      setScore(0);
      setSelected(null);
      setShowResult(false);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  const handleOptionClick = (option) => {
    setSelected(option);
  };

  const handleNext = async () => {
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
        },
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

  // Progress percentage
  const progress =
    questions.length > 0 ? ((current + 1) / questions.length) * 100 : 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 px-6 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold text-teal-700 mb-6 text-center">
          Dynamic Vocabulary Quiz
        </h1>

        {/* Settings Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang.toLowerCase()}>
                {lang}
              </option>
            ))}
          </select>

          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="vocabulary">Vocabulary</option>
            <option value="grammar">Grammar</option>
          </select>

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <input
            type="number"
            value={noOfQuestion}
            onChange={(e) => setNoOfQuestion(e.target.value)}
            className="border rounded-lg px-4 py-2"
            min="1"
            max="20"
          />
        </div>

        <div className="flex justify-center mb-6">
          <button
            onClick={fetchQuiz}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition transform hover:scale-105"
          >
            Start Quiz
          </button>
        </div>

        {/* Quiz Section */}
        {!showResult ? (
          questions.length > 0 ? (
            <div>
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>
                    Question {current + 1} of {questions.length}
                  </span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-teal-500 h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <h2 className="text-lg font-semibold mb-4">
                {questions[current].question}
              </h2>
              <div className="flex flex-col space-y-3">
                {questions[current].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className={`px-4 py-2 rounded-lg border ${
                      selected === option
                        ? "bg-teal-500 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button
                onClick={handleNext}
                className="mt-6 bg-amber-400 hover:bg-amber-500 text-black font-semibold px-6 py-2 rounded-lg shadow-md transition transform hover:scale-105"
              >
                {current + 1 < questions.length ? "Next" : "Finish"}
              </button>
            </div>
          ) : (
            <p className="text-center text-gray-600">
              No questions loaded yet.
            </p>
          )
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-bold text-green-600 mb-4">
              Quiz Completed!
            </h2>
            <p className="text-lg">
              Your Score: {score} / {questions.length * 10}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
