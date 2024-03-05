import { dayjs } from 'element-plus';


// 假设 DATE_TIME_FORMAT 是一个在其他地方定义的常量
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD'

/**
 * 格式化日期为指定的格式字符串。
 * @param date 可选的日期对象，如果不提供则使用当前日期。
 * @param format 日期格式化字符串，默认为 'YYYY-MM-DD HH:mm:ss'。
 * @returns 格式化后的日期字符串。
 */
export function formatToDateTime(date?: dayjs.ConfigType, format: string = DATE_TIME_FORMAT): string {
    if (typeof format !== 'string') {
        throw new Error('Invalid format provided. Expected a string representing a date format.');
    }
    return dayjs(date).format(format);
}

/**
 * 将日期格式化为指定格式的字符串
 * @param date 可选参数，日期对象，默认为当前日期
 * @param format 可选参数，日期格式，默认为YYYY-MM-DD
 * @returns 格式化后的日期字符串
 */
export function formatToDate(date?: dayjs.ConfigType, format = DATE_FORMAT): string {
    if (typeof format !== 'string') {
        throw new Error('Invalid format provided. Expected a string representing a date format.');
    }
    return dayjs(date).format(format)
}

export const dateUtil = dayjs
