import { CgMenuGridR } from "react-icons/cg";
import { HiMoon, HiSun } from "react-icons/hi";
import Menu from "./Menu";
import { useState, useEffect } from "react";

const NavBar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [screen, setScreen] = useState(typeof window !== "undefined" ? window.innerWidth < 900 : false);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  useEffect(() => {
    const updateScreenSize = () => setScreen(window.innerWidth < 900);
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  return (
    <section className="NAVBAR p-5 mx-20 mt-5 font-['Poppins'] max-sm:p-2 max-sm:mx-5 max-sm:max-h-[48px]">
      <div className="NAVBAR flex justify-between capitalize">
        <div className="LOGO flex items-center">
          <a href="#" className="text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent dark:text-cyan-500 max-sm:text-2xl">
            {"Shanks{</>}"}
          </a>
          {screen && (
            <button onClick={toggleTheme} className={` mt-1 px-6 ${theme === "dark" ? "text-white" : "text-black"}`} aria-label="Toggle theme">
              {theme === "dark" ? <HiMoon className="-translate-y-1 text-2xl" /> : <HiSun className="-translate-y-1 text-2xl" />}
            </button>
          )}
        </div>
        <nav className="NAVLINKS text-[20px] translate-x-[80px] max-sm:hidden flex gap-6 text-gray-800 dark:text-[#e1e1e1]" aria-label="Primary">
          <a href="#home" className="nav-link hover:text-blue-600 dark:hover:text-cyan-500 text-lg">
            <button className="px-2 py-2">Home</button>
          </a>
          <a href="#about" className="nav-link hover:text-blue-600 dark:hover:text-cyan-500 text-lg">
            <button className="px-2 py-2">About</button>
          </a>
          <a href="#experience" className="nav-link hover:text-blue-600 dark:hover:text-cyan-500 text-lg">
            <button className="px-2 py-2">Experiences</button>
          </a>
          <a href="#skills" className="nav-link hover:text-blue-600 dark:hover:text-cyan-500 text-lg">
            <button className="px-2 py-2">Skills</button>
          </a>
          <a href="#projects" className="nav-link hover:text-blue-600 dark:hover:text-cyan-500 text-lg">
            <button className="px-2 py-2">Projects</button>
          </a>
          <a href="#education" className="nav-link hover:text-blue-600 dark:hover:text-cyan-500 text-lg">
            <button className="px-2 py-2">Education</button>
          </a>
          <a href="#contact" className="nav-link hover:text-blue-600 dark:hover:text-cyan-500 text-lg">
            <button className="px-2 py-2">Contact</button>
          </a>
          <button onClick={toggleTheme} className="p-4 bg-gradient-to-tl" aria-label="Toggle theme">
            {theme === "dark" ? <HiMoon className="-translate-y-1 text-2xl" /> : <HiSun className="-translate-y-1 text-2xl" />}
          </button>
        </nav>
        <button onClick={() => setMobileMenu(!mobileMenu)} aria-label="Open menu">
          <CgMenuGridR className="hidden max-sm:block text-[#00040f] dark:text-[#e1e1e1] text-[32px]" />
        </button>
      </div>
      {mobileMenu && <Menu />}
    </section>
  );
};

export default NavBar;
