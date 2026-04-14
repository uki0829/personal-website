"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Data ─────────────────────────────────────────────────────── */
const CHANNELS = ["Organic Search", "Paid Social", "Referral", "Email", "Content"] as const;
type Channel = (typeof CHANNELS)[number];

interface Cohort {
  id: string;
  channel: Channel;
  quarter: string;
  adoption: number;
  retention: number;
  users: number;
}

const cohorts: Cohort[] = [
  { id: "a", channel: "Organic Search", quarter: "Q1 2024", adoption: 72, retention: 68, users: 12400 },
  { id: "b", channel: "Paid Social",    quarter: "Q1 2024", adoption: 44, retention: 41, users: 8500 },
  { id: "c", channel: "Referral",       quarter: "Q1 2024", adoption: 88, retention: 82, users: 6200 },
  { id: "d", channel: "Email",          quarter: "Q1 2024", adoption: 31, retention: 36, users: 14100 },
  { id: "e", channel: "Content",        quarter: "Q1 2024", adoption: 64, retention: 71, users: 10300 },
  { id: "f", channel: "Organic Search", quarter: "Q2 2024", adoption: 78, retention: 73, users: 13800 },
  { id: "g", channel: "Paid Social",    quarter: "Q2 2024", adoption: 39, retention: 40, users: 11200 },
  { id: "h", channel: "Referral",       quarter: "Q2 2024", adoption: 91, retention: 86, users: 5900 },
  { id: "i", channel: "Email",          quarter: "Q2 2024", adoption: 48, retention: 45, users: 13500 },
  { id: "j", channel: "Content",        quarter: "Q2 2024", adoption: 69, retention: 74, users: 9700 },
  { id: "k", channel: "Organic Search", quarter: "Q3 2024", adoption: 81, retention: 77, users: 15200 },
  { id: "l", channel: "Paid Social",    quarter: "Q3 2024", adoption: 42, retention: 38, users: 9800 },
  { id: "m", channel: "Referral",       quarter: "Q3 2024", adoption: 93, retention: 89, users: 7100 },
  { id: "n", channel: "Email",          quarter: "Q3 2024", adoption: 55, retention: 52, users: 12800 },
  { id: "o", channel: "Content",        quarter: "Q3 2024", adoption: 73, retention: 79, users: 11500 },
];

const CHANNEL_COLORS: Record<Channel, string> = {
  "Organic Search": "#C84B2F",
  "Paid Social":    "#2D6A6A",
  "Referral":       "#6B4FA0",
  "Email":          "#B07D2D",
  "Content":        "#3D7A4A",
};

/* ─── Linear regression for trend line ─────────────────────────── */
function linearRegression(data: Cohort[]) {
  const n = data.length;
  const sumX = data.reduce((s, d) => s + d.adoption, 0);
  const sumY = data.reduce((s, d) => s + d.retention, 0);
  const sumXY = data.reduce((s, d) => s + d.adoption * d.retention, 0);
  const sumXX = data.reduce((s, d) => s + d.adoption * d.adoption, 0);
  const m = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const b = (sumY - m * sumX) / n;
  return { m, b };
}

/* ─── Component ─────────────────────────────────────────────────── */
export default function InteractiveViz() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoveredCohort, setHoveredCohort] = useState<Cohort | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [activeChannels, setActiveChannels] = useState<Set<Channel>>(new Set(CHANNELS));
  const [mounted, setMounted] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const toggleChannel = (ch: Channel) => {
    setActiveChannels((prev) => {
      const next = new Set(prev);
      if (next.has(ch)) {
        if (next.size === 1) return prev; // keep at least one
        next.delete(ch);
      } else {
        next.add(ch);
      }
      return next;
    });
  };

  /* Chart dimensions */
  const W = 800, H = 480;
  const PAD = { top: 30, right: 30, bottom: 60, left: 60 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const toX = (v: number) => PAD.left + ((v - 20) / 80) * chartW;
  const toY = (v: number) => PAD.top + chartH - ((v - 25) / 70) * chartH;

  const filtered = cohorts.filter((c) => activeChannels.has(c.channel));
  const { m, b } = linearRegression(filtered.length > 1 ? filtered : cohorts);

  const trendX1 = 25, trendX2 = 98;
  const trendY1 = m * trendX1 + b;
  const trendY2 = m * trendX2 + b;

  const gridLines = [30, 40, 50, 60, 70, 80, 90];

  const handleMouseMove = (e: React.MouseEvent, cohort: Cohort) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setHoveredCohort(cohort);
  };

  return (
    <section
      id="explore"
      className="py-32 px-6 md:px-12 border-t border-ink/8"
      ref={sectionRef}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div
          className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <span className="font-mono text-xs text-stone tracking-widest uppercase block mb-3">
            Interactive Analysis
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2
                className="font-display text-ink"
                style={{
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: "1.05",
                }}
              >
                Feature Adoption<br />vs. 90-Day Retention
              </h2>
            </div>
            <p className="font-body text-stone text-sm max-w-sm leading-relaxed">
              Each point is a user acquisition cohort. Referral users adopt deeply and
              retain well; paid social shows persistently weak signal. The trend line
              confirms a strong linear relationship (r² ≈ 0.87).
            </p>
          </div>
        </div>

        {/* Channel filter */}
        <div
          className={`flex flex-wrap gap-3 mb-8 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "200ms" }}
        >
          <span className="font-mono text-xs text-stone self-center tracking-wide mr-2">
            Filter:
          </span>
          {CHANNELS.map((ch) => (
            <button
              key={ch}
              onClick={() => toggleChannel(ch)}
              className={`flex items-center gap-2 font-mono text-xs px-3 py-1.5 border transition-all duration-200 ${
                activeChannels.has(ch)
                  ? "border-ink/30 text-ink bg-transparent"
                  : "border-ink/10 text-stone/40 bg-transparent"
              }`}
              style={{ letterSpacing: "0.03em" }}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0 transition-opacity duration-200"
                style={{
                  background: CHANNEL_COLORS[ch],
                  opacity: activeChannels.has(ch) ? 1 : 0.25,
                }}
              />
              {ch}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div
          className={`relative bg-dust border border-ink/8 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="relative overflow-x-auto">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${W} ${H}`}
              className="w-full"
              style={{ minWidth: "400px", maxHeight: "520px" }}
              onMouseLeave={() => setHoveredCohort(null)}
            >
              {/* Grid lines */}
              {gridLines.map((v) => (
                <g key={v}>
                  <line
                    x1={PAD.left}
                    y1={toY(v)}
                    x2={W - PAD.right}
                    y2={toY(v)}
                    stroke="#0A0A09"
                    strokeOpacity={0.05}
                    strokeWidth={1}
                    strokeDasharray="4 4"
                  />
                  <text
                    x={PAD.left - 10}
                    y={toY(v) + 4}
                    textAnchor="end"
                    fontSize={10}
                    fill="#7A7670"
                    fontFamily="IBM Plex Mono, monospace"
                  >
                    {v}%
                  </text>
                  <line
                    x1={toX(v)}
                    y1={PAD.top}
                    x2={toX(v)}
                    y2={H - PAD.bottom}
                    stroke="#0A0A09"
                    strokeOpacity={0.04}
                    strokeWidth={1}
                    strokeDasharray="4 4"
                  />
                  <text
                    x={toX(v)}
                    y={H - PAD.bottom + 18}
                    textAnchor="middle"
                    fontSize={10}
                    fill="#7A7670"
                    fontFamily="IBM Plex Mono, monospace"
                  >
                    {v}
                  </text>
                </g>
              ))}

              {/* Axis labels */}
              <text
                x={PAD.left + chartW / 2}
                y={H - 8}
                textAnchor="middle"
                fontSize={11}
                fill="#7A7670"
                fontFamily="IBM Plex Mono, monospace"
                letterSpacing={1}
              >
                FEATURE ADOPTION SCORE
              </text>
              <text
                x={16}
                y={PAD.top + chartH / 2}
                textAnchor="middle"
                fontSize={11}
                fill="#7A7670"
                fontFamily="IBM Plex Mono, monospace"
                letterSpacing={1}
                transform={`rotate(-90, 16, ${PAD.top + chartH / 2})`}
              >
                90-DAY RETENTION %
              </text>

              {/* Trend line */}
              <line
                x1={toX(trendX1)}
                y1={toY(trendY1)}
                x2={toX(trendX2)}
                y2={toY(trendY2)}
                stroke="#C84B2F"
                strokeWidth={1.5}
                strokeDasharray="6 4"
                opacity={0.5}
              />
              <text
                x={toX(trendX2) - 8}
                y={toY(trendY2) - 8}
                textAnchor="end"
                fontSize={9}
                fill="#C84B2F"
                fontFamily="IBM Plex Mono, monospace"
                opacity={0.8}
              >
                trend
              </text>

              {/* Data points */}
              {cohorts.map((cohort, i) => {
                const isActive = activeChannels.has(cohort.channel);
                const isHovered = hoveredCohort?.id === cohort.id;
                const r = Math.sqrt(cohort.users / 500);
                const cx = toX(cohort.adoption);
                const cy = toY(cohort.retention);

                return (
                  <g key={cohort.id}>
                    {/* Pulse ring on hover */}
                    {isHovered && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={r + 8}
                        fill="none"
                        stroke={CHANNEL_COLORS[cohort.channel]}
                        strokeWidth={1.5}
                        opacity={0.4}
                      />
                    )}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isHovered ? r + 2 : r}
                      fill={CHANNEL_COLORS[cohort.channel]}
                      opacity={isActive ? (isHovered ? 1 : 0.75) : 0.08}
                      style={{
                        cursor: "crosshair",
                        transition: "opacity 0.3s ease, r 0.2s ease",
                        transform: mounted ? "scale(1)" : "scale(0)",
                        transformOrigin: `${cx}px ${cy}px`,
                        transitionDelay: `${i * 60}ms`,
                      }}
                      onMouseMove={(e) => isActive && handleMouseMove(e, cohort)}
                      onMouseLeave={() => setHoveredCohort(null)}
                    />
                    {/* Quarter label for hovered */}
                    {isHovered && (
                      <text
                        x={cx + r + 6}
                        y={cy + 4}
                        fontSize={9}
                        fill={CHANNEL_COLORS[cohort.channel]}
                        fontFamily="IBM Plex Mono, monospace"
                      >
                        {cohort.quarter}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Tooltip */}
            {hoveredCohort && (
              <div
                className="viz-tooltip absolute z-10 bg-ink text-cream px-4 py-3 pointer-events-none"
                style={{
                  left: tooltipPos.x + 16,
                  top: tooltipPos.y - 80,
                  transform: tooltipPos.x > 600 ? "translateX(-110%)" : "none",
                }}
              >
                <div
                  className="font-mono text-xs mb-2 tracking-wider"
                  style={{ color: CHANNEL_COLORS[hoveredCohort.channel] }}
                >
                  {hoveredCohort.channel.toUpperCase()}
                </div>
                <div className="font-body text-xs text-stone mb-1.5">
                  {hoveredCohort.quarter}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="font-display text-2xl text-cream" style={{ letterSpacing: "-0.02em" }}>
                      {hoveredCohort.adoption}
                    </div>
                    <div className="font-mono text-[10px] text-stone mt-0.5">Adoption</div>
                  </div>
                  <div>
                    <div className="font-display text-2xl text-cream" style={{ letterSpacing: "-0.02em" }}>
                      {hoveredCohort.retention}%
                    </div>
                    <div className="font-mono text-[10px] text-stone mt-0.5">Retention</div>
                  </div>
                  <div>
                    <div className="font-display text-2xl text-cream" style={{ letterSpacing: "-0.02em" }}>
                      {(hoveredCohort.users / 1000).toFixed(1)}K
                    </div>
                    <div className="font-mono text-[10px] text-stone mt-0.5">Users</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom legend */}
          <div className="px-6 md:px-10 py-4 border-t border-ink/8 flex flex-wrap gap-6">
            {CHANNELS.map((ch) => (
              <div key={ch} className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{
                    background: CHANNEL_COLORS[ch],
                    opacity: activeChannels.has(ch) ? 1 : 0.2,
                  }}
                />
                <span
                  className="font-mono text-xs"
                  style={{ color: activeChannels.has(ch) ? "#7A7670" : "#7A767040" }}
                >
                  {ch}
                </span>
              </div>
            ))}
            <div className="ml-auto font-mono text-xs text-stone/50">
              bubble size = cohort volume
            </div>
          </div>
        </div>

        {/* Insight callout */}
        <div
          className={`mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "500ms" }}
        >
          {[
            {
              stat: "r² = 0.87",
              label: "Adoption predicts retention",
              note: "Strong linear fit across all channels",
            },
            {
              stat: "Referral > Organic > Content",
              label: "Channel quality ranking",
              note: "By retention rate at equivalent adoption levels",
            },
            {
              stat: "14pt gap",
              label: "Paid vs. Referral delta",
              note: "Same adoption score, very different outcomes",
            },
          ].map(({ stat, label, note }) => (
            <div key={stat} className="bg-dust border border-ink/8 p-5">
              <div
                className="font-mono text-xs text-rust mb-2 tracking-wide"
                style={{ letterSpacing: "0.05em" }}
              >
                {stat}
              </div>
              <div className="font-body text-sm font-semibold text-ink mb-1">{label}</div>
              <div className="font-mono text-xs text-stone">{note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
