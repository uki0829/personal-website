"use client";

import { useEffect, useRef, useState } from "react";
import { Code2, Database, Palette, ChartBar } from "lucide-react";

const skillGroups = [
  {
    category: "Programming",
    icon: <Code2 size={16} />,
    skills: ["Python", "SQL", "R", "JavaScript", "Git"],
  },
  {
    category: "Data Analytics",
    icon: <Database size={16} />,
    skills: ["SQL", "MySQL", "Microsoft SQL Server", "Excel", "Tableau", "Power BI", "Supabase"],
  },
  {
    category: "Design",
    icon: <Palette size={16} />,
    skills: ["Figma", "Adobe Suites", "Rhino 3D", "AutoCAD"],
  },
  {
    category: "Experimentation & Statistics",
    icon: <ChartBar size={16} />,
    skills: ["A/B Testing", "Machine Learning", "(Regression, Classification, Clustering)", "Hypothesis testing"],
  },
];

/* ── Skill card ─────────────────────────────────────────────────── */
function SkillCard({
  group,
  index,
  visible,
}: {
  group: (typeof skillGroups)[0];
  index: number;
  visible: boolean;
}) {
  return (
    <div
      className="bg-cream border border-ink/8 p-5 hover:border-ink/20 transition-colors duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.6s ease ${index * 80 + 150}ms, transform 0.6s ease ${index * 80 + 150}ms`,
      }}
    >
      {/* Card header: icon + category */}
      <div className="flex items-center gap-2.5 mb-4 pb-4 border-b border-ink/6">
        <span className="text-rust">{group.icon}</span>
        <span
          className="font-mono font-semibold text-ink tracking-widest uppercase"
          style={{ letterSpacing: "0.07em" }}
        >
          {group.category}
        </span>
      </div>

      {/* Skill pills */}
      <div className="flex flex-wrap gap-1.5">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="font-mono font-semibold text-xs px-2.5 py-1 border border-ink/10 text-ink hover:border-rust hover:text-rust transition-colors duration-200 cursor-default"
            style={{ letterSpacing: "0.03em" }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Section ────────────────────────────────────────────────────── */
export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-24 px-6 border-t border-ink/8" ref={ref}>
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
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: "1",
            }}
          >
            Skills
          </h2>
        </div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.category} group={group} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
