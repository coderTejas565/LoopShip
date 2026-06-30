import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],

  outDir: "dist",

  clean: true,

  splitting: false,

  sourcemap: false,

  minify: true,

  bundle: true,

  noExternal: ["@repo/logger", "@repo/trpc", "@repo/auth", "@repo/inngest"],

  env: {
    IS_SERVER_BUILD: "true",
  },

  loader: {
    ".json": "copy",
  },
});
