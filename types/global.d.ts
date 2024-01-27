
declare interface Fn<T = any> {
  (...arg: T[]): T
}

declare type Recordable<T = any, K = string> = Record<K extends null | undefined ? string : K, T>

declare type LocaleType = 'zh-CN' | 'en' | 'zh-TW'

declare type LayoutType = 'classic' | 'topLeft' | 'top' | 'cutMenu'


declare interface AxiosConfig {
  params?: any
  data?: any //available when method=post & Content-Type=application/x-www-form-unlencoded
  url?: string
  method?: AxiosMethod
  headers?: RawAxiosRequestHeaders
  responseType?: AxiosResponseType
}

declare type AxiosContentType =
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'
  | 'text/plain'

declare interface Theme {
  elColorPrimary?: string
  leftMenuBorderColor?: string
  leftMenuBgColor?: string
  leftMenuBgLightColor?: string
  leftMenuBgActiveColor?: string
  leftMenuCollapseBgActiveColor?: string
  leftMenuTextColor?: string
  leftMenuTextActiveColor?: string
  logoTitleTextColor?: string
  logoBorderColor?: string
  topHeaderBgColor?: string
  topHeaderTextColor?: string
  topHeaderHoverColor?: string
  topToolBorderColor?: string
}
