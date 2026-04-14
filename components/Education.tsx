"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const education = [
  {
    degree: "Master of Professional Studies in Information Science",
    institution: "Cornell University",
    institutionUrl: "https://infosci.cornell.edu/master-professional-studies-information-science",
    period: "2026 – 2027",
    location: "Ithaca, NY",
    detail: "Coursework: AI Chatbots, RAG, AI Agents, AI for Business Applications, Deep Learning, Database Systems",
    logo: "/images/cornell icon.png",
  },
  {
    degree: "Bachelor of Fine Arts in Interior Design, Minor in Data Visualization",
    institution: "Parsons School of Design",
    institutionUrl: "https://www.newschool.edu/parsons/",
    period: "2022 – 2026",
    location: "New York City, NY",
    detail: "Coursework: Python: Data, Science & Design, Linear Algebra, Multidisciplinary Calculus, Intro to Machine Learning, Intro to Data, Statistics with SPSS",
    logo: "/images/parsons icon.png",
  },
];

/* ── Education card ─────────────────────────────────────────────── */
function EduCard({
  edu,
  index,
  visible,
}: {
  edu: (typeof education)[0];
  index: number;
  visible: boolean;
}) {
  return (
    <div
      className="bg-cream border border-ink/8 p-6 md:p-8 hover:border-ink/20 transition-colors duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.6s ease ${index * 140 + 150}ms, transform 0.6s ease ${index * 140 + 150}ms`,
      }}
    >
      <div className="flex items-start gap-5">
        {/* School logo */}
        <div className="flex-shrink-0 w-20 h-20 border border-ink/10 overflow-hidden bg-white flex items-center justify-center p-2">
          <Image
            src={edu.logo}
            alt={`${edu.institution} logo`}
            width={80}
            height={80}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Info block */}
        <div className="flex-1 min-w-0">
          {/* School name + period row */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
            <a
              href={edu.institutionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body font-bold text-ink hover:underline underline-offset-2 decoration-ink/40 leading-snug"
              style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)" }}
            >
              {edu.institution}
            </a>
            <div className="hidden sm:block text-right flex-shrink-0">
              <div className="font-mono text-xs text-rust tracking-wide">{edu.period}</div>
              <div className="font-mono text-xs text-ink mt-0.5">{edu.location}</div>
            </div>
          </div>

          {/* Degree */}
          <div className="font-body text-sm text-ink leading-snug mb-1">{edu.degree}</div>

          {/* Period — mobile only */}
          <div className="sm:hidden font-mono text-xs text-rust tracking-wide mb-3">
            {edu.period} · {edu.location}
          </div>

          {/* Divider */}
          <div className="border-t border-ink/6 my-4" />

          {/* Coursework */}
          <p className="font-body text-sm text-ink leading-relaxed">{edu.detail}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Section ────────────────────────────────────────────────────── */
export default function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className="py-24 px-6 border-t border-ink/8" ref={ref}>
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
          <h2
            className="font-display font-bold text-ink"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em", lineHeight: "1" }}
          >
            Education
          </h2>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-4">
          {education.map((edu, i) => (
            <EduCard key={i} edu={edu} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
