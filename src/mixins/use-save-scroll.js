import { onBeforeRouteLeave } from 'vue-router'

export default () => {
    // eslint-disable-next-line no-unused-vars
    const { ctx, options, route, router, globalStore, appShellStore, useLockFn } = useGlobal()

    const { historyPageScrollTop } = $(storeToRefs(appShellStore))

    watch(
        () => route.fullPath,
        async currPath => {
            const scrollTop = historyPageScrollTop[currPath] || 0
            setTimeout(() => {
                window.scrollTo(0, scrollTop)
            }, 350)
        }
    )

    onBeforeRouteLeave((to, from, next) => {
        appShellStore.saveScrollTop({
            path: from.fullPath,
            scrollTop: Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
        })
        next()
    })
}
