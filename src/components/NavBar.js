import { CgMenuGridR } from "react-icons/cg";
import { HiMoon } from "react-icons/hi";
import { HiSun } from "react-icons/hi";
import Menu from "./Menu";
import { useState, useEffect } from "react";

const NavBar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [screen, setScreen] = useState(window.innerWidth < 900);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    const updateScreenSize = () => {
      setScreen(window.innerWidth < 900);
    };

    window.addEventListener("resize", updateScreenSize);
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  return (
    <section className="NAVBAR p-5 mx-20 mt-5 font-['Poppins'] max-sm:p-2 max-sm:mx-5 max-sm:max-h-[48px]">
      <div className="NAVBAR flex justify-between capitalize">
        <div className="LOGO flex items-center">
          <a
            href="#home"
            className="text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent dark:text-cyan-500 max-sm:text-2xl"
          >
            {"Shashank{</>}"}
          </a>
          {screen && (
            <button
              onClick={toggleTheme}
              className={`mt-1 px-6 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              {theme === "dark" ? (
                <HiMoon className="-translate-y-1 text-2xl" />
              ) : (
                <HiSun className="-translate-y-1 text-2xl" />
              )}
            </button>
          )}
        </div>

        {/* Desktop nav */}
        <div className="NAVLINKS text-[20px] translate-x-[80px] max-sm:hidden flex gap-6 text-gray-800 dark:text-[#e1e1e1]">
          {[
            { href: "#home", label: "Home" },
            { href: "#about", label: "About" },
            { href: "#experience", label: "Experiences" },
            { href: "#skills", label: "Skills" },
            { href: "#projects", label: "Projects" },
            { href: "#education", label: "Education" },
            { href: "#medium", label: "Medium" }, // 🔥 NEW
            { href: "#contact", label: "Contact" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="nav-link hover:text-blue-600 dark:hover:text-cyan-500 text-lg"
            >
              <button className="px-2 py-2">
                {label}
                <span className="top"></span>
                <span className="right"></span>
                <span className="bottom"></span>
                <span className="left"></span>
              </button>
            </a>
          ))}

          <button onClick={toggleTheme} className="p-4 bg-gradient-to-tl">
            {theme === "dark" ? (
              <HiMoon className="-translate-y-1 text-2xl" />
            ) : (
              <HiSun className="-translate-y-1 text-2xl" />
            )}
          </button>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setMobileMenu(!mobileMenu)}>
          <CgMenuGridR className="hidden max-sm:block text-[#00040f] dark:text-[#e1e1e1] text-[32px]" />
        </button>
      </div>

      {mobileMenu && <Menu />}
    </section>
  );
};

export default NavBar;
