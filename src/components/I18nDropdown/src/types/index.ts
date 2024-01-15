export interface Language {
  el: Recordable
  name: string
}

export interface I18nDropdownType {
  lang: LocaleType
  name?: string
  elLocale?: Language
}
