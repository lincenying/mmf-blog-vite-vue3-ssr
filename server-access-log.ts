import type { Express } from 'express'

import { UTC2Date } from '@lincy/utils'
import logger from 'morgan'

import { skipExt } from './server.middleware'
import { getClientIp } from './src/utils/client-ip'

const LOG_SKIP_EXT = [...skipExt, '.php']

/**
 * 静态资源与脚本扫描请求不写访问日志。按路径判断，避免 query 导致后缀匹配失败。
 */
export function shouldSkipAccessLog(url: string): boolean {
    const pathname = (url.split('?')[0] || '/').toLowerCase()
    return LOG_SKIP_EXT.some(ext => pathname.endsWith(ext))
}

/**
 * 安装访问日志。IP 与 URL 守卫、限流使用同一套客户端地址。
 */
export function installAccessLogger(app: Express): void {
    logger.token('remote-addr', (req) => {
        return getClientIp(req) || 'unknown'
    })
    logger.token('date', () => {
        return UTC2Date(undefined, 'yyyy-mm-dd hh:ii:ss.SSS')
    })

    app.use(
        logger('[:remote-addr] [:date] ":method :url" :status :res[content-length] ":referrer"', {
            skip(req) {
                return shouldSkipAccessLog(req.url || '')
            },
        }),
    )
}
