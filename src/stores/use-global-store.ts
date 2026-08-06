import type { IGlobalStore, IUserCookies } from '~/types'

import { acceptHMRUpdate, defineStore } from 'pinia'

export const useGlobalStore = defineStore('globalStore', () => {
    const state: IGlobalStore = reactive({
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
    const setCookies = (cookies: IUserCookies) => {
        state.cookies = cookies
    }

    return {
        ...toRefs(state),
        setLoginModal,
        setRegisterModal,
        setCookies,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot))
}
