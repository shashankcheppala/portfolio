// src/components/Experinces.js
import Lottie from "lottie-react";
import experi from "../lottie/experince.json";
import { Experience } from "../Data/Experience";

const Experinces = () => {
  return (
    <section
      id="experience"
      className="min-h-screen flex items-center justify-center px-5 md:px-10 border-t border-[#25213b] relative overflow-hidden"
    >
      <div className="w-full max-w-screen-lg grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
        {/* Left: Lottie animation */}
        <div className="flex justify-center">
          <Lottie
            animationData={experi}
            loop
            className="max-w-[420px] md:max-w-[520px] h-auto"
          />
        </div>

        {/* Right: Experience list */}
        <div className="rounded-md p-6 md:p-8 bg-white/40 dark:bg-white/5">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#00040f] dark:text-slate-200 mb-6 text-center md:text-left">
            Experiences
          </h2>

          <div className="space-y-6">
            {Experience.map((exp) => (
              <article
                key={exp.id}
                className="p-4 border-l-4 border-pink-500 dark:border-[#16f2b3] bg-white/60 dark:bg-white/10 rounded-sm"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-[#00040f] dark:text-slate-200">
                  {exp.title}
                </h3>
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-400">
                  {exp.company} • {exp.duration}
                </p>

                {Array.isArray(exp.description) && exp.description.length > 0 && (
                  <ul className="list-disc ml-5 mt-2 text-sm md:text-base text-[#00040f] dark:text-slate-300">
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
