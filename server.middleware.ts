import rateLimit from 'express-rate-limit'
import requestIp from 'request-ip'

// 正常用户白名单（可以存储在数据库或配置文件中）
const normalUserPatterns = [
    /mozilla.*firefox/i,
    /chrome.*safari/i,
    /safari/i,
]

function checkSkip(path: string) {
    const staticPaths = [
        '/static/',
        '/assets/',
        '/src/',
        '/@',
    ]
    for (const pattern of staticPaths) {
        if (path.startsWith(pattern)) {
            return true
        }
    }
    const extensions = [
        '.css',
        '.js',
        '.jpg',
        '.png',
        '.gif',
        '.webp',
        '.webmanifest',
        '.ico',
    ]
    for (const ext of extensions) {
        if (path.endsWith(ext)) {
            return true
        }
    }
    return false
}

function checkUserAgent(userAgent: string) {
    return (userAgent.includes('python-requests')
        || userAgent.includes('curl')
        || userAgent.includes('postman')
        || userAgent === '')
}

// 主限流中间件
const mainLimiter = rateLimit({
    windowMs: 5 * 1000, // 5秒钟
    max: (req) => {
        const userAgent = req.get('user-agent') || ''

        // 检查是否为正常浏览器用户
        const isNormalBrowser = normalUserPatterns.some(pattern =>
            pattern.test(userAgent),
        )

        // 对正常浏览器用户给予更高限制
        if (isNormalBrowser) {
            return 8 // 正常用户5秒8次
        }

        // 对API客户端或其他工具限制更严格
        if (checkUserAgent(userAgent)) {
            return 2 // 脚本工具更严格
        }

        return 4 // 默认限制
    },
    standardHeaders: true,
    skip: (req) => {
        return checkSkip(req.path)
    },
    keyGenerator: (req) => {
        // 使用IP + User-Agent作为key，更精确识别客户端
        return `${requestIp.getClientIp(req)}:${req.get('user-agent') || ''}`
    },
    handler: (req, res, _next, options) => {
    // 记录被限制的请求
        console.warn(`IP ${req.ip} 被限制访问 ${req.path}`)

        res.status(200).json({
            code: 429,
            error: '请求过于频繁',
            message: options.message,
            retryAfter: '1分钟',
            currentTime: new Date().toISOString(),
        })
    },
})

export default mainLimiter
