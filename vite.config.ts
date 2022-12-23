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
    // 开发服务器
    server: {
      port: 5173,
      proxy: {
        "/dev": {
          target: "http://192.168.1.4",
          rewrite: (path) => path.replace(/^\/dev/, ""),
          changeOrigin: true,
          ws: true,
        },
      },
    },
    base: "/react/",
    build: {
      outDir: "react-app",
    },
  };
});
