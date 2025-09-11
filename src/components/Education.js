// src/components/Education.js
import Lottie from "lottie-react";
import bookc from "../lottie/bookc.json";
import { Educations } from "../Data/Education";

const Education = () => {
  return (
    <section
      id="education"
      className="min-h-screen flex items-center justify-center px-5 md:px-10 overflow-hidden"
    >
      <div className="w-full max-w-screen-xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
        {/* Left: Lottie animation */}
        <div className="flex justify-center md:justify-start">
          <Lottie
            animationData={bookc}
            loop
            className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] h-auto"
          />
        </div>

        {/* Right: Education list */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#00040f] dark:text-slate-200 mb-6 text-center md:text-left">
            Education
          </h2>

          <div className="space-y-8">
            {Educations.map((edu) => (
              <article
                key={edu.id}
                className="group text-center md:text-left transition-transform duration-200 hover:-translate-y-0.5"
              >
                {/* Big logo */}
                <div className="flex justify-center md:justify-start mb-4">
                  <img
                    src={edu.logo}
                    alt={edu.institution}
                    className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain rounded-full shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Title + institution */}
                <h3 className="text-xl md:text-2xl font-semibold text-[#00040f] dark:text-slate-100">
                  {edu.title}
                </h3>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">
                  {edu.institution}
                </p>
                <p className="text-sm md:text-base text-pink-600 dark:text-[#16f2b3] mt-1">
                  {edu.duration}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
