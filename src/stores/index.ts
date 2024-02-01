import type { Pinia } from 'pinia'
import type { App } from 'vue'
import { useAppStore, type AppStore } from './modules/store.app'
import { useArticleDetailStore, useArticleListStore, type ArticleDetailStore, type ArticleListStore } from './modules/store.article'
import { useLocaleStore, type LocaleStore } from './modules/store.locale'
import { setupPinia } from './pinia'

export const setupStore = (app: App<Element>) => {
  const pinia = setupPinia()
  app.use(pinia)
  
  setupModules(pinia)
}

export default class Store {
  static appStore: AppStore
  static localeStore: LocaleStore
  static articleDetail: ArticleDetailStore
  static articleList: ArticleListStore
}

const setupModules = (pinia: Pinia) => {
  Store.appStore = useAppStore(pinia)
  Store.localeStore = useLocaleStore(pinia)
  Store.articleDetail = useArticleDetailStore(pinia)
  Store.articleList = useArticleListStore(pinia)
}

