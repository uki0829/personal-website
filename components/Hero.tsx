"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-16">
      <div className="max-w-5xl mx-auto w-full">

        {/* Role tag */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.7s ease 100ms, transform 0.7s ease 100ms",
          }}
        >
          <span className="font-mono font-semibold text-ink tracking-widest uppercase"
            style={{ fontSize: "clamp(0.85rem, 1.2vw, 1rem)" }}>
            Data Analyst · Product Scientist
          </span>
        </div>

        {/* Name */}
        <h1
          className="font-display font-bold text-ink mt-5 mb-6"
          style={{
            fontSize: "clamp(3.5rem, 9vw, 8rem)",
            letterSpacing: "-0.025em",
            lineHeight: "1",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s ease 250ms, transform 0.8s ease 250ms",
          }}
        >
          Hefeng Zhang<span className="text-rust"></span>
        </h1>

        {/* Statement */}
        <p
          className="font-body text-ink max-w-xl leading-relaxed"
          style={{
            fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.7s ease 450ms, transform 0.7s ease 450ms",
          }}
        >
          Let design guide our intuition, and data shape our decisions.
        </p>

      </div>
    </section>
  );
}
