import { acceptHMRUpdate } from 'pinia'
import type { anyObject } from '@/types'

interface UserCookies {
    user?: string
    userid?: string
    username?: string
    useremail?: string
}

const useStore = defineStore('globalStore', {
    state: () => ({
        loading: false,
        cookies: {} as UserCookies,
        showLoginModal: false,
        showRegisterModal: false,
        ISDEV: import.meta.env.VITE_APP_ENV === 'development',
        ISPRE: import.meta.env.VITE_APP_ENV === 'pre-release',
        ISPROD: import.meta.env.VITE_APP_ENV === 'production'
    }),
    getters: {
        getGlobalStore: state => state
    },
    actions: {
        setLoginModal(payload: boolean) {
            this.showLoginModal = payload
        },
        setRegisterModal(payload: boolean) {
            this.showRegisterModal = payload
        },
        setCookies(cookies: anyObject) {
            this.cookies = cookies
        }
    }
})
export default useStore

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
