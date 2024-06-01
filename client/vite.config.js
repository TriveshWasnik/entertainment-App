import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: "https://entertainment-app-api-44s2.onrender.com", //"http://localhost:5000", render backend link
  },
  plugins: [react()],
});
