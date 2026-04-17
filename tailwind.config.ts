import type { Config } from "tailwindcss";

const avenir = [
  "Avenir",
  "Avenir Next",
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto",
  "sans-serif",
];

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#ffffff",
        ink: "#0A0A09",
        rust: "#C84B2F",
        dust: "#f0f0f0",
        stone: "#7A7670",
        "rust-light": "#F0E0DA",
        "cream-dark": "#E8E3D8",
      },
      fontFamily: {
        display: avenir,
        body:    avenir,
        mono:    ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      animation: {
        "fade-up":  "fadeUp 0.8s ease forwards",
        "fade-in":  "fadeIn 1s ease forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeUp:  { "0%": { opacity: "0", transform: "translateY(24px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        fadeIn:  { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { transform: "translateY(100%)" }, "100%": { transform: "translateY(0)" } },
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
