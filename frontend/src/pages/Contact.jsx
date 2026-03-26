export const Contact = () => {
  return (
    <section className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden z-10">
        
        {/* Left Side: Contact Info */}
        <div className="p-8 md:p-12 bg-gradient-to-br from-indigo-600 to-blue-700 text-white flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-black mb-6 tracking-tight">Let's Talk!</h1>
            <p className="text-blue-100 mb-10 leading-relaxed">
              Have questions about your subscription, technical issues, or just want to suggest a new language? Our team is ready to help.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-xl">📍</div>
                <div>
                  <p className="text-xs font-bold text-blue-200 uppercase tracking-widest">Headquarters</p>
                  <p className="font-medium">123 Language Lane, Tech City</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-xl">📧</div>
                <div>
                  <p className="text-xs font-bold text-blue-200 uppercase tracking-widest">Email Us</p>
                  <p className="font-medium">support@linguquest.ai</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex gap-4">
            {/* Social Links placeholders */}
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-all">𝕏</div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-all">IG</div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-all">LI</div>
          </div>
        </div>

        {/* Right Side: The Form */}
        <div className="p-8 md:p-12 bg-slate-900">
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Alex Smith"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email</label>
                <input
                  type="email"
                  placeholder="alex@example.com"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Subject</label>
              <select className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                <option>General Inquiry</option>
                <option>Technical Support</option>
                <option>Billing Question</option>
                <option>Partnership</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Message</label>
              <textarea
                placeholder="Tell us how we can help..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all h-32 resize-none placeholder:text-slate-600"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-400 hover:bg-amber-300 text-slate-900 font-black py-4 rounded-xl shadow-lg shadow-amber-900/20 transition-all transform active:scale-95 mt-4"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};