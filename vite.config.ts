import { dirname, resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { crx, defineManifest } from "@crxjs/vite-plugin";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  return {
    plugins: [
      react({
        include: [".scss"],
      }),
      crx({
        manifest: defineManifest({
          // ** Required
          manifest_version: 3,
          name: "Yang Tab",
          version: "0.0.1",

          // icons: {
          //   "16": "enabled-16.png",
          //   "128": "enabled-128.png",
          // },

          // ** Scripts
          content_scripts: [
            {
              js: ["src/app/content_scripts.tsx"],
              matches: ["*://*/*"],
            },
          ],
          permissions: ["contextMenus", "tabs", "storage"],
          background: {
            service_worker: "src/service_worker.ts",
            type: "module",
          },

          // ** Views
          action: {
            default_popup: "default_popup.html",
            default_title: "Yang Tab",
            default_icon: {},
          },
          options_page: "options_page.html",
          default_locale: "en",
          chrome_url_overrides: {
            newtab: "blank.html",
          },
        }),
      }),
    ],
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

    base: "./",
    envDir: resolve(__dirname, "./"),

    build: {
      outDir: "dist",
      emptyOutDir: true,

      rollupOptions: {
        input: {
          default_popup: resolve(__dirname, "./default_popup.html"),
          options_page: resolve(__dirname, "./options_page.html"),
          blank: resolve(__dirname, "./blank.html"),
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
