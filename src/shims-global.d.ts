/** * Null 或者 T */
declare type Nullable<T> = T | null
/** * 非 Null 类型 */
declare type NonNullable<T> = T extends null | undefined ? never : T
/** * Undefined 或者 T */
declare type UnfAble<T> = T | undefined
/** * 键为字符串, 值为 Any 的对象 */
declare type Obj = Record<string, any>
/** * 键为字符串, 值为 T 的对象 */
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
declare interface ResDataLists<T> {
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
declare interface ResDataList<T> {
    list: T
}

/**
 * Api 浏览器端封装类型
 */
declare interface ApiClient {
    get<T = void>(url: string, params: Obj, headers?: Obj): Promise<ResponseData<T>>
    post<T = void>(url: string, data: Obj, headers?: Obj): Promise<ResponseData<T>>
    file<T = void>(url: string, data: Obj, headers?: Obj): Promise<ResponseData<T>>
}

/**
 * Api Node端封装类型
 */
declare interface ApiServer {
    get<T = void>(url: string, params: Obj, headers?: Obj): Promise<ResponseData<T>>
    post<T = void>(url: string, data: Obj, headers?: Obj): Promise<ResponseData<T>>
    cookies: import('./types').UserCookies
    api: import('axios').AxiosInstance
    getCookies: () => import('./types').UserCookies
}

declare type ApiType = ApiServer | ApiClient

declare interface Window {
    $$api: UnfAble<ApiClient>
    __INITIAL_STATE__: Record<string, any>
}
