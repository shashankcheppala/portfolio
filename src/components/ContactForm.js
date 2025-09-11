// src/components/ContactForm.js
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutgoingMail } from "react-icons/md";
import { isValidEmail } from "../Data/CheckEmail";
import emailjs from "@emailjs/browser";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactForm = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const [input, setInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState({
    email: false,
    required: false,
  });

  const checkRequired = () => {
    if (input.email && input.message && input.name) {
      setError((e) => ({ ...e, required: false }));
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();

    if (!input.email || !input.message || !input.name) {
      setError((e) => ({ ...e, required: true }));
      return;
    }
    if (error.email) return;

    setError((e) => ({ ...e, required: false }));

    try {
      // Use your own EmailJS credentials from .env
      const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
      const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

      if (!serviceID || !templateID || !publicKey) {
        throw new Error(
          "Missing EmailJS env vars. Please set REACT_APP_EMAILJS_SERVICE_ID, REACT_APP_EMAILJS_TEMPLATE_ID, REACT_APP_EMAILJS_PUBLIC_KEY."
        );
      }

      const form = e.target;
      await emailjs.sendForm(serviceID, templateID, form, publicKey);

      toast.success("Message sent successfully!");
      setInput({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Error sending message:", err);
      toast.error("An error occurred while sending the message.");
    }
  };

  return (
    <form onSubmit={handleSendMail} data-aos="fade-up">
      <div
        className="max-w-screen-lg mx-auto relative my-8 lg:my-10 overflow-x-hidden overflow-hidden"
        data-aos="fade-up"
      >
        <p className="font-medium mb-1 text-left ml-6 sm:ml-12 text-pink-500 dark:text-[#16f2b3] text-xl uppercase">
          Contact me
        </p>

        <div
          className="max-w-3xl text-white rounded-lg border border-[#464c6a] p-3 lg:p-5 m-3 sm:ml-0"
          data-aos="fade-up"
        >
          <p className="text-[#00040f] dark:text-slate-300 text-left">
            If you’d like to collaborate or have questions, feel free to reach out.
            I’m focused on NLP, computer vision, and end-to-end ML systems (MS Data
            Analytics @ UIS).
          </p>

          <div className="mt-6 flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-base text-[#00040f] dark:text-slate-300">
                Your Name:
              </label>
              <input
                className="bg-[#e1e1e1] dark:bg-transparent w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
                type="text"
                maxLength="100"
                required
                onChange={(e) => setInput({ ...input, name: e.target.value })}
                onBlur={checkRequired}
                value={input.name}
                name="user_name"
                placeholder="e.g., Shashank Cheppala"
                aria-label="Your name"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-base text-[#00040f] dark:text-slate-300">
                Your Email:
              </label>
              <input
                className={`bg-[#e1e1e1] dark:bg-transparent w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2 ${
                  error.email ? "border-red-400" : ""
                }`}
                type="email"
                maxLength="100"
                required
                value={input.email}
                onChange={(e) => setInput({ ...input, email: e.target.value })}
                onBlur={() => {
                  checkRequired();
                  setError((e) => ({ ...e, email: !isValidEmail(input.email) }));
                }}
                name="user_email"
                placeholder="you@example.com"
                aria-label="Your email"
              />
              {error.email && (
                <p className="text-sm text-red-400">
                  Please provide a valid email!
                </p>
              )}
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label className="text-base text-[#00040f] dark:text-slate-300">
                Your Message:
              </label>
              <textarea
                className="bg-[#e1e1e1] dark:bg-transparent w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
                maxLength="500"
                name="message"
                required
                onChange={(e) => setInput({ ...input, message: e.target.value })}
                onBlur={checkRequired}
                rows="4"
                value={input.message}
                placeholder="Tell me about your project or question…"
                aria-label="Your message"
              />
            </div>

            {/* Submit */}
            <div className="flex flex-col items-center gap-2">
              {error.required && (
                <p className="text-sm text-red-400">
                  Name, Email and Message are required!
                </p>
              )}
              <button
                className="flex items-center bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 px-4 rounded-md transition-all hover:scale-105 duration-300"
                role="button"
                type="submit"
                aria-label="Send message"
              >
                <MdOutgoingMail size={24} className="mr-2" />
                Send message
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
