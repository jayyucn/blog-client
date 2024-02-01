
export const REQUEST_TIMEOUT = 60000
export const CONTENT_TYPE: AxiosContentType = 'application/json'
/**
 * 请求成功状态码
 */
export const SUCCESS_CODE = 0
/**
 * 是否根据headers->content-type自动转换数据格式
 */
export const TRANSFORM_REQUEST_DATA = true

export const PATH_URL = import.meta.env.VITE_API_BASE_PATH


export const SUCCESS = 200
export const BAD_REQUEST = 400
export const FORBIDDEN = 403
export const NOT_FOUND = 404
export const INVALID_ERROR = 500