import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: "#4B1D6E",
          deep: "#2E0F47",
          mid: "#5C2A85",
          light: "#7A3FA0",
          faint: "#F3EAF9"
        },
        gold: {
          DEFAULT: "#C9A227",
          soft: "#E3C766"
        },
        parchment: "#F7F2E7",
        ink: "#1B1B18",
        muted: "#6B6B6B",
        border: "#E2D9F0",
        danger: "#C0392B",
        success: "#1A7340"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
