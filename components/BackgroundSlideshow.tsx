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
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect screen size in JS — CSS hidden still loads images via <link rel="preload">
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Only run the timer on desktop
  useEffect(() => {
    if (!isDesktop) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % seasons.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [isDesktop]);

  // Mobile: static spring image only, no slideshow
  if (!isDesktop) {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <Image
          src="/images/spring.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          quality={55}
        />
        <div className="absolute inset-0 bg-cream/90" />
      </div>
    );
  }

  // Desktop: full crossfading slideshow
  // Stable keys (key={i}) so React reuses the same element — opacity transition fires correctly
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {seasons.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            opacity: i === current ? 1 : 0,
            transition: `opacity ${FADE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={i === 0}
            quality={55}
          />
        </div>
      ))}

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-cream/90" />
    </div>
  );
}
