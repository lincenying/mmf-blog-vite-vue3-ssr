import { acceptHMRUpdate } from 'pinia'

import api from '@/api/index-client'

const useStore = defineStore('backendArticleStore', {
    state: () => ({
        lists: {
            data: [],
            path: '',
            hasNext: 0,
            hasPrev: 0,
            page: 1
        },
        item: {
            data: {},
            path: ''
        }
    }),
    getters: {
        getBackendArticleStore: state => state
    },
    actions: {
        async getArticleList(config, $api) {
            if (!import.meta.env.SSR) $api = api
            if (this.lists.data.length > 0 && config.path === this.lists.path && config.page === 1) return
            const { code, data } = await $api.get('backend/article/list', { ...config, cache: true })
            if (data && code === 200) {
                const { list, path, hasNext, hasPrev, page } = {
                    ...data,
                    path: config.path,
                    page: config.page
                }

                let _list

                if (page === 1) {
                    _list = [].concat(list)
                } else {
                    _list = this.lists.data.concat(list)
                }

                this.lists = {
                    data: _list,
                    hasNext,
                    hasPrev,
                    page: page + 1,
                    path
                }
            }
        },
        async getArticleItem(config, $api) {
            if (!import.meta.env.SSR) $api = api
            const { code, data } = await $api.get('backend/article/item', config)
            if (data && code === 200) {
                this.item = {
                    data,
                    ...config
                }
            }
        },
        async deleteArticle(config) {
            const index = this.lists.data.findIndex(ii => ii._id === config.id)
            if (index > -1) {
                this.lists.data.splice(index, 1, {
                    ...this.lists.data[index],
                    is_delete: 1
                })
            }
        },
        async recoverArticle(config) {
            const index = this.lists.data.findIndex(ii => ii._id === config.id)
            if (index > -1) {
                this.lists.data.splice(index, 1, {
                    ...this.lists.data[index],
                    is_delete: 0
                })
            }
        },
        insertArticleItem(payload) {
            if (this.lists.path) {
                this.lists.data = [payload].concat(this.lists.data)
            }
        },
        updateArticleItem(data) {
            const index = this.lists.data.findIndex(ii => ii._id === data._id)
            if (index > -1) {
                this.lists.data.splice(index, 1, data)
            }
        }
    }
})
export default useStore

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
