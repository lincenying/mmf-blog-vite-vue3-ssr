import { LoadingPlugin } from 'vue-loading-overlay'

import { createApp } from './main'
import type { CusRouteComponent } from './types'
import VueMarkdownEditor from './plugin/v-md-editor'
import reloadPrompt from '@/components/reload-prompt.vue'

import 'uno.css'
import './assets/css/github-markdown.css'
import './assets/css/hljs/googlecode.css'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import './assets/css/vuepress.css'
import 'vue-loading-overlay/dist/css/index.css'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import './assets/scss/style.scss'

const { app, router, store } = createApp()

router.isReady().then(() => {
    router.beforeResolve(async (to, from) => {
        let diffed = false
        const activated = to.matched.filter((c, i) => {
            return diffed || (diffed = from.matched[i] !== c) || from.path !== to.path
        })

        if (!activated.length) {
            return false
        }

        await Promise.all(
            activated.map((c) => {
                const routeComponent = c.components?.default as CusRouteComponent
                if (routeComponent.asyncData) {
                    return routeComponent.asyncData({ store, route: to })
                }

                return true
            }),
        )
    })
    app.component('ReloadPrompt', reloadPrompt)
    app.use(LoadingPlugin, {
        'can-cancel': false,
        'loader': 'dots',
        'color': '#54d9e0',
    })
        .use(VueMarkdownEditor)
        .mount('#app')
    console.log('client router ready')
})

if (window.__INITIAL_STATE__) {
    store.state.value = window.__INITIAL_STATE__
}
