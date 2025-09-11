// src/components/About.js
import { Data } from "../Data/Constants";
import Lottie from "lottie-react";
import AOS from "aos";
import "aos/dist/aos.css";
import first from "../lottie/first.json";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-5 md:px-10 border-t border-[#25213b] relative overflow-hidden"
      data-aos="fade-down"
    >
      <div className="w-full max-w-screen-lg grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
        {/* Left: Lottie animation */}
        <div className="flex justify-center">
          <Lottie
            animationData={first}
            loop
            className="max-w-[420px] md:max-w-[520px] h-auto"
          />
        </div>

        {/* Right: About text */}
        <div className="button-animation border-gray-300 rounded-md p-6 md:p-8 bg-white/40 dark:bg-white/5">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#00040f] dark:text-slate-200 mb-6 text-center md:text-left">
            About Me
          </h2>
          <div className="mb-3 font-semibold text-pink-500 dark:text-[#16f2b3] text-lg md:text-xl uppercase text-center md:text-left">
            Who I am?
          </div>
          <p className="text-[#00040f] dark:text-slate-300 text-base md:text-lg leading-relaxed text-center md:text-left">
            {Data.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
