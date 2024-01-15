import type { App } from 'vue'
import { Icon } from './Icon'
import { BaseButton } from './Button'

export const setupGlobalComponents = (app: App<Element>): void => {
  app.component('HeadIcon', Icon)
  app.component('BaseButton', BaseButton)
}
