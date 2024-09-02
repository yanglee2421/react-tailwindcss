import type { Config } from "tailwindcss";
import form from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [form],
  darkMode: ["selector", ".dark"],
  corePlugins: {
    preflight: true,
  },
} satisfies Config;
