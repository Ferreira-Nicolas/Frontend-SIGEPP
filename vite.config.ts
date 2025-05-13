import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',      // aceita conexões de qualquer IP na rede
    port: 5173,           // porta padrão, você pode mudar se quiser
    strictPort: true      // falha se a porta estiver em uso
  }
})