// src/components/Education.js
import React, { useEffect } from "react";
import { Educations } from "../Data/Education";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Education() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section
      id="education"
      className="min-h-screen flex flex-col justify-center items-center px-5 md:px-10"
      data-aos="fade-up"
    >
      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-[#00040f] dark:text-slate-200 mb-12 text-center">
        Education
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-screen-xl">
        {Educations.map((edu) => (
          <div
            key={edu.id}
            className="bg-white dark:bg-[#0b0b0b] border border-gray-200/70 dark:border-white/10 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
          >
            {/* Big Image */}
            <div className="h-64 md:h-80 w-full overflow-hidden">
              <img
                src={edu.logo}
                alt={edu.title}
                className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Text */}
            <div className="p-6 text-center">
              <p className="text-[#16f2b3] text-sm md:text-base font-medium">
                {edu.duration}
              </p>
              <h3 className="text-xl md:text-2xl font-semibold text-[#00040f] dark:text-slate-200 mt-2">
                {edu.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2">
                {edu.institution}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
