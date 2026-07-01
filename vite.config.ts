import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./public/assets"),
    },
  },
  preview: {
    allowedHosts: ["itrrika.onrender.com"],
    host: "0.0.0.0",
    port: 10000,
    proxy: {
      "/api": {
        target: "https://itrrika-backend.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://itrrika-backend.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});