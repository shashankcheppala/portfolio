// src/components/Skills.js
import Marquee from "react-fast-marquee";
import LazyLoad from "react-lazy-load";
import { skillsData } from "../Data/SkillsData";
import { skillsImage } from "../Data/SkilsImage";

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen flex items-center justify-center px-5 md:px-10 overflow-hidden"
    >
      <div className="w-full max-w-screen-xl">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#00040f] dark:text-slate-200 mb-10 text-center md:text-left">
          Skills
        </h2>

        {/* Marquee row 1 (LTR) */}
        <div className="w-full mb-10">
          <Marquee
            speed={70}
            pauseOnHover
            gradient={false}
            className="py-2"
          >
            {skillsData.map((skill, id) => (
              <div
                key={`row1-${id}`}
                className="w-36 min-w-fit h-fit flex flex-col items-center justify-center transition-transform duration-300 m-3 sm:m-5 rounded-lg hover:scale-[1.12] cursor-pointer"
              >
                <div className="h-full w-full rounded-lg border border-[#1f223c] bg-[#11152c] dark:bg-[#11152c]">
                  <div className="flex justify-center">
                    <div className="w-3/4">
                      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-3 p-6">
                    <div className="h-10 sm:h-12">
                      <LazyLoad height={48} offset={100}>
                        <img
                          src={skillsImage(skill)}
                          alt={skill}
                          width={44}
                          height={44}
                          className="h-full w-auto rounded-lg"
                          loading="lazy"
                        />
                      </LazyLoad>
                    </div>
                    <p className="text-white text-sm sm:text-lg">{skill}</p>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>

        {/* Marquee row 2 (RTL for variation) */}
        <div className="w-full">
          <Marquee
            speed={65}
            pauseOnHover
            gradient={false}
            direction="right"
            className="py-2"
          >
            {skillsData.map((skill, id) => (
              <div
                key={`row2-${id}`}
                className="w-36 min-w-fit h-fit flex flex-col items-center justify-center transition-transform duration-300 m-3 sm:m-5 rounded-lg hover:scale-[1.12] cursor-pointer"
              >
                <div className="h-full w-full rounded-lg border border-[#1f223c] bg-[#11152c] dark:bg-[#11152c]">
                  <div className="flex justify-center">
                    <div className="w-3/4">
                      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-3 p-6">
                    <div className="h-10 sm:h-12">
                      <LazyLoad height={48} offset={100}>
                        <img
                          src={skillsImage(skill)}
                          alt={skill}
                          width={44}
                          height={44}
                          className="h-full w-auto rounded-lg"
                          loading="lazy"
                        />
                      </LazyLoad>
                    </div>
                    <p className="text-white text-sm sm:text-lg">{skill}</p>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default Skills;
