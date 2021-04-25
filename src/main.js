/**
 * @file entry
 * @author lincenying(lincenying@qq.com)
 */

import { createSSRApp, createApp as createClientApp } from 'vue'
import { sync } from 'vuex-router-sync'
import { createHead } from '@vueuse/head'

import { createRouter } from './router'
import { createStore } from './store'
import { oc } from './utils'
import filters from '@/filters'

import App from './app.vue'
import { ClientOnly } from './components/client-only'

/* eslint-disable no-new */

console.log('当前环境: ' + import.meta.env.VITE_APP_ENV)

export function createApp(isClient = true) {
    const app = isClient ? createClientApp(App) : createSSRApp(App)

    const store = createStore()
    const router = createRouter(store)

    sync(store, router)

    const head = createHead()
    filters(app)
    app.config.globalProperties.$oc = oc

    app.use(store).use(router).use(head)

    app.component('client-only', isClient ? ClientOnly : { render: () => null })

    router.app = app

    return { app, router, store, head }
}
