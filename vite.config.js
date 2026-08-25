import react from '@vitejs/plugin-react'
import cropPlugin from './scripts/vite-crop-plugin.js'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [cropPlugin(), react()],
})
