import VueMarkdownEditor from '@kangc/v-md-editor'
import vuePressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'

import { createApp } from './main'

import reloadPrompt from './components/reload-prompt.vue'

VueMarkdownEditor.use(vuePressTheme)

const { app, router, store } = createApp(true)

router.isReady().then(() => {
    console.log('xxxx')
    router.beforeResolve(async (to, from) => {
        console.log('yyyy')
        let diffed = false
        const activated = to.matched.filter((c, i) => {
            return diffed || (diffed = from.matched[i] !== c)
        })

        console.log(activated)

        if (!activated.length) return false

        await Promise.all(
            activated.map(c => {
                console.log(c.components.default.asyncData)
                if (c.components.default.asyncData) {
                    return c.components.default.asyncData({ store, route: to })
                }
                return true
            })
        )
    })
    app.component('reload-prompt', reloadPrompt)
    app.use(VueMarkdownEditor).mount('#app')
    console.log('client router ready')
})

if (window.__INITIAL_STATE__) {
    store.state.value = window.__INITIAL_STATE__
}
