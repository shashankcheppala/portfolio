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
  const [input, setInput] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState({ email: false, required: false });

  const checkRequired = () => {
    if (input.email && input.message && input.name) setError((e) => ({ ...e, required: false }));
  };

  const handleSendMail = async (e) => {
    e.preventDefault();
    if (!input.email || !input.message || !input.name) {
      setError((e) => ({ ...e, required: true }));
      return;
    } else if (error.email) {
      return;
    } else {
      setError((e) => ({ ...e, required: false }));
    }

    try {
      const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
      const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
      const userID = process.env.REACT_APP_EMAILJS_USER_ID;
      if (!serviceID || !templateID || !userID) throw new Error("EmailJS env vars are missing");

      const form = e.target;
      await emailjs.sendForm(serviceID, templateID, form, userID);
      toast.success("Message sent successfully!");
      setInput({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Error sending message:", err);
      toast.error("An error occurred while sending the message.");
    }
  };

  return (
    <form onSubmit={handleSendMail} data-aos="fade-up">
      <div className="max-w-screen-lg mx-auto relative my-8 lg:my-10 overflow-x-hidden">
        <p className="font-medium mb-1 text-left ml-6 sm:ml-12 text-pink-500 dark:text-[#16f2b3] text-xl uppercase">
          Contact me
        </p>
        <div className="max-w-3xl text-white rounded-lg border border-[#464c6a] p-3 lg:p-5 m-3 sm:ml-0">
          <p className="text-[#00040f] dark:text-slate-300 text-left">
            I'm open to internships, research, and creative collabs. Drop a note—I'll reply quickly.
          </p>
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-base text-[#00040f] dark:text-slate-300">Your Name: </label>
              <input
                className="bg-[#e1e1e1] dark:bg-transparent w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
                type="text" maxLength="100" required name="user_name"
                onChange={(e) => setInput({ ...input, name: e.target.value })}
                onBlur={checkRequired} value={input.name} aria-label="Your name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-base text-[#00040f] dark:text-slate-300">Your Email: </label>
              <input
                className={`bg-[#e1e1e1] dark:bg-transparent w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2 ${error.email && "border-red-400"}`}
                type="email" maxLength="100" required name="user_email" value={input.email}
                onChange={(e) => setInput({ ...input, email: e.target.value })}
                onBlur={() => { checkRequired(); setError((e) => ({ ...e, email: !isValidEmail(input.email) })); }}
                aria-label="Your email"
              />
              {error.email && <p className="text-sm text-red-400">Please provide a valid email!</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-base text-[#00040f] dark:text-slate-300">Your Message: </label>
              <textarea
                className="bg-[#e1e1e1] dark:bg-transparent w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
                maxLength="500" name="message" required rows="4" value={input.message}
                onChange={(e) => setInput({ ...input, message: e.target.value })}
                onBlur={checkRequired} aria-label="Your message"
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              {error.required && <p className="text-sm text-red-400">All fields are required!</p>}
              <button className="flex items-center bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 px-4 rounded-md transition-all hover:scale-105 duration-300" role="button" type="submit">
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
