// @ts-check
const fs = require('fs')
const path = require('path')
// @ts-ignore
const express = require('express')
// @ts-ignore
const cookieParser = require('cookie-parser')
const { createProxyMiddleware } = require('http-proxy-middleware')

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD

async function createServer(root = process.cwd(), isProd = process.env.NODE_ENV === 'production') {
    const resolve = p => path.resolve(__dirname, p)

    const indexProd = isProd ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8') : ''

    // @ts-ignore
    const manifest = isProd ? require('./dist/client/ssr-manifest.json') : {}

    const app = express()

    /**
     * @type {import('vite').ViteDevServer}
     */
    let vite
    if (!isProd) {
        vite = await require('vite').createServer({
            root,
            logLevel: isTest ? 'error' : 'info',
            server: {
                middlewareMode: true
            }
        })
        // use vite's connect instance as middleware
        // @ts-ignore
        app.use(vite.middlewares)
    } else {
        // @ts-ignore
        app.use(require('compression')())
        // @ts-ignore
        app.use(
            // @ts-ignore
            require('serve-static')(resolve('dist/client'), {
                index: false
            })
        )
    }

    // parse application/json
    // @ts-ignore
    app.use(express.json())
    // parse application/x-www-form-urlencoded
    // @ts-ignore
    app.use(express.urlencoded({ extended: true }))
    // @ts-ignore
    app.use(cookieParser())

    // @ts-ignore
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:4000',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/api'
            }
        })
    )

    // @ts-ignore
    app.use('*', async (req, res) => {
        try {
            const url = req.originalUrl
            let template, render
            if (!isProd) {
                // always read fresh template in dev
                template = fs.readFileSync(resolve('index.html'), 'utf-8')
                template = await vite.transformIndexHtml(url, template)
                render = (await vite.ssrLoadModule('/src/entry-server.js')).render
            } else {
                template = indexProd
                // @ts-ignore
                render = require('./dist/server/entry-server.js').render
            }

            const [appHtml, preloadLinks, headTags] = await render(url, manifest, req)

            const html = template
                .replace(`<!--preload-links-->`, preloadLinks)
                .replace(`<!--app-html-->`, appHtml)
                .replace(`<!--head-tags-->`, headTags)

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e) {
            console.log(e)
            if (vite) vite.ssrFixStacktrace(e)
            res.status(500).end(e.stack)
        }
    })

    return { app, vite }
}

if (!isTest) {
    createServer().then(({ app }) =>
        // @ts-ignore
        app.listen(7777, () => {
            console.log('http://localhost:7777')
        })
    )
}

// for test use
exports.createServer = createServer
