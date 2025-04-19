import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar', 'useDrawer'],
        },
      ],
    }),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 目标 API 地址
        changeOrigin: true, // 是否跨域
        rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径
      },
    },
  },
})
