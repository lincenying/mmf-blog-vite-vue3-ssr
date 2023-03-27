/* eslint-disable no-prototype-builtins */
/* eslint-disable require-atomic-updates */
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import isNumber from 'lodash/isNumber'
import isInteger from 'lodash/isInteger'
import isBoolean from 'lodash/isBoolean'
import isObject from 'lodash/isObject'
import isNil from 'lodash/isNil'
import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'

import { ElMessage } from '@/plugin/element'

export const inBrowser = typeof window !== 'undefined'

// 返回 几xxx前
export const getDateDiff = (publishTime: number): string => {
    const timeNow = parseInt(`${new Date().getTime() / 1000}`, 10)
    const date = new Date(publishTime * 1000)
    const Y = date.getFullYear()
    let M: number | string = date.getMonth() + 1
    let D: number | string = date.getDate()
    let H: number | string = date.getHours()
    let m: number | string = date.getMinutes()
    let s: number | string = date.getSeconds()
    //小于10的在前面补0
    if (M < 10) {
        M = `0${M}`
    }
    if (D < 10) {
        D = `0${D}`
    }
    if (H < 10) {
        H = `0${H}`
    }
    if (m < 10) {
        m = `0${m}`
    }
    if (s < 10) {
        s = `0${s}`
    }

    const d = timeNow - publishTime
    const d_days = parseInt(`${d / 86400}`, 10)
    const d_hours = parseInt(`${d / 3600}`, 10)
    const d_minutes = parseInt(`${d / 60}`, 10)
    const d_seconds = parseInt(`${d}`, 10)

    if (d_days > 0 && d_days < 3) {
        return `${d_days}天前`
    } else if (d_days <= 0 && d_hours > 0) {
        return `${d_hours}小时前`
    } else if (d_hours <= 0 && d_minutes > 0) {
        return `${d_minutes}分钟前`
    } else if (d_seconds < 60) {
        if (d_seconds <= 0) {
            return '刚刚'
        }
        return `${d_seconds}秒前`
    } else if (d_days >= 3 && d_days < 30) {
        return `${M}-${D} ${H}:${m}`
    } else if (d_days >= 30) {
        return `${Y}-${M}-${D} ${H}:${m}`
    }
    return ''
}

// 日期格式化
export const UTC2Date = (utc: any, format?: string, add?: number): string => {
    if (!format) format = 'y-m-d'
    if (utc && typeof utc === 'string') utc = utc.replace(/-/g, '/').replace('.000000', '')
    let newDate = utc ? new Date(utc) : new Date()
    if (add) newDate = new Date(newDate.setDate(newDate.getDate() + add))
    const year: number | string = newDate.getFullYear()
    let month: number | string = newDate.getMonth() + 1
    let date: number | string = newDate.getDate()
    let hours: number | string = newDate.getHours()
    let minutes: number | string = newDate.getMinutes()
    let seconds: number | string = newDate.getSeconds()
    let secondes: number | string = newDate.getMilliseconds()
    month = month < 10 ? `0${month}` : month
    date = date < 10 ? `0${date}` : date
    hours = hours < 10 ? `0${hours}` : hours
    minutes = minutes < 10 ? `0${minutes}` : minutes
    seconds = seconds < 10 ? `0${seconds}` : seconds
    if (secondes < 100 && secondes > 9) {
        secondes = `0${secondes}`
    } else if (secondes < 10) {
        secondes = `00${secondes}`
    }
    return format
        .replace(/y/gi, `${year}`)
        .replace(/m/gi, `${month}`)
        .replace(/d/gi, `${date}`)
        .replace(/h/gi, `${hours}`)
        .replace(/i/gi, `${minutes}`)
        .replace(/s/gi, `${seconds}`)
        .replace(/v/gi, `${secondes}`)
}

// 生成随机字符串
export const randomChar = (length: number): string => {
    const x = '0123456789qwertyuioplkjhgfdsazxcvbnm'
    let tmp = ''
    const timestamp = `${new Date().getTime()}`
    for (let i = 0; i < length; i++) {
        tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length)
    }
    return timestamp + tmp
}

export const getQueryStringByName = (search: string, name: string): string => {
    const result = search.match(new RegExp(`[?&]${name}=([^&|#]+)`, 'i'))
    if (result == null || result.length < 1) {
        return ''
    }
    return result[1]
}

export const Sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const strToArray = (str: any): any[] => {
    try {
        str = JSON.parse(str)
    } catch (error) {
        str = []
    }
    if (typeof str === 'object') return str
    return []
}

export const oc = get

export const $is = {
    //$is.false(null) === true
    //$is.false(undefined) === true
    // $is.false('') === true
    //$is.false([]) === true
    //$is.false({}) === true
    //$is.false(false) === true
    //$is.false(NaN) === true
    //$is.false(0) === true

    //$is.false(true) === false
    // $is.false('0') === false
    //$is.false(0.11) === false
    //$is.false(1) === false
    //$is.false({ a: 1 }) === false
    //$is.false([1]) === false
    false(payload: any): boolean {
        return !!payload === false || (!isBoolean(payload) && !isNumber(payload) && isEmpty(payload))
    },
    // $is.empty(null) === true
    // $is.empty(undefined) === true
    // $is.empty('') === true
    // $is.empty([]) === true
    // $is.empty({}) === true

    // $is.empty(true) === false
    // $is.empty(false) === false
    // $is.empty(NaN) === false
    // $is.empty(0) === false
    // $is.empty('0') === false
    // $is.empty(0.11) === false
    // $is.empty(1) === false
    // $is.empty({ a: 1 }) === false
    // $is.empty([1]) === false
    empty(payload: any): boolean {
        return !isNumber(payload) && !isBoolean(payload) && isEmpty(payload)
    },
    number(payload: any): boolean {
        return isNumber(payload)
    },
    array(payload: any): boolean {
        return Array.isArray(payload)
    },
    int(payload: any): boolean {
        return isInteger(payload)
    },
    object(payload: any): boolean {
        return isObject(payload)
    },
    boolean(payload: any): boolean {
        return isBoolean(payload)
    },
    nil(payload: any): boolean {
        return isNil(payload)
    }
}

// 获取滚动条宽度
export const getScrollWidth = (): number => {
    //creates a DOM element
    const testDiv = document.createElement('div')
    //stores the CSS attributes
    const cssAttributes = {
        width: '100px',
        height: '100px',
        overflow: 'scroll',
        position: 'absolute',
        top: '-999px'
    }
    //sets all the styles on testDiv
    for (const attr in cssAttributes) {
        ;(testDiv.style as any)[attr] = (cssAttributes as any)[attr]
    }
    //adds the testDiv to the DOM
    document.body.appendChild(testDiv)
    //measures the the scrollWidth
    const width = testDiv.offsetWidth - testDiv.clientWidth
    //removes the testDiv from the DOM
    document.body.removeChild(testDiv)
    //returns the width
    return width
}

export const addNewStyle = (newStyle: string): void => {
    let styleElement = <HTMLStyleElement>document.getElementById('styles_js')

    if (!styleElement) {
        styleElement = document.createElement('style')
        styleElement.id = 'styles_js'
        document.getElementsByTagName('head')[0].appendChild(styleElement)
    }

    styleElement.appendChild(document.createTextNode(newStyle))
}

// 将字符串中的横线模式替换成驼峰模式
// a-bc-df => aBcDf
export const transformStr = (str: string): string => {
    const strArr = str.split('-')
    for (let i = 1; i < strArr.length; i++) {
        strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1)
    }
    return strArr.join('')
}

// 深度合并对象
export const deepMerge = merge

// 深度克隆对象
export const deepClone = cloneDeep

// 计算字符串长度, 汉字算2
export const strLen = (str: string): number => {
    let len = 0
    for (let i = 0; i < str.length; i++) {
        const c = str.charCodeAt(i)
        //单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++
        } else {
            len += 2
        }
    }
    return len
}

export const paramsToObject = (str: string) => {
    const obj: Record<string, any> = {}
    if (!str) return {}
    const strArr = str.split('&')
    strArr.forEach(item => {
        const arr_item = item.split(':')
        ;(obj as any)[arr_item[0]] = arr_item[1]
    })
    return obj
}

// 返回一个lower - upper之间的随机数
export const Random = (lower: number, upper: number): number => {
    lower = +lower || 0
    upper = +upper || 0
    return Math.random() * (upper - lower) + lower
}
// 数组转对象
/*
[{name: "AAA", value: 1}, {name: "BBB", value: 2}, {name: "CCC", value: 3}, {name: "DDD", value: 4}]
==>
{
    1:"AAA",
    2:"BBB",
    3:"CCC",
    4:"DDD"
}
*/
export const arrayToObject = (arr: [], key = 'value', val = 'name'): Record<string, any> => {
    const obj = {}
    arr.forEach(item => {
        obj[item[key]] = item[val]
    })
    return obj
}

export const addStr = (str: string, num: number): string => {
    const arr = str ? str.split('') : [] // 要先判断字符串是否有字符 然后将它分割成数组
    let newStr = ''
    arr.forEach((item: string, index: number) => {
        newStr += item
        if ((index + 1) % num === 0 && index !== arr.length - 1) {
            // 6可以更改，最后一位不加
            newStr += '\n' // 加上插入的字符
        }
    })
    return newStr
}

export const getSum = (arr: number[]): number => {
    return arr.reduce(function (prev, curr) {
        return Number(prev) + Number(curr)
    }, 0)
}

interface hexToRgbaType {
    red: number
    green: number
    blue: number
    rgb: string
    rgba: string
}

export const hexToRgba = (hex: string, opacity = 1): hexToRgbaType => {
    const red = parseInt(`0x${hex.slice(1, 3)}`, 16)
    const green = parseInt(`0x${hex.slice(3, 5)}`, 16)
    const blue = parseInt(`0x${hex.slice(5, 7)}`, 16)
    const RGBA = `rgba(${red},${green},${blue},${opacity})`
    return {
        red,
        green,
        blue,
        rgb: `${red},${green},${blue}`,
        rgba: RGBA
    }
}

export const RGB2Hex = (color: string): string => {
    const rgb = color.split(',')
    const r = parseInt(rgb[0].split('(')[1], 10)
    const g = parseInt(rgb[1], 10)
    const b = parseInt(rgb[2].split(')')[0], 10)
    // eslint-disable-next-line no-bitwise
    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
    return hex
}

export const batchHexToRgba = (arr: any[]) => {
    if (!arr) return []
    arr = arr.map(item => {
        if (Array.isArray(item)) return batchHexToRgba(item)
        if (item.indexOf('#') === 0) {
            return hexToRgba(item).rgb
        }
        if (item.indexOf('rgba(') === 0) {
            const re = /rgba\(\s*([\d]+)\s*,\s*([\d]+)\s*,\s*([\d]+)\s*,\s*([\d]+)\s*\)/i
            const match = re.exec(item)
            if (match) {
                return `${match[1]},${match[2]},${match[3]}`
            }
        }
        if (item.indexOf('rgb(') === 0) {
            const re = /rgb\(\s*([\d]+)\s*,\s*([\d]+)\s*,\s*([\d]+)\s*\)/i
            const match = re.exec(item)
            if (match) {
                return `${match[1]},${match[2]},${match[3]}`
            }
        }
        return item
    })
    return arr
}

export const showMsg = (config: Record<string, any> | string) => {
    let content, type: 'success' | 'warning' | 'info' | 'error'
    if (!config) {
        content = '接口返回数据错误'
        type = 'error'
    } else if (typeof config === 'string') {
        content = config
        type = 'error'
    } else {
        content = config.content
        type = config.type
    }
    ElMessage[type](content)
}
