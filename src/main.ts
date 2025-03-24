import { createPinia } from 'pinia'
import { createSSRApp } from 'vue'
import globalPlugin from '@/plugin/global'

import App from './app.vue'
import { createRouter } from './router'

console.log(`当前环境: ${import.meta.env.VITE_APP_ENV}`)

// SSR 要求每个请求都有一个新的应用程序实例，
// 因此我们导出一个创建新应用程序实例的函数。
export function createApp() {
    const app = createSSRApp(App)
    const store = createPinia()
    const router = createRouter(store)
    app.use(store).use(router).use(globalPlugin)

    return { app, router, store }
}
