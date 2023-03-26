import { acceptHMRUpdate } from 'pinia'

import type { CategoryStore, ApiConfig, Category, ApiClientReturn, ApiServerReturn } from '@/types'
import api from '@/api/index-client'

const useStore = defineStore('globalCategoryStore', {
    state: (): CategoryStore => ({
        lists: [],
        item: {
            data: null
        }
    }),
    getters: {
        getGlobalCategoryStore: state => state
    },
    actions: {
        async getCategoryList(config: ApiConfig, $api?: ApiServerReturn | ApiClientReturn) {
            if (!import.meta.env.SSR) $api = api
            if (this.lists.length) return
            const { code, data } = await $api!.get('backend/category/list', { ...config, path: undefined, cache: true })
            if (data && code === 200) {
                this.lists = data.list
            }
        },
        async getCategoryItem(config: ApiConfig, $api?: ApiServerReturn | ApiClientReturn) {
            if (!import.meta.env.SSR) $api = api
            const { code, data } = await $api!.get('backend/category/item', { ...config, path: undefined })
            if (data && code === 200) {
                this.item = {
                    data,
                    ...config
                }
            }
        },
        insertCategoryItem(payload: Category) {
            this.lists = [payload].concat(this.lists)
        },
        updateCategoryItem(payload: Category) {
            this.item.data = payload
            const index = this.lists.findIndex(ii => ii._id === payload._id)
            if (index > -1) {
                this.lists.splice(index, 1, payload)
            }
        },
        deleteCategory(id: string) {
            const index = this.lists.findIndex(ii => ii._id === id)
            if (index > -1) {
                this.lists.splice(index, 1, {
                    ...this.lists[index],
                    is_delete: 1
                })
            }
        },
        recoverCategory(id: string) {
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
