import { acceptHMRUpdate, defineStore } from 'pinia'
import type { GlobalStore } from '@/types'

const usePiniaStore = defineStore('globalStore', () => {
    const state: GlobalStore = reactive({
        loading: false,
        cookies: {},
        showLoginModal: false,
        showRegisterModal: false,
        ISDEV: import.meta.env.VITE_APP_ENV === 'development',
        ISPRE: import.meta.env.VITE_APP_ENV === 'pre-release',
        ISPROD: import.meta.env.VITE_APP_ENV === 'production',
    })

    /**
     * 是否显示登录弹窗
     * @param payload 是否显示
     */
    const setLoginModal = (payload: boolean) => {
        state.showLoginModal = payload
    }
    /**
     * 是否显示注册弹窗
     * @param payload 是否显示
     */
    const setRegisterModal = (payload: boolean) => {
        state.showRegisterModal = payload
    }
    /**
     * 设置Cookies
     * @param cookies
     */
    const setCookies = (cookies: Record<string, string | number | boolean>) => {
        state.cookies = cookies
    }

    return {
        ...toRefs(state),
        setLoginModal,
        setRegisterModal,
        setCookies,
    }
})
export default usePiniaStore
export const globalStoreWithout = () => usePiniaStore(piniaInit)

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
