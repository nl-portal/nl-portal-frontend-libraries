import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'api',
      fileName: 'index',
      formats: ["es"],
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@nl-portal/nl-portal-authentication'],
      output: {
        entryFileNames: '[name].js',
        globals: {
          react: 'React',
        },
      },
    },
  },
})
