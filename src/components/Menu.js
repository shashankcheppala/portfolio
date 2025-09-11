import { useState, useEffect } from "react";

const Menu = () => {
  const [theme, setTheme] = useState("light"); // start with light

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div>
      {/* Mobile Menu */}
      <div className="text-lg tracking-wider translate-x-[180px] leading-10 border shadow-xl border-text-slate-300 text-[#00040f] dark:text-slate-300 mt-5 max-w-[150px] p-3 rounded-lg hidden bg-gradient-to-tl from-[#e1e1e1] to-[#fff] dark:from-[#00040F] dark:to-[#0B274C] max-sm:block">
        <ul className="pl-2">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experiences</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        {/* Dark/Light Toggle */}
        <button
          onClick={toggleTheme}
          className="mt-4 w-full py-1 px-2 rounded-md bg-pink-500 text-white text-sm hover:bg-pink-600 transition-all"
        >
          {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
        </button>
      </div>
    </div>
  );
};

export default Menu;
