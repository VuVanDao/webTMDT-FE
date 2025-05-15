import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  //cho phep vite dung process.env
  define: {
    "process.env": process.env,
  },
  plugins: [react()],
});
