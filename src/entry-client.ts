import type { CusRouteComponent } from './types'

import cookies from 'js-cookie'
import { createHead } from '@unhead/vue/client'
import { LoadingPlugin } from 'vue-loading-overlay'

import { createApp } from './main'
import { useGlobalStore } from './stores/use-global-store'
import { pickPublicCookies } from './utils/ssr-cookies'

import 'uno.css'
import './assets/css/github-markdown.css'
import 'vue-loading-overlay/dist/css/index.css'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import './assets/styles/style.scss'

const { app, router, store } = createApp()
const head = createHead()

// 在路由就绪 / mount 之前同步恢复状态，避免竞态导致 hydration 不一致
if (window.__INITIAL_STATE__) {
    store.state.value = window.__INITIAL_STATE__
}

// 用浏览器真实 cookie 同步公开字段与登录标记（token 仍不进 store）
const globalStore = useGlobalStore(store)
globalStore.setCookies(pickPublicCookies({
    ...globalStore.cookies,
    user: cookies.get('user') || undefined,
    userid: cookies.get('userid') || globalStore.cookies.userid,
    username: cookies.get('username') || globalStore.cookies.username,
    useremail: cookies.get('useremail') || globalStore.cookies.useremail,
}))

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
                    return routeComponent.asyncData({
                        store,
                        route: to,
                        api: capi,
                    })
                }
                return true
            }),
        )
    })
    app.use(head)
        .use(LoadingPlugin, {
            canCancel: false,
            loader: 'dots',
            color: '#54d9e0',
        })
        .mount('#app')
})
