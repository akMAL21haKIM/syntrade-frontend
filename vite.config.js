import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

import svgrPlugin from "@honkhonk/vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgrPlugin()],
});
