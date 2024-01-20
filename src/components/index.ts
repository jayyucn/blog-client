import type { App } from 'vue'
import { BaseButton } from './Button'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export const setupGlobalComponents = (app: App<Element>): void => {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  app.component('BaseButton', BaseButton)
}
