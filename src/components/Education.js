// src/components/Education.js
import React from "react";
import { Educations } from "../Data/Education";

const Education = () => {
  return (
    <section
      id="education"
      className="py-20 px-5 bg-white dark:bg-[#000000] text-gray-900 dark:text-white"
    >
      <h2 className="text-4xl font-bold text-center mb-12">Education</h2>
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 place-items-center">
        {Educations.map((edu) => (
          <div
            key={edu.id}
            className="bg-white dark:bg-[#111] shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden w-[90%] max-w-[400px]"
          >
            {/* Large Logo (like Medium image) */}
            <img
              src={edu.logo}
              alt={edu.institution}
              className="w-full h-56 object-contain bg-gray-50 dark:bg-black p-6"
            />

            {/* Details below image */}
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold">{edu.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {edu.duration}
              </p>
              <p className="text-base font-medium mt-3">{edu.institution}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
