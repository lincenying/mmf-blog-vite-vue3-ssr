import type { IApiConfig, ICategory, ICategoryStore } from '~/types'

import { acceptHMRUpdate, defineStore } from 'pinia'
import { setListDeleteFlag, updateListItem } from './create-crud-list-helpers'

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
        updateListItem(state.lists, payload)
    }
    /**
     * 删除分类成功后, 更新分类数据
     * @param id 分类ID
     */
    const deleteCategory = (id: string) => {
        setListDeleteFlag(state.lists, id, 1)
    }
    /**
     * 恢复分类成功后, 更新分类数据
     * @param id 分类ID
     */
    const recoverCategory = (id: string) => {
        setListDeleteFlag(state.lists, id, 0)
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

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useGlobalCategoryStore, import.meta.hot))
}
