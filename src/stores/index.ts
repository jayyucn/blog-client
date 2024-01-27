import type { App } from 'vue'
import {  setupPinia } from './pinia'
import type { Pinia } from 'pinia'
import { useAppStore, type AppStore } from './modules/store.app'
import { useLocaleStore, type LocaleStore } from './modules/store.locale'
import { useArticleDetailStore, type ArticleDetailStore } from './modules/store.article'

export const setupStore = (app: App<Element>) => {
  const pinia = setupPinia()
  app.use(pinia)

  setupModules(pinia)
}

export default class Store {
  static appStore: AppStore
  static localeStore: LocaleStore
  static articleDetail: ArticleDetailStore
}


const setupModules = (pinia: Pinia) => {
  Store.appStore = useAppStore(pinia)
  Store.localeStore = useLocaleStore(pinia)
  Store.articleDetail = useArticleDetailStore(pinia)
}

