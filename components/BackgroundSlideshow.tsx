"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const seasons = [
  "/images/spring.png",
  "/images/summer.png",
  "/images/fall.png",
  "/images/winter.jpeg",
];

const DESKTOP_INTERVAL = 30000; // 30 seconds
const MOBILE_INTERVAL = 15000;  // 15 seconds
const FADE_DURATION = 3000;     // 3s crossfade

export default function BackgroundSlideshow() {
  const [current, setCurrent] = useState(0);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  // Detect screen size in JS — CSS hidden still loads images via <link rel="preload">
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Run the timer on both mobile and desktop, different intervals
  useEffect(() => {
    if (isDesktop === null) return;
    const interval = isDesktop ? DESKTOP_INTERVAL : MOBILE_INTERVAL;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % seasons.length);
    }, interval);
    return () => clearInterval(timer);
  }, [isDesktop]);

  // Wait for hydration before rendering (avoids SSR mismatch)
  if (isDesktop === null) return null;

  // Mobile: crossfading slideshow with lower quality images
  // Desktop: full quality crossfading slideshow
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
            quality={isDesktop ? 55 : 30}
          />
        </div>
      ))}

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-cream/90" />
    </div>
  );
}
