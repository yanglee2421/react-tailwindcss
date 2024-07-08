import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: ["selector", ".dark"],
  corePlugins: {
    preflight: true,
  },
} satisfies Config;
