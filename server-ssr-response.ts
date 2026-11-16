import type { Request, Response } from 'express'
import type { IRenderType } from '~/types'

import { Buffer } from 'node:buffer'

/**
 * 只允许站内相对跳转，拒绝协议相对地址和反斜杠。
 */
export function isLocalRedirect(location: string): boolean {
    return location.startsWith('/')
        && !location.startsWith('//')
        && !location.includes('\\')
        && !location.includes('\0')
}

/**
 * 把 SSR 片段填进 HTML 模板。
 */
export function renderHtmlDocument(
    template: string,
    rendered: Pick<IRenderType, 'html' | 'preloadLinks' | 'headTags'>,
): string {
    return template
        .replace('<!--preload-links-->', rendered.preloadLinks)
        .replace('<!--app-html-->', rendered.html)
        .replace('<!--head-tags-->', rendered.headTags)
}

/**
 * 组装 HTML 响应头。
 * 已登录、非 200，或本次未走公开缓存时，禁止共享缓存。
 */
export function buildHtmlHeaders(req: Request, statusCode: number, cache?: 'HIT' | 'MISS'): Record<string, string> {
    const headers: Record<string, string> = {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
    }
    const loggedIn = Boolean(req.cookies?.user || req.cookies?.b_user)
    if (loggedIn || statusCode !== 200 || !cache) {
        headers['Cache-Control'] = 'private, no-store'
        return headers
    }
    headers['Cache-Control'] = 'public, max-age=10, s-maxage=10'
    headers.Vary = 'Cookie'
    headers['X-SSR-Cache'] = cache
    return headers
}

/**
 * 写回 HTML。HEAD 只带 Content-Length，不写正文。
 */
export function sendHtml(req: Request, res: Response, statusCode: number, html: string, headers: Record<string, string>): void {
    res.status(statusCode).set(headers)
    if (req.method === 'HEAD') {
        res.set('Content-Length', String(Buffer.byteLength(html)))
        res.end()
        return
    }
    res.end(html)
}
