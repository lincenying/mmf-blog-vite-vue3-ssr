import type { ISharedHtmlPage } from './server-html-cache'
import type { IRenderType } from '~/types'

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

import compression from 'compression'
import cookieParser from 'cookie-parser'
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import serveStatic from 'serve-static'

import { installAccessLogger } from './server-access-log'
import { canUseHtmlCache, coalescePublicHtml, createHtmlCacheKey } from './server-html-cache'
import { handleSsrRouteError } from './server-ssr-error'
import { buildHtmlHeaders, isLocalRedirect, renderHtmlDocument, sendHtml } from './server-ssr-response'
import { urlGuardMiddleware } from './server-url-guard'
import mainLimiter from './server.middleware'
import apiDomain from './src/api/url'
import { getClientIp } from './src/utils/client-ip'

const BODY_PARSER_LIMIT = '1mb'

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
    installAccessLogger(app)

    app.get('/health', (_req, res) => {
        res.status(200).set('Cache-Control', 'no-store').send('OK')
    })

    // 生产环境才启用限流中间件。健康检查已在前面注册，且限流本身也会跳过 /health
    app.use(mainLimiter)

    // Node.js 压缩中间件
    app.use(compression())
    // Node.js 代理中间件, 也可以在 nginx 直接配置, 那么将不会走这里的代理中间件
    app.use(
        createProxyMiddleware({
            target: apiDomain,
            changeOrigin: true,
            pathFilter: ['/api/**'],
            on: {
                proxyReq(proxyReq, req) {
                    const clientIp = getClientIp(req)
                    if (clientIp) {
                        proxyReq.setHeader('x-real-ip', clientIp)
                    }
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

    app.get('/{*default}', async (req, res) => {
        try {
            const url = req.originalUrl
            const useHtmlCache = canUseHtmlCache(req)

            /**
             * 渲染当前请求。缓存合并时只有第一个请求会执行。
             */
            const produce = async (): Promise<ISharedHtmlPage> => {
                const rendered = await render(url, manifest, req) as IRenderType
                if (rendered.redirect) {
                    return {
                        html: '',
                        statusCode: rendered.statusCode || 302,
                        redirect: rendered.redirect,
                    }
                }
                return {
                    html: renderHtmlDocument(template, rendered),
                    statusCode: rendered.statusCode,
                }
            }

            let page: ISharedHtmlPage
            let cache: 'HIT' | 'MISS' | undefined
            if (useHtmlCache) {
                const shared = await coalescePublicHtml(createHtmlCacheKey(url), produce)
                page = shared
                cache = shared.cache
            }
            else {
                page = await produce()
            }

            if (page.redirect) {
                if (!isLocalRedirect(page.redirect)) {
                    handleSsrRouteError(res, new Error('非法跳转地址'), exposeSsrStack)
                    return
                }
                res.redirect(page.statusCode || 302, page.redirect)
                return
            }

            sendHtml(req, res, page.statusCode, page.html, buildHtmlHeaders(req, page.statusCode, cache))
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
