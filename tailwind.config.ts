// Tailwindcss Imports
import { Config } from "tailwindcss";

export default defineConfig();

function defineConfig(): Config {
  return {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {},
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1600px",
      },
    },
    plugins: [],
    corePlugins: {
      preflight: false,
    },
    important: "#root",
  };
}
