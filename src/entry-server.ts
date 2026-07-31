import type { Request } from 'express'

import type { CusRouteComponent, IRenderType } from './types'

import { basename } from 'node:path'

import { createHead } from '@unhead/vue/server'
import { renderToString } from '@vue/server-renderer'

import { createApp } from './main'
import { useGlobalStore } from './stores/use-global-store'
import { pickPublicCookies } from './utils/ssr-cookies'

/**
 * 生成资源 preload / modulepreload 链接标签。
 */
function renderPreloadLink(file: string): string {
    if (file.endsWith('.js')) {
        return `<link rel="modulepreload" crossorigin href="${file}">`
    }
    else if (file.endsWith('.css')) {
        return `<link rel="stylesheet" href="${file}">`
    }
    else if (file.endsWith('.woff')) {
        return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
    }
    else if (file.endsWith('.woff2')) {
        return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
    }
    else if (file.endsWith('.gif')) {
        return ` <link rel="preload" href="${file}" as="image" type="image/gif">`
    }
    else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
        return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`
    }
    else if (file.endsWith('.png')) {
        return ` <link rel="preload" href="${file}" as="image" type="image/png">`
    }

    return ''
}

/**
 * 根据 SSR 清单为本次渲染涉及的模块生成 preload 链接。
 */
function renderPreloadLinks(modules: string[], manifest: Objable<string[]>): string {
    let links = ''
    const seen = new Set<string>()
    modules.forEach((id) => {
        const files = manifest[id]
        if (files) {
            files.forEach((file) => {
                if (!seen.has(file)) {
                    seen.add(file)
                    const filename = basename(file)
                    if (manifest[filename]) {
                        for (const depFile of manifest[filename]) {
                            links += renderPreloadLink(depFile)
                            seen.add(depFile)
                        }
                    }
                    links += renderPreloadLink(file)
                }
            })
        }
    })
    return links
}

/**
 * 转义 HTML 中的 script 标签，降低 __INITIAL_STATE__ 注入 XSS 风险。
 */
function replaceHtmlTag(html: string): string {
    return html.replace(/<script(.*?)>/gi, '&lt;script$1&gt;').replace(/<\/script>/g, '&lt;/script&gt;')
}

/**
 * 取 URL 路径部分（不含 query）。
 */
function getPathname(url: string): string {
    return url.split('?')[0] || '/'
}

/**
 * 从 Express 请求中解析客户端 IP（兼容反向代理）。
 */
function getClientIpFromReq(req?: Request): string | undefined {
    if (!req) {
        return undefined
    }
    const forwarded = req.headers['x-forwarded-for']
    if (typeof forwarded === 'string' && forwarded) {
        return forwarded.split(',')[0]?.trim() || undefined
    }
    if (Array.isArray(forwarded) && forwarded[0]) {
        return forwarded[0].split(',')[0]?.trim() || undefined
    }
    const realIp = req.headers['x-real-ip']
    if (typeof realIp === 'string' && realIp) {
        return realIp
    }
    return req.socket?.remoteAddress || undefined
}

/**
 * SSR 渲染入口：鉴权、asyncData、renderToString、状态注水。
 */
export async function render(url: string, manifest: Objable<string[]>, req?: Request): Promise<IRenderType> {
    const { app, router, store } = createApp()
    const cookies = req?.cookies ?? {}
    const pathname = getPathname(url)

    // 鉴权失败直接 302，避免以 200 渲染登录墙被缓存
    const isBackendPath = pathname === '/backend' || pathname.startsWith('/backend/')
    const isBackendLogin = pathname === '/backend/login' || pathname.startsWith('/backend/login/')
    const isUserPath = pathname === '/user' || pathname.startsWith('/user/')

    if (isBackendPath && !isBackendLogin && !cookies.b_user) {
        return { html: '', preloadLinks: '', headTags: '', store, statusCode: 302, redirect: '/backend/login' }
    }
    if (isUserPath && !cookies.user) {
        return { html: '', preloadLinks: '', headTags: '', store, statusCode: 302, redirect: '/' }
    }

    const head = createHead({
        disableDefaults: true,
    })

    app.use(head)
        .component('ReloadPrompt', { render: () => null })
        .component('VMdEditor', { render: () => null })

    const globalStore = useGlobalStore(store)
    // 仅公开字段进 Pinia，token 不进入 __INITIAL_STATE__
    globalStore.setCookies(pickPublicCookies(cookies))

    await router.push(url)
    await router.isReady()

    const current = router.currentRoute.value
    const statusCode = current.matched.length === 0 || current.name === '404' ? 404 : 200

    const matchedComponents = current.matched.flatMap((record) => {
        return Object.values(record.components as Record<string, CusRouteComponent>)
    })

    const clientIp = getClientIpFromReq(req)
    const userAgent = req?.get?.('user-agent') || undefined
    const cookieHeader = typeof req?.headers?.cookie === 'string' ? req.headers.cookie : undefined

    const ssrApi = sapi({
        cookies,
        cookieHeader,
        clientIp,
        userAgent,
    })

    const asyncTasks = matchedComponents
        .map((component) => {
            if (!component.asyncData) {
                return null
            }
            return component.asyncData({
                store,
                route: current,
                req,
                api: ssrApi,
            })
        })
        .filter((task): task is Promise<unknown> => task != null)

    await Promise.all(asyncTasks)

    // 传递可通过 useSSRContext() 使用的 SSR 上下文对象 @vitejs/plugin-vue 将代码注入到组件的 setup() 中，该组件在 ctx.modules 上注册。
    // 渲染之后，ctx.modules 将包含在此渲染调用期间已实例化的所有组件。
    const ctx: Objable = {}
    let html = await renderToString(app, ctx)

    const { headTags } = head.render()

    html += `<script>window.__INITIAL_STATE__ = ${replaceHtmlTag(JSON.stringify(store.state.value))}</script>`

    // Vite 生成的 SSR 清单包含模块 -> 块/资产映射，然后我们可以使用它来确定需要为此请求预加载哪些文件。
    const rawModules = ctx.modules as Set<string> | undefined
    const moduleIds = rawModules ? [...rawModules] : []
    const preloadLinks = renderPreloadLinks(moduleIds, manifest)
    return { html, preloadLinks, headTags, store, statusCode }
}
