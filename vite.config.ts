import { ConfigEnv, defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig((ConfigEnv) => ({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/index.scss" as *;`,
      },
    },
  },
  envDir: path.resolve(__dirname, "./config"),
  base: base(ConfigEnv),
  build: build(ConfigEnv),
  server: server(),
}));

function base({ mode }: ConfigEnv): UserConfig["base"] {
  return mode === "gitee" ? "/vite-vue/" : "./";
}

function build({ mode }: ConfigEnv): UserConfig["build"] {
  let outDir = mode === "gitee" ? "docs" : "vue-app";
  return { outDir };
}

function server(): UserConfig["server"] {
  return {
    port: 5173,
    proxy: {
      "/dev": {
        target: "http://192.168.1.4",
        rewrite: (path) => path.replace(/^\/dev/, ""),
        changeOrigin: true,
        ws: true,
      },
    },
  };
}
