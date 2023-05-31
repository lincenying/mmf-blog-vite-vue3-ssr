import { basename } from 'node:path'
import { renderToString } from '@vue/server-renderer'
import { renderHeadToString } from '@vueuse/head'

import type { Request } from 'express'

import { createApp } from './main'
import { api } from './api/index-server'

function renderPreloadLink(file: string) {
    if (file.endsWith('.js'))
        return `<link rel="modulepreload" crossorigin href="${file}">`
    else if (file.endsWith('.css'))
        return `<link rel="stylesheet" href="${file}">`
    else if (file.endsWith('.woff'))
        return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
    else if (file.endsWith('.woff2'))
        return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
    else if (file.endsWith('.gif'))
        return ` <link rel="preload" href="${file}" as="image" type="image/gif">`
    else if (file.endsWith('.jpg') || file.endsWith('.jpeg'))
        return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`
    else if (file.endsWith('.png'))
        return ` <link rel="preload" href="${file}" as="image" type="image/png">`

    // TODO
    return ''
}

function renderPreloadLinks(modules: any[], manifest: Record<string, any>) {
    let links = ''
    const seen = new Set()
    modules.forEach((id) => {
        const files = manifest[id]
        if (files) {
            files.forEach((file: string) => {
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

function replaceHtmlTag(html: string) {
    return html.replace(/<script(.*?)>/gi, '&lt;script$1&gt;').replace(/<\/script>/g, '&lt;/script&gt;')
}

export async function render(url: string, manifest: Record<string, string[]>, req: Request) {
    const { app, router, store, head } = createApp()

    app.component('ReloadPrompt', { render: () => null }).component('VMdEditor', { render: () => null })

    // 在渲染之前将路由器设置为所需的 URL
    router.push(url)
    await router.isReady()

    if (router.currentRoute.value.matched.length === 0) {
        // context.throw(404, "Not Found");
    }

    const matchedComponents = router.currentRoute.value.matched.flatMap((record: any) => Object.values(record.components))
    const globalStore = useGlobalStore(store)
    globalStore.setCookies(req.cookies)

    try {
        await Promise.all(
            matchedComponents.map((component: any) => {
                if (component.asyncData) {
                    return component.asyncData({
                        store,
                        route: router.currentRoute.value,
                        req,
                        api: api(req && req.cookies),
                    })
                }
                return null
            }).filter(Boolean),
        )
    }
    catch (error) {
        console.log(error)
    }

    // 传递可通过 useSSRContext() 使用的 SSR 上下文对象 @vitejs/plugin-vue 将代码注入到组件的 setup() 中，该组件在 ctx.modules 上注册。
    // 渲染之后，ctx.modules 将包含在此渲染调用期间已实例化的所有组件。
    const ctx: Record<string, any> = {}
    let html = await renderToString(app, ctx)

    const { headTags } = await renderHeadToString(head)

    html += `<script>window.__INITIAL_STATE__ = ${replaceHtmlTag(JSON.stringify(store.state.value))}</script>`

    // Vite 生成的 SSR 清单包含模块 -> 块/资产映射，然后我们可以使用它来确定需要为此请求预加载哪些文件。
    const preloadLinks = renderPreloadLinks(ctx.modules, manifest)
    return [html, preloadLinks, headTags, store]
}
