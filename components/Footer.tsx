"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 py-10 px-6 bg-ink text-cream">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

        {/* Contact info */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <a
            href="tel:+14155550100"
            className="flex items-center gap-2 font-mono text-xs text-stone hover:text-cream transition-colors duration-200"
            style={{ letterSpacing: "0.04em" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.32 6.32l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            +1 (206) 945-5310
          </a>
          <a
            href="mailto:hefengzhang86@gmail.com"
            className="flex items-center gap-2 font-mono text-xs text-stone hover:text-cream transition-colors duration-200"
            style={{ letterSpacing: "0.04em" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            hefengzhang86@gmail.com
          </a>
        </div>

        {/* Right: name + year + note */}
        <div className="flex flex-col gap-1 text-right">
          <span className="font-mono text-xs text-stone/60 tracking-widest">
            © {year} Hefeng Zhang
          </span>
          <span className="font-mono text-xs text-stone/40" style={{ letterSpacing: "0.02em" }}>
            The website icon is a memory to my little dog Leo.
          </span>
        </div>
      </div>
    </footer>
  );
}
