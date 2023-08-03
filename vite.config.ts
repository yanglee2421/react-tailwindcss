import { ConfigEnv, defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";
import { readFileSync } from "node:fs";

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: { additionalData: `@use "@yanglee2421/scss/src" as *;` },
    },
  },
  base: "/dist",
  // base: "https://zqgc2023.absen.com/wp-content/themes/shopeo-child/",
  // envDir: resolve(__dirname, "./config"),
  build: build(configEnv),
  server: server(configEnv),
}));

function build({ mode }: ConfigEnv): UserConfig["build"] {
  const isGitee = mode === "gitee";
  const outDir = isGitee ? "docs" : void 0;

  return {
    outDir,
    manifest: true,
    rollupOptions: {
      output: {
        // dir: "dist",
        // file: "res.test.js",
        // manualChunks(id) {
        //   const isAntd = id.includes("node_modules/antd");
        //   if (isAntd) return "antd";
        // },
        entryFileNames: "index.test.js",
        assetFileNames: "[name][extname]",
        chunkFileNames: "[name].js",
      },
    },
    chunkSizeWarningLimit: 1000,
  };
}

function server({ mode }: ConfigEnv): UserConfig["server"] {
  const isGitee = mode === "gitee";
  const https = isGitee && {
    key: readFileSync(resolve(__dirname, "./config/localhost+1-key.pem")),
    cert: readFileSync(resolve(__dirname, "./config/localhost+1.pem")),
  };

  return {
    https,
    port: 5173,
    fs: { allow: [".."] },
    proxy: {
      "/dev": {
        target: "http://127.0.0.1",
        rewrite: (path) => path.replace(/^\/dev/, ""),
        changeOrigin: true,
        ws: true,
      },
    },
  };
}
