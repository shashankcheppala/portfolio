// src/components/Medium.js
import React, { useEffect, useState, useMemo } from "react";

const MEDIUM_USERNAME = "shashankcheppala";
const RSS2JSON = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`;

// Some Medium images block hotlinking. This proxy helps them render reliably.
const viaProxy = (url) => {
  try {
    if (!url) return "";
    const stripped = url.replace(/^https?:\/\//i, "");
    return `https://images.weserv.nl/?url=${encodeURIComponent(stripped)}`;
  } catch {
    return url;
  }
};

// Try hard to find a good cover image
const extractImageUrl = (post) => {
  // 1) thumbnail
  if (post?.thumbnail) return viaProxy(post.thumbnail);

  // 2) enclosure
  if (post?.enclosure?.link) return viaProxy(post.enclosure.link);

  // 3) first <img> from content / description
  const html = post?.content || post?.description || "";
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (match && match[1]) return viaProxy(match[1]);

  // fallback
  return "https://via.placeholder.com/1200x630?text=Medium+Post";
};

// Strip HTML and squeeze the text
const toPlainText = (html, max = 180) => {
  if (!html) return "";
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > max ? text.slice(0, max) + "..." : text;
};

// Skeleton card while loading
const CardSkeleton = () => (
  <div className="rounded-2xl overflow-hidden bg-white dark:bg-[#0b0b0b] border border-gray-200/70 dark:border-white/10 shadow-md animate-pulse">
    <div className="h-48 bg-gray-200/70 dark:bg-white/5" />
    <div className="p-5">
      <div className="h-6 w-2/3 bg-gray-200/70 dark:bg-white/5 rounded mb-3" />
      <div className="h-4 w-1/3 bg-gray-200/70 dark:bg-white/5 rounded mb-4" />
      <div className="h-4 w-full bg-gray-200/70 dark:bg-white/5 rounded mb-2" />
      <div className="h-4 w-5/6 bg-gray-200/70 dark:bg-white/5 rounded" />
    </div>
  </div>
);

const Medium = () => {
  const [articles, setArticles] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetch(RSS2JSON)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (!data?.items) {
          setError("No posts found.");
          setArticles([]);
          return;
        }
        // latest 2
        setArticles(data.items.slice(0, 2));
      })
      .catch(() => {
        if (!cancelled) {
          setError("Could not load Medium posts.");
          setArticles([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const cards = useMemo(() => {
    if (!articles) return [];
    return articles.map((post) => {
      const cover = extractImageUrl(post);
      const title = post.title || "Untitled";
      const date = post.pubDate ? new Date(post.pubDate).toDateString() : "";
      const excerpt = toPlainText(post.description || post.content, 180);
      const link = post.link || `https://medium.com/@${MEDIUM_USERNAME}`;

      return { cover, title, date, excerpt, link, guid: post.guid || title };
    });
  }, [articles]);

  return (
    <section
      id="medium"
      className="min-h-screen flex items-center justify-center px-5 md:px-10 overflow-hidden"
    >
      <div className="w-full max-w-screen-xl flex flex-col items-center">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#00040f] dark:text-slate-200 mb-10 text-center">
          Latest from Medium
        </h2>

        {/* Grid */}
        {articles === null ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {cards.map(({ cover, title, date, excerpt, link, guid }) => (
              <a
                key={guid}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl overflow-hidden bg-white dark:bg-[#0b0b0b] border border-gray-200/70 dark:border-white/10 shadow-md hover:shadow-xl transition-all"
              >
                {/* Image header with gradient overlay and title/date */}
                <div className="relative h-56 w-full overflow-hidden">
                  <div
                    className="absolute inset-0 bg-center bg-cover transform transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${cover}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-white text-xl md:text-2xl font-bold leading-snug">
                      {title}
                    </h3>
                    {date && (
                      <p className="text-gray-200/90 text-xs md:text-sm mt-1">
                        {date}
                      </p>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    {excerpt}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Error (if any) */}
        {error && (
          <p className="mt-6 text-sm text-red-500 text-center">{error}</p>
        )}

        {/* Read more */}
        <div className="mt-10">
          <a
            href={`https://medium.com/@${MEDIUM_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-md bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold transition-transform hover:scale-105"
          >
            Read more on Medium →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Medium;
