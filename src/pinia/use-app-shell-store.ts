import { acceptHMRUpdate } from 'pinia'
import type { ShellStore } from '@/types'

interface historyType {
    path: string
    scrollTop: number
}

const useStore = defineStore('appShellStore', () => {
    const state = reactive<ShellStore>({
        /**
         * 是否需要页面切换动画
         *
         * @type {boolean}
         */
        needPageTransition: true,

        /**
         * 多个页面是否处于切换中
         *
         * @type {boolean}
         */
        isPageSwitching: false,

        /**
         * 多个页面切换效果名称
         *
         * @type {string}
         */
        pageTransitionName: '',

        /**
         * 上个页面 scroll 的信息
         *
         * @type {Object}
         */
        historyPageScrollTop: {},
    })

    /**
     * 开启页面切换动画
     *
     * @param {Function} commit commit
     */
    const enablePageTransition = () => {
        state.needPageTransition = true
    }

    /**
     * 关闭页面切换动画
     *
     * @param {Function} commit commit
     */
    const disablePageTransition = () => {
        state.needPageTransition = false
    }

    /**
     * 设置页面是否处于切换中
     *
     * @param {Function} commit commit
     * @param {boolean} isPageSwitching isPageSwitching
     */
    const setPageSwitching = (isPageSwitching: boolean) => {
        state.isPageSwitching = isPageSwitching
    }

    /**
     * 保存页面 scroll 高度
     *
     * @param {[type]} options.commit [description]
     * @param {string} options.path path
     * @param {number} options.scrollTop scrollTop
     */
    const saveScrollTop = (payload: historyType) => {
        const { path, scrollTop } = payload
        state.historyPageScrollTop[path] = scrollTop
    }

    const setPageTransitionName = (pageTransitionName: string) => {
        state.pageTransitionName = pageTransitionName
    }

    return {
        ...toRefs(state),
        enablePageTransition,
        disablePageTransition,
        setPageSwitching,
        saveScrollTop,
        setPageTransitionName,
    }
})

export default useStore

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
