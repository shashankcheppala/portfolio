import { useEffect, useState } from "react";

const YOUTUBE_CHANNEL = "https://www.youtube.com/feeds/videos.xml?channel_id=UCyJmq9hw3rroWAtxE-nC0Zw"; 
// <-- Replace with your actual channel ID if you know it, otherwise handle link works below

const YouTube = () => {
  const [state, setState] = useState({
    items: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
            YOUTUBE_CHANNEL
          )}`
        );
        const data = await res.json();

        if (data.status === "ok") {
          setState({
            items: data.items.slice(0, 2), // only latest 2 videos
            loading: false,
            error: null,
          });
        } else {
          throw new Error("Failed to load videos");
        }
      } catch (err) {
        setState({ items: [], loading: false, error: err.message });
      }
    };

    fetchVideos();
  }, []);

  const getVideoId = (link) => {
    const url = new URL(link);
    return url.searchParams.get("v");
  };

  return (
    <section
      id="youtube"
      className="max-w-screen-lg mx-auto relative border-t my-12 lg:my-24 border-[#25213b]"
      data-aos="fade-up"
    >
      <div className="w-[100px] h-[100px] bg-violet-100 rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl opacity-20"></div>

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
        </div>
      </div>

      <div className="flex justify-center mt-10 my-5 lg:py-8">
        <span className="text-[#00040f] dark:text-slate-300 text-center font-extrabold max-sm:text-2xl text-5xl">
          YouTube
        </span>
      </div>

      {state.loading && <p className="text-center text-gray-500">Loading videos...</p>}
      {state.error && <p className="text-center text-red-500">{state.error}</p>}

      <div className="grid gap-6 sm:grid-cols-2 max-sm:grid-cols-1 mt-10 px-4">
        {state.items.map((it) => {
          const vid = getVideoId(it.link);
          const embed = `https://www.youtube.com/embed/${vid}?autoplay=0&mute=0&playsinline=1&rel=0&modestbranding=1&controls=1`;

          return (
            <div
              key={it.guid}
              className="bg-[#e1e1e1] dark:bg-transparent rounded-lg border border-[#353a52] hover:border-violet-500 transition-all duration-300 p-4 button-animation"
            >
              <div className="aspect-video w-full overflow-hidden rounded-md mb-4">
                <iframe
                  title={it.title}
                  src={embed}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full"
                />
              </div>
              <h3 className="font-bold text-lg text-[#00040f] dark:text-slate-200 mb-2 line-clamp-2">
                {it.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {new Date(it.pubDate).toLocaleDateString()}
              </p>
              <a
                href={it.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 px-4 rounded-md"
              >
                Watch on YouTube →
              </a>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-10">
        <a
          href="https://www.youtube.com/@shashankcheppala"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-lg"
        >
          See more on YouTube →
        </a>
      </div>
    </section>
  );
};

export default YouTube;
