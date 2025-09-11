// src/components/Project.js
import { useState } from "react";
import { projects } from "../Data/Projects";
import { FaGithub } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";

// slick carousel
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Project = () => {
  const [expanded, setExpanded] = useState({});

  const toggleDescription = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2200,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    adaptiveHeight: false,
    swipeToSlide: true,
  };

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center px-5 md:px-10 overflow-hidden"
    >
      <div className="w-full max-w-screen-xl flex flex-col items-center">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#00040f] dark:text-slate-200 mb-12 text-center">
          Projects
        </h2>

        {/* Grid */}
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
          {projects.map((project) => (
            <article
              key={project.id}
              className="bg-[#f5f5f5] dark:bg-[#0a0a0a] rounded-xl shadow-lg p-6 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image carousel */}
              {Array.isArray(project.images) && project.images.length > 0 ? (
                <div className="relative w-full h-56 md:h-64 rounded-lg overflow-hidden mb-4">
                  <Slider {...sliderSettings}>
                    {project.images.map((src, idx) => (
                      <div key={idx} className="h-56 md:h-64">
                        <img
                          src={src}
                          alt={`${project.title} – ${idx + 1}`}
                          className="w-full h-56 md:h-64 object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              ) : (
                <div className="w-full h-56 md:h-64 rounded-lg overflow-hidden mb-4 bg-gray-200 dark:bg-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                  No images provided
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-semibold text-[#00040f] dark:text-slate-100 mb-2">
                {project.title}
              </h3>

              {/* Date */}
              {project.date && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {project.date}
                </p>
              )}

              {/* Tags */}
              {project.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Description */}
              {project.description && (
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  {expanded[project.id]
                    ? project.description
                    : project.description.split(" ").slice(0, 25).join(" ") + (project.description.split(" ").length > 25 ? "..." : "")}
                  {project.description.split(" ").length > 25 && (
                    <button
                      className="text-blue-600 dark:text-cyan-400 hover:underline ml-1"
                      onClick={() => toggleDescription(project.id)}
                    >
                      {expanded[project.id] ? "Read less" : "Read more"}
                    </button>
                  )}
                </p>
              )}

              {/* Links */}
              <div className="flex gap-4 mt-auto">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-gradient-to-r from-pink-500 to-pink-600 text-white p-3 rounded-full hover:scale-110 transition-transform"
                    aria-label="GitHub"
                  >
                    <FaGithub size={22} />
                  </a>
                )}
                {project.webapp && (
                  <a
                    href={project.webapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-full hover:scale-110 transition-transform"
                    aria-label="Live demo"
                  >
                    <IoIosLink size={22} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Project;
