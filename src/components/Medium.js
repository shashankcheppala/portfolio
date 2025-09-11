// src/components/Medium.js
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import writingAnim from "../lottie/first.json"; // reuse existing animation

const RSS2JSON = "https://api.rss2json.com/v1/api.json?rss_url=";
const MEDIUM_USER = "shashankcheppala";
const FEED_URL = `https://medium.com/feed/@${MEDIUM_USER}`;
const PROFILE_URL = `https://medium.com/@${MEDIUM_USER}`;

const CACHE_KEY = "medium_posts_cache_v2";
const TTL_MS = 30 * 60 * 1000; // 30 min

const PLACEHOLDER =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450'>
      <defs>
        <linearGradient id='g' x1='0' x2='1'>
          <stop stop-color='#0b0f24' offset='0'/>
          <stop stop-color='#121a39' offset='1'/>
        </linearGradient>
      </defs>
      <rect width='100%' height='100%' fill='url(#g)'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
            fill='#b7c0d8' font-family='Arial' font-size='22'>
        Medium article
      </text>
    </svg>`
  );

const extractFirstImg = (html = "") => {
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : null;
};

const getThumb = (item) =>
  item.thumbnail ||
  extractFirstImg(item.content) ||
  extractFirstImg(item.description) ||
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
      } catch (e) {
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

  // shared card
  const PostCard = ({ item }) => (
    <a
      href={`${item.link}?utm_source=portfolio&utm_medium=medium_grid`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full w-full overflow-hidden rounded-2xl border border-[#2a2f45] hover:border-violet-500 transition-all bg-[#0f142b]/60 dark:bg-[#0b0f24]/60"
    >
      <div className="absolute inset-0">
        <img
          src={getThumb(item)}
          alt={item.title}
          className="h-full w-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 mt-auto p-4 md:p-5 text-white">
        <h3 className="text-lg md:text-xl font-extrabold leading-tight drop-shadow-md">
          {item.title}
        </h3>
        <p className="mt-1 text-xs md:text-sm text-slate-300">
          {new Date(item.pubDate).toLocaleDateString()}
        </p>
        <p
          className="mt-2 hidden sm:block text-sm text-slate-200/90 line-clamp-2"
          dangerouslySetInnerHTML={{
            __html:
              (item.description || "")
                .replace(/<[^>]+>/g, "")
                .slice(0, 140) + "…",
          }}
        />
      </div>
    </a>
  );

  return (
    <section
      id="medium"
      className="relative w-full min-h-screen h-screen px-3 md:px-6 py-4 md:py-6"
    >
      {/* 2×2 grid that fills one page */}
      <div className="grid grid-cols-2 grid-rows-2 gap-3 md:gap-5 w-full h-full">
        {/* Top-left: animation + heading */}
        <div className="relative rounded-2xl border border-[#2a2f45] overflow-hidden bg-gradient-to-b from-[#101732] to-[#0b0f24]">
          <div className="absolute top-3 left-4 right-4 z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-100">
              My Medium Articles
            </h2>
          </div>
          <div className="w-full h-full flex items-center justify-center">
            <Lottie
              animationData={writingAnim}
              loop
              className="w-[80%] md:w-[70%] h-auto"
            />
          </div>

          {/* profile cta bottom-right */}
          <a
            href={`${PROFILE_URL}?utm_source=portfolio&utm_medium=grid_cta`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 z-10 rounded-md bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white text-xs md:text-sm px-3 py-2 hover:scale-105 transition"
          >
            Read more →
          </a>
        </div>

        {/* Top-right: post 1 */}
        <div className="rounded-2xl overflow-hidden">
          {state.loading || state.error || posts.length < 1 ? (
            <div className="h-full w-full rounded-2xl border border-[#2a2f45] bg-[#0b0f24] animate-pulse" />
          ) : (
            <PostCard item={posts[0]} />
          )}
        </div>

        {/* Bottom-left: post 2 */}
        <div className="rounded-2xl overflow-hidden">
          {state.loading || state.error || posts.length < 2 ? (
            <div className="h-full w-full rounded-2xl border border-[#2a2f45] bg-[#0b0f24] animate-pulse" />
          ) : (
            <PostCard item={posts[1]} />
          )}
        </div>

        {/* Bottom-right: post 3 */}
        <div className="rounded-2xl overflow-hidden">
          {state.loading || state.error || posts.length < 3 ? (
            <div className="h-full w-full rounded-2xl border border-[#2a2f45] bg-[#0b0f24] animate-pulse" />
          ) : (
            <PostCard item={posts[2]} />
          )}
        </div>
      </div>
    </section>
  );
}
