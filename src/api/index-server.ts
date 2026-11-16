import type { IUserCookies } from '~/types'

import { objToCookies } from '@lincy/utils'
import axios from 'axios'
import md5 from 'md5'

import qs from 'qs'
import { splitCacheFlag } from '@/utils/ssr-cookies'
import config from './config-server'

/** 同一进程内进行中的 SSR GET，避免同一次渲染把同一个接口打多次 */
const inflightGets = new Map<string, Promise<ResponseData<unknown>>>()

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

    /**
     * 读取可复用的 GET 缓存。只接受业务 code 为 200 的结果。
     */
    function readCachedGet(key: string): ResponseData<unknown> | undefined {
        const cached = config.cached?.get(key)
        if (cached?.data?.code === 200) {
            return cached.data
        }
        return undefined
    }

    return {
        api: apiInstance,
        getCookies() {
            return cookies
        },
        async get<T = void>(url: string, params: Objable = {}, requestHeaders: Objable<string> = {}): Promise<ResponseData<T>> {
            const { cache, payload } = splitCacheFlag(params)
            const key = md5(`GET:${url}:${JSON.stringify(payload)}:${authCacheKey}`)
            if (cache) {
                const cached = readCachedGet(key)
                if (cached) {
                    return cached as ResponseData<T>
                }
                const pending = inflightGets.get(key)
                if (pending) {
                    return pending as Promise<ResponseData<T>>
                }
            }

            const task = (async (): Promise<ResponseData<unknown>> => {
                try {
                    const res = await apiInstance({
                        method: 'get',
                        url,
                        params: payload,
                        headers: {
                            ...requestHeaders,
                        },
                    })
                    const body = res.data || createFallbackResponse('接口返回为空')
                    if (config.cached && cache && body.code === 200) {
                        config.cached.set(key, res)
                    }
                    return body
                }
                catch (error) {
                    console.error('[SSR API GET]', url, error)
                    return createFallbackResponse('服务端请求失败')
                }
            })()

            if (cache) {
                inflightGets.set(key, task)
            }
            try {
                return await task as ResponseData<T>
            }
            finally {
                if (inflightGets.get(key) === task) {
                    inflightGets.delete(key)
                }
            }
        },
        async post(url, data, requestHeaders = {}) {
            const { payload } = splitCacheFlag(data)
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
                return (res && res.data) || createFallbackResponse('接口返回为空')
            }
            catch (error) {
                console.error('[SSR API POST]', url, error)
                return createFallbackResponse('服务端请求失败')
            }
        },
    }
}
