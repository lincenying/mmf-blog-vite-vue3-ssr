import type { Request } from 'express'

import { LRUCache } from 'lru-cache'

/** 公开页 HTML 短缓存 TTL（与 SSR API LRU 同量级） */
export const HTML_CACHE_TTL_MS = 10_000

interface IHtmlCacheEntry {
    html: string
    statusCode: number
}

const htmlCache = new LRUCache<string, IHtmlCacheEntry>({
    max: 200,
    ttl: HTML_CACHE_TTL_MS,
})

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
 * 生成 HTML 缓存 key（去掉 hash）。
 */
export function createHtmlCacheKey(url: string): string {
    return url.split('#')[0] || '/'
}

/**
 * 是否允许使用公开页 HTML 缓存（仅匿名 GET）。
 */
export function canUseHtmlCache(req: Request): boolean {
    const method = req.method?.toUpperCase()
    if (method !== 'GET' && method !== 'HEAD') {
        return false
    }
    if (req.cookies?.user || req.cookies?.b_user) {
        return false
    }
    const pathname = (req.path || req.originalUrl.split('?')[0] || '/').split('#')[0]
    return isPublicCacheablePath(pathname)
}

/**
 * 读取公开页 HTML 缓存。
 */
export function getCachedHtml(key: string): IHtmlCacheEntry | undefined {
    return htmlCache.get(key)
}

/**
 * 写入公开页 HTML 缓存（仅 200）。
 */
export function setCachedHtml(key: string, html: string, statusCode: number): void {
    if (statusCode !== 200) {
        return
    }
    htmlCache.set(key, { html, statusCode })
}
