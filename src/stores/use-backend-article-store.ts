import type { IApiConfig, IArticle, IArticleStore } from '~/types'

import { acceptHMRUpdate, defineStore } from 'pinia'
import {
    fetchCrudItem,
    fetchCrudList,
    prependCrudItem,
    setCrudDeleteFlag,
    updateCrudItem,
} from './create-crud-list-helpers'

const usePiniaStore = defineStore('backendArticleStore', () => {
    const state: IArticleStore = reactive({
        lists: {
            data: [],
            path: '',
            key: '',
            hasNext: 0,
            hasPrev: 0,
            page: 1,
        },
        item: {
            data: null,
            path: '',
        },
    })

    /**
     * 读取文章列表 - 后台
     */
    const getArticleList = async (config: IApiConfig, $api: ApiType = capi) => {
        await fetchCrudList(state, config, 'backend/article/list', $api, { matchKey: true })
    }

    /**
     * 读取文章详情 - 后台
     */
    const getArticleItem = async (config: IApiConfig, $api: ApiType = capi) => {
        await fetchCrudItem(state, config, 'backend/article/item', $api)
    }

    /**
     * 删除文章
     */
    const deleteArticle = async (id: string) => {
        setCrudDeleteFlag(state, id, 1)
    }

    /**
     * 恢复文章
     */
    const recoverArticle = async (id: string) => {
        setCrudDeleteFlag(state, id, 0)
    }

    /**
     * 发布文章成功后追加文章
     */
    const insertArticleItem = (payload: IArticle) => {
        prependCrudItem(state, payload)
    }

    /**
     * 编辑成功后更新文章
     */
    const updateArticleItem = (payload: IArticle) => {
        updateCrudItem(state, payload)
    }

    return {
        ...toRefs(state),
        getArticleList,
        getArticleItem,
        deleteArticle,
        recoverArticle,
        insertArticleItem,
        updateArticleItem,
    }
})

export default usePiniaStore

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
}
