import { acceptHMRUpdate } from 'pinia'
import type { GlobalStore } from '@/types'

const useStore = defineStore('globalStore', () => {
    const state: GlobalStore = reactive({
        loading: false,
        cookies: {},
        showLoginModal: false,
        showRegisterModal: false,
        ISDEV: import.meta.env.VITE_APP_ENV === 'development',
        ISPRE: import.meta.env.VITE_APP_ENV === 'pre-release',
        ISPROD: import.meta.env.VITE_APP_ENV === 'production'
    })

    const setLoginModal = (payload: boolean) => {
        state.showLoginModal = payload
    }
    const setRegisterModal = (payload: boolean) => {
        state.showRegisterModal = payload
    }
    const setCookies = (cookies: Record<string, string | number | boolean>) => {
        state.cookies = cookies
    }

    return {
        ...toRefs(state),
        setLoginModal,
        setRegisterModal,
        setCookies
    }
})
export default useStore

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useStore as any, import.meta.hot))
