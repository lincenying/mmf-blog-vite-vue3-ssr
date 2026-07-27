import type { IRenderType } from '~/types'

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

import { UTC2Date } from '@lincy/utils'
import cookieParser from 'cookie-parser'
import express from 'express'
import logger from 'morgan'
import requestIp from 'request-ip'
import { skipExt } from './server.middleware'
import { createServer as viteCreateServer } from 'vite'

import { handleSsrRouteError } from './server-ssr-error'
import { urlGuardMiddleware } from './server-url-guard'

const BODY_PARSER_LIMIT = '10mb'

export async function createServer(root = process.cwd(), hmrPort?: number) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const resolve = (p: string) => path.resolve(__dirname, p)
    const manifest = {}
    const app = express()

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

    const useChokidarPolling = process.env.SSR_CHOKIDAR_USEPOLLING === '1'

    const viteServer: NonNullable<import('vite').InlineConfig['server']> = {
        middlewareMode: true,
        hmr: {
            port: hmrPort,
        },
    }
    if (useChokidarPolling) {
        viteServer.watch = {
            // 仅在需要时开启轮询（环境变量 SSR_CHOKIDAR_USEPOLLING=1），避免默认拉高 CPU
            usePolling: true,
            interval: 100,
        }
    }

    const vite = await viteCreateServer({
        base: '/',
        root,
        logLevel: 'info',
        server: viteServer,
        appType: 'custom',
    })
    // 使用 vite 的 connect 实例作为中间件
    app.use(vite.middlewares)

    // 解析 application/json 中间件
    app.use(express.json({ limit: BODY_PARSER_LIMIT }))
    // 解析 application/x-www-form-urlencoded 中间件
    app.use(express.urlencoded({ limit: BODY_PARSER_LIMIT, extended: true }))
    // 解析 cookies 中间件
    app.use(cookieParser())

    const exposeSsrStack = process.env.NODE_ENV !== 'production'

    app.use('/{*default}', async (req, res) => {
        try {
            const url = req.originalUrl

            // 总是在开发中读取新模板
            let template = fs.readFileSync(resolve('index.html'), 'utf-8')
            template = await vite.transformIndexHtml(url, template)
            const render = (await vite.ssrLoadModule('/src/entry-server.ts')).render

            const { html: appHtml, preloadLinks, headTags, statusCode } = await render(url, manifest, req) as IRenderType

            const html = template
                .replace('<!--preload-links-->', preloadLinks)
                .replace('<!--app-html-->', appHtml)
                .replace('<!--head-tags-->', headTags)

            res.status(statusCode).set({ 'Content-Type': 'text/html' }).end(html)
        }
        catch (e: unknown) {
            const err = e as Error
            vite.ssrFixStacktrace(err)
            handleSsrRouteError(res, e, exposeSsrStack)
        }
    })

    return { app, vite }
}

const port = 17777

createServer().then(({ app }) => app.listen(port, () => {
    console.log(`监听: http://localhost:${port}`)
}))
