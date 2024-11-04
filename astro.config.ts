import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap(),
    mdx(),
    partytown({
      // Partytownの設定
      config: {
        // Google Analyticsのイベントを転送
        forward: ["dataLayer.push"],
        // デバッグモード（開発時のみ true に）
        debug: false,
      },
    }),
  ],
  markdown: {
    remarkPlugins: [
      [remarkToc, { heading: "目次" }],
      [
        remarkCollapse,
        {
          test: "目次",
          summary: () => `目次を開く`,
        },
      ],
    ],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      wrap: true,
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
  experimental: {
    contentLayer: true,
  },
});
