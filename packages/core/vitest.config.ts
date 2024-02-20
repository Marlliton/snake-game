import tsConfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    root: "./",
  },
  plugins: [
    // This is required to build the test files with SWC
    tsConfigPaths(),
  ],
});
