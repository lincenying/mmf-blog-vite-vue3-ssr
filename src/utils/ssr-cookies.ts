import type { IUserCookies } from '~/types'

/** 可写入 Pinia / __INITIAL_STATE__ 的公开 Cookie 字段（不含 token） */
const PUBLIC_COOKIE_KEYS = ['userid', 'username', 'useremail'] as const

/**
 * 从请求 cookies 提取可安全注水到前端的公开字段。
 * `user` / `b_user` 等 token 不进入 HTML，仅保留登录态标记 `user: '1'`。
 */
export function pickPublicCookies(cookies: IUserCookies = {}): IUserCookies {
    const result: IUserCookies = {}
    for (const key of PUBLIC_COOKIE_KEYS) {
        const value = cookies[key]
        if (value !== undefined && value !== '') {
            result[key] = value
        }
    }
    if (cookies.user) {
        result.user = '1'
    }
    return result
}

/**
 * 从查询/提交参数中剥离仅用于 SSR LRU 的 cache 标记，避免打到后端。
 */
export function splitCacheFlag(input: Objable = {}): { cache: boolean, payload: Objable } {
    const { cache, ...payload } = input
    return { cache: !!cache, payload }
}
