export const About = () => {
  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4">🎤 Speech to Text</h2>
          <p className="text-gray-600">
            Record your voice and see instant transcription powered by Google Cloud Speech‑to‑Text.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4">🔊 Text to Speech</h2>
          <p className="text-gray-600">
            Hear AI‑generated responses spoken back to you in multiple languages.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4">🌍 Multilingual Tutor</h2>
          <p className="text-gray-600">
            Switch languages easily and practice English, Hindi, French, Spanish, and more.
          </p>
        </div>
      </div>
    </section>
  );
};
