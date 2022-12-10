import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [react()],
    // 路径别名
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // css预处理器
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/css/index.scss" as *;`,
        },
      },
    },
    // 代理服务器
    server: {
      proxy: {
        "/api": {
          target: "https://cn.bing.com",
          rewrite: (path) => path.replace(/^\/api/, ""),
          changeOrigin: true,
          ws: true,
        },
      },
    },
    build: {
      outDir: "dist-react",
    },
  };
});
