import type { Config } from "tailwindcss";
import form from "@tailwindcss/forms";
import { addIconSelectors } from "@iconify/tailwind";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [form(), addIconSelectors(["line-md"])],
  darkMode: ["selector", ".dark"],
  corePlugins: {
    preflight: true,
  },
} satisfies Config;
