import Store from '@/stores'
import type { App } from 'vue'
import type { I18nOptions, I18n as VueI18n } from 'vue-i18n'
import { createI18n } from 'vue-i18n'

export let CreateI18n: ReturnType<typeof createI18n>

export const setHtmlPageLang = (locale: LocaleType) => {
  document.querySelector('html')?.setAttribute('lang', locale)
}

const createI18nOptions = async (): Promise<I18nOptions> => {
  const localeStore = Store.localeStore
  const locale = localeStore.getCurrentLocale
  const localeMap = localeStore.getLocaleMap
  const defaultLocal = await import(/* @vite-ignore */`./locales/${locale.lang}.json`)
  const message = defaultLocal.default ?? {}
  setHtmlPageLang(locale.lang)
  localeStore.setCurrentLocale({
    lang: locale.lang
    // elLocale: elLocal
  })

  return {
    legacy: false,
    locale: locale.lang,
    fallbackLocale: locale.lang,
    messages: {
      [locale.lang]: message
    },
    availableLocales: localeMap.map((v) => v.lang),
    sync: true,
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true
  }
}

export const setupI18n = async (app: App<Element>) => {
  const options = await createI18nOptions()
  CreateI18n = createI18n(options) as VueI18n
  app.use(CreateI18n)
}

const getKey = (namespace: string | undefined, key: string) => {
  if (!namespace) {
    return key
  }
  if (key.startsWith(namespace)) {
    return key
  }
  return `${namespace}.${key}`
}

type I18nGlobalTranslation = {
  (key: string): string
}

const usingI18n = (namespace?: string): I18nGlobalTranslation => {
  const normalFn = (key: string) => getKey(namespace, key)

  if (!CreateI18n) {
    return normalFn
  }

  const { t } = CreateI18n.global

  const tFn: I18nGlobalTranslation = (key: string, ...arg: any[]) => {
    if (!key) return ''
    if (!key.includes('.') && !namespace) return key
    return (t as any)(getKey(namespace, key), ...(arg as [string, any]))
  }
  return tFn
}

export const i18n = {
  t: (key: string) => {
    return usingI18n()(key)
  }
}




