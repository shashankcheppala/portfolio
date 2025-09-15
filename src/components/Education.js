import React, { useEffect, useRef, useState } from "react";
import { Educations } from "../Data/Education";
import AOS from "aos";
import "aos/dist/aos.css";
import SectionTitle from "./SectionTitle";

const ytSrc = (id) =>
  `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&rel=0&playsinline=1`;

export default function Education() {
  const [visibleMap, setVisibleMap] = useState({});
  const refs = useRef({});

  useEffect(() => {
    AOS.init();
  }, []);

  // Load & autoplay video only when card is in view
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        setVisibleMap((prev) => {
          const next = { ...prev };
          for (const e of entries) {
            const id = e.target.getAttribute("data-edu-id");
            if (e.isIntersecting && e.intersectionRatio >= 0.35) next[id] = true;
          }
          return next;
        });
      },
      { threshold: [0, 0.35, 0.75] }
    );

    Educations.forEach((edu) => {
      const el = refs.current[edu.id];
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return (
    <section
      id="education"
      className="max-w-screen-lg mx-auto relative z-50 overflow-hidden min-h-screen flex flex-col justify-center px-6 pt-16 md:pt-24 pb-24 md:pb-28 scroll-mt-24 md:scroll-mt-28"
      data-aos="fade-up"
    >
      <div className="flex justify-center">
        <SectionTitle>Education</SectionTitle>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
        {Educations.map((edu) => {
          const visible = !!visibleMap[edu.id];

          return (
            <div
              key={edu.id}
              ref={(el) => (refs.current[edu.id] = el)}
              data-edu-id={String(edu.id)}
              className="rounded-xl bg-white/70 dark:bg-[#0b0f24]/60 shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur border border-transparent"
            >
              {/* Media */}
              <div className="relative w-full h-64 md:h-72 lg:h-80 overflow-hidden rounded-t-xl">
                {edu.videoId ? (
                  visible ? (
                    <iframe
                      className="w-full h-full"
                      src={ytSrc(edu.videoId)}
                      title={edu.title}
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      loading="lazy"
                    />
                  ) : (
                    // Placeholder before visible
                    <div className="w-full h-full bg-[#0b0f24] flex items-center justify-center">
                      <span className="text-slate-300 text-sm md:text-base opacity-80">
                        {edu.institution}
                      </span>
                    </div>
                  )
                ) : edu.logo ? (
                  <img
                    src={edu.logo}
                    alt={edu.institution}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-[#0b0f24]" />
                )}
              </div>

              {/* Text */}
              <div className="p-6 text-center">
                <p className="text-xs sm:text-sm text-[#16f2b3] mb-2">
                  {edu.duration}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-slate-200 mb-1">
                  {edu.title}
                </h3>
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                  {edu.institution}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
