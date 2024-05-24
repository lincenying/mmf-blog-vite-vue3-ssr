/**
 * Null 或者 Undefined 或者 T
 */
declare type Nullable<T> = T | null | undefined
/**
 * 非 Null 类型
 */
declare type NonNullable<T> = T extends null | undefined ? never : T
/**
 * 数组<T> 或者 T
 */
declare type Arrayable<T> = T | T[]
/**
 * 键为字符串, 值为 Any 的对象
 */
declare type Objable<T = any> = Record<string, T>
/**
 * Function
 */
declare type Fn<T = void> = () => T
/**
 * 任意函数
 */
declare type AnyFn<T = any> = (...args: any[]) => T
/**
 * Promise, or maybe not
 */
declare type Awaitable<T> = T | PromiseLike<T>

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
declare interface ResDataLists<T> {
    hasNext: number | boolean
    hasPrev: number | boolean
    total: number
    list: T[]
}

/**
 * 接口返回模板里的 Data 数据 - 不含分页的列表
 * ```
 * {
 *   list: T
 * }
 * ```
 */
declare interface ResDataList<T> {
    list: T[]
}

/**
 * Api 浏览器端封装类型
 */
declare interface ApiClient {
    get: <T = void>(url: string, params: Objable, headers?: Objable) => Promise<ResponseData<T>>
    post: <T = void>(url: string, data: Objable, headers?: Objable) => Promise<ResponseData<T>>
    file: <T = void>(url: string, data: Objable, headers?: Objable) => Promise<ResponseData<T>>
}

/**
 * Api Node端封装类型
 */
declare interface ApiServer {
    get: <T = void>(url: string, params: Objable, headers?: Objable) => Promise<ResponseData<T>>
    post: <T = void>(url: string, data: Objable, headers?: Objable) => Promise<ResponseData<T>>
    cookies: import('./types').UserCookies
    api: import('axios').AxiosInstance
    getCookies: () => import('./types').UserCookies
}

declare type ApiType = ApiServer | ApiClient

declare interface Window {
    $$api: Nullable<ApiClient>
    __INITIAL_STATE__: Record<string, any>
}
