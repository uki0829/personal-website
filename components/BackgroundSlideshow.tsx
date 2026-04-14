"use client";

import Image from "next/image";
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
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => {
        setPrev(c);
        return (c + 1) % seasons.length;
      });
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  // Clear prev from DOM after fade completes so it's not holding memory
  useEffect(() => {
    if (prev === null) return;
    const t = setTimeout(() => setPrev(null), FADE_DURATION + 100);
    return () => clearTimeout(t);
  }, [prev]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Previous image fades out */}
      {prev !== null && (
        <div
          key={`prev-${prev}`}
          className="absolute inset-0"
          style={{ opacity: 0, transition: `opacity ${FADE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)` }}
        >
          <Image
            src={seasons[prev]}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            quality={55}
          />
        </div>
      )}

      {/* Current image fades in */}
      <div
        key={`curr-${current}`}
        className="absolute inset-0"
        style={{ opacity: 1, transition: `opacity ${FADE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)` }}
      >
        <Image
          src={seasons[current]}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority={current === 0}
          quality={55}
        />
      </div>

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-cream/90" />
    </div>
  );
}
