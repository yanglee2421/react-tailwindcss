// Vite Imports
import { ConfigEnv, defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// NodeJs Imports
import { dirname, resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";
// import { readFileSync } from "node:fs";

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const isBuild = configEnv.command === "build";

  return {
    plugins: [react()],

    // Path Alias
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },

    // ** CSS
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss" as *;`,
        },
      },
      modules: {
        localsConvention: "camelCaseOnly",
      },
    },

    base: isBuild ? "./" : "/react-antd",

    // ENV File
    envDir: resolve(__dirname, "./"),

    // ** Build
    build: build(configEnv),

    // DEV Server
    server: server(configEnv),
  };
});

function build({ mode }: ConfigEnv): UserConfig["build"] {
  void mode;
  const __dirname = dirname(fileURLToPath(import.meta.url));

  return {
    outDir: "docs",
    emptyOutDir: true,
    manifest: false,
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
      },
      output: {
        manualChunks(id) {
          const isAntd = id.includes("node_modules/antd");
          if (isAntd) return "antd";
        },
        // entryFileNames: "assets/wp-vite-main.js",
        // assetFileNames: "assets/[name][extname]",
        // chunkFileNames: "assets/[name]-[hash].js",
      },
    },
  };
}

function server({ mode }: ConfigEnv): UserConfig["server"] {
  void mode;
  const __dirname = dirname(fileURLToPath(import.meta.url));

  return {
    https: false,
    fs: { allow: [".."] },
    port: 3004,
    proxy: {
      "/dev": {
        ws: true,
        changeOrigin: true,
        target: "http://127.0.0.1",
        rewrite(path) {
          return path.replace(/^\/dev/, "");
        },
      },
    },
  };
}
