// src/Data/GlowCard.js
import { useEffect, useRef } from "react";

const GlowCard = ({ children, identifier }) => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const rafRef = useRef(null);
  const lastEventRef = useRef(null);

  useEffect(() => {
    const container =
      containerRef.current ||
      document.querySelector(`.glow-container-${identifier}`);
    if (!container) return;

    const cards = Array.from(
      container.querySelectorAll(`.glow-card-${identifier}`)
    );
    if (!cards.length) return;
    cardsRef.current = cards;

    const CONFIG = {
      proximity: 40,
      spread: 80,
      blur: 12,
      gap: 32,
      vertical: false,
      opacity: 0,
    };

    // Apply static CSS vars to container once
    container.style.setProperty("--gap", CONFIG.gap);
    container.style.setProperty("--blur", CONFIG.blur);
    container.style.setProperty("--spread", CONFIG.spread);
    container.style.setProperty(
      "--direction",
      CONFIG.vertical ? "column" : "row"
    );

    // Cached bounds (recompute on resize/scroll)
    let boundsCache = [];
    const computeBounds = () => {
      boundsCache = cardsRef.current.map((card) => card.getBoundingClientRect());
    };
    computeBounds();

    const onResize = () => {
      computeBounds();
      // Re-run update with last known pointer for correct positions
      if (lastEventRef.current) scheduleUpdate(lastEventRef.current);
    };

    const update = (evt) => {
      const x = evt?.clientX ?? 0;
      const y = evt?.clientY ?? 0;

      cardsRef.current.forEach((card, i) => {
        const rect = boundsCache[i] || card.getBoundingClientRect();

        const withinX =
          x > rect.left - CONFIG.proximity &&
          x < rect.left + rect.width + CONFIG.proximity;
        const withinY =
          y > rect.top - CONFIG.proximity &&
          y < rect.top + rect.height + CONFIG.proximity;

        // Toggle active state
        card.style.setProperty("--active", withinX && withinY ? 1 : CONFIG.opacity);

        // Angle (pointer -> card center)
        const cx = rect.left + rect.width * 0.5;
        const cy = rect.top + rect.height * 0.5;
        let angle = (Math.atan2(y - cy, x - cx) * 180) / Math.PI;
        angle = angle < 0 ? angle + 360 : angle;

        card.style.setProperty("--start", angle + 90);
      });
    };

    // rAF throttle
    const scheduleUpdate = (evt) => {
      lastEventRef.current = evt;
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        update(lastEventRef.current);
        rafRef.current = null;
      });
    };

    // Use pointermove for mouse + pen; also handle touchmove
    const onPointerMove = (e) => scheduleUpdate(e);
    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        scheduleUpdate({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
      }
    };

    // Initial paint (center-ish) so the glow isn't empty on load
    scheduleUpdate({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", computeBounds, { passive: true });
    document.body.addEventListener("pointermove", onPointerMove, { passive: true });
    document.body.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", computeBounds);
      document.body.removeEventListener("pointermove", onPointerMove);
      document.body.removeEventListener("touchmove", onTouchMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [identifier]);

  return (
    <div
      ref={containerRef}
      className={`glow-container-${identifier} glow-container`}
    >
      <article
        className={`glow-card glow-card-${identifier} h-fit cursor-pointer border border-[#2a2e5a] transition-all duration-300 relative bg-[#101123] text-gray-200 rounded-xl hover:border-transparent w-full`}
      >
        <div className="glows" />
        {children}
      </article>
    </div>
  );
};

export default GlowCard;
