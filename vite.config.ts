import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

const PROJECT_ROOT = import.meta.dirname;
const isDev = process.env.NODE_ENV !== "production";

/* ===================== DEBUG PLUGIN (DEV ONLY) ===================== */

function vitePluginManusDebugCollector(): Plugin {
  return {
    name: "manus-debug-collector",
    apply: "serve", // 👈 SOLO EN DEV

    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              src: "/__manus__/debug-collector.js",
              defer: true,
            },
            injectTo: "head",
          },
        ],
      };
    },

    configureServer(server: ViteDevServer) {
      server.middlewares.use("/__manus__/logs", (_req, res) => {
        res.writeHead(200);
        res.end();
      });
    },
  };
}

/* ===================== PLUGINS ===================== */

const plugins = [
  react(),
  tailwindcss(),
  jsxLocPlugin(),
  vitePluginManusRuntime(),
  isDev && vitePluginManusDebugCollector(),
].filter(Boolean);

/* ===================== EXPORT ===================== */

export default defineConfig({
  base: "/plataforma-pedidos/", // 🔥 CLAVE PARA GITHUB PAGES

  plugins,

  root: path.resolve(PROJECT_ROOT, "client"),

  resolve: {
    alias: {
      "@": path.resolve(PROJECT_ROOT, "client", "src"),
      "@shared": path.resolve(PROJECT_ROOT, "shared"),
      "@assets": path.resolve(PROJECT_ROOT, "attached_assets"),
    },
  },

  envDir: PROJECT_ROOT,

  build: {
    outDir: path.resolve(PROJECT_ROOT, "dist"), // 🔥 Pages SOLO LEE ESTO
    emptyOutDir: true,
  },
});
