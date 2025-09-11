// src/components/Home.js
import { useTypewriter, Cursor } from "react-simple-typewriter";
import Lottie from "lottie-react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { SiLeetcode } from "react-icons/si";
import { RiContactsFill } from "react-icons/ri";
import { MdDownload } from "react-icons/md";
import { Data } from "../Data/Constants";
import computer from "../lottie/Computer.json"; // purple laptop animation
import { useState } from "react";

const Home = () => {
  const [typeEffect] = useTypewriter({
    words: [
      "Data Science Engineer",
      "Machine Learning Developer",
      "Python Developer",
    ],
    loop: {},
    typeSpeed: 100,
    deleteSpeed: 60,
    delay: 50,
  });

  const handleButtonClick = (action) => {
    const urlMapping = {
      contact: `mailto:${Data.email}`,
      resume: Data.resume,
    };
    const url = urlMapping[action];
    if (url) {
      window.location.href = url;
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center px-5 md:px-20"
    >
      {/* Left Section - Intro */}
      <div className="flex-1 md:w-1/2 text-left">
        <h3 className="text-[#00040f] dark:text-white text-4xl max-sm:text-2xl">
          Hi, I am
        </h3>
        <h2 className="text-5xl md:text-6xl max-sm:text-3xl mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-600 dark:from-cyan-600 dark:to-slate-300">
          {Data.name}
        </h2>
        <p className="text-3xl md:text-3xl max-sm:text-xl mt-3 bg-clip-text text-transparent bg-gradient-to-r from-[#00040f] to-slate-500 dark:from-slate-500 dark:to-slate-200">
          I am a{" "}
          <span className="inline-block text-pink-500 font-bold">
            {typeEffect}
          </span>
          <Cursor />
        </p>
        <p className="ABOUT text-lg mt-4 max-sm:text-sm text-[#00040f] dark:text-slate-300 max-w-[500px]">
          Motivated B.Tech Computer Science Engineering student with expertise
          in data analysis, machine learning, and AI tools for solving
          real-world problems.
        </p>

        {/* Social Links */}
        <div className="my-8 flex items-center gap-5">
          <a
            href={Data.github}
            target="_blank"
            rel="noreferrer"
            className="transition-all text-pink-500 hover:scale-125 duration-300"
          >
            <BsGithub size={30} />
          </a>
          <a
            href={Data.linkedIn}
            target="_blank"
            rel="noreferrer"
            className="transition-all text-pink-500 hover:scale-125 duration-300"
          >
            <BsLinkedin size={30} />
          </a>
          <a
            href={Data.leetcode}
            target="_blank"
            rel="noreferrer"
            className="transition-all text-pink-500 hover:scale-125 duration-300"
          >
            <SiLeetcode size={30} />
          </a>
        </div>

        {/* Buttons */}
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

      {/* Right Section - Animation */}
      <div className="flex-1 md:w-1/2 flex justify-center mt-10 md:mt-0">
        <Lottie
          animationData={computer}
          loop={true}
          className="max-w-[600px] md:max-w-[700px]"
        />
      </div>
    </section>
  );
};

export default Home;
