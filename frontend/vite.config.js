<<<<<<< HEAD
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { fileURLToPath } from "url"
 
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
=======
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { fileURLToPath } from "url"
 
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
>>>>>>> 7910057a (Updated code for krinSprint3 branch)
})