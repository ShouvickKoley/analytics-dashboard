import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative base so the built app works from any subpath (e.g. GitHub Pages
  // project sites, or a subfolder deploy) without extra configuration.
  base: './',
})
