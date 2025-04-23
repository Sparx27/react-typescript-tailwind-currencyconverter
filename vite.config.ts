import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://v6.exchangerate-api.com', // URL de la API que estás utilizando
        changeOrigin: true, // Permite cambiar el origen
        rewrite: (path) => path.replace(/^\/api/, '') // Elimina '/api' del inicio del path
      }
    }
  }
});
