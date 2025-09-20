import { defineConfig } from "vite"

export default defineConfig({
  // Configuración básica de Vite para SPA
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
})
