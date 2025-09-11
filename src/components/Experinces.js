// src/components/Experinces.js
import Lottie from "lottie-react";
import experi from "../lottie/experince.json";
import { Experience } from "../Data/Experience";

const Experinces = () => {
  return (
    <section
      id="experience"
      className="min-h-screen flex items-center justify-center px-5 md:px-10 overflow-hidden"
    >
      <div className="w-full max-w-screen-xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
        {/* Left: Lottie animation (kept) */}
        <div className="flex justify-center md:justify-start">
          <Lottie
            animationData={experi}
            loop
            className="w-full max-w-[420px] sm:max-w-[520px] md:max-w-[600px] h-auto"
          />
        </div>

        {/* Right: Experience list (interactive-ish hover accents) */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#00040f] dark:text-slate-200 mb-6 text-center md:text-left">
            Experiences
          </h2>

          <div className="space-y-5">
            {Experience.map((exp) => (
              <article
                key={exp.id}
                className="group rounded-md p-5 bg-white/60 dark:bg-white/10 transition-transform duration-200 hover:-translate-y-0.5 border border-gray-200 dark:border-white/10"
              >
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="text-xl md:text-2xl font-semibold text-[#00040f] dark:text-slate-100">
                    {exp.title}
                  </h3>
                  <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                    • {exp.company}
                  </span>
                </div>

                <p className="text-xs md:text-sm text-pink-600 dark:text-[#16f2b3] mt-1">
                  {exp.duration}
                </p>

                {Array.isArray(exp.description) && exp.description.length > 0 && (
                  <ul className="list-disc ml-5 mt-3 text-sm md:text-base text-[#00040f] dark:text-slate-300 leading-relaxed">
                    {exp.description.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experinces;
