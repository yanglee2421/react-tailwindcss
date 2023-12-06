// Vite Imports
import { defineConfig } from "vite";
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
    build: {
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
            if (id.includes("node_modules/antd")) {
              return "antd";
            }
          },
          entryFileNames: "assets/[name]-[hash].js",
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash][extname]",
        },
      },
    },

    // DEV Server
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
      fs: { allow: [resolve(__dirname, "./")] },
    },
  };
});
