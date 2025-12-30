import type { RenderType } from '~/types'

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

import { UTC2Date } from '@lincy/utils'
import cookieParser from 'cookie-parser'
import express from 'express'
import logger from 'morgan'
import requestIp from 'request-ip'
import mainLimiter, { skipExt } from 'server.middleware'
import { createServer as viteCreateServer } from 'vite'

export async function createServer(root = process.cwd(), hmrPort?: number) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const resolve = (p: string) => path.resolve(__dirname, p)
    const manifest = {}
    const app = express()

    app.use((req, res, next) => {
        try {
            // 尝试规范化URL
            decodeURIComponent(req.url)
            const fuckExt = ['.php', '.asp', '.jsp', '.jspx', '.aspx', '.ashx']
            if (fuckExt.some(ext => req.url.endsWith(ext) || req.url.includes(`${ext}?`))) {
                throw new Error('お前の母親を犯してやる！君は自分の母親のセキュリティ上の脆弱性をスキャンしているのか？')
            }
            if (req.url.startsWith('/lincenying/')) {
                throw new Error('お前の母親を犯してやる！君は自分の母親のセキュリティ上の脆弱性をスキャンしているのか？')
            }
            next()
        }
        catch (err: any) {
            // 记录并返回友好的错误
            console.warn('URL解码失败:', {
                url: req.url.substring(0, 200),
                ip: requestIp.getClientIp(req) || 'unknown',
            })

            res.status(400).json({
                error: 'bad_request',
                message: err.message || '请求包含无效字符',
                request_id: `${Date.now()}`, // 用于追踪
                ip: requestIp.getClientIp(req) || 'unknown',
            })
        }
    })

    logger.token('remote-addr', (req) => {
        return requestIp.getClientIp(req) || 'unknown'
    })
    logger.token('date', () => {
        return UTC2Date(undefined, 'yyyy-mm-dd hh:ii:ss.SSS')
    })

    // Node.js 日志中间件
    app.use(
        logger('[:remote-addr] [:date] ":method :url" :status :res[content-length] ":referrer"', {
            skip(req) {
                return [...skipExt, '.php'].some((ext) => {
                    return req.url.endsWith(ext)
                })
            },
        }),
    )

    app.use(mainLimiter)

    const vite = await viteCreateServer({
        base: '/',
        root,
        logLevel: 'info',
        server: {
            middlewareMode: true,
            watch: {
                // 在测试期间，编辑文件的速度太快，有时会出现 chokidar 错过更改事件，因此强制执行轮询以确保一致性
                usePolling: true,
                interval: 100,
            },
            hmr: {
                port: hmrPort,
            },
        },
        appType: 'custom',
    })
    // 使用 vite 的 connect 实例作为中间件
    app.use(vite.middlewares)

    // 解析 application/json 中间件
    app.use(express.json({ limit: '50mb' }))
    // 解析 application/x-www-form-urlencoded 中间件
    app.use(express.urlencoded({ limit: '50mb', extended: true }))
    // 解析 cookies 中间件
    app.use(cookieParser())

    app.use('/{*default}', async (req, res) => {
        try {
            // const url = req.originalUrl.replace('/test/', '/')
            const url = req.originalUrl

            // 总是在开发中读取新模板
            let template = fs.readFileSync(resolve('index.html'), 'utf-8')
            template = await vite.transformIndexHtml(url, template)
            const render = (await vite.ssrLoadModule('/src/entry-server.ts')).render

            const { html: appHtml, preloadLinks, headTags } = await render(url, manifest, req) as RenderType

            const html = template
                .replace('<!--preload-links-->', preloadLinks)
                .replace('<!--app-html-->', appHtml)
                .replace('<!--head-tags-->', headTags)

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        }
        catch (e: unknown) {
            const err = e as Error
            if (vite)
                vite.ssrFixStacktrace(err)
            console.log(err.stack)
            res.status(500).end(err.stack)
        }
    })

    return { app, vite }
}

const port = 17777

createServer().then(({ app }) => app.listen(port, () => {
    console.log(`监听: http://localhost:${port}`)
}))
