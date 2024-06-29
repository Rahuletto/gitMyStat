import type { Config } from "tailwindcss";
import { Themes } from "./themes";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media", // or 'class'
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        color: "var(--color)",
        accent: "var(--accent)",
        tip: "var(--tip)",
        ...Themes
      },
    },
  },
  plugins: [],
};
export default config;
