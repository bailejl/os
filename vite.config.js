import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'web',
  build: {
    outDir: '../dist/web',
    emptyOutDir: true,
    assetsDir: '',
    // sourcemap: 'inline', // enable for debugging
  },
  server: {
    port: 4200,
  },
  plugins: [
    svelte()
    // svelte({
    //   compilerOptions: {
    //     customElement: true,
    //   }
    // })
  ]
})

