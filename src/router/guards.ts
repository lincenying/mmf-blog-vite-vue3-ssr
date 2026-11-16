import type { RouteLocationNormalized } from 'vue-router'

import { isBrowser } from '@lincy/utils'

import { useGlobalStore } from '@/stores/use-global-store'

/**
 * 前台用户路由守卫：未登录跳转首页。
 * `user` 为 HttpOnly，脚本读不到 token，只认 Pinia 里的登录标记。
 */
export function guardRoute(_to: RouteLocationNormalized, _from: RouteLocationNormalized) {
    if (!isBrowser) {
        return
    }
    const globalStore = useGlobalStore()
    if (!globalStore.cookies.user) {
        return '/'
    }
}

/**
 * 后台管理路由守卫：未登录跳转后台登录页。
 * `b_user` 为 HttpOnly，脚本读不到 token，只认 Pinia 里的登录标记。
 */
export function guardRouteBackend(_to: RouteLocationNormalized, _from: RouteLocationNormalized) {
    if (!isBrowser) {
        return
    }
    const globalStore = useGlobalStore()
    if (!globalStore.cookies.b_user) {
        return '/backend/login'
    }
}
