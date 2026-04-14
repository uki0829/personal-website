"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/project";

/* ── Mini bar chart for impact stats ───────────────────────────── */
function ImpactChart({ insights }: { insights: Project["insights"] }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-ink/8 border border-ink/8">
      {insights.map(({ stat, label, detail }, i) => (
        <div
          key={label}
          className="bg-cream p-6"
          style={{
            opacity: animated ? 1 : 0,
            transform: animated ? "translateY(0)" : "translateY(16px)",
            transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms`,
          }}
        >
          <div
            className="font-display text-rust mb-1"
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
              letterSpacing: "-0.03em",
              lineHeight: "1",
            }}
          >
            {stat}
          </div>
          <div className="font-body text-sm font-semibold text-ink mt-2 mb-1">{label}</div>
          <div className="font-mono text-xs text-stone">{detail}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Inline SVG bar chart for methodology visualization ──────── */
function MethodologyBar({ steps }: { steps: string[] }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setProgress(1), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-4 mt-6">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4 items-start">
          <div className="flex-shrink-0 w-6 h-6 bg-rust flex items-center justify-center mt-0.5">
            <span className="font-mono text-xs text-cream font-bold">{i + 1}</span>
          </div>
          <div
            className="flex-1"
            style={{
              opacity: progress ? 1 : 0,
              transform: progress ? "translateX(0)" : "translateX(-12px)",
              transition: `opacity 0.5s ease ${i * 100 + 200}ms, transform 0.5s ease ${i * 100 + 200}ms`,
            }}
          >
            <p className="font-body text-sm text-ink leading-relaxed">{step}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────── */
export default function ProjectDetailClient({
  project,
  nextProject,
}: {
  project: Project;
  nextProject: Project;
}) {
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setScrollPct(Math.min(pct, 100));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Reading progress bar */}
      <div
        className="progress-bar"
        style={{ width: `${scrollPct}%` }}
        aria-hidden="true"
      />

      {/* Sticky nav */}
      <nav className="sticky top-0 z-40 bg-cream/98 md:bg-cream/90 md:backdrop-blur-sm border-b border-ink/8">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-xs text-stone hover:text-ink transition-colors duration-200 flex items-center gap-2"
          >
            ← Back
          </Link>
          <span className="font-mono text-xs text-stone tracking-widest hidden sm:block">
            {project.number} / {project.category.toUpperCase()}
          </span>
          <Link
            href={`/projects/${nextProject.slug}`}
            className="font-mono text-xs text-stone hover:text-ink transition-colors duration-200 flex items-center gap-2"
          >
            Next project →
          </Link>
        </div>
      </nav>

      <article className="max-w-[900px] mx-auto px-6 md:px-12 py-20">
        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs text-stone tracking-widest">
              {project.number}
            </span>
            <span className="w-8 h-px bg-ink/20" />
            <span className="font-mono text-xs text-rust tracking-widest uppercase">
              {project.category}
            </span>
            <span className="font-mono text-xs text-stone ml-auto">{project.year}</span>
          </div>

          <h1
            className="font-display text-ink mb-6"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.03em",
              lineHeight: "1",
            }}
          >
            {project.title}
          </h1>

          <p className="font-body text-stone text-lg leading-relaxed max-w-2xl">
            {project.subtitle}
          </p>

          {/* Tool pills */}
          <div className="flex flex-wrap gap-2 mt-8">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="font-mono text-xs px-3 py-1 bg-dust border border-ink/8 text-stone"
                style={{ letterSpacing: "0.04em" }}
              >
                {tool}
              </span>
            ))}
          </div>
        </header>

        {/* Divider */}
        <div className="border-t border-ink/8 mb-16" />

        {/* Problem statement */}
        <section className="mb-16">
          <div className="font-mono text-xs text-stone tracking-widest uppercase mb-6">
            The Problem
          </div>
          <p className="font-body text-ink text-lg leading-relaxed">{project.problem}</p>
        </section>

        {/* Data + Scale */}
        <section className="mb-16 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-dust border border-ink/8 p-6">
            <div className="font-mono text-xs text-stone tracking-widest uppercase mb-3">
              Data Source
            </div>
            <p className="font-body text-sm text-ink leading-relaxed">{project.dataSource}</p>
          </div>
          <div className="bg-dust border border-ink/8 p-6">
            <div className="font-mono text-xs text-stone tracking-widest uppercase mb-3">
              Scale
            </div>
            <p className="font-body text-sm text-ink leading-relaxed">{project.scale}</p>
          </div>
        </section>

        {/* Methodology */}
        <section className="mb-16">
          <div className="font-mono text-xs text-stone tracking-widest uppercase mb-2">
            Methodology
          </div>
          <MethodologyBar steps={project.methodology} />
        </section>

        {/* Key Insights (stats) */}
        <section className="mb-16">
          <div className="font-mono text-xs text-stone tracking-widest uppercase mb-6">
            Key Results
          </div>
          <ImpactChart insights={project.insights} />
        </section>

        {/* Business impact */}
        <section className="mb-20 bg-ink p-8 md:p-12">
          <div className="font-mono text-xs text-stone tracking-widest uppercase mb-6">
            Business Impact
          </div>
          <p
            className="font-display text-cream leading-relaxed"
            style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em" }}
          >
            {project.impact}
          </p>
        </section>

        {/* Next project */}
        <div className="border-t border-ink/8 pt-12">
          <div className="font-mono text-xs text-stone tracking-widest uppercase mb-6">
            Next Case Study
          </div>
          <Link href={`/projects/${nextProject.slug}`} className="group block">
            <div className="flex items-end justify-between">
              <div>
                <div className="font-mono text-xs text-rust mb-2">{nextProject.number}</div>
                <h3
                  className="font-display text-ink group-hover:text-rust transition-colors duration-300"
                  style={{
                    fontSize: "clamp(1.5rem, 4vw, 3rem)",
                    letterSpacing: "-0.025em",
                    lineHeight: "1.05",
                  }}
                >
                  {nextProject.title}
                </h3>
                <p className="font-body text-stone text-sm mt-3 max-w-md">
                  {nextProject.subtitle}
                </p>
              </div>
              <div className="font-mono text-3xl text-stone group-hover:text-rust group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300 ml-6 flex-shrink-0">
                →
              </div>
            </div>
          </Link>
        </div>
      </article>
    </>
  );
}
