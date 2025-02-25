import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  base: process.env.NODE_ENV === 'production' ? '/static/' : '/', // Or a specific path
  build: {
    outDir: '../static', // Build directly to the backend's static directory
  },
})
