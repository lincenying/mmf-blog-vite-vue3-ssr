import { acceptHMRUpdate } from 'pinia'

const useStore = defineStore('appShellStore', {
    state: () => ({
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
        historyPageScrollTop: {}
    }),
    getters: {
        getAppShellStore: state => state
    },
    actions: {
        /**
         * 开启页面切换动画
         *
         * @param {Function} commit commit
         */
        enablePageTransition() {
            this.needPageTransition = true
        },

        /**
         * 关闭页面切换动画
         *
         * @param {Function} commit commit
         */
        disablePageTransition() {
            this.needPageTransition = false
        },

        /**
         * 设置页面是否处于切换中
         *
         * @param {Function} commit commit
         * @param {boolean} isPageSwitching isPageSwitching
         */
        setPageSwitching(isPageSwitching) {
            this.isPageSwitching = isPageSwitching
        },

        /**
         * 保存页面 scroll 高度
         *
         * @param {[type]} options.commit [description]
         * @param {string} options.path path
         * @param {number} options.scrollTop scrollTop
         */
        saveScrollTop({ path, scrollTop }) {
            this.historyPageScrollTop[path] = scrollTop
        },

        setPageTransitionName({ pageTransitionName }) {
            this.pageTransitionName = pageTransitionName
        }
    }
})
export default useStore

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
