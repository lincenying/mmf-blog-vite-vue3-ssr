import { renderToString } from '@vue/server-renderer'
import { renderHeadToString } from '@vueuse/head'

import { createApp } from './main'
import { api } from './api/index-server'

import reloadPrompt from './components/reload-prompt-ssr.vue'

function renderPreloadLink(file) {
    if (file.endsWith('.js')) {
        return `<link rel="modulepreload" crossorigin href="${file}">`
    } else if (file.endsWith('.css')) {
        return `<link rel="stylesheet" href="${file}">`
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
                    links += renderPreloadLink(file)
                }
            })
        }
    })
    return links
}

export async function render(url, manifest, req) {
    const { app, router, store, head } = createApp()

    app.component('reload-prompt', reloadPrompt)

    // set the router to the desired URL before rendering
    router.push(url)
    await router.isReady()

    if (router.currentRoute.value.matched.length === 0) {
        // context.throw(404, "Not Found");
    }

    store.$api = store.state.$api = api(req && req.cookies)

    const matchedComponents = router.currentRoute.value.matched.flatMap(record => Object.values(record.components))

    try {
        await Promise.all(
            matchedComponents.map(component => {
                if (component.asyncData) {
                    return component.asyncData({
                        store,
                        route: router.currentRoute.value,
                        req
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

    const { headTags } = renderHeadToString(head)

    html += `<script>window.__INITIAL_STATE__ = ${JSON.stringify(store.state)}</script>`

    // the SSR manifest generated by Vite contains module -> chunk/asset mapping
    // which we can then use to determine what files need to be preloaded for this
    // request.
    const preloadLinks = renderPreloadLinks(ctx.modules, manifest)
    return [html, preloadLinks, headTags]
}
