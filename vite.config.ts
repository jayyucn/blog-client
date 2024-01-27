import { fileURLToPath, URL } from 'node:url'
import path from 'path'

import vue from '@vitejs/plugin-vue'
import { loadEnv, type ConfigEnv, type UserConfig } from 'vite'

import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import EslintPlugin from 'vite-plugin-eslint'

const root = process.cwd()

const pathSrc = path.resolve(__dirname, 'src')
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  let env = {} as any
  const isBuild = command === 'build'
  if (!isBuild) {
    env = loadEnv(process.argv[3] === '--mode' ? process.argv[4] : process.argv[3], root)
  } else {
    env = loadEnv(mode, root)
  }
  return{
    base:  env.VITE_BASE_PATH,
  plugins: [
    vue(),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],

      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),

        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],

      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),

    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
      ],

      dts: path.resolve(pathSrc, 'components.d.ts'),
    }),

    Icons({
      autoInstall: true,
      compiler: 'vue3',
    }),
   

    EslintPlugin({
      cache: false,
      include: ['src/**/*.vue', 'src/**/*.ts'] // 检查的文件
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // 引入全局样式
        additionalData: `@import '@/styles/app.scss';`
      },
      // less: {
      //   math: "always",
      //   globalVars: {
      //     headerBgColor: "#fff",
      //   },
      //   additionalData: '@import "./src/styles/variables.module.less";',
      //   javascriptEnabled: true,
      // }
    }
  },
  resolve: {
    alias: [
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js' // Resolve the i18n warning issue.
      },
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      }]
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'vue-types',
      'element-plus/es/locale/lang/zh-cn',
      'element-plus/es/locale/lang/en',
      '@element-plus/icons-vue',
    ]
  }
}
}
