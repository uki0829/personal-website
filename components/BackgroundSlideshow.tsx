"use client";

import { useEffect, useState } from "react";

const seasons = [
  "/images/spring.png",
  "/images/summer.png",
  "/images/fall.png",
  "/images/winter.jpeg",
];

const INTERVAL = 30000; // 30 seconds
const FADE_DURATION = 3000; // 3s crossfade

export default function BackgroundSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % seasons.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {seasons.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${src}')`,
            opacity: i === current ? 1 : 0,
            transition: `opacity ${FADE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        />
      ))}

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-cream/90" />
    </div>
  );
}
