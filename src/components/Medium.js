// src/components/Medium.js
import React, { useEffect, useState } from "react";

const RSS2JSON = "https://api.rss2json.com/v1/api.json?rss_url=";
const CACHE_KEY = "medium_posts_cache_v1";
const TTL_MS = 30 * 60 * 1000; // 30 minutes

const MEDIUM_USER = "shashankcheppala"; // your Medium handle (no @)
const FEED_URL = `https://medium.com/feed/@${MEDIUM_USER}`;
const PROFILE_URL = `https://medium.com/@${MEDIUM_USER}`;

// simple placeholder (swap for an image in /public if you like)
const PLACEHOLDER =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400'>
      <rect width='100%' height='100%' fill='#0b0f24'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
            fill='#b7c0d8' font-family='Arial' font-size='22'>
        Medium article
      </text>
    </svg>`
  );

function extractFirstImg(html = "") {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

function getThumbnail(post) {
  if (post.thumbnail) return post.thumbnail;
  const fromContent = extractFirstImg(post.content);
  if (fromContent) return fromContent;
  const fromDesc = extractFirstImg(post.description);
  if (fromDesc) return fromDesc;
  return PLACEHOLDER;
}

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
            error: "Couldn't load Medium posts right now. Please try again later.",
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
      className="min-h-screen flex items-center justify-center px-5 md:px-10"
    >
      <div className="w-full max-w-screen-xl flex flex-col items-center">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#00040f] dark:text-slate-200 mb-10 text-center">
          My Medium Articles
        </h2>

        {/* Grid: single page layout */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
          {state.loading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-[#353a52] p-5 animate-pulse bg-[#e1e1e1] dark:bg-transparent"
              >
                <div className="w-full h-44 bg-[#1b2242] dark:bg-white/10 rounded mb-4" />
                <div className="h-5 w-3/4 bg-[#1b2242] dark:bg-white/10 rounded mb-2" />
                <div className="h-4 w-1/2 bg-[#1b2242] dark:bg-white/10 rounded" />
              </div>
            ))}

          {!state.loading && state.error && (
            <div className="lg:col-span-3 text-center text-sm text-red-400">
              {state.error}
            </div>
          )}

          {!state.loading &&
            !state.error &&
            posts.map((post) => {
              const thumb = getThumbnail(post);
              return (
                <a
                  key={post.guid}
                  href={`${post.link}?utm_source=portfolio&utm_medium=medium_section`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl overflow-hidden bg-white dark:bg-[#0b0b0b] border border-gray-200/70 dark:border-white/10 shadow-md hover:shadow-xl transition-all"
                >
                  {/* Image header */}
                  <div className="relative h-44 w-full overflow-hidden">
                    <img
                      src={thumb}
                      alt={post.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                    <div className="absolute bottom-0 p-4">
                      <h3 className="text-white text-lg md:text-xl font-bold leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-200/90 text-xs mt-1">
                        {new Date(post.pubDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3">
                      {post.description.replace(/<[^>]+>/g, "").slice(0, 170)}…
                    </p>
                  </div>
                </a>
              );
            })}
        </div>

        {/* CTA */}
        <div className="mt-10">
          <a
            href={`${PROFILE_URL}?utm_source=portfolio&utm_medium=section_cta`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-md bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold transition-transform hover:scale-105"
          >
            Read more on Medium →
          </a>
        </div>
      </div>
    </section>
  );
}
