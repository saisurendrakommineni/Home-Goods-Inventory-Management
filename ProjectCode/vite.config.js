import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/CIS_641_Final_Project",
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Increased warning limit
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],  // Only include existing libraries
        },
      },
    },
  },
});


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   base:"/CIS_641_Final_Project",
//   plugins: [react()],
// })
