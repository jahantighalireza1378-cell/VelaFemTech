import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vela: {
          navy: { DEFAULT: "#1A233A", light: "#2A3555", dark: "#0F1525" },
          gold: { DEFAULT: "#D4AF37", light: "#E5C55D", dim: "#B08D26" },
          marble: "#F8F9FA",
          eco: "#4A7C59",
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-lato)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;