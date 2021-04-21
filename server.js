// @ts-check
const fs = require('fs')
const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const proxy = require('express-http-proxy')
const queryString = require('query-string')

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD

async function createServer(root = process.cwd(), isProd = process.env.NODE_ENV === 'production') {
    const resolve = p => path.resolve(__dirname, p)
    const indexProd = isProd ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8') : ''
    const manifest = isProd ? require('./dist/client/ssr-manifest.json') : {}
    const app = express()

    // parse application/json
    app.use(express.json())
    // parse application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())

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
        app.use(vite.middlewares)
    } else {
        app.use(require('compression')())
        app.use(
            '/api',
            proxy('http://localhost:4000', {
                preserveHostHdr: true,
                reqAsBuffer: true,
                proxyReqBodyDecorator(bodyContent) {
                    return queryString.stringify(bodyContent)
                },
                //转发之前触发该方法
                proxyReqPathResolver(req) {
                    //这个代理会把匹配到的url（下面的 ‘/api’等）去掉，转发过去直接404，这里手动加回来，
                    req.url = req.baseUrl + req.url
                    return require('url').parse(req.url).path
                }
            })
        )
        app.use(
            require('serve-static')(resolve('dist/client'), {
                index: false
            })
        )
    }

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
        app.listen(7777, () => {
            console.log('http://localhost:7777')
        })
    )
}

// for test use
exports.createServer = createServer
