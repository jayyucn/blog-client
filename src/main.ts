import App from './App.vue'

import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import { setupGlobalComponents } from './components/index'
import { setupI18n } from './i18n'
import API from './net/api'
import { setupMarkdown } from './plugins/v-md-editor'
import { setupRouter } from './router'
import { setupStore } from './stores'

const setupAll = async () => {
  const app = createApp(App)
  //初始化element plus
  app.use(ElementPlus)
  //本地存储模块
  setupStore(app)
  //多语言模块
  await setupI18n(app)
  //全局组件
  setupGlobalComponents(app)
  setupMarkdown(app)
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