// src/components/Contact.js
import { Data } from "../Data/Constants";
import { BiLogoLinkedin } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import Lottie from "lottie-react";
import ContactForm from "./ContactForm";
import mail from "../lottie/mail.json";

const Contact = () => {
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center px-5 md:px-10 overflow-hidden"
    >
      <div className="w-full max-w-screen-xl grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-center">
        {/* Left: Form (kept interactive) */}
        <div className="w-full">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#00040f] dark:text-slate-200 mb-6 text-center lg:text-left">
            Contact
          </h2>
          <ContactForm />
        </div>

        {/* Right: Details + Lottie */}
        <div className="w-full relative">
          {/* Contact cards */}
          <div className="rounded-xl bg-white/60 dark:bg-white/10 border border-gray-200 dark:border-white/10 p-6 md:p-8 mb-6">
            <div className="flex flex-col gap-6">
              {/* Email */}
              <div className="flex items-center gap-4">
                <MdAlternateEmail className="text-gray-800 dark:text-gray-200 bg-[#8b98a5] p-2 rounded-full" size={40} />
                <a
                  href={`mailto:${Data.email}`}
                  className="text-base md:text-lg text-[#00040f] dark:text-slate-300 break-all hover:underline"
                >
                  {Data.email}
                </a>
              </div>
              {/* Phone */}
              <div className="flex items-center gap-4">
                <IoMdCall className="text-gray-800 dark:text-gray-200 bg-[#8b98a5] p-2 rounded-full" size={40} />
                <a
                  href={`tel:${(Data.phone || "").replace(/\s+/g, "")}`}
                  className="text-base md:text-lg text-[#00040f] dark:text-slate-300 hover:underline"
                >
                  {Data.phone}
                </a>
              </div>

              {/* Socials */}
              <div className="flex gap-3 pt-2">
                {Data.github && (
                  <a href={Data.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                    <IoLogoGithub
                      className="bg-[#8b98a5] p-3 rounded-full text-gray-800 dark:text-gray-200 transition-transform hover:scale-110"
                      size={50}
                    />
                  </a>
                )}
                {Data.linkedIn && (
                  <a href={Data.linkedIn} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <BiLogoLinkedin
                      className="bg-[#8b98a5] p-3 rounded-full text-gray-800 dark:text-gray-200 transition-transform hover:scale-110"
                      size={50}
                    />
                  </a>
                )}
                {Data.twitter && (
                  <a href={Data.twitter} target="_blank" rel="noreferrer" aria-label="Twitter / X">
                    <FaXTwitter
                      className="bg-[#8b98a5] p-3 rounded-full text-gray-800 dark:text-gray-200 transition-transform hover:scale-110"
                      size={50}
                    />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Lottie mail animation (kept) */}
          <div className="flex justify-center lg:justify-start">
            <Lottie
              animationData={mail}
              loop
              className="w-full max-w-[360px] sm:max-w-[420px] md:max-w-[480px] h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
