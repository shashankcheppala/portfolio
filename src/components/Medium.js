import React, { useEffect, useState } from "react";

const RSS2JSON = "https://api.rss2json.com/v1/api.json?rss_url=";
const CACHE_KEY = "medium_posts_cache_v1";
const TTL_MS = 30 * 60 * 1000; // 30 minutes

const MEDIUM_USER = "shashankcheppala";
const FEED_URL = `https://medium.com/feed/@${MEDIUM_USER}`;
const PROFILE_URL = `https://medium.com/@${MEDIUM_USER}`;

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
  return "https://via.placeholder.com/800x400?text=Medium+Article";
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
      className="max-w-screen-lg mx-auto relative z-50 px-5 
                 pt-10 md:pt-16 pb-24 md:pb-28 scroll-mt-24 md:scroll-mt-28"
    >
      {/* Title */}
      <div className="flex justify-center mt-10 mb-8">
        <span className="text-[#00040f] dark:text-slate-300 font-extrabold text-4xl md:text-5xl">
          My Medium Articles
        </span>
      </div>

      {/* Articles grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {state.loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-[#353a52] p-5 animate-pulse">
              <div className="w-full h-40 bg-[#1b2242] rounded mb-4" />
              <div className="h-4 w-3/4 bg-[#1b2242] rounded mb-2" />
              <div className="h-3 w-1/2 bg-[#1b2242] rounded" />
            </div>
          ))}

        {!state.loading && state.error && (
          <div className="sm:col-span-3 text-center text-sm text-red-400">
            {state.error}
          </div>
        )}

        {!state.loading &&
          !state.error &&
          posts.map((post) => {
            const thumb = getThumbnail(post);
            return (
              <div
                key={post.guid}
                className="bg-[#e1e1e1] dark:bg-transparent rounded-lg border border-[#353a52] 
                           hover:border-violet-500 transition-all duration-300 p-5 button-animation"
              >
                <img
                  src={thumb}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <h3 className="font-bold text-lg text-[#00040f] dark:text-slate-200 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {new Date(post.pubDate).toLocaleDateString()}
                </p>
                <p
                  className="text-sm text-gray-700 dark:text-gray-300 mt-2 line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html:
                      post.description.replace(/<[^>]+>/g, "").slice(0, 140) + "…",
                  }}
                />
                <a
                  href={`${post.link}?utm_source=portfolio&utm_medium=medium_section`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-gradient-to-r from-pink-500 to-pink-600 text-white 
                             py-2 px-4 rounded-md"
                >
                  Open Article
                </a>
              </div>
            );
          })}
      </div>

      {/* Read More CTA */}
      <div className="flex justify-center mt-10">
        <a
          href={`${PROFILE_URL}?utm_source=portfolio&utm_medium=section_cta`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mb-6 md:mb-2
                     bg-gradient-to-r from-blue-500 to-blue-600 text-white 
                     py-2 px-5 rounded-md hover:scale-105 transition-transform"
        >
          Read more on Medium →
        </a>
      </div>
    </section>
  );
}
