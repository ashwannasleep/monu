import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isPreview = process.env.CF_PAGES === '1' 
export default defineConfig({
  plugins: [react()],
  base: '/monu',
});

