// src/components/Education.js
import React, { useEffect, useRef } from "react";
import { Educations } from "../Data/Education";
import AOS from "aos";
import "aos/dist/aos.css";

const Education = () => {
  const refs = useRef([]);

  useEffect(() => {
    AOS.init();

    // Intersection Observer to autoplay when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const iframe = entry.target;
          if (iframe && iframe.contentWindow) {
            if (entry.isIntersecting) {
              iframe.contentWindow.postMessage(
                '{"event":"command","func":"playVideo","args":""}',
                "*"
              );
            } else {
              iframe.contentWindow.postMessage(
                '{"event":"command","func":"pauseVideo","args":""}',
                "*"
              );
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    refs.current.forEach((iframe) => {
      if (iframe) observer.observe(iframe);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="education"
      className="w-full min-h-screen flex flex-col justify-center items-center px-4 py-16"
      data-aos="fade-up"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-[#00040f] dark:text-slate-200 mb-12">
        Education
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl">
        {Educations.map((edu, i) => (
          <div
            key={edu.id}
            className="flex flex-col items-center bg-[#f9f9f9] dark:bg-[#0e1525] rounded-xl shadow-lg overflow-hidden"
            data-aos="fade-up"
          >
            {/* YouTube Video */}
            <div className="w-full h-64 md:h-80 relative">
              <iframe
                ref={(el) => (refs.current[i] = el)}
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${edu.videoId}?enablejsapi=1&mute=1&loop=1&playlist=${edu.videoId}&modestbranding=1&controls=0&rel=0`}
                title={edu.title}
                frameBorder="0"
                allow="autoplay; encrypted-media; picture-in-picture"
              ></iframe>
            </div>

            {/* Text */}
            <div className="p-6 text-center">
              <h3 className="text-xl md:text-2xl font-semibold text-[#00040f] dark:text-slate-100 mb-2">
                {edu.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {edu.duration}
              </p>
              <p className="text-base text-gray-800 dark:text-gray-300">
                {edu.institution}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
