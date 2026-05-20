import type { NextFunction, Request, Response } from 'express'

import requestIp from 'request-ip'

/** 常见脚本后缀与敏感路径前缀，用于拦截无意义扫描请求 */
const BLOCKED_EXTENSIONS = ['.php', '.asp', '.jsp', '.jspx', '.aspx', '.ashx'] as const

const SENSITIVE_PATH_PREFIX = '/lincenying/'

/**
 * 校验请求 URL 是否合法；非法时返回 400 JSON，不暴露内部判定细节。
 */
export function urlGuardMiddleware(req: Request, res: Response, next: NextFunction): void {
    try {
        decodeURIComponent(req.url)
        const hitExt = BLOCKED_EXTENSIONS.some(
            ext => req.url.endsWith(ext) || req.url.includes(`${ext}?`),
        )
        if (hitExt || req.url.startsWith(SENSITIVE_PATH_PREFIX)) {
            throw new Error('blocked')
        }
        next()
    }
    catch {
        const ip = requestIp.getClientIp(req) || 'unknown'
        console.warn(`IP ${ip} 被限制访问 ${req.url.substring(0, 200)}`)
        res.status(400).json({
            error: 'bad_request',
            message: '请求不合法或包含无效字符',
            request_id: `${Date.now()}`,
            ip,
        })
    }
}
