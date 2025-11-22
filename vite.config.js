import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  // Change cache directory to avoid filesystem issues on some mounted drives
  cacheDir: 'vite-cache',
  plugins: [
    react(),
    tailwindcss({
      theme: {
        extend: {
          colors: {
            // Main website colors
            'pu-blue': '#002147',         // Old PU Blue 
            'pu-blue-light': '#013874',   // Hover/secondary PU Blue
            'found-accent': '#FBBF24',    // Amber for Found badges/buttons
            'lost-accent': '#DC2626',     // Red for Lost badges/errors
            'neutral-bg': '#F9FAFB',      // Background for forms/cards

            // New theme colors based on your design
            'white-color': '#ffffff',
            'heading-color': '#00001b',
            'body': '#555555',
            'accent': '#9f1b19',      // Navbar background color
            'secondary': '#13467d',   // Optional, for other UI elements
            'gray': '#f4f3ef',
            'border': '#d9d9d9',
          },
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // ✅ '@' now means '/src'
    },
  },
})
