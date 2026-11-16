import type { IRenderType } from '~/types'

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

import cookieParser from 'cookie-parser'
import express from 'express'
import { createServer as viteCreateServer } from 'vite'

import { installAccessLogger } from './server-access-log'
import { handleSsrRouteError } from './server-ssr-error'
import { buildHtmlHeaders, isLocalRedirect, renderHtmlDocument, sendHtml } from './server-ssr-response'
import { urlGuardMiddleware } from './server-url-guard'

const BODY_PARSER_LIMIT = '1mb'

export async function createServer(root = process.cwd(), hmrPort?: number) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const resolve = (p: string) => path.resolve(__dirname, p)
    const manifest = {}
    const app = express()

    app.use(urlGuardMiddleware)
    installAccessLogger(app)

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

    app.get('/health', (_req, res) => {
        res.status(200).set('Cache-Control', 'no-store').send('OK')
    })

    const exposeSsrStack = process.env.NODE_ENV !== 'production'

    app.get('/{*default}', async (req, res) => {
        try {
            const url = req.originalUrl

            // 总是在开发中读取新模板
            let template = fs.readFileSync(resolve('index.html'), 'utf-8')
            template = await vite.transformIndexHtml(url, template)
            const render = (await vite.ssrLoadModule('/src/entry-server.ts')).render

            const rendered = await render(url, manifest, req) as IRenderType

            if (rendered.redirect) {
                if (!isLocalRedirect(rendered.redirect)) {
                    handleSsrRouteError(res, new Error('非法跳转地址'), exposeSsrStack)
                    return
                }
                res.redirect(rendered.statusCode || 302, rendered.redirect)
                return
            }

            const html = renderHtmlDocument(template, rendered)
            sendHtml(req, res, rendered.statusCode, html, buildHtmlHeaders(req, rendered.statusCode))
        }
        catch (e: unknown) {
            const error = e instanceof Error ? e : new Error(String(e))
            vite.ssrFixStacktrace(error)
            handleSsrRouteError(res, error, exposeSsrStack)
        }
    })

    return { app, vite }
}

const port = 17777

createServer().then(({ app }) => app.listen(port, () => {
    console.log(`监听: http://localhost:${port}`)
}))
