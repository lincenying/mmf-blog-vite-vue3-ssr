/**
 * @file entry
 * @author lincenying(lincenying@qq.com)
 */

import { createApp as _createApp } from 'vue'
import { sync } from 'vuex-router-sync'
import { createHead } from '@vueuse/head'

import { createRouter } from './router'
import { createStore } from './store'
import { oc } from './utils'
import filters from '@/filters'

import App from './app.vue'

/* eslint-disable no-new */

export function createApp() {
    const app = _createApp(App)

    const store = createStore()
    const router = createRouter(store)

    sync(store, router)

    const head = createHead()
    filters(app)
    app.config.globalProperties.$oc = oc

    app.use(store).use(router).use(head)

    router.app = app

    return { app, router, store, head }
}
