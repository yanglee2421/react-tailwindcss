import { ConfigEnv, defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { readFileSync } from "node:fs";
import gzip from "vite-plugin-compression";
import image from "vite-plugin-imagemin";

// https://vitejs.dev/config/
export default defineConfig((ConfigEnv) => ({
  plugins: [react(), gzip({ deleteOriginFile: false }), image()],
  resolve: {
    alias: { "@": resolve(__dirname, "./src") },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/index.scss" as *;`,
      },
    },
  },
  envDir: resolve(__dirname, "./config"),
  base: base(ConfigEnv),
  build: build(ConfigEnv),
  server: server(ConfigEnv),
}));

function base({ mode }: ConfigEnv): UserConfig["base"] {
  return "/vite-react/";
}

function build({ mode }: ConfigEnv): UserConfig["build"] {
  const outDir = mode === "gitee" ? "docs" : "react-app";

  const rollupOptions = {
    output: {
      manualChunks: {
        echarts: ["echarts"],
        three: ["three"],
      },
    },
  };

  return { outDir, rollupOptions };
}

function server({ mode }: ConfigEnv): UserConfig["server"] {
  const isGitee = mode === "gitee";

  const proxy = {
    "/dev": {
      target: "http://192.168.1.4",
      rewrite: (path) => path.replace(/^\/dev/, ""),
      changeOrigin: true,
      ws: true,
    },
  };

  const https = isGitee && {
    key: readFileSync(resolve(__dirname, "./config/localhost+1-key.pem")),
    cert: readFileSync(resolve(__dirname, "./config/localhost+1.pem")),
  };

  return { proxy, https, port: 5173 };
}
