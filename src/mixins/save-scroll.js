import { watch } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

import useGlobal from '@/mixins/global'

export default () => {
    // eslint-disable-next-line no-unused-vars
    const { ctx, options, route, router, store, useToggle, useHead, useLockFn, ref, reactive } = useGlobal()

    watch(
        () => route.fullPath,
        async currPath => {
            const scrollTop = store.state.appShell.historyPageScrollTop[currPath] || 0
            setTimeout(() => {
                window.scrollTo(0, scrollTop)
            }, 350)
        }
    )

    onBeforeRouteUpdate(async (to, from, next) => {
        await options.asyncData({ route: to, store })
        next()
    })

    onBeforeRouteLeave((to, from, next) => {
        store.dispatch('appShell/saveScrollTop', {
            path: from.fullPath,
            scrollTop: Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
        })
        next()
    })
}
