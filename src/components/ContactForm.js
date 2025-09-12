import React from "react";

export default function ContactForm() {
  return (
    <section
      id="contact"
      className="max-w-screen-lg mx-auto relative px-5 
                 pt-16 md:pt-24 pb-24 md:pb-32 scroll-mt-24 md:scroll-mt-28 safe-bottom"
    >
      <div className="flex justify-center mb-10">
        <span className="text-[#00040f] dark:text-slate-300 font-extrabold text-4xl md:text-5xl">
        </span>
      </div>

      <div className="bg-[#0f172a] dark:bg-transparent border border-[#353a52] rounded-lg p-6 md:p-10">
        <h3 className="text-green-400 font-bold text-lg mb-4">CONTACT ME</h3>
        <p className="text-gray-300 mb-6">
          If you’d like to collaborate or have questions, feel free to reach out.  
          I’m focused on NLP, computer vision, and end-to-end ML systems (MS Data Analytics @ UIS).
        </p>

        <form
          action="https://formspree.io/f/mnqerjyr"
          method="POST"
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="e.g., Shashank Cheppala"
            required
            className="p-3 rounded bg-[#1e293b] text-white border border-gray-600"
          />
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            className="p-3 rounded bg-[#1e293b] text-white border border-gray-600"
          />
          <textarea
            name="message"
            placeholder="Tell me about your project or question…"
            rows="5"
            required
            className="p-3 rounded bg-[#1e293b] text-white border border-gray-600"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 px-6 rounded-md hover:scale-105 transition-transform"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}
