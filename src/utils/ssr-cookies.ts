import type { IUserCookies } from '~/types'

/** 可写入 Pinia / __INITIAL_STATE__ 的公开 Cookie 字段（不含 token） */
const PUBLIC_COOKIE_KEYS = ['userid', 'username', 'useremail'] as const

/** 昵称、邮箱写入 Cookie 时通常多做了一次 encodeURIComponent，解析后仍是百分号编码 */
const DECODE_COOKIE_KEYS = new Set<string>(['username', 'useremail'])

/**
 * 再解一层百分号编码。已是明文或编码非法时保持原值。
 */
function decodePublicCookieValue(value: string): string {
    try {
        return decodeURIComponent(value)
    }
    catch {
        return value
    }
}

/**
 * 从请求 cookies 提取可安全注水到前端的公开字段。
 * `user` / `b_user` 等 token 不进入 HTML，仅保留登录态标记 `user: '1'`。
 */
export function pickPublicCookies(cookies: IUserCookies = {}): IUserCookies {
    const result: IUserCookies = {}
    for (const key of PUBLIC_COOKIE_KEYS) {
        const value = cookies[key]
        if (typeof value === 'string' && value !== '') {
            result[key] = DECODE_COOKIE_KEYS.has(key) ? decodePublicCookieValue(value) : value
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
