import { basename } from 'node:path'
import { renderToString } from '@vue/server-renderer'
import { renderHeadToString } from '@vueuse/head'

import { createApp } from './main'
import { api } from './api/index-server'

function renderPreloadLink(file) {
    if (file.endsWith('.js')) {
        return `<link rel="modulepreload" crossorigin href="${file}">`
    } else if (file.endsWith('.css')) {
        return `<link rel="stylesheet" href="${file}">`
    } else if (file.endsWith('.woff')) {
        return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
    } else if (file.endsWith('.woff2')) {
        return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
    } else if (file.endsWith('.gif')) {
        return ` <link rel="preload" href="${file}" as="image" type="image/gif">`
    } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
        return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`
    } else if (file.endsWith('.png')) {
        return ` <link rel="preload" href="${file}" as="image" type="image/png">`
    }
    // TODO
    return ''
}

function renderPreloadLinks(modules, manifest) {
    let links = ''
    const seen = new Set()
    modules.forEach(id => {
        const files = manifest[id]
        if (files) {
            files.forEach(file => {
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

function replaceHtmlTag(html) {
    return html.replace(/<script(.*?)>/gi, '&lt;script$1&gt;').replace(/<\/script>/g, '&lt;/script&gt;')
}

export async function render(url, manifest, req) {
    const { app, router, store, head } = createApp()

    app.component('ReloadPrompt', { render: () => null })
    app.component('VMdEditor', { render: () => null })

    // set the router to the desired URL before rendering
    router.push(url)
    await router.isReady()

    if (router.currentRoute.value.matched.length === 0) {
        // context.throw(404, "Not Found");
    }

    // store.$api = store.state.$api = api(req && req.cookies)

    const matchedComponents = router.currentRoute.value.matched.flatMap(record => Object.values(record.components))

    const globalStore = useGlobalStore()

    globalStore.setCookies(req.cookies)

    try {
        await Promise.all(
            matchedComponents.map(component => {
                if (component.asyncData) {
                    return component.asyncData({
                        store,
                        route: router.currentRoute.value,
                        req,
                        api: api(req && req.cookies)
                    })
                }
            })
        )
    } catch (error) {
        console.log(error)
    }

    // passing SSR context object which will be available via useSSRContext()
    // @vitejs/plugin-vue injects code into a component's setup() that registers
    // itself on ctx.modules. After the render, ctx.modules would contain all the
    // components that have been instantiated during this render call.
    const ctx = {}
    let html = await renderToString(app, ctx)

    const { headTags } = await renderHeadToString(head)

    html += `<script>window.__INITIAL_STATE__ = ${replaceHtmlTag(JSON.stringify(store.state.value))}</script>`

    // the SSR manifest generated by Vite contains module -> chunk/asset mapping
    // which we can then use to determine what files need to be preloaded for this
    // request.
    const preloadLinks = renderPreloadLinks(ctx.modules, manifest)
    return [html, preloadLinks, headTags, store]
}
