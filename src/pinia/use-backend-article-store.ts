import { acceptHMRUpdate, defineStore } from 'pinia'

import type { ApiConfig, Article, ArticleStore } from '@/types'

import api from '@/api/index-client'

const usePiniaStore = defineStore('backendArticleStore', () => {
    const state: ArticleStore = reactive({
        lists: {
            data: [],
            path: '',
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
     * @param config 请求参数
     * @param $api
     */
    const getArticleList = async (config: ApiConfig, $api: ApiType = api) => {
        if (state.lists.data.length > 0 && config.path === state.lists.path && config.page === 1) {
            return
        }
        const { code, data } = await $api.get<ResDataLists<Article>>('backend/article/list', { ...config, path: undefined })
        if (code === 200 && data) {
            const {
                list = [],
                path,
                hasNext = 0,
                hasPrev = 0,
                page,
            } = {
                ...data,
                path: config.path,
                page: config.page,
            }

            state.lists = {
                data: page === 1 ? list : state.lists.data.concat(list),
                hasNext,
                hasPrev,
                page: (page || 1) + 1,
                path,
            }
        }
    }
    /**
     * 读取文章详情 - 后台
     * @param config 请求参数
     * @param $api
     */
    const getArticleItem = async (config: ApiConfig, $api: ApiType = api) => {
        const { code, data } = await $api.get<Article>('backend/article/item', { ...config, path: undefined })
        if (code === 200 && data) {
            state.item = {
                data,
                ...config,
            }
        }
    }
    /**
     * 删除文章
     * @param id 文章ID
     */
    const deleteArticle = async (id: string) => {
        const index = state.lists.data.findIndex(ii => ii._id === id)
        if (index > -1) {
            state.lists.data.splice(index, 1, {
                ...state.lists.data[index],
                is_delete: 1,
            })
        }
    }
    /**
     * 恢复文章
     * @param id 文章ID
     */
    const recoverArticle = async (id: string) => {
        const index = state.lists.data.findIndex(ii => ii._id === id)
        if (index > -1) {
            state.lists.data.splice(index, 1, {
                ...state.lists.data[index],
                is_delete: 0,
            })
        }
    }
    /**
     * 发布文章成功后追加文章
     * @param payload 文章详情
     */
    const insertArticleItem = (payload: Article) => {
        if (state.lists.path) {
            state.lists.data = [payload].concat(state.lists.data)
        }
    }
    /**
     * 编辑成功后更新文章
     * @param payload 文章详情
     */
    const updateArticleItem = (payload: Article) => {
        const index = state.lists.data.findIndex(ii => ii._id === payload._id)
        if (index > -1) {
            state.lists.data.splice(index, 1, payload)
        }
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
export const backendArticleStoreWithout = () => usePiniaStore(piniaInit)

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
}
