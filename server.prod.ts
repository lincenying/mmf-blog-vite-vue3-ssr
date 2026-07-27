import type { IRenderType } from '~/types'

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

import { UTC2Date } from '@lincy/utils'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import logger from 'morgan'
import requestIp from 'request-ip'
import serveStatic from 'serve-static'

import mainLimiter, { skipExt } from './server.middleware'
import { handleSsrRouteError } from './server-ssr-error'
import { urlGuardMiddleware } from './server-url-guard'
import apiDomain from './src/api/url'

const BODY_PARSER_LIMIT = '10mb'

export async function createServer() {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const resolve = (p: string) => path.resolve(__dirname, p)
    const template = fs.readFileSync(resolve('client/index.html'), 'utf-8')
    const manifest = JSON.parse(fs.readFileSync(resolve('client/.vite/ssr-manifest.json'), 'utf-8'))
    const app = express()

    if (process.env.TRUST_PROXY === '1') {
        app.set('trust proxy', 1)
    }

    app.use(urlGuardMiddleware)

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

    // 生产环境才启用限流中间件
    app.use(mainLimiter)

    // Node.js 压缩中间件
    app.use(compression())
    // Node.js 代理中间件, 也可以在 nginx 直接配置, 那么将不会走这里的代理中间件
    app.use(
        createProxyMiddleware({
            target: apiDomain,
            changeOrigin: true,
            pathFilter: ['/api/**'],
            pathRewrite: {
                '^/api': '/api',
            },
            on: {
                proxyReq(proxyReq, req) {
                    proxyReq.setHeader('x-real-ip', requestIp.getClientIp(req) || 'unknown')
                },
            },
        }),
    )
    // Node.js 静态资源中间件
    app.use(
        serveStatic(resolve('client'), {
            index: false,
        }),
    )

    // 解析 application/json 中间件
    app.use(express.json({ limit: BODY_PARSER_LIMIT }))
    // 解析 application/x-www-form-urlencoded 中间件
    app.use(express.urlencoded({ limit: BODY_PARSER_LIMIT, extended: true }))
    // 解析 cookies 中间件
    app.use(cookieParser())

    // @ts-expect-error 由 Vite SSR 产出至 dist/server/entry-server.js，tsup 打包阶段不存在该文件（已 external）
    const { render } = await import('./server/entry-server.js')
    const exposeSsrStack = process.env.NODE_ENV !== 'production'

    app.use('/{*default}', async (req, res) => {
        try {
            const url = req.originalUrl

            const { html: appHtml, preloadLinks, headTags, statusCode } = await render(url, manifest, req) as IRenderType

            const html = template
                .replace('<!--preload-links-->', preloadLinks)
                .replace('<!--app-html-->', appHtml)
                .replace('<!--head-tags-->', headTags)

            res.status(statusCode).set({ 'Content-Type': 'text/html' }).end(html)
        }
        catch (e: unknown) {
            handleSsrRouteError(res, e, exposeSsrStack)
        }
    })

    return { app }
}

const port = 7777

createServer().then(({ app }) => app.listen(port, () => {
    console.log(`监听: http://localhost:${port}`)
}))
