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
      className="max-w-screen-lg mx-auto relative border-t my-12 lg:my-24 border-[#25213b] overflow-x-hidden overflow-hidden"
      data-aos="fade-up"
    >
      <div className="w-[100px] h-[100px] mb-16 bg-violet-100 rounded-full absolute top-6 left-1/2 -translate-x-1/2 filter blur-3xl opacity-20" />
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4"><div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" /></div>
      </div>

      <div className="flex justify-center mt-10 my-2 lg:py-6">
        <SectionTitle>Education</SectionTitle>
      </div>

      <div className="flex flex-col items-center mt-16 md:flex-row md:justify-center space-y-10 md:space-y-0 md:space-x-10" data-aos="fade-up">
        <div className="md:w-1/2" style={{ perspective: "1000px" }}>
          <Lottie
            animationData={bookc}
            loop
            className="max-w-[300px] md:max-w-[400px] h-auto rounded-xl border border-[#00040f] lottie-3d-effect mb-10"
          />
        </div>

        <div className="flex flex-col gap-8 md:w-3/4 lg:w-1/2">
          {Educations.map((education) => (
            <GlowCard key={education.id} identifier={`education-${education.id}`}>
              <div className="flex flex-col items-center text-center px-4 py-4">
                {/* Big top image like Medium */}
                <img
                  src={education.logo}
                  alt={`${education.institution} logo`}
                  className="w-full h-56 md:h-64 object-contain bg-gray-50 dark:bg-black p-6 rounded-xl shadow-lg mb-4"
                />
                <p className="text-[#16f2b3] text-sm md:text-base mb-2">{education.duration}</p>
                <p className="text-lg md:text-2xl font-semibold uppercase mb-1">{education.title}</p>
                <p className="text-sm md:text-lg">{education.institution}</p>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
