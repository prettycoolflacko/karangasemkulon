import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#2C4A3B",
          50: "#f0fdf6",
          100: "#dcfce9",
          500: "#2C4A3B",
          600: "#243c30",
          900: "#14241d",
        },
        shallot: {
          DEFAULT: "#8B3A62",
          500: "#8B3A62",
          600: "#743051",
        },
        paddy: {
          DEFAULT: "#E5B32A",
          500: "#E5B32A",
          600: "#ca9c22",
        },
        ember: {
          DEFAULT: "#CF5C36",
          500: "#CF5C36",
          600: "#b5502f",
        },
        rice: {
          DEFAULT: "#F5F2EB",
          500: "#F5F2EB",
          800: "#d6d0c4",
        }
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
        display: ["var(--font-fraunces)", "serif"],
      }
    },
  },
  plugins: [],
};
export default config;
