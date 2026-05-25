/**
 * 全局统一 API 响应（与项目规范一致）
 */
export interface IApiResponse<T = unknown> {
    code: number
    message: string
    data: T
    /** 兼容历史字段 */
    info?: string
}

/**
 * 请求参数合集
 */
export interface IApiConfig {
    all?: number
    by?: string | string[]
    from?: string
    id?: string | string[]
    limit?: number
    page?: number
    path?: string
    key?: string | string[]
}

/** @deprecated 使用 IApiConfig */
export type ApiConfig = IApiConfig

/**
 * 上传返回数据
 */
export interface IUpload {
    filepath: string
}

/** @deprecated 使用 IUpload */
export type Upload = IUpload
