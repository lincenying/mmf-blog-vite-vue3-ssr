/* eslint-disable no-unused-vars */

/**
 * Null 或者 T
 */
declare type Nullable<T> = T | null
/**
 * 非 Null 类型
 */
declare type NonNullable<T> = T extends null | undefined ? never : T
/**
 * Undefined 或者 T
 */
declare type UnfAble<T> = T | undefined
/**
 * 键为字符串, 值为 Any 的对象
 */
declare type Obj = Record<string, any>

/**
 * 键为字符串, 值为 T 的对象
 */
declare type ObjT<T> = Record<string, T>

/**
 * 接口返回模板
 * ```
 * {
    data: T
    code: number
    message: string
    info?: string
 * }
 * ```
 */
declare interface ResponseData<T> {
    data: T
    code: number
    message: string
    info?: string
}

/**
 * 接口返回模板里的 Data 数据 - 含分页的列表
 * ```
 * {
 *  hasNext: number | boolean
    hasPrev: number | boolean
    total: number
    list: T
 * }
 * ```
 */
declare interface ResponseDataLists<T> {
    hasNext: number | boolean
    hasPrev: number | boolean
    total: number
    list: T
}

/**
 * 接口返回模板里的 Data 数据 - 不含分页的列表
 * ```
 * {
 *   list: T
 * }
 * ```
 */
declare interface ResponseDataList<T> {
    list: T
}


declare interface Window {
    $$api: {
        post: (...args) => Promise<any>
        get: (...args) => Promise<any>
        [propName: string]: (...args) => Promise<any>
    }
    __INITIAL_STATE__: any
}
