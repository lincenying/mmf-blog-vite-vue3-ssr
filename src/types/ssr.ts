import type { Request } from 'express'
import type { Pinia } from 'pinia'
import type { RouteComponent, RouteLocationNormalized } from 'vue-router'

export interface IRenderType {
    html: string
    preloadLinks: string
    headTags: string
    store: Pinia
    /** SSR 响应 HTTP 状态，如 404 命中 catch-all 路由 */
    statusCode: number
}

/** @deprecated 使用 IRenderType */
export type RenderType = IRenderType

export type CusRouteComponent = RouteComponent & {
    asyncData?: (payload: IAsyncDataConfig) => Promise<unknown>
}

export interface IAsyncDataConfig {
    store: Pinia
    route: RouteLocationNormalized
    api: ApiServer | ApiClient
    req?: Request
}

/** @deprecated 使用 IAsyncDataConfig */
export type AsyncDataConfig = IAsyncDataConfig
