// src/components/About.js
import { Data } from "../Data/Constants";
import Lottie from "lottie-react";
import first from "../lottie/first.json";

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-5 md:px-10"
    >
      <div className="w-full max-w-screen-lg grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
        {/* Left: Lottie (purple object) */}
        <div className="flex justify-center">
          <Lottie
            animationData={first}
            loop
            className="max-w-[520px] md:max-w-[640px] h-auto"
          />
        </div>

        {/* Right: Text */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#00040f] dark:text-slate-200 mb-6">
            About Me
          </h2>

          <p className="text-base md:text-lg leading-relaxed text-[#00040f] dark:text-slate-300">
            {Data.description}
          </p>

          {/* quick tags (optional – remove if not needed) */}
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300">
              Python
            </span>
            <span className="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300">
              Machine Learning
            </span>
            <span className="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300">
              Data Analytics
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
