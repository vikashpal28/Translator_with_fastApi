import { useState } from "react";
import axios from "axios";

export const Translator = () => {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [language, setLanguage] = useState("es"); // default Spanish
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert("Please enter text to translate.");
      return;
    }

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
      // console.log(response);
     
      setTranslated(response.data.translate);
      //  console.log(translated);
    } catch (error) {
      console.error("Translation error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-indigo-700 mb-6">
          Translator Section
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Box */}
          <div className="flex flex-col space-y-3">
            <div
              disabled
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option >Write The Text Here</option>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text..."
              rows="6"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Output Box */}
          <div className="flex flex-col space-y-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {Object.entries(LANGUAGES).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
            <div className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 h-[160px]">
              {translated ? <p>{translated}</p> : <p>Translation will appear here...</p>}
            </div>
          </div>
        </form>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-amber-400 hover:bg-amber-500 text-black font-semibold px-6 py-2 rounded-lg shadow-md transition transform hover:scale-105"
          >
            Translate
          </button>
        </div>
      </div>
    </div>
  );
};
