import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Cho phép Vite lắng nghe trên mọi IP (để nhận request từ mạng ngoài)
    host: '0.0.0.0', 
    
    // Thêm tên miền của bạn vào danh sách cho phép
    allowedHosts: [
      'ilearning-school.canluaz.io.vn'
    ]
  }
})