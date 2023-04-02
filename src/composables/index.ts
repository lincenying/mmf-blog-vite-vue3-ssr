import md5 from 'md5'
import type { Fn } from '@/types'

export const useGlobal = () => {
    const ins = getCurrentInstance()!

    const ctx = ins.appContext.config.globalProperties
    const options = ins.type
    const route = useRoute()
    const router = useRouter()
    const globalStore = useGlobalStore()
    const appShellStore = useAppShellStore()

    // eslint-disable-next-line no-unused-vars

    return {
        ctx,
        options,
        route,
        router,
        globalStore,
        appShellStore
    }
}

/**
 * 竞态锁
 * @param fn 回调函数
 * @param autoUnlock 是否自动解锁
 * @returns void
 * ```
 * autoUnlock === true 不管 fn 返回什么, 都自动解锁
 * autoUnlock === false 不管 fn 返回什么, 都不自动解锁
 * autoUnlock === 'auto' 当 fn 返回 false 时, 不自动解锁, 返回其他值时, 自动解锁
 * ```
 */
export const useLockFn = (fn: Fn, autoUnlock: boolean | string = 'auto') => {
    const [lock, toggleLock] = useToggle(false)
    return async (...args: any[]) => {
        if (lock.value) return
        toggleLock(true)
        try {
            const $return: any = await fn(...args)
            if (autoUnlock === true || (autoUnlock === 'auto' && $return !== false)) toggleLock(false)
        } catch (e) {
            toggleLock(false)
            throw e
        }
    }
}

/**
 * 保持滚动条位置
 */
export const useSaveScroll = () => {
    // eslint-disable-next-line no-unused-vars
    const route = useRoute()
    const appShellStore = useAppShellStore()

    const { historyPageScrollTop } = storeToRefs(appShellStore)

    watch(
        () => route.fullPath,
        async currPath => {
            const scrollTop = historyPageScrollTop.value[currPath] || 0
            setTimeout(() => {
                window.scrollTo(0, scrollTop)
            }, 350)
        }
    )

    onBeforeRouteLeave((to, from, next) => {
        appShellStore.saveScrollTop({
            path: from.fullPath,
            scrollTop: Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
        })
        next()
    })
}

/**
 * 生成gAvatar头像地址
 * @param email 邮箱
 * @param width 图片宽度
 * @returns 图片地址
 */
export const useAvatar = (email?: string, width?: number) => {
    email = email || '123456'
    email = decodeURIComponent(email)
    width = width || 256
    // return `https://cdn.v2ex.com/gravatar/${md5(email)}?s=${width}&d=identicon&r=g`
    // return `https://dn-qiniu-avatar.qbox.me/avatar/${md5(email)}?s=${width}&d=identicon&r=g`
    // return `https://fdn.geekzu.org/avatar/${md5(email)}?s=${width}&d=identicon&r=g`
    return `https://cravatar.cn/avatar/${md5(email)}?s=${width}&d=identicon&r=g`
}
