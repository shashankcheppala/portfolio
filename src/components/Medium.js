// src/components/Medium.js
import React, { useEffect, useState } from "react";

const RSS2JSON = "https://api.rss2json.com/v1/api.json?rss_url=";
const CACHE_KEY = "medium_posts_cache_v2";
const TTL_MS = 30 * 60 * 1000; // 30 minutes

const MEDIUM_USER = "shashankcheppala"; // no @
const FEED_URL = `https://medium.com/feed/@${MEDIUM_USER}`;
const PROFILE_URL = `https://medium.com/@${MEDIUM_USER}`;

// simple placeholder (optional: swap to /public/medium-placeholder.jpg)
const PLACEHOLDER =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='630'>
      <rect width='100%' height='100%' fill='#0b0f24'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
            fill='#b7c0d8' font-family='Arial' font-size='28'>
        Medium article
      </text>
    </svg>`
  );

const extractFirstImg = (html = "") => {
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : null;
};

const getThumb = (post) =>
  post.thumbnail ||
  extractFirstImg(post.content) ||
  extractFirstImg(post.description) ||
  PLACEHOLDER;

export default function Medium() {
  const [posts, setPosts] = useState([]);
  const [state, setState] = useState({ loading: true, error: "" });

  useEffect(() => {
    let mounted = true;

    const readCache = () => {
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const { t, items } = JSON.parse(raw);
        if (Date.now() - t > TTL_MS) return null;
        return items;
      } catch {
        return null;
      }
    };

    const writeCache = (items) => {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), items }));
      } catch {}
    };

    const load = async () => {
      const cached = readCache();
      if (cached && mounted) {
        setPosts(cached.slice(0, 3));
        setState({ loading: false, error: "" });
      }

      try {
        const res = await fetch(`${RSS2JSON}${encodeURIComponent(FEED_URL)}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const items = (data.items || [])
          .filter((it) => it.categories?.length)
          .slice(0, 3);

        if (mounted) {
          setPosts(items);
          setState({ loading: false, error: "" });
          writeCache(items);
        }
      } catch {
        if (!cached && mounted) {
          setState({
            loading: false,
            error: "Couldn't load Medium posts right now.",
          });
        }
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      id="medium"
      className="
        min-h-screen
        flex flex-col justify-center
        px-5 md:px-10
        scroll-mt-24
      "
    >
      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-[#00040f] dark:text-slate-200 mb-10 text-center">
        My Medium Articles
      </h2>

      {/* Grid */}
      <div className="w-full max-w-screen-xl mx-auto">
        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3">
          {state.loading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#353a52]/50 dark:border-white/10 p-5 bg-white/60 dark:bg-white/5 backdrop-blur-sm animate-pulse"
              >
                <div className="w-full h-48 md:h-56 bg-[#1b2242]/30 rounded-lg mb-4" />
                <div className="h-4 w-3/4 bg-[#1b2242]/30 rounded mb-2" />
                <div className="h-3 w-1/2 bg-[#1b2242]/30 rounded" />
              </div>
            ))}

          {!state.loading && state.error && (
            <div className="md:col-span-3 text-center text-sm text-red-400">
              {state.error}
            </div>
          )}

          {!state.loading &&
            !state.error &&
            posts.map((post) => {
              const thumb = getThumb(post);
              return (
                <article
                  key={post.guid}
                  className="
                    group rounded-2xl overflow-hidden
                    border border-[#353a52]/50 dark:border-white/10
                    bg-white/70 dark:bg-white/5 backdrop-blur
                    hover:border-violet-500/70 transition-all duration-300
                    flex flex-col
                  "
                >
                  <div className="relative">
                    <img
                      src={thumb}
                      alt={post.title}
                      className="w-full h-48 md:h-56 object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-extrabold text-lg md:text-xl text-[#0d1224] dark:text-slate-100 mb-2 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                      {new Date(post.pubDate).toLocaleDateString()}
                    </p>

                    <p
                      className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html:
                          post.description.replace(/<[^>]+>/g, "").slice(0, 160) +
                          "…",
                      }}
                    />

                    <div className="mt-5">
                      <a
                        href={`${post.link}?utm_source=portfolio&utm_medium=medium_section`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full py-2.5 rounded-lg
                                   bg-gradient-to-r from-pink-500 to-pink-600 text-white
                                   font-medium hover:scale-[1.02] active:scale-[0.99] transition-transform"
                      >
                        Open Article
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
        </div>

        {/* Footer CTA */}
        <div className="flex justify-center mt-8">
          <a
            href={`${PROFILE_URL}?utm_source=portfolio&utm_medium=section_cta`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 px-5 rounded-lg hover:scale-105 transition-transform"
          >
            Read more on Medium →
          </a>
        </div>
      </div>
    </section>
  );
}
