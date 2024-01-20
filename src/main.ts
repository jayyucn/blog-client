import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { setupI18n } from '@/i18n'
import { setupStore } from '@/stores'
import { setupElementPlus } from './plugins/elementPlus'
import { setupRouter } from './router'
import { setupGlobalComponents } from '@/components/index'

// 引入全局样式
import '@/styles/index.less'


const setupAll = async () => {
  const app = createApp(App)
  //多语言模块
  await setupI18n(app)
  //本地存储模块
  setupStore(app)
  //全局组件
  setupGlobalComponents(app)
  //初始化element plus
  setupElementPlus(app)
  //路由模块
  setupRouter(app)

  app.mount('#app')
}

setupAll()