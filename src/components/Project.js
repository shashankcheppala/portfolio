// src/components/Project.js
import { useState } from "react";
import { projects } from "../Data/Projects";
import { FaGithub } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";

const Project = () => {
  const [expanded, setExpanded] = useState({});

  const toggleDescription = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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

        {/* Grid of projects */}
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
          {projects.map((project) => (
            <article
              key={project.id}
              className="bg-[#f5f5f5] dark:bg-[#0a0a0a] rounded-xl shadow-lg p-6 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Images */}
              {project.images.length > 0 && (
                <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-semibold text-[#00040f] dark:text-slate-100 mb-2">
                {project.title}
              </h3>

              {/* Date */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {project.date}
              </p>

              {/* Tags */}
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

              {/* Description */}
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                {expanded[project.id]
                  ? project.description
                  : project.description.split(" ").slice(0, 25).join(" ") + "..."}
                {project.description.split(" ").length > 25 && (
                  <button
                    className="text-blue-600 dark:text-cyan-400 hover:underline ml-1"
                    onClick={() => toggleDescription(project.id)}
                  >
                    {expanded[project.id] ? "Read less" : "Read more"}
                  </button>
                )}
              </p>

              {/* Links */}
              <div className="flex gap-4 mt-auto">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-gradient-to-r from-pink-500 to-pink-600 text-white p-3 rounded-full hover:scale-110 transition-transform"
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
