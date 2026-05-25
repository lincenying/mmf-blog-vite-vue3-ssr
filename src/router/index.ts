/**
 * @file router
 * @author lincenying(lincenying@qq.com)
 */

import type { Pinia } from 'pinia'

import { createRouter as _createRouter, createMemoryHistory, createWebHistory } from 'vue-router'

import useAppShellStore from '@/stores/use-app-shell-store'
import { routes } from './routes'

export { routes } from './routes'

/**
 * 创建 Vue Router 实例（SSR 每请求新建）
 */
export function createRouter(store: Pinia) {
    const router = _createRouter({
        history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
        routes,
    })

    const slideLeft = 'fade'
    const slideRight = 'fade'

    router.beforeEach((to, from) => {
        const appShellStore = useAppShellStore(store)
        const { needPageTransition } = storeToRefs(appShellStore)
        if (needPageTransition.value) {
            let pageTransitionName: string
            if (!from.meta.index || to.meta.index === from.meta.index) {
                pageTransitionName = 'fade'
            }
            else if ((to.meta.index as number) > (from.meta.index as number)) {
                pageTransitionName = slideLeft
            }
            else {
                pageTransitionName = slideRight
            }

            appShellStore.setPageTransitionName(pageTransitionName)
        }
    })

    return router
}
