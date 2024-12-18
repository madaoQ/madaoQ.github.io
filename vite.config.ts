import { fileURLToPath, URL } from 'node:url'

import { defineConfig} from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import postcss from 'postcss';

const cssConfig = {
  preprocessorOptions: {
    scss: {
      //additionalData: `@import "./src/assets/styles/_variables.scss";`,
      api: 'modern-compiler'
    }
  },
};

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    viteMockServe({
      // default
      mockPath: 'mock',
      enable: true,
    }),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  css: cssConfig,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
