// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(), // React fast refresh and optimizations
    tailwindcss() // Handles Tailwind CSS processing
  ]
});
