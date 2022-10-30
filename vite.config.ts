import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  root: "web",
  build: {
    outDir: "../dist/web",
    emptyOutDir: true,
    assetsDir: "",
    // sourcemap: 'inline', // enable for debugging
  },
  server: {
    port: 4200,
  },
  plugins: [svelte(), eslint()],
});
