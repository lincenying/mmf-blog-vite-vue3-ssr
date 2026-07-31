import type { Request } from 'express'
import type { Pinia } from 'pinia'
import type { RouteComponent, RouteLocationNormalized } from 'vue-router'

export interface IRenderType {
    html: string
    preloadLinks: string
    headTags: string
    store: Pinia
    /** SSR 响应 HTTP 状态，如 404 命中 catch-all 路由、302 鉴权跳转 */
    statusCode: number
    /** 鉴权失败等场景的跳转地址（配合 statusCode 302） */
    redirect?: string
}

export type CusRouteComponent = RouteComponent & {
    asyncData?: (payload: IAsyncDataConfig) => Promise<unknown>
}

export interface IAsyncDataConfig {
    store: Pinia
    route: RouteLocationNormalized
    api: ApiServer | ApiClient
    req?: Request
}
