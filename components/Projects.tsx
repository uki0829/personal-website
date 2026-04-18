"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "Parsons Creative Hackathons",
    category: "UI/UX Design",
    year: "2026",
    summary:
      "Developed an interactive data visualization web interface processing structured JSON data from 1.5K data centers, enabling exploration of global data infrastructure patterns and associated energy usage. (prototype under portfolio section)",
  },
  {
    title: "H-1B Visa Approval Predictive Model",
    category: "Machine Learning",
    year: "2024",
    summary:
      "Developed a machine learning model using 1M+ historical visa records to predict approval probability and identify key decision factors, leveraging Pandas, PyTorch, and Scikit-learn.",
  },
];

/* ── Project card ────────────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  visible,
}: {
  project: (typeof projects)[0];
  index: number;
  visible: boolean;
}) {
  return (
    <div
      className="flex-1 bg-cream border border-ink/8 p-8 md:p-10 flex flex-col justify-between hover:border-ink/20 transition-colors duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.6s ease ${index * 150 + 150}ms, transform 0.6s ease ${index * 150 + 150}ms`,
      }}
    >
      <div className="flex-1">
        {/* Title */}
        <div
          className="font-body font-bold text-ink leading-snug mb-1"
          style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)" }}
        >
          {project.title}
        </div>

        {/* Category — same style as Education's degree line */}
        <div className="font-body text-sm text-ink leading-snug mb-4">
          {project.category}
        </div>

        {/* Summary — same style as Education's detail line */}
        <p className="font-body text-sm text-ink leading-relaxed">
          {project.summary}
        </p>
      </div>

      {/* Year — same mono style as Education's period */}
      <div className="mt-8 pt-5 border-t border-ink/6">
        <span className="font-mono text-xs font-semibold text-ink tracking-wide">{project.year}</span>
      </div>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────── */
export default function Projects() {
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
    <section id="projects" className="py-24 px-6" ref={ref}>
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
            Projects
          </h2>
        </div>

        {/* Two boxes side by side */}
        <div className="flex flex-col sm:flex-row gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
