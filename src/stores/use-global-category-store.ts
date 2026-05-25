import type { IApiConfig, ICategory, ICategoryStore } from '~/types'

import { acceptHMRUpdate, defineStore } from 'pinia'
import { piniaInit } from '.'

export const useGlobalCategoryStore = defineStore('globalCategoryStore', () => {
    const state: ICategoryStore = reactive({
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
    const getCategoryList = async (config: IApiConfig, $api: ApiType = capi) => {
        if (state.lists.length) {
            return
        }
        const { code, data } = await $api.get<ResDataList<ICategory>>('backend/category/list', { ...config, path: undefined, cache: true })
        if (code === 200 && data) {
            state.lists = data.list
        }
    }
    /**
     * 读取分类详情
     * @param config 请求参数
     * @param $api
     */
    const getCategoryItem = async (config: IApiConfig, $api: ApiType = capi) => {
        const { code, data } = await $api.get<Nullable<ICategory>>('backend/category/item', { ...config, path: undefined })
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
    const insertCategoryItem = (payload: ICategory) => {
        state.lists = [payload].concat(state.lists)
    }
    /**
     * 编辑分类成功后, 更新分类数据
     * @param payload 分类详情
     */
    const updateCategoryItem = (payload: ICategory) => {
        state.item.data = payload
        const index = state.lists.findIndex(ii => ii._id === payload._id)
        if (index > -1) {
            state.lists.splice(index, 1, payload)
        }
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

export const globalCategoryStoreWithout = () => useGlobalCategoryStore(piniaInit)

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useGlobalCategoryStore, import.meta.hot))
}
