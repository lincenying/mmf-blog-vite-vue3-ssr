// @ts-check
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { createServer as viteCreateServer } from 'vite'
import express from 'express'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import { createProxyMiddleware } from 'http-proxy-middleware'

import apiDomain from './src/api/url.js'

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD

export async function createServer(root = process.cwd(), isProd = process.env.NODE_ENV === 'production', hmrPort) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const resolve = p => path.resolve(__dirname, p)

    const indexProd = isProd ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8') : ''

    const manifest = isProd ? JSON.parse(fs.readFileSync(resolve('dist/client/ssr-manifest.json'), 'utf-8')) : {}

    const app = express()

    app.use(
        logger('[:remote-addr] ":method :url" :status :res[content-length] ":referrer" ":date[web]"', {
            skip(req) {
                const skipExt = ['.map', '.js', '.css', '.png', 'jpg', '.jpeg', '.gif', '.ttf', '.woff2', '.ico']
                return skipExt.some(ext => {
                    return req.url.indexOf(ext) !== -1
                })
            }
        })
    )

    /**
     * @type {import('vite').ViteDevServer}
     */
    let vite
    if (!isProd) {
        vite = await viteCreateServer({
            base: '/',
            root,
            logLevel: isTest ? 'error' : 'info',
            server: {
                middlewareMode: true,
                watch: {
                    // During tests we edit the files too fast and sometimes chokidar
                    // misses change events, so enforce polling for consistency
                    usePolling: true,
                    interval: 100
                },
                hmr: {
                    port: hmrPort
                }
            },
            appType: 'custom'
        })
        // use vite's connect instance as middleware
        app.use(vite.middlewares)
    } else {
        app.use((await import('compression')).default())
        app.use(
            '/api',
            createProxyMiddleware({
                target: apiDomain,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            })
        )
        app.use(
            (await import('serve-static')).default(resolve('dist/client'), {
                index: false
            })
        )
    }

    // parse application/json
    app.use(express.json())
    // parse application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())

    app.use('*', async (req, res) => {
        try {
            // const url = req.originalUrl.replace('/test/', '/')
            const url = req.originalUrl

            let template, render
            if (!isProd) {
                // always read fresh template in dev
                template = fs.readFileSync(resolve('index.html'), 'utf-8')
                template = await vite.transformIndexHtml(url, template)
                render = (await vite.ssrLoadModule('/src/entry-server.js')).render
            } else {
                template = indexProd
                render = (await import('./dist/server/entry-server.js')).render
            }

            const [appHtml, preloadLinks, headTags] = await render(url, manifest, req)

            const html = template
                .replace(`<!--preload-links-->`, preloadLinks)
                .replace(`<!--app-html-->`, appHtml)
                .replace(`<!--head-tags-->`, headTags)

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e) {
            // eslint-disable-next-line no-unused-expressions
            vite && vite.ssrFixStacktrace(e)
            console.log(e.stack)
            res.status(500).end(e.stack)
        }
    })

    // @ts-ignore
    return { app, vite }
}

let port = 7777
if (process.env.NODE_ENV !== 'production') {
    port = 17777
}

if (!isTest) {
    createServer().then(({ app }) =>
        app.listen(port, () => {
            console.log(`监听: http://localhost:${port}`)
        })
    )
}
