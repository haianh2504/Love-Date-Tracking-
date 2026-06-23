import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    
    // BỔ SUNG PHẦN TỐI ƯU HÓA XÂY DỰNG (BUILD OPTIMIZATION)
    build: {
      // Tăng nhẹ ngưỡng cảnh báo để tránh báo lỗi chữ vàng với các file hợp lệ
      chunkSizeWarningLimit: 800, 
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Kiểm tra xem mã nguồn có đến từ thư mục node_modules (thư viện bên thứ 3) không
            if (id.includes('node_modules')) {
              // 1. Tách riêng Firebase (Bộ SDK này thường rất nặng)
              if (id.includes('firebase')) {
                return 'vendor-firebase'; 
              }
              // 2. Tách riêng thư viện hiệu ứng (Motion)
              if (id.includes('motion') || id.includes('framer-motion')) {
                return 'vendor-motion'; 
              }
              // 3. Tách riêng React và DOM lõi
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react'; 
              }
              // 4. Tách riêng bộ Icon
              if (id.includes('lucide-react')) {
                return 'vendor-icons'; 
              }
              // 5. Gom tất cả các thư viện lặt vặt còn lại vào một file chung
              return 'vendor-core'; 
            }
          }
        }
      }
    }
  };
});