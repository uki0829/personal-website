"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 items-center">

        {/* Image — left column */}
        <div
          className="flex flex-col items-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 200ms, transform 0.7s ease 200ms",
          }}
        >
          <div className="relative w-60 aspect-[4/5] overflow-hidden rounded-2xl border border-ink/10">
            <Image
              src="/images/profile.jpeg"
              alt="Hefeng Zhang"
              fill
              className="object-cover"
              sizes="240px"
              priority
            />
          </div>
          <p className="font-mono text-xs text-stone mt-3 tracking-wide">
            Hefeng Zhang
          </p>
        </div>

        {/* Text — right column */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <span className="font-mono font-bold text-xs text-ink tracking-widest uppercase block mb-6">
            About Me
          </span>
          <div className="space-y-4 font-body text-ink leading-relaxed" style={{ fontSize: "1.05rem" }}>
            <p>
              I'm Hefeng Zhang. My work focuses on bridging human-centered design with data analysis. I am currently pursuing a master’s degree in Information Science @ Cornell University, and I earned my bachelor’s degree in Interior Design from Parsons School of Design.
            </p>
            <p>
              I span my practice between visual UI/UX design and data analytics. I like to use machine learning models to solve complex patterns and visualize data to create solutions for real world problems.
            </p>
            <p>
              In my spare time, I enjoy spending time with my cat and going on small hiking trips while catching the sunset.
            </p>
          </div>

          {/* Quick facts */}
          <div className="mt-8 grid grid-cols-2 gap-y-4">
          </div>

        </div>

      </div>
    </section>
  );
}
