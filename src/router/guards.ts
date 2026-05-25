import type { RouteLocationNormalized } from 'vue-router'

import { isBrowser } from '@lincy/utils'
import cookies from 'js-cookie'

/**
 * 前台用户路由守卫：未登录跳转首页
 */
export function guardRoute(_to: RouteLocationNormalized, _from: RouteLocationNormalized) {
    const token = cookies.get('user')
    if (isBrowser && !token) {
        return '/'
    }
}

/**
 * 后台管理路由守卫：未登录跳转后台登录页
 */
export function guardRouteBackend(_to: RouteLocationNormalized, _from: RouteLocationNormalized) {
    const token = cookies.get('b_user')
    if (isBrowser && !token) {
        return '/backend/login'
    }
}
