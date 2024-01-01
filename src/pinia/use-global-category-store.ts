import { acceptHMRUpdate, defineStore } from 'pinia'

import type { ApiConfig, Category, CategoryStore } from '@/types'
import api from '@/api/index-client'

const usePiniaStore = defineStore('globalCategoryStore', () => {
    const state: CategoryStore = reactive({
        lists: [],
        item: {
            data: null,
        },
    })

    /**
     * 读取分类列表
     * @param config 请求参数
     * @param $api
     */
    const getCategoryList = async (config: ApiConfig, $api?: ApiType) => {
        if (!$api)
            $api = api
        if (state.lists.length)
            return
        const { code, data } = await $api.get<ResDataList<Category>>('backend/category/list', { ...config, path: undefined, cache: true })
        if (code === 200 && data)
            state.lists = data.list
    }
    /**
     * 读取分类详情
     * @param config 请求参数
     * @param $api
     */
    const getCategoryItem = async (config: ApiConfig, $api?: ApiType) => {
        if (!$api)
            $api = api
        const { code, data } = await $api.get<Nullable<Category>>('backend/category/item', { ...config, path: undefined })
        if (code === 200 && data) {
            state.item = {
                data,
                ...config,
            }
        }
    }
    /**
     * 添加分类成功后, 插入分类
     * @param payload 分类详情
     */
    const insertCategoryItem = (payload: Category) => {
        state.lists = [payload].concat(state.lists)
    }
    /**
     * 编辑分类成功后, 更新分类数据
     * @param payload 分类详情
     */
    const updateCategoryItem = (payload: Category) => {
        state.item.data = payload
        const index = state.lists.findIndex(ii => ii._id === payload._id)
        if (index > -1)
            state.lists.splice(index, 1, payload)
    }
    /**
     * 删除分类成功后, 更新分类数据
     * @param id 分类ID
     */
    const deleteCategory = (id: string) => {
        const index = state.lists.findIndex(ii => ii._id === id)
        if (index > -1) {
            state.lists.splice(index, 1, {
                ...state.lists[index],
                is_delete: 1,
            })
        }
    }
    /**
     * 恢复分类成功后, 更新分类数据
     * @param id 分类ID
     */
    const recoverCategory = (id: string) => {
        const index = state.lists.findIndex(ii => ii._id === id)
        if (index > -1) {
            state.lists.splice(index, 1, {
                ...state.lists[index],
                is_delete: 0,
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
        recoverCategory,
    }
})

export default usePiniaStore
export const globalCategoryStoreWithout = () => usePiniaStore(piniaInit)

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
