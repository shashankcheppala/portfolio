import { useTypewriter, Cursor } from "react-simple-typewriter";
import Lottie from "lottie-react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { SiLeetcode } from "react-icons/si";
import computer from "../lottie/Computer.json";
import { Data } from "../Data/Constants";
import { RiContactsFill } from "react-icons/ri";
import { MdDownload } from "react-icons/md";
import { useState } from "react";

const Home = () => {
  const [typeEffect] = useTypewriter({
    words: [
      "Data Analytics",
      "NLP & Computer Vision",
      "Machine Learning",
    ],
    loop: {},
    typeSpeed: 100,
    deleteSpeed: 60,
    delay: 50,
  });

  const [action, setAction] = useState("");

  const handleButtonClick = (action) => {
    const urlMapping = {
      contact: `mailto:${Data.email}`,
      resume: Data.resume,
    };
    const url = urlMapping[action];
    if (url) window.location.href = url;
  };

  return (
    <div>
      <section
        id="home"
        className="p-5 mx-20 mb-10 font-medium font-poppins max-sm:p-2 max-sm:mx-5 flex flex-col md:flex-row items-center"
      >
        <div className="flex-1 md:w-1/2">
          <div className="INTRO">
            <h3 className="text-[#00040f] dark:text-white text-4xl max-sm:text-2xl">
              Hi, I am
            </h3>

            <h2 className="text-5xl md:text-6xl max-sm:text-3xl mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-600 dark:from-cyan-600 dark:to-slate-300">
              {Data.name}
            </h2>

            <p className="text-3xl md:text-3xl max-sm:text-xl mt-3 bg-clip-text text-transparent bg-gradient-to-r from-[#00040f] to-slate-500 dark:from-slate-500 dark:to-slate-200 max-w-[80%] md:max-w-[470px] text-left">
              I work in{" "}
              <span className="inline-block text-3xl md:text-3xl max-sm:text-xl text-pink-500 font-bold -z-50">
                {typeEffect}
              </span>
              <Cursor />
            </p>

            <p className="ABOUT text-lg mt-2 max-sm:text-sm bg-clip-text text-transparent bg-gradient-to-r from-[#00040f] to-slate-500 dark:from-slate-500 dark:to-slate-200 max-w-[80%] md:max-w-[470px] text-left">
              MS Data Analytics student (UIS) focused on building clean data
              pipelines, explainable ML, and usable interfaces. Projects include
              fake-news detection with LLMs and emotion-aware deepfake
              detection.
            </p>

            <div className="my-8 flex items-center gap-5">
              {Data.github && (
                <a
                  href={Data.github}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-all text-pink-500 hover:scale-125 duration-300"
                  aria-label="GitHub"
                >
                  <BsGithub size={30} />
                </a>
              )}
              {Data.linkedin && (
                <a
                  href={Data.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-all text-pink-500 hover:scale-125 duration-300"
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
                  className="transition-all text-pink-500 hover:scale-125 duration-300"
                  aria-label="LeetCode"
                >
                  <SiLeetcode size={30} />
                </a>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button
                className="flex items-center bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 px-4 rounded-md transition-all hover:scale-105 duration-300"
                onClick={() => handleButtonClick("contact")}
              >
                <RiContactsFill size={24} className="mr-2" />
                Contact Me
              </button>

              <button
                className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-md transition-all hover:scale-105 duration-300"
                onClick={() => handleButtonClick("resume")}
              >
                <MdDownload size={24} className="mr-2" />
                Get Resume
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 md:w-1/2 flex justify-center mt-5 md:mt-0 relative button-animation">
          <Lottie
            animationData={computer}
            loop={true}
            className="max-w-[650px] md:max-w-[800px] rounded-xl border border-[#00040f]"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
