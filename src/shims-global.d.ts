/* eslint-disable no-unused-vars */

declare type Nullable<T> = T | null

declare type NonNullable<T> = T extends null | undefined ? never : T

/**
 * 接口返回模板
 */
declare interface ResponseData<T> {
    data: T
    code: number
    message: string
    info?: string
}

/**
 * 接口返回模板里的 Data 数据 - 含分页的列表
 */
declare interface ResponseDataLists<T> {
    hasNext: number | boolean
    hasPrev: number | boolean
    total: number
    list: T
}

/**
 * 接口返回模板里的 Data 数据 - 不含分页的列表
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
