    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    import tailwindcss from '@tailwindcss/vite'
    import path from 'path'
    import { fileURLToPath } from 'url'

    const __dirname = path.dirname(fileURLToPath(import.meta.url))

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [
        react(), 
        tailwindcss({
          theme: {
            extend: {
              colors: {
                // 🎨 Presidency University Theme Colors
                'pu-blue': '#002147',       // Primary PU Blue (Navbar, Buttons, Links)
                'pu-blue-light': '#013874', // Slightly lighter for hover/focus
                'found-accent': '#FBBF24',  // Amber (FOUND badges/buttons)
                'lost-accent': '#DC2626',   // Red (LOST badges/errors)
                'neutral-bg': '#F9FAFB',    // Gray background (forms/cards)
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
        