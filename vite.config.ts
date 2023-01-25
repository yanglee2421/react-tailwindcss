import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  /**
   * 打包路径
   */
  let base = "/";
  switch (mode) {
    case "gitee":
      base = "/vite-react/";
      break;
    default:
      base = "/react/";
  }
  /**
   * 输出目录
   */
  let outDir = "dist";
  switch (mode) {
    case "gitee":
      outDir = "docs";
      break;
    default:
      outDir = "react-app";
  }
  return {
    plugins: [react()],
    // 路径别名
    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
    },
    // css预处理器
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/index.scss" as *;`,
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
    // 路由
    base,
    // 构建
    build: { outDir },
    // env 变量
    envDir: path.resolve(__dirname, "./config"),
  };
});
