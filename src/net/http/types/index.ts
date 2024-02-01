import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

interface RequestInterceptors<T> {
  // 请求拦截
  requestInterceptors?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  // 响应拦截
  responseInterceptors?: (config: T) => T
  responseInterceptorsCatch?: (err: any) => any
}

export enum ResponseStatus {
  Error = 'error',
  Success = 'success'
}

interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>
}

interface IResponse<T = any> {
  status: ResponseStatus
  result: T extends any ? T : T & any
}

export type {
  AxiosError, AxiosInstance, AxiosRequestHeaders, AxiosResponse, IResponse, InternalAxiosRequestConfig, RequestConfig, RequestInterceptors
}

