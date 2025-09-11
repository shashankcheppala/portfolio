// src/components/Education.js
import React, { useEffect } from "react";
import Lottie from "lottie-react";
import bookc from "../lottie/bookc.json";
import GlowCard from "../Data/GlowCard";
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
      className="min-h-screen flex items-center justify-center px-5 md:px-10 overflow-hidden"
      data-aos="fade-up"
    >
      <div className="w-full max-w-screen-xl flex flex-col items-center">
        {/* Title */}
        <SectionTitle>Education</SectionTitle>

        <div className="flex flex-col md:flex-row items-center justify-center mt-12 gap-12 w-full">
          {/* Animation */}
          <div className="md:w-1/2 flex justify-center">
            <Lottie
              animationData={bookc}
              loop={true}
              className="max-w-[350px] md:max-w-[450px] h-auto rounded-xl border border-[#00040f] lottie-3d-effect"
            />
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-8 md:w-1/2">
            {Educations.map((education) => (
              <GlowCard key={education.id} identifier={`education-${education.id}`}>
                <div className="flex flex-col items-center text-center p-6">
                  {/* Big Logo */}
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border border-gray-300 mb-4 shadow-md">
                    <img
                      src={education.logo}
                      alt={education.institution}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-1">
                    {education.institution}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 mb-1">
                    {education.title}
                  </p>
                  <p className="text-xs sm:text-sm text-[#16f2b3]">{education.duration}</p>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
