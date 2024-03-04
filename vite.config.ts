import { dirname, resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";

import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const isBuild = configEnv.command === "build";

  return {
    plugins: [react(), TanStackRouterVite()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
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
    envDir: resolve(__dirname, "./"),

    build: {
      outDir: "docs",
      emptyOutDir: true,

      rollupOptions: {
        input: {
          main: resolve(__dirname, "./index.html"),
        },
        output: {
          manualChunks(id) {
            if (id.includes("node_modules/antd")) {
              return "antd";
            }
          },
          entryFileNames: "assets/[name]-[hash].js",
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash][extname]",
        },
      },

      target: "modules",
      minify: "esbuild",

      cssTarget: ["es2020", "edge88", "firefox78", "chrome87", "safari14"],
      cssMinify: "esbuild",
      cssCodeSplit: true,

      manifest: false,
      sourcemap: false,
      chunkSizeWarningLimit: 1024,
    },

    server: {
      port: 3004,
      strictPort: true,
      hmr: {
        port: 3004,
      },
      proxy: {
        "/dev": {
          target: "http://127.0.0.1",
          rewrite(path) {
            return path.replace(/^\/dev/, "");
          },
          changeOrigin: true,
          ws: true,
        },
      },
      fs: {
        allow: [resolve(__dirname, "./")],
      },
    },
  };
});
