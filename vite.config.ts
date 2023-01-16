import { defineConfig } from "vite";
import { resolve } from "path";
import { name } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/index.ts"),
      name: "geejson2svg",
      // the proper extensions will be added
      fileName: (format) => `index.${format}.js`,
    },
  },
});
