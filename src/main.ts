import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { setupI18n } from '@/plugins/vueI18n'
import { setupStore } from '@/stores'
import { setupGlobalComponents } from './components'
import { setupElementPlus } from './plugins/elementPlus'
import { setupRouter } from './router'



const setupAll = async () => {
    const app = createApp(App)
  
    //多语言模块
    await setupI18n(app)
    //本地存储模块
    setupStore(app)
  
    setupGlobalComponents(app)
  
    setupElementPlus(app)
  
    setupRouter(app)

    app.mount('#app')
  }
  
  setupAll()