// src/components/Medium.js
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Medium = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    AOS.init();

    const username = "shashankcheppala"; // <- your Medium username
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          // Take only latest 2 posts
          setArticles(data.items.slice(0, 2));
        }
      })
      .catch((err) => console.error("Error fetching Medium posts:", err));
  }, []);

  return (
    <section
      id="medium"
      className="min-h-screen flex items-center justify-center px-5 md:px-10 overflow-hidden"
      data-aos="fade-up"
    >
      <div className="w-full max-w-screen-lg flex flex-col items-center">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#00040f] dark:text-slate-200 mb-12 text-center">
          Latest from Medium
        </h2>

        {/* Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {articles.map((post, idx) => (
            <a
              key={idx}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl overflow-hidden shadow-lg bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-700 transition-transform hover:scale-[1.02]"
            >
              {/* Cover image */}
              {post.thumbnail && (
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-56 object-cover"
                />
              )}
              <div className="p-5">
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-[#00040f] dark:text-slate-200 group-hover:text-pink-500 transition">
                  {post.title}
                </h3>
                {/* Date */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {new Date(post.pubDate).toDateString()}
                </p>
                {/* Excerpt */}
                <p className="text-gray-700 dark:text-gray-300 text-sm mt-3 line-clamp-3">
                  {post.description.replace(/<[^>]+>/g, "").slice(0, 150)}...
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Read more button */}
        <div className="mt-10">
          <a
            href="https://medium.com/@shashankcheppala"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-md bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold transition hover:scale-105"
          >
            Read more on Medium →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Medium;
