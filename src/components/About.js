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
      className="min-h-screen flex items-center justify-center px-5 md:px-10 overflow-hidden" // full screen
      data-aos="fade-up"
    >
      <div className="w-full max-w-screen-xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
        {/* Left: Lottie animation */}
        <div className="flex justify-center md:justify-start" style={{ perspective: "1000px" }}>
          <Lottie
            animationData={first}
            loop
            className="w-full max-w-[420px] sm:max-w-[520px] md:max-w-[600px] h-auto lottie-3d-effect"
          />
        </div>

        {/* Right: About content */}
        <div className="button-animation border border-gray-300 rounded-md p-6 md:p-8">
          <h2 className="mb-4 font-bold text-pink-500 dark:text-[#16f2b3] text-2xl md:text-3xl text-center uppercase">
            About Me
          </h2>
          <p className="text-[#00040f] dark:text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed text-justify">
            {Data.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
