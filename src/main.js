import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'

import { createRouter } from './router'

import App from './app.vue'
import globalPlugin from '@/plugin/global'

console.log(`当前环境: ${import.meta.env.VITE_APP_ENV}`)

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance.
export function createApp() {
    const app = createSSRApp(App)
    const router = createRouter()
    const store = createPinia()
    const head = createHead()
    app.use(store).use(router).use(head).use(globalPlugin)

    return { app, router, store, head }
}
