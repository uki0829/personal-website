"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PDF_PATH = "/portfolio/design%20portfolio.pdf";
const COVER_PATH = "/portfolio/design portfolio.jpg";
const VIDEO_PATH = "/portfolio/screen%20recording.mov";
const VIDEO_COVER = "/portfolio/screen.jpg";
const PLANTER_COVER = "/portfolio/smart planter project.jpeg";
const PLANTER_PDF = "/portfolio/smart%20planter%20project.pdf";

export default function DesignPortfolio() {
  const ref = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [index, setIndex] = useState(0); // 0 = cards 0-1 visible, 1 = cards 1-2 visible
  const [cardPx, setCardPx] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setVideoOpen(false); };
    if (videoOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [videoOpen]);

  // Track viewport width to compute exact pixel offset per card
  useEffect(() => {
    const update = () => {
      if (viewportRef.current) {
        setCardPx((viewportRef.current.clientWidth - 16) / 2);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const goPrev = () => setIndex(i => Math.max(0, i - 1));
  const goNext = () => setIndex(i => Math.min(1, i + 1));

  // Each slide step = one card width + gap
  const trackOffset = index * (cardPx + 16);

  return (
    <section id="design" className="py-24 px-6 border-t border-ink/8 bg-dust/50" ref={ref}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div
          className="mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h2
              className="font-display font-bold text-ink"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em", lineHeight: "1" }}
            >
              Design
            </h2>
            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href={PDF_PATH}
                download="design portfolio.pdf"
                className="inline-flex items-center gap-2 font-mono text-xs px-4 py-2.5 bg-ink text-cream hover:bg-rust transition-colors duration-300"
                style={{ letterSpacing: "0.06em" }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                DOWNLOAD
              </a>
            </div>
          </div>
        </div>

        {/*
          Carousel wrapper expands 48px beyond the card area on each side
          so arrows sit in that gutter without overlapping any card.
          The viewport (overflow-hidden) is inset by the same amount.
        */}
        <div
          className="relative -mx-12 group"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 100ms" }}
        >
          {/* Left arrow — invisible until section hover, no background ever */}
          <button
            onClick={goPrev}
            className="absolute left-0 top-[45%] -translate-y-1/2 z-10 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-ink/40 hover:text-ink/80"
            aria-label="Previous"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Right arrow — invisible until section hover, no background ever */}
          <button
            onClick={goNext}
            className="absolute right-0 top-[45%] -translate-y-1/2 z-10 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-ink/40 hover:text-ink/80"
            aria-label="Next"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Viewport — clips the overflowing third card */}
          <div ref={viewportRef} className="overflow-hidden mx-12">
            {/* Track — slides via transform, no scrollbar involved */}
            <div
              className="flex gap-4"
              style={{
                transform: `translateX(-${trackOffset}px)`,
                transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >

              {/* Card 1 — Design PDF */}
              <div className="flex-none w-[calc(50%-8px)]">
                <a
                  href={PDF_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/card block relative border border-ink/10 overflow-hidden"
                >
                  <div className="relative aspect-[5/3]">
                    <Image
                      src={COVER_PATH}
                      alt="Design Portfolio Cover"
                      fill
                      sizes="(max-width: 640px) 100vw, 40vw"
                      className="object-cover transition-transform duration-500 group-hover/card:scale-[1.02]"
                    />
                  </div>
                  <div className="absolute inset-0 bg-ink/0 group-hover/card:bg-ink/30 transition-colors duration-300 flex items-center justify-center">
                    <span
                      className="font-mono text-xs text-cream tracking-widest uppercase px-5 py-2.5 border border-cream opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
                      style={{ letterSpacing: "0.1em" }}
                    >
                      View Portfolio
                    </span>
                  </div>
                </a>
                <p className="font-mono text-xs text-stone mt-3" style={{ opacity: 0.6 }}>
                  Click to open the full portfolio PDF.
                </p>
              </div>

              {/* Card 2 — Screen recording */}
              <div className="flex-none w-[calc(50%-8px)]">
                <button
                  onClick={() => setVideoOpen(true)}
                  className="group/card relative w-full border border-ink/10 overflow-hidden block"
                >
                  <div className="relative aspect-[5/3]">
                    <Image
                      src={VIDEO_COVER}
                      alt="Screen Recording Cover"
                      fill
                      sizes="(max-width: 640px) 100vw, 40vw"
                      className="object-cover transition-transform duration-500 group-hover/card:scale-[1.02]"
                    />
                  </div>
                  <div className="absolute inset-0 bg-ink/0 group-hover/card:bg-ink/30 transition-colors duration-300 flex items-center justify-center">
                    <span
                      className="font-mono text-xs text-cream tracking-widest uppercase px-5 py-2.5 border border-cream opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
                      style={{ letterSpacing: "0.1em" }}
                    >
                      Watch Video
                    </span>
                  </div>
                </button>
                <p className="font-mono text-xs text-stone mt-3" style={{ opacity: 0.6 }}>
                  Click to watch the project walkthrough.
                </p>
              </div>

              {/* Card 3 — Smart Planter */}
              <div className="flex-none w-[calc(50%-8px)]">
                <a
                  href={PLANTER_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/card block relative border border-ink/10 overflow-hidden"
                >
                  <div className="relative aspect-[5/3]">
                    <Image
                      src={PLANTER_COVER}
                      alt="Smart Planter Project"
                      fill
                      sizes="(max-width: 640px) 100vw, 40vw"
                      className="object-cover transition-transform duration-500 group-hover/card:scale-[1.02]"
                    />
                  </div>
                  <div className="absolute inset-0 bg-ink/0 group-hover/card:bg-ink/30 transition-colors duration-300 flex items-center justify-center">
                    <span
                      className="font-mono text-xs text-cream tracking-widest uppercase px-5 py-2.5 border border-cream opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
                      style={{ letterSpacing: "0.1em" }}
                    >
                      View Project
                    </span>
                  </div>
                </a>
                <p className="font-mono text-xs text-stone mt-3" style={{ opacity: 0.6 }}>
                  Click to open the Smart Planter project PDF.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Video modal */}
        {videoOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 backdrop-blur-sm"
            onClick={() => setVideoOpen(false)}
          >
            <div
              className="relative w-full max-w-4xl mx-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute -top-9 right-0 font-mono text-xs text-cream/60 hover:text-cream tracking-widest uppercase transition-colors duration-200"
                style={{ letterSpacing: "0.08em" }}
              >
                ESC · Close
              </button>
              <video
                src={VIDEO_PATH}
                controls
                autoPlay
                playsInline
                className="w-full block border border-cream/10"
                style={{ maxHeight: "80vh", background: "#0A0A09" }}
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
