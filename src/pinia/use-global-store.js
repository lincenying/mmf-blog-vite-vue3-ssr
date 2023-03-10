import { acceptHMRUpdate } from 'pinia'

const useStore = defineStore('globalStore', {
    state: () => ({
        loading: false,
        cookies: {},
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
        setLoginModal(payload) {
            this.showLoginModal = payload
        },
        setRegisterModal(payload) {
            this.showRegisterModal = payload
        },
        setCookies(cookies) {
            this.cookies = cookies
        }
    }
})
export default useStore

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
