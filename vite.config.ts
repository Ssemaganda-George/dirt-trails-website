import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: mode === "development"
    ? {
        host: "::",
        port: 8080,
        allowedHosts: [
          "dirt-trails-safaris.onrender.com",
          "www.dirt-trails.com"
        ],
      }
    : {
        host: "::",
        port: 8080,
      },
  plugins: [
    // componentTagger removed
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
