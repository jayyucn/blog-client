import './assets/main.css'

import App from './App.vue'

import { setupGlobalComponents } from '@/components/index'
import { setupI18n } from '@/i18n'
import { setupStore } from '@/stores'
import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import API from './net/api'
import { setupMarkdown } from './plugins/v-md-editor'
import { setupRouter } from './router'

const setupAll = async () => {
  const app = createApp(App)
  //本地存储模块
  setupStore(app)
  //多语言模块
  await setupI18n(app)
  //全局组件
  setupGlobalComponents(app)
  setupMarkdown(app)
  //初始化element plus
  app.use(ElementPlus)
  // setupElementPlus(app)
  //路由模块
  setupRouter(app)


  app.mount('#app')
}

const init = () => {
  API.init()
}

setupAll()

init()