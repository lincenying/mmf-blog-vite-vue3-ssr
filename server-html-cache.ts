import type { Request } from 'express'

import { LRUCache } from 'lru-cache'

/** 公开页 HTML 短缓存 TTL（与 SSR API LRU 同量级） */
export const HTML_CACHE_TTL_MS = 10_000

/** 超长 URL 不进缓存，避免用随机 query 撑满 LRU */
const MAX_CACHE_URL_LENGTH = 2048

/** 查询串里出现这些字段时不缓存，避免把凭证写进共享 HTML */
const SENSITIVE_QUERY_KEY = /(?:^|[?&])(?:token|access_token|password|passwd|secret)=/i

interface IHtmlCacheEntry {
    html: string
    statusCode: number
}

/** 一次 SSR 的可共享结果。redirect 存在时不写入缓存 */
export interface ISharedHtmlPage {
    html: string
    statusCode: number
    redirect?: string
}

export interface ISharedHtmlResult extends ISharedHtmlPage {
    cache: 'HIT' | 'MISS'
}

const htmlCache = new LRUCache<string, IHtmlCacheEntry>({
    max: 200,
    ttl: HTML_CACHE_TTL_MS,
})

const inflight = new Map<string, Promise<ISharedHtmlPage>>()

/**
 * 判断路径是否适合做匿名 HTML 缓存（排除后台/用户区）。
 */
export function isPublicCacheablePath(pathname: string): boolean {
    if (!pathname || pathname === '') {
        return false
    }
    if (pathname.startsWith('/backend') || pathname.startsWith('/user')) {
        return false
    }
    // 静态资源或带扩展名的路径不走 SSR 缓存
    if (/\.\w+$/.test(pathname)) {
        return false
    }
    return true
}

/**
 * 生成 HTML 缓存 key（去掉 hash，查询参数按键名排序）。
 */
export function createHtmlCacheKey(url: string): string {
    const withoutHash = url.split('#')[0] || '/'
    const queryIndex = withoutHash.indexOf('?')
    if (queryIndex === -1) {
        return withoutHash || '/'
    }
    const pathname = withoutHash.slice(0, queryIndex) || '/'
    const query = withoutHash.slice(queryIndex + 1)
    const params = [...new URLSearchParams(query).entries()]
        .sort(([left], [right]) => left.localeCompare(right))
    const normalized = new URLSearchParams(params).toString()
    return normalized ? `${pathname}?${normalized}` : pathname
}

/**
 * 是否允许使用公开页 HTML 缓存（仅匿名 GET / HEAD）。
 */
export function canUseHtmlCache(req: Request): boolean {
    const method = req.method?.toUpperCase()
    if (method !== 'GET' && method !== 'HEAD') {
        return false
    }
    if (req.cookies?.user || req.cookies?.b_user) {
        return false
    }
    const rawUrl = req.originalUrl || req.url || '/'
    if (rawUrl.length > MAX_CACHE_URL_LENGTH || SENSITIVE_QUERY_KEY.test(rawUrl)) {
        return false
    }
    const pathname = (req.path || rawUrl.split('?')[0] || '/').split('#')[0]
    return isPublicCacheablePath(pathname)
}

/**
 * 合并同一 key 的并发渲染，并把 200 结果写入 LRU。
 * 跟随请求复用进行中的 Promise，避免缓存击穿时把 SSR 打满。
 */
export async function coalescePublicHtml(
    key: string,
    produce: () => Promise<ISharedHtmlPage>,
): Promise<ISharedHtmlResult> {
    const cached = htmlCache.get(key)
    if (cached) {
        return { html: cached.html, statusCode: cached.statusCode, cache: 'HIT' }
    }

    const pending = inflight.get(key)
    if (pending) {
        const shared = await pending
        return { ...shared, cache: isCacheablePage(shared) ? 'HIT' : 'MISS' }
    }

    const task = produce().then((result) => {
        if (isCacheablePage(result)) {
            htmlCache.set(key, { html: result.html, statusCode: result.statusCode })
        }
        return result
    }).finally(() => {
        if (inflight.get(key) === task) {
            inflight.delete(key)
        }
    })
    inflight.set(key, task)

    const result = await task
    return { ...result, cache: 'MISS' }
}

/**
 * 只有无跳转的 200 且正文非空才写入共享缓存。
 */
function isCacheablePage(page: ISharedHtmlPage): boolean {
    return !page.redirect && page.statusCode === 200 && page.html.length > 0
}
