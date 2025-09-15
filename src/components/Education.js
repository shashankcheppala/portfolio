// src/components/Education.js
import React, { useEffect } from "react";
import { Educations } from "../Data/Education";
import AOS from "aos";
import "aos/dist/aos.css";
import SectionTitle from "./SectionTitle";

const Education = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section
      id="education"
      className="max-w-screen-lg mx-auto relative z-50 overflow-hidden min-h-screen flex flex-col justify-center"
      data-aos="fade-up"
    >
      {/* Title */}
      <div className="flex justify-center mt-10 my-2 lg:py-6">
        <SectionTitle>Education</SectionTitle>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 px-6">
        {Educations.map((edu) => (
          <div
            key={edu.id}
            className="bg-white dark:bg-[#0b0f24] shadow-lg rounded-xl p-6 border border-gray-200 dark:border-[#1f2937] hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative w-full h-64 md:h-72 lg:h-80 mb-6 rounded-lg overflow-hidden">
              {edu.videoId ? (
                <iframe
                  className="w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${edu.videoId}?autoplay=1&mute=1&loop=1&playlist=${edu.videoId}&controls=0&modestbranding=1&rel=0`}
                  title={edu.title}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : (
                <img
                  src={edu.logo}
                  alt={edu.institution}
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-slate-200 mb-2 text-center">
              {edu.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-slate-400 text-center mb-1">
              {edu.duration}
            </p>
            <p className="text-base font-medium text-gray-800 dark:text-slate-300 text-center">
              {edu.institution}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
