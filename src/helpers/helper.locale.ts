import { CreateI18n, setHtmlPageLang } from "@/i18n"
import { useLocaleStoreWithOut } from "@/stores/modules/store.i18n"

export const useLocale = () => {
    // Switching the language will change the locale of useI18n
    // And submit to configuration modification
    const changeLocale = async (locale: LocaleType) => {
        const globalI18n = CreateI18n.global

        const langModule = await import(`../../locales/${locale}.ts`)

        globalI18n.setLocaleMessage(locale, langModule.default)

        setI18nLanguage(locale)
    }

    return {
        changeLocale
    }
}

const setI18nLanguage = (locale: LocaleType) => {
    const localeStore = useLocaleStoreWithOut()

    if (CreateI18n.mode === 'legacy') {
        CreateI18n.global.locale = locale
    } else {
        (CreateI18n.global.locale as any).value = locale
    }
    localeStore.setCurrentLocale({
        lang: locale
    })
    setHtmlPageLang(locale)
}