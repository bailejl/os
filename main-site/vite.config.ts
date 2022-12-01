import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config: UserConfig = {
  plugins: [tsconfigPaths(), sveltekit()],
  server: {
    port: 4204
  }
};

export default config;
