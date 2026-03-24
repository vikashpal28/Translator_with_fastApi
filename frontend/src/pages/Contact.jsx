export const Contact = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">Get in Touch</h1>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded-lg px-4 py-2"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border rounded-lg px-4 py-2"
          />
          <textarea
            placeholder="Your Message"
            className="w-full border rounded-lg px-4 py-2 h-32"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};
