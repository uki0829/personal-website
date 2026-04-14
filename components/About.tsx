"use client";

import { useEffect, useRef, useState } from "react";

function useCounter(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
}

function StatCounter({
  value,
  label,
  suffix = "",
  start,
  delay = 0,
}: {
  value: number;
  label: string;
  suffix?: string;
  start: boolean;
  delay?: number;
}) {
  const [active, setActive] = useState(false);
  const count = useCounter(value, 1800, active);

  useEffect(() => {
    if (start) {
      const t = setTimeout(() => setActive(true), delay);
      return () => clearTimeout(t);
    }
  }, [start, delay]);

  return (
    <div className="border-l-2 border-rust pl-5 py-1">
      <div
        className="font-display text-5xl text-ink"
        style={{ letterSpacing: "-0.03em" }}
      >
        {count}
        {suffix}
      </div>
      <div className="font-mono text-xs text-stone mt-1 tracking-wide uppercase">
        {label}
      </div>
    </div>
  );
}

const timeline = [
  {
    year: "2024",
    role: "Senior Data Analyst",
    company: "Series B SaaS — Growth & Retention",
    detail: "Led experimentation platform build, churn prediction model, and cohort LTV forecasting.",
  },
  {
    year: "2022",
    role: "Product Analyst",
    company: "E-commerce Platform",
    detail: "Built multi-touch attribution model; owned product analytics for mobile checkout redesign.",
  },
  {
    year: "2020",
    role: "Data Analyst",
    company: "Digital Agency",
    detail: "Delivered marketing mix models and audience segmentation for 12 brand clients.",
  },
  {
    year: "2019",
    role: "MSc Data Science",
    company: "University",
    detail: "Thesis: Causal inference in observational A/B tests using propensity score matching.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-32 px-6 md:px-12 bg-ink text-cream" ref={sectionRef}>
      <div className="max-w-[1400px] mx-auto">
        {/* Section label */}
        <div
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <span className="font-mono text-xs text-stone tracking-widest uppercase">
            About
          </span>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Narrative */}
          <div
            className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <h2
              className="font-display text-cream mb-8"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                letterSpacing: "-0.03em",
                lineHeight: "1.05",
              }}
            >
              I don&apos;t just analyze data —<br />
              <span className="text-rust">I build the frame</span><br />
              around the question.
            </h2>

            <div className="space-y-5 font-body text-stone text-base leading-relaxed">
              <p>
                Most data problems aren&apos;t really data problems. They&apos;re framing problems.
                The wrong question answered precisely is still the wrong answer. My work starts
                before the SQL — with understanding what decision is actually at stake.
              </p>
              <p>
                I&apos;ve spent five years building analytical infrastructure and models that
                sit at the center of product and revenue decisions. From churn prediction engines
                to experimentation platforms to multi-touch attribution rewrites — the thread is
                always the same: clarity first, complexity only where it earns its place.
              </p>
              <p>
                My background in statistics means I&apos;m skeptical of models that look clean.
                My background in product means I translate findings into language that drives
                action, not admiration.
              </p>
              <p className="text-cream/70 italic font-display text-lg" style={{ letterSpacing: "-0.01em" }}>
                &ldquo;The goal is not a better dashboard. It&apos;s a better decision.&rdquo;
              </p>
            </div>

            {/* Skills */}
            <div className="mt-10 pt-8 border-t border-white/10">
              <div className="font-mono text-xs text-stone tracking-widest uppercase mb-4">
                Core Toolkit
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Python", "SQL", "BigQuery", "dbt", "Snowflake",
                  "XGBoost", "scikit-learn", "SHAP", "Plotly",
                  "Looker", "Tableau", "Airflow", "Spark", "A/B Testing",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs px-3 py-1 border border-white/15 text-stone hover:border-rust hover:text-cream transition-colors duration-200"
                    style={{ letterSpacing: "0.04em" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Stats + Timeline */}
          <div
            className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "400ms" }}
          >
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-14">
              <StatCounter value={5} suffix="+" label="Years experience" start={visible} delay={400} />
              <StatCounter value={40} suffix="+" label="Models shipped" start={visible} delay={500} />
              <StatCounter value={14} suffix="M+" label="Events modeled" start={visible} delay={600} />
              <StatCounter value={3} suffix="×" label="Avg. experiment velocity" start={visible} delay={700} />
            </div>

            {/* Timeline */}
            <div className="font-mono text-xs text-stone tracking-widest uppercase mb-6">
              Experience
            </div>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />

              <div className="space-y-8 pl-8">
                {timeline.map((item, i) => (
                  <div
                    key={i}
                    className={`timeline-item relative transition-all duration-500 ${
                      visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    }`}
                    style={{ transitionDelay: `${600 + i * 100}ms` }}
                  >
                    <div className="font-mono text-xs text-rust mb-1 tracking-widest">
                      {item.year}
                    </div>
                    <div className="font-body font-semibold text-cream text-sm">
                      {item.role}
                    </div>
                    <div className="font-mono text-xs text-stone/70 mt-0.5">
                      {item.company}
                    </div>
                    <p className="font-body text-sm text-stone mt-2 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
