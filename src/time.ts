/*
 * @Author: Warren
 * @Date: 2026-03-03 09:02:52
 * @LastEditors: Warren
 * @LastEditTime: 2026-03-03 11:41:00
 * @FilePath: /common-utils/src/time.ts
 * @Description: 请填写文件说明
 */
type FormatTimeType = 'dateTimeZh' | 'date' | 'time' | 'dateTime';

interface FormatTimeOptions {
    time?: Date | string;
    type?: FormatTimeType;
    dateSeparator?: string;
    timeSeparator?: string;
}

/**
 * @description: 格式化时间，支持多种格式和自定义分隔符
 * @param options 
 * @returns 
 */
export function formatTime(options: FormatTimeOptions = {}): string {
    const {
        time = new Date(),
        type = 'dateTime',
        dateSeparator = '-',
        timeSeparator = ':'
    } = options;

    // 验证 type 参数
    const validTypes: FormatTimeType[] = ['dateTimeZh', 'date', 'time', 'dateTime'];
    if (!validTypes.includes(type)) {
        throw new Error(`Invalid type. Must be one of: ${validTypes.join(', ')}`);
    }

    const date = typeof time === 'object' ? time : new Date(time);

    // 验证日期是否有效
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
    }

    const addZero = (num: number): string => num.toString().padStart(2, '0');

    const year = date.getFullYear();
    const month = addZero(date.getMonth() + 1);
    const day = addZero(date.getDate());
    const hours = addZero(date.getHours());
    const minutes = addZero(date.getMinutes());
    const seconds = addZero(date.getSeconds());

    const dateStr = `${year}${dateSeparator}${month}${dateSeparator}${day}`;
    const timeStr = `${hours}${timeSeparator}${minutes}${timeSeparator}${seconds}`;

    const formatters = {
        dateTimeZh: () =>
            `${year}年${month}月${day}日 ${hours}时${minutes}分${seconds}秒`,
        date: () => dateStr,
        time: () => timeStr,
        dateTime: () => `${dateStr} ${timeStr}`
    };

    return formatters[type]();
}



/**
 * @description: 获取当前日期时间字符串，格式为 "YYYY-MM-DD HH:mm:ss"
 * @param date 
 * @returns 
 */
export const formatNowDate = (date: Date = new Date()): string => {
    const addZero = (n: number): string => n < 10 ? `0${n}` : `${n}`;
    const d = date || new Date();

    return `${d.getFullYear()}-${addZero(d.getMonth() + 1)}-${addZero(d.getDate())} ${addZero(d.getHours())}:${addZero(d.getMinutes())}:${addZero(d.getSeconds())}`;
};
