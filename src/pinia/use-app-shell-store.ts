import { acceptHMRUpdate, defineStore } from 'pinia'
import type { ShellStore } from '@/types'

interface HistoryType {
    path: string
    scrollTop: number
}

const usePiniaStore = defineStore('appShellStore', () => {
    const state: ShellStore = reactive({
        needPageTransition: true,
        isPageSwitching: false,
        pageTransitionName: '',
        historyPageScrollTop: {},
    })

    /**
     * 开启页面切换动画
     */
    const enablePageTransition = () => {
        state.needPageTransition = true
    }

    /**
     * 关闭页面切换动画
     */
    const disablePageTransition = () => {
        state.needPageTransition = false
    }

    /**
     * 设置页面是否处于切换中
     *
     * @param isPageSwitching isPageSwitching
     */
    const setPageSwitching = (isPageSwitching: boolean) => {
        state.isPageSwitching = isPageSwitching
    }

    /**
     * 保存页面 scroll 高度
     */
    const saveScrollTop = (payload: HistoryType) => {
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

export default usePiniaStore
export const appShellStoreWithout = () => usePiniaStore(piniaInit)

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
