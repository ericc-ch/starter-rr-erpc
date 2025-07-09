/// <reference types="vitest/config" />

import { cloudflare } from "@cloudflare/vite-plugin"
import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, type PluginOption } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

const isTest = process.env.NODE_ENV === "test"

const conditional = (options: {
  condition: boolean
  options: Array<PluginOption>
}) => {
  return options.condition ? [options.options] : []
}

export default defineConfig({
  plugins: [
    ...conditional({
      condition: !isTest,
      options: cloudflare({ viteEnvironment: { name: "ssr" } }),
    }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
  test: {
    browser: {
      enabled: true,
      headless: true,
      provider: "playwright",
      instances: [{ browser: "chromium" }, { browser: "firefox" }],
    },
  },
})
