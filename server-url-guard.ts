import type { NextFunction, Request, Response } from 'express'

import { randomUUID } from 'node:crypto'

import { getClientIp } from './src/utils/client-ip'

/** 常见脚本后缀，按解码后的路径拦截扫描请求 */
const BLOCKED_EXTENSIONS = ['.php', '.asp', '.jsp', '.jspx', '.aspx', '.ashx'] as const

const SENSITIVE_PATH_PREFIX = '/lincenying/'

/**
 * 最多解码两层，让 `%2ephp`、`%252ephp` 这类双重编码也能被后缀规则命中。
 * 非法百分号序列会抛出，由中间件统一回 400。
 */
function decodeRequestTarget(raw: string): string {
    let current = raw
    for (let i = 0; i < 2; i++) {
        if (!current.includes('%')) {
            break
        }
        const next = decodeURIComponent(current)
        if (next === current) {
            break
        }
        current = next
    }
    return current
}

/**
 * 判断请求目标是否应拦截。比较的是解码并小写后的路径，大小写后缀无法绕过。
 */
function isBlockedTarget(rawUrl: string): boolean {
    const decoded = decodeRequestTarget(rawUrl).toLowerCase()
    if (decoded.includes('\0')) {
        return true
    }
    const pathname = (decoded.split('?')[0] || '/').split('#')[0]
    if (pathname.startsWith(SENSITIVE_PATH_PREFIX)) {
        return true
    }
    return BLOCKED_EXTENSIONS.some((ext) => {
        return pathname.endsWith(ext) || pathname.includes(`${ext}/`)
    })
}

/**
 * 校验请求 URL 是否合法。非法时返回 400 JSON，响应体不回显客户端 IP。
 */
export function urlGuardMiddleware(req: Request, res: Response, next: NextFunction): void {
    try {
        if (isBlockedTarget(req.url || '/')) {
            throw new Error('blocked')
        }
        next()
    }
    catch {
        const ip = getClientIp(req) || 'unknown'
        console.warn(`[url-guard] IP ${ip} 被限制访问 ${req.url.substring(0, 200)}`)
        res.status(400).json({
            error: 'bad_request',
            message: '请求不合法或包含无效字符',
            request_id: randomUUID(),
        })
    }
}
