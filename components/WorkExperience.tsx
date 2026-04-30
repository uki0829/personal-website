"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const jobs = [
  {
    company: "Hanshow Technology",
    role: "Product Data Analyst Intern",
    companyFull: "Hanshow Technology",
    period: "Jun 2025 – Aug 2025",
    location: "Beijing, China",
    logo: "/images/Hanshow.png",
    accentColor: "#c84b2f",
    bullets: [
      "Led A/B testing and user intent analysis using behavioral data for search interface iterations, increasing click-through rate (CTR) by 12% and supporting data-driven decisions.",
      "Analyzed user behavior and sales data using SQL, Excel, and Python to identify optimization opportunities across search and recommendation features.",
      "Collaborated with product, engineering, and business teams to convert data insights into model-driven feature improvements and measurable product outcomes.",
      "Built SQL/Python pipelines to track daily feature performance (CTR, conversion, retention), reducing manual analysis time by 30%.",
    ],
    tags: ["Python", "SQL", "Excel", "A/B Testing", "Behavioral Analytics"],
  },
  {
    company: "Sanjin Capital",
    role: "Data Analyst Intern",
    companyFull: "Sanjin Capital",
    period: "Jun 2024 – Aug 2024",
    location: "Beijing, China",
    logo: "/images/sanjin.png",
    accentColor: "#c84b2f",
    bullets: [
      "Built and evaluated classification models on 1M+ high-frequency market data points to predict trading signals, improving signal precision and consistency across backtesting scenarios.",
      "Developed Python-based backtesting pipelines to simulate strategy performance, increasing Sharpe ratio by 15% while monitoring risk metrics including maximum drawdown and volatility.",
      "Processed and standardized large-scale financial datasets, reducing missing and noisy data by 20% and engineering time-series features to improve model accuracy and robustness",
    ],
    tags: ["Python", "Quantitative Modeling", "Backtesting", "Financial Data"],
  },
];

/* ── Logo badge ─────────────────────────────────────────────────── */
function CompanyLogo({ logo, company }: { logo: string; company: string }) {
  return (
    <div className="flex-shrink-0 w-20 h-20 border border-ink/10 bg-white overflow-hidden flex items-center justify-center p-2">
      <Image
        src={logo}
        alt={`${company} logo`}
        width={80}
        height={80}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

/* ── Job card ───────────────────────────────────────────────────── */
function JobCard({
  job,
  index,
  visible,
}: {
  job: (typeof jobs)[0];
  index: number;
  visible: boolean;
}) {
  return (
    <div
      className="bg-cream border border-ink/8 p-6 md:p-8 hover:border-ink/20 transition-colors duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.6s ease ${index * 120 + 150}ms, transform 0.6s ease ${index * 120 + 150}ms`,
      }}
    >
      {/* Card header: logo + role info + period */}
      <div className="flex items-start gap-4 mb-6">
        {/* Logo icon container */}
        <CompanyLogo logo={job.logo} company={job.role} />

        {/* Company + role */}
        <div className="flex-1 min-w-0">
          <h3
            className="font-body font-bold text-ink leading-snug"
            style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)" }}
          >
            {job.company}
          </h3>
          <div className="font-body text-sm text-ink mt-0.5">{job.role}</div>
        </div>

        {/* Period + location — right-aligned */}
        <div className="hidden sm:block text-right flex-shrink-0 ml-2">
          <div className="font-mono text-xs font-semibold text-ink tracking-wide">
            {job.period}
          </div>
          <div className="font-mono text-xs text-ink mt-0.5">{job.location}</div>
        </div>
      </div>

      {/* Period visible on mobile */}
      <div className="sm:hidden flex items-center gap-2 mb-4">
        <span className="font-mono text-xs font-semibold text-ink">
          {job.period}
        </span>
        <span className="font-mono text-xs text-ink">· {job.location}</span>
      </div>

      {/* Divider */}
      <div className="border-t border-ink/6 mb-5" />

      {/* Bullets */}
      <ul className="space-y-2.5 mb-5">
        {job.bullets.map((b, bi) => (
          <li key={bi} className="flex items-start gap-3">
            <span
              className="flex-shrink-0 mt-[7px] w-1 h-1 rounded-full bg-stone"
            />
            <span className="font-body text-sm text-ink leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs px-2.5 py-1 bg-dust border border-ink/8 text-ink"
            style={{ letterSpacing: "0.04em" }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Section ────────────────────────────────────────────────────── */
export default function WorkExperience() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" className="py-24 px-6 border-t border-ink/8 bg-dust/50" ref={ref}>
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
            className="bg-display font-bold text-ink"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: "1",
            }}
          >
            Work Experience
          </h2>
        </div>

        {/* Stack of job cards */}
        <div className="flex flex-col gap-4">
          {jobs.map((job, i) => (
            <JobCard key={i} job={job} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
