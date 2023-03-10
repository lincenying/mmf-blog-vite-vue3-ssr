import { acceptHMRUpdate } from 'pinia'

import api from '@/api/index-client'

const useStore = defineStore('globalCategoryStore', {
    state: () => ({
        lists: [],
        item: {}
    }),
    getters: {
        getGlobalCategoryStore: state => state
    },
    actions: {
        async getCategoryList(config, $api) {
            if (!import.meta.env.SSR) $api = api
            if (this.lists.length) return
            const { code, data } = await $api.get('backend/category/list', { ...config, cache: true })
            if (data && code === 200) {
                this.lists = data.list
            }
        },
        async getCategoryItem(config, $api) {
            if (!import.meta.env.SSR) $api = api
            const { code, data } = await $api.get('backend/category/item', config)
            if (data && code === 200) {
                this.item = {
                    data,
                    ...config
                }
            }
        },
        insertCategoryItem(payload) {
            this.lists = [payload].concat(this.lists)
        },
        updateCategoryItem(payload) {
            this.item.data = payload
            const index = this.lists.findIndex(ii => ii._id === payload._id)
            if (index > -1) {
                this.lists.splice(index, 1, payload)
            }
        },
        deleteCategory(id) {
            const index = this.lists.findIndex(ii => ii._id === id)
            if (index > -1) {
                this.lists.splice(index, 1, {
                    ...this.lists[index],
                    is_delete: 1
                })
            }
        },
        recoverCategory(id) {
            const index = this.lists.findIndex(ii => ii._id === id)
            if (index > -1) {
                this.lists.splice(index, 1, {
                    ...this.lists[index],
                    is_delete: 0
                })
            }
        }
    }
})
export default useStore

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
