import type { Request } from 'express'

import rateLimit, { ipKeyGenerator } from 'express-rate-limit'

import { getClientIp } from './src/utils/client-ip'

export const skipExt = ['.webmanifest', '.txt', '.map', '.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ttf', '.woff2', '.ico']

const staticPaths = [
    '/static/',
    '/assets/',
    '/src/',
    '/node_modules/',
    '/@',
]

/**
 * 空 UA 与常见脚本客户端走更严格的限额。
 */
function isScriptClient(userAgent: string): boolean {
    if (!userAgent) {
        return true
    }
    return /python-requests|curl\/|wget\/|postman|httpie|go-http-client|java\//i.test(userAgent)
}

/**
 * 浏览器 UA。用 Mozilla/5.0 识别，避免单独匹配 Safari 时把大量爬虫也放宽。
 */
function isBrowser(userAgent: string): boolean {
    return /Mozilla\/5\.0/i.test(userAgent)
}

/**
 * 健康检查和静态资源不参与页面限流。
 */
function checkSkip(path: string): boolean {
    if (path === '/health') {
        return true
    }
    if (staticPaths.some(pattern => path.startsWith(pattern))) {
        return true
    }
    return skipExt.some(ext => path.endsWith(ext))
}

// 主限流中间件
const mainLimiter = rateLimit({
    windowMs: 5 * 1000, // 5秒钟
    max: (req) => {
        const userAgent = req.get('user-agent') || ''
        if (isBrowser(userAgent)) {
            return 20 // 正常浏览器 5 秒 20 次（SSR + XHR 叠加）
        }
        if (isScriptClient(userAgent)) {
            return 2
        }
        return 6
    },
    standardHeaders: true,
    message: '请求过于频繁，请稍后再试',
    skip: (req) => {
        return checkSkip(req.path)
    },
    keyGenerator: (req) => {
        // 未开启 trust proxy 时忽略客户端自带的 X-Forwarded-For
        return ipKeyGenerator(getClientIp(req as Request) || 'unknown')
    },
    handler: (req, res, _next, options) => {
        console.warn(`[rate-limit] IP ${getClientIp(req) || 'unknown'} 被限制访问 ${req.path}`)

        const retryAfterSec = Math.max(1, Math.ceil(options.windowMs / 1000))
        const message = typeof options.message === 'string' ? options.message : '请求过于频繁，请稍后再试'
        res
            .status(429)
            .set('Retry-After', String(retryAfterSec))
            .json({
                code: 429,
                error: '请求过于频繁',
                message,
                retryAfterSeconds: retryAfterSec,
                currentTime: new Date().toISOString(),
            })
    },
})

export default mainLimiter
