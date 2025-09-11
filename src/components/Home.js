// src/components/Home.js
import { useTypewriter, Cursor } from "react-simple-typewriter";
import Lottie from "lottie-react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { SiLeetcode } from "react-icons/si";
import { RiContactsFill } from "react-icons/ri";
import { MdDownload } from "react-icons/md";
import { Data } from "../Data/Constants";
import computer from "../lottie/Computer.json"; // purple laptop animation

const Home = () => {
  const [typeEffect] = useTypewriter({
    words: ["Data Science Engineer", "Machine Learning Developer", "Python Developer"],
    loop: {},
    typeSpeed: 100,
    deleteSpeed: 60,
    delay: 50,
  });

  const handleButtonClick = (action) => {
    const url = action === "contact" ? `mailto:${Data.email}` : Data.resume;
    if (url) window.location.href = url;
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-5 md:px-10 overflow-hidden" // full screen, no borders/lines
    >
      <div className="w-full max-w-screen-xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
        {/* Left: Intro */}
        <div className="text-left">
          <h3 className="text-[#00040f] dark:text-white text-3xl sm:text-4xl">
            Hi, I am
          </h3>

          <h1 className="mt-2 text-4xl sm:text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-600 dark:from-cyan-600 dark:to-slate-300">
            {Data.name}
          </h1>

          <p className="mt-3 text-2xl sm:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-[#00040f] to-slate-500 dark:from-slate-500 dark:to-slate-200">
            I am a{" "}
            <span className="inline-block text-pink-500 font-bold">
              {typeEffect}
            </span>
            <Cursor />
          </p>

          <p className="mt-4 text-base sm:text-lg text-[#00040f] dark:text-slate-300 max-w-[42rem]">
            Motivated B.Tech Computer Science Engineering student with expertise in
            data analysis, machine learning, and AI tools for solving real-world problems.
          </p>

          {/* Socials */}
          <div className="mt-8 flex items-center gap-5">
            {Data.github && (
              <a
                href={Data.github}
                target="_blank"
                rel="noreferrer"
                className="transition-transform text-pink-500 hover:scale-125 duration-300"
                aria-label="GitHub"
              >
                <BsGithub size={30} />
              </a>
            )}
            {Data.linkedIn && (
              <a
                href={Data.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="transition-transform text-pink-500 hover:scale-125 duration-300"
                aria-label="LinkedIn"
              >
                <BsLinkedin size={30} />
              </a>
            )}
            {Data.leetcode && (
              <a
                href={Data.leetcode}
                target="_blank"
                rel="noreferrer"
                className="transition-transform text-pink-500 hover:scale-125 duration-300"
                aria-label="LeetCode"
              >
                <SiLeetcode size={30} />
              </a>
            )}
          </div>

          {/* Actions */}
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button
              className="flex items-center bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2.5 px-4 rounded-md transition-transform hover:scale-105 duration-300"
              onClick={() => handleButtonClick("contact")}
            >
              <RiContactsFill size={22} className="mr-2" />
              Contact Me
            </button>

            <button
              className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 px-4 rounded-md transition-transform hover:scale-105 duration-300 disabled:opacity-50"
              onClick={() => handleButtonClick("resume")}
              disabled={!Data.resume}
              title={Data.resume ? "Download resume" : "Add your resume link in Constants.js"}
            >
              <MdDownload size={22} className="mr-2" />
              Get Resume
            </button>
          </div>
        </div>

        {/* Right: Lottie animation (kept interactive/looping) */}
        <div className="flex justify-center md:justify-end">
          <Lottie
            animationData={computer}
            loop
            className="w-full max-w-[520px] sm:max-w-[600px] md:max-w-[680px] h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
