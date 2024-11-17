import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as fs from "node:fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
  ],
  optimizeDeps: {
    include: ['msw'],
  },
  server: {
    https: {
      key: fs.readFileSync('./inf/tm.local+2-key.pem'),
      cert: fs.readFileSync('./inf/tm.local+2.pem'),
    },
  },
})
