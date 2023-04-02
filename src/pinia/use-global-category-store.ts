import { acceptHMRUpdate } from 'pinia'

import type { CategoryStore, ApiConfig, Category, ApiClientReturn, ApiServerReturn } from '@/types'
import api from '@/api/index-client'

const useStore = defineStore('globalCategoryStore', () => {
    const state = reactive<CategoryStore>({
        lists: [],
        item: {
            data: null
        }
    })

    const getCategoryList = async (config: ApiConfig, $api?: ApiServerReturn | ApiClientReturn) => {
        if (!import.meta.env.SSR) $api = api
        if (state.lists.length) return
        const { code, data } = await $api!.get('backend/category/list', { ...config, path: undefined, cache: true })
        if (data && code === 200) {
            state.lists = data.list
        }
    }
    const getCategoryItem = async (config: ApiConfig, $api?: ApiServerReturn | ApiClientReturn) => {
        if (!import.meta.env.SSR) $api = api
        const { code, data } = await $api!.get('backend/category/item', { ...config, path: undefined })
        if (data && code === 200) {
            state.item = {
                data,
                ...config
            }
        }
    }
    const insertCategoryItem = (payload: Category) => {
        state.lists = [payload].concat(state.lists)
    }
    const updateCategoryItem = (payload: Category) => {
        state.item.data = payload
        const index = state.lists.findIndex(ii => ii._id === payload._id)
        if (index > -1) {
            state.lists.splice(index, 1, payload)
        }
    }
    const deleteCategory = (id: string) => {
        const index = state.lists.findIndex(ii => ii._id === id)
        if (index > -1) {
            state.lists.splice(index, 1, {
                ...state.lists[index],
                is_delete: 1
            })
        }
    }
    const recoverCategory = (id: string) => {
        const index = state.lists.findIndex(ii => ii._id === id)
        if (index > -1) {
            state.lists.splice(index, 1, {
                ...state.lists[index],
                is_delete: 0
            })
        }
    }

    return {
        ...toRefs(state),
        getCategoryList,
        getCategoryItem,
        insertCategoryItem,
        updateCategoryItem,
        deleteCategory,
        recoverCategory
    }
})

export default useStore

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useStore as any, import.meta.hot))
