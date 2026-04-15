"use client";

import { useEffect, useRef, useState } from "react";

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function ReachOut() {
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
    <section id="contact" className="py-24 px-6 border-t border-ink/8" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {/* Label */}
          {/* Heading */}
          <h2
            className="font-display text-ink mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em", lineHeight: "1" }}
          >
            Let&apos;s connect.
          </h2>

          {/* Short text */}
          <p className="font-body text-ink max-w-md leading-relaxed mb-8" style={{ fontSize: "1rem" }}>
            I&apos;m open to jobs, collaborations, and coffee chats.
            Feel free to reach out through any of the channels below.
          </p>

          {/* Contact info container */}
          <div className="inline-flex flex-col sm:flex-row gap-px border border-ink/10 mb-8">
            {/* Phone */}
            <a
              href="tel:+12069455310"
              className="group flex items-center gap-3 px-5 py-4 bg-dust hover:bg-ink transition-colors duration-300"
            >
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
                className="text-stone group-hover:text-cream transition-colors duration-300 flex-shrink-0"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.32 6.32l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className="font-mono text-xs text-ink group-hover:text-cream transition-colors duration-300" style={{ letterSpacing: "0.04em" }}>
                +1 (206) 945-5310
              </span>
            </a>

            {/* Divider */}
            <div className="w-px bg-ink/10 hidden sm:block" />
            <div className="h-px bg-ink/10 sm:hidden" />

            {/* Email */}
            <a
              href="mailto:hefengzhang86@gmail.com"
              className="group flex items-center gap-3 px-5 py-4 bg-dust hover:bg-ink transition-colors duration-300"
            >
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
                className="text-stone group-hover:text-cream transition-colors duration-300 flex-shrink-0"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span className="font-mono text-xs text-ink group-hover:text-cream transition-colors duration-300" style={{ letterSpacing: "0.04em" }}>
                hefengzhang86@gmail.com
              </span>
            </a>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/uki0829"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 border border-ink/10 flex items-center justify-center text-stone hover:border-ink hover:text-ink transition-colors duration-300"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/hefeng-zhang-72556b263/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 border border-ink/10 flex items-center justify-center text-stone hover:border-ink hover:text-ink transition-colors duration-300"
            >
              <LinkedInIcon />
            </a>
          </div>

          {/* Copyright line at very bottom */}
          <p className="font-mono text-xs text-stone/40 mt-16 tracking-widest">
            {new Date().getFullYear()} Hefeng Zhang The website icon is a tribute to my little dog, Leo.
          </p>
        </div>
      </div>
    </section>
  );
}
