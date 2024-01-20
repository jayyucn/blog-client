import { defineStore } from 'pinia'
import { store } from '../index'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import zhTw from 'element-plus/es/locale/lang/zh-tw'
import en from 'element-plus/es/locale/lang/en'
import { useStorage } from '../../utils/util.storage'
import { type I18nDropdownType } from '@/components/I18nDropdown'

const { getStorage, setStorage } = useStorage('localStorage')

const elLocaleMap = {
  'zh-CN': zhCn,
  'zh-TW': zhTw,
  en: en
}

const localeMap: I18nDropdownType[]= [
  {
    lang: 'zh-CN',
    name: '简体中文'
  },
  {
    lang: 'zh-TW',
    name: '正體中文'
  },
  {
    lang: 'en',
    name: 'English'
  }
]
interface I18nState {
  currentLocale: I18nDropdownType
  localeMap: I18nDropdownType[]
}

export const useLocaleStore = defineStore('i18n', {
  state: (): I18nState => {
    return {
      currentLocale: {
        lang: getStorage('lang') || 'en',
        name: "中文",
        elLocale: elLocaleMap[getStorage('lang') || 'zh-CN']
      },
      // 多语言
      localeMap: localeMap
    }
  },
  getters: {
    getCurrentLocale(): I18nDropdownType {
      return this.currentLocale
    },
    getLocaleMap(): I18nDropdownType[] {
      return this.localeMap
    }
  },
  actions: {
    setCurrentLocale(localeMap: I18nDropdownType) {
      // this.locale = Object.assign(this.locale, localeMap)
      this.currentLocale.lang = localeMap?.lang
      this.currentLocale.name = localeMap?.name
      this.currentLocale.elLocale = elLocaleMap[localeMap?.lang]
      setStorage('lang', localeMap?.lang)
    }
  }
})

export const useLocaleStoreWithOut = () => {
  return useLocaleStore(store)
}
