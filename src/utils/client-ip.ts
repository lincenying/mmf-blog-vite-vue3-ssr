/**
 * 取客户端 IP 所需的请求字段。
 * Express 的 Request 与 morgan 回调里的 req 都可以传入。
 */
export interface IClientIpSource {
    app?: {
        get?: (setting: string) => unknown
    }
    ip?: string
    socket?: {
        remoteAddress?: string | undefined
    }
}

/**
 * 解析客户端 IP。
 * 仅在 Express 开启 `trust proxy` 时使用 `req.ip`（已按代理跳数解析）。
 * 未开启时只取 socket 地址，避免伪造 `X-Forwarded-For` 绕过限流或污染上游。
 */
export function getClientIp(req: IClientIpSource): string | undefined {
    const trustProxy = Boolean(req.app?.get?.('trust proxy'))
    const socketIp = req.socket?.remoteAddress || ''
    const raw = trustProxy ? (req.ip || socketIp) : socketIp
    const ip = raw.replace(/^::ffff:/i, '').trim()
    return ip || undefined
}
