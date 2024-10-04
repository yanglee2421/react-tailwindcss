import type { Config } from "tailwindcss";
import { addIconSelectors } from "@iconify/tailwind";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [addIconSelectors(["fluent"])],
  darkMode: ["selector", ".dark"],
  corePlugins: {
    preflight: true,
  },
} satisfies Config;
