import { acceptHMRUpdate, defineStore } from 'pinia'

import type { ApiClientReturn, ApiConfig, ApiServerReturn, Article, ArticleStore } from '@/types'

import api from '@/api/index-client'

const usePiniaStore = defineStore('backendArticleStore', () => {
    const state = reactive<ArticleStore>({
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

    const getArticleList = async (config: ApiConfig, $api?: ApiServerReturn | ApiClientReturn) => {
        if (!$api)
            $api = api
        if (state.lists.data.length > 0 && config.path === state.lists.path && config.page === 1)
            return
        const { code, data } = await $api.get<ResponseDataLists<Article[]>>('backend/article/list', { ...config, path: undefined, cache: true })
        if (data && code === 200) {
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
    const getArticleItem = async (config: ApiConfig, $api?: ApiServerReturn | ApiClientReturn) => {
        if (!$api)
            $api = api
        const { code, data } = await $api.get<Article>('backend/article/item', { ...config, path: undefined })
        if (data && code === 200) {
            state.item = {
                data,
                ...config,
            }
        }
    }
    const deleteArticle = async (id: string) => {
        const index = state.lists.data.findIndex(ii => ii._id === id)
        if (index > -1) {
            state.lists.data.splice(index, 1, {
                ...state.lists.data[index],
                is_delete: 1,
            })
        }
    }
    const recoverArticle = async (id: string) => {
        const index = state.lists.data.findIndex(ii => ii._id === id)
        if (index > -1) {
            state.lists.data.splice(index, 1, {
                ...state.lists.data[index],
                is_delete: 0,
            })
        }
    }
    const insertArticleItem = (payload: Article) => {
        if (state.lists.path)
            state.lists.data = [payload].concat(state.lists.data)
    }
    const updateArticleItem = (payload: Article) => {
        const index = state.lists.data.findIndex(ii => ii._id === payload._id)
        if (index > -1)
            state.lists.data.splice(index, 1, payload)
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

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
