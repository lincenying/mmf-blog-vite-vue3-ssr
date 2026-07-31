import type { IUserCookies } from '~/types'

import { objToCookies } from '@lincy/utils'
import axios from 'axios'
import md5 from 'md5'

import qs from 'qs'
import config from './config-server'
import { splitCacheFlag } from '@/utils/ssr-cookies'

/** SSR 端 API 请求上下文 */
export interface ISsrApiContext {
    /** 解析后的 cookies（鉴权、缓存 key） */
    cookies?: IUserCookies
    /** 原始 Cookie 请求头，优先于 cookies 重组 */
    cookieHeader?: string
    /** 客户端真实 IP */
    clientIp?: string
    /** 客户端 User-Agent */
    userAgent?: string
}

/**
 * 构造 SSR 失败时的统一降级响应，避免整页 500。
 */
function createFallbackResponse<T>(message: string): ResponseData<T> {
    return {
        code: -1,
        message,
        data: null as T,
        info: message,
    }
}

/**
 * 创建 Node/SSR 端 API 实例（每请求隔离 cookie / IP）。
 */
export function api(ctx: ISsrApiContext = {}): ApiServer {
    const cookies = ctx.cookies || {}
    const headers: Record<string, string> = {
        'X-Requested-With': 'XMLHttpRequest',
    }

    if (ctx.cookieHeader) {
        headers.cookie = ctx.cookieHeader
    }
    else if (Object.keys(cookies).length > 0) {
        headers.cookie = objToCookies(cookies as Record<string, string | number | boolean>)
    }

    if (ctx.clientIp) {
        headers['x-real-ip'] = ctx.clientIp
        headers['x-forwarded-for'] = ctx.clientIp
    }

    if (ctx.userAgent) {
        headers['user-agent'] = ctx.userAgent
    }

    const apiInstance = axios.create({
        baseURL: config.api,
        headers,
        timeout: config.timeout,
    })

    /** 缓存 key 需区分登录态，避免个性化数据串用 */
    const authCacheKey = `${cookies.user || ''}:${cookies.b_user || ''}:${cookies.username || ''}`

    return {
        api: apiInstance,
        getCookies() {
            return cookies
        },
        async get(url, params, requestHeaders = {}) {
            const { cache, payload } = splitCacheFlag(params)
            const key = md5(url + JSON.stringify(payload) + authCacheKey)
            if (config.cached && cache && config.cached.has(key)) {
                const res = config.cached.get(key)
                return Promise.resolve(res && res.data)
            }
            try {
                const res = await apiInstance({
                    method: 'get',
                    url,
                    params: payload,
                    headers: {
                        ...requestHeaders,
                    },
                })
                if (config.cached && cache) {
                    config.cached.set(key, res)
                }
                return (res && res.data) || createFallbackResponse('接口返回为空')
            }
            catch (error) {
                console.error('[SSR API GET]', url, error)
                return createFallbackResponse('服务端请求失败')
            }
        },
        async post(url, data, requestHeaders = {}) {
            const { cache, payload } = splitCacheFlag(data)
            const key = md5(url + JSON.stringify(payload) + authCacheKey)
            if (config.cached && cache && config.cached.has(key)) {
                const res = config.cached.get(key)
                return Promise.resolve(res && res.data)
            }
            try {
                const res = await apiInstance({
                    method: 'post',
                    url,
                    data: qs.stringify(payload),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        ...requestHeaders,
                    },
                })
                if (config.cached && cache) {
                    config.cached.set(key, res)
                }
                return (res && res.data) || createFallbackResponse('接口返回为空')
            }
            catch (error) {
                console.error('[SSR API POST]', url, error)
                return createFallbackResponse('服务端请求失败')
            }
        },
    }
}
