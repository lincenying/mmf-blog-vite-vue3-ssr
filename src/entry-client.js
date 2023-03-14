import { LoadingPlugin } from 'vue-loading-overlay'
import VueMarkdownEditor from '@kangc/v-md-editor'
import vuePressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'

import { createApp } from './main'

import reloadPrompt from '@/components/reload-prompt.vue'

VueMarkdownEditor.use(vuePressTheme)

const { app, router, store } = createApp(true)

router.isReady().then(() => {
    router.beforeResolve(async (to, from) => {
        let diffed = false
        const activated = to.matched.filter((c, i) => {
            return diffed || (diffed = from.matched[i] !== c)
        })

        if (!activated.length) return false

        await Promise.all(
            activated.map(c => {
                if (c.components.default.asyncData) {
                    return c.components.default.asyncData({ store, route: to })
                }
                return true
            })
        )
    })
    app.component('ReloadPrompt', reloadPrompt)
    app.use(LoadingPlugin, {
        'can-cancel': false,
        loader: 'dots',
        color: '#54d9e0'
    })
        .use(VueMarkdownEditor)
        .mount('#app')
    console.log('client router ready')
})

if (window.__INITIAL_STATE__) {
    store.state.value = window.__INITIAL_STATE__
}
