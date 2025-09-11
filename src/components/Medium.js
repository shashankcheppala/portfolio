// src/components/Medium.js
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import writingAnim from "../lottie/writing.json"; // <— add this file

const RSS2JSON = "https://api.rss2json.com/v1/api.json?rss_url=";
const CACHE_KEY = "medium_posts_cache_v3";
const TTL_MS = 30 * 60 * 1000; // 30 min

const MEDIUM_USER = "shashankcheppala"; // no @
const FEED_URL = `https://medium.com/feed/@${MEDIUM_USER}`;
const PROFILE_URL = `https://medium.com/@${MEDIUM_USER}`;

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

const firstImg = (h = "") => (h.match(/<img[^>]+src=["']([^"']+)["']/i) || [])[1];
const thumbOf = (p) => p.thumbnail || firstImg(p.content) || firstImg(p.description) || PLACEHOLDER;

export default function Medium() {
  const [posts, setPosts] = useState([]);
  const [state, setState] = useState({ loading: true, error: "" });

  useEffect(() => {
    let live = true;

    const readCache = () => {
      try {
        const x = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
        return x && Date.now() - x.t < TTL_MS ? x.items : null;
      } catch {
        return null;
      }
    };
    const writeCache = (items) => {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), items }));
      } catch {}
    };

    const go = async () => {
      const cached = readCache();
      if (cached && live) {
        setPosts(cached.slice(0, 3));
        setState({ loading: false, error: "" });
      }
      try {
        const r = await fetch(`${RSS2JSON}${encodeURIComponent(FEED_URL)}`, { cache: "no-store" });
        if (!r.ok) throw new Error();
        const data = await r.json();
        const items = (data.items || []).filter((i) => i.categories?.length).slice(0, 3);
        if (live) {
          setPosts(items);
          setState({ loading: false, error: "" });
          writeCache(items);
        }
      } catch {
        if (!cached && live) setState({ loading: false, error: "Couldn't load Medium posts." });
      }
    };

    go();
    return () => {
      live = false;
    };
  }, []);

  return (
    <section
      id="medium"
      className="
        min-h-screen scroll-mt-24
        flex flex-col justify-center
        px-5 md:px-10
      "
    >
      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-[#0d1224] dark:text-slate-100 mb-8 text-center md:text-left">
        My Medium Articles
      </h2>

      {/* Two-column stage */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left: 3D writing object */}
        <div className="flex justify-center md:justify-start">
          <div className="relative group">
            <div
              className="absolute -inset-6 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition
                         bg-gradient-to-tr from-pink-500/20 via-violet-500/20 to-cyan-500/20"
            />
            <Lottie
              animationData={writingAnim}
              loop
              className="relative w-[75vw] max-w-[520px] md:w-[480px] md:max-w-[520px] h-auto
                         drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
            />
          </div>
        </div>

        {/* Right: cards (3 latest) */}
        <div className="grid gap-6">
          {state.loading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#353a52]/40 dark:border-white/10 p-4
                           bg-white/70 dark:bg-white/5 backdrop-blur animate-pulse"
              >
                <div className="w-full h-40 bg-black/10 dark:bg-white/10 rounded-xl mb-3" />
                <div className="h-4 w-3/4 bg-black/10 dark:bg-white/10 rounded mb-2" />
                <div className="h-3 w-1/2 bg-black/10 dark:bg-white/10 rounded" />
              </div>
            ))}

          {!state.loading && state.error && (
            <div className="text-sm text-center md:text-left text-red-400">{state.error}</div>
          )}

          {!state.loading &&
            !state.error &&
            posts.map((p) => {
              const t = thumbOf(p);
              return (
                <article
                  key={p.guid}
                  className="rounded-2xl overflow-hidden border border-[#353a52]/40 dark:border-white/10
                             bg-white/80 dark:bg-white/5 backdrop-blur
                             hover:border-violet-500/70 transition-all duration-300"
                >
                  <img
                    src={t}
                    alt={p.title}
                    className="w-full aspect-[16/9] object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-4">
                    <h3 className="font-extrabold text-lg md:text-xl leading-snug text-[#0d1224] dark:text-slate-100">
                      {p.title}
                    </h3>
                    <p className="text-[12px] mt-1 text-slate-600 dark:text-slate-400">
                      {new Date(p.pubDate).toLocaleDateString()}
                    </p>
                    <p
                      className="text-sm mt-3 text-gray-700 dark:text-gray-300 line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: p.description.replace(/<[^>]+>/g, "").slice(0, 160) + "…",
                      }}
                    />
                    <a
                      href={`${p.link}?utm_source=portfolio&utm_medium=medium_section`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center justify-center w-full py-2.5 rounded-lg
                                 bg-gradient-to-r from-pink-500 to-pink-600 text-white
                                 font-medium hover:scale-[1.02] active:scale-[0.99] transition-transform"
                    >
                      Open Article
                    </a>
                  </div>
                </article>
              );
            })}
        </div>
      </div>

      {/* Profile CTA */}
      <div className="flex justify-center md:justify-end mt-8">
        <a
          href={`${PROFILE_URL}?utm_source=portfolio&utm_medium=section_cta`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 px-5 rounded-lg
                     hover:scale-105 transition-transform"
        >
          Read more on Medium →
        </a>
      </div>
    </section>
  );
}
