import md5 from 'md5'
import type { AnyFn } from '@vueuse/core'

export function useGlobal() {
    const ins = getCurrentInstance()!

    const ctx = ins.appContext.config.globalProperties
    const options = ins.type

    return {
        ctx,
        options,
    }
}

/**
 * 竞态锁
 * @param fn 回调函数
 * @param autoUnlock 是否自动解锁
 * @description
 * ```
 * autoUnlock === true 不管 fn 返回什么, 都自动解锁
 * autoUnlock === false 不管 fn 返回什么, 都不自动解锁
 * autoUnlock === 'auto' 当 fn 返回 false 时, 不自动解锁, 返回其他值时, 自动解锁
 * ```
 * @example
 * ```
 * const Fn = useLockFn(async (key) => {
 *  console.log(key)
 * }
 *
 * <div v-on:click="Fn(123)"></div>
 * ```
 */
export function useLockFn(fn: AnyFn, autoUnlock: boolean | 'auto' = 'auto') {
    const [lock, toggleLock] = useToggle(false)
    return async (...args: any[]) => {
        if (lock.value) {
            return
        }
        toggleLock(true)
        try {
            const $return: any = await fn(...args)
            if (autoUnlock === true || (autoUnlock === 'auto' && $return !== false)) {
                toggleLock(false)
            }
        }
        catch (e) {
            toggleLock(false)
            throw e
        }
    }
}

/**
 * 保持滚动条位置
 */
export function useSaveScroll() {
    const route = useRoute()
    const appShellStore = useAppShellStore()

    const { historyPageScrollTop } = storeToRefs(appShellStore)

    // watch(
    //     () => route.fullPath,
    //     async (currPath) => {
    //         console.log(currPath)
    //         const scrollTop = historyPageScrollTop.value[currPath] || 0
    //         setTimeout(() => {
    //             window.scrollTo(0, scrollTop)
    //         }, 350)
    //     },
    // )

    onActivated(() => {
        const scrollTop = historyPageScrollTop.value[route.fullPath] || 0
        setTimeout(() => {
            window.scrollTo(0, scrollTop)
        }, 300)
    })

    onMounted(() => {
        const scrollTop = historyPageScrollTop.value[route.fullPath] || 0
        setTimeout(() => {
            window.scrollTo(0, scrollTop)
        }, 300)
    })

    onBeforeRouteLeave((to, from, next) => {
        appShellStore.saveScrollTop({
            path: from.fullPath,
            scrollTop: Math.max(window.scrollY, document.documentElement.scrollTop, document.body.scrollTop),
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
export function useAvatar(email?: string, width?: number) {
    email = email || '123456'
    email = decodeURIComponent(email)
    width = width || 256
    // return `https://cdn.v2ex.com/gravatar/${md5(email)}?s=${width}&d=identicon&r=g`
    // return `https://dn-qiniu-avatar.qbox.me/avatar/${md5(email)}?s=${width}&d=identicon&r=g`
    // return `https://fdn.geekzu.org/avatar/${md5(email)}?s=${width}&d=identicon&r=g`
    return `https://cravatar.cn/avatar/${md5(email)}?s=${width}&d=identicon&r=g`
}
