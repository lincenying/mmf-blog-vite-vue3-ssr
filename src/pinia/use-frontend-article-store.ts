import { acceptHMRUpdate, defineStore } from 'pinia'

import type { ApiClientReturn, ApiConfig, ApiServerReturn, Article, FArticleStore } from '@/types'

import api from '@/api/index-client'

const usePiniaStore = defineStore('frontendArticleStore', () => {
    const state = reactive<FArticleStore>({
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
        trending: [],
    })

    const getArticleList = async (config: ApiConfig, $api?: ApiServerReturn | ApiClientReturn) => {
        if (!$api)
            $api = api
        if (state.lists.data.length > 0 && config.path === state.lists.path && config.page === 1)
            return
        const { code, data } = await $api.get<ResponseDataLists<Article[]>>('frontend/article/list', { ...config, path: undefined, cache: true })
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
        const { code, data } = await $api.get<Article>('frontend/article/item', { ...config, path: undefined, markdown: 1, cache: true })
        if (data && code === 200) {
            state.item = {
                data,
                ...config,
                isLoad: true,
            }
        }
    }
    const getTrending = async (_: any, $api?: ApiServerReturn | ApiClientReturn) => {
        if (!$api)
            $api = api
        if (state.trending.length)
            return
        const { code, data } = await $api.get<ResponseDataList<Article[]>>('frontend/trending', { cache: true })
        if (data && code === 200)
            state.trending = data.list
    }
    const modifyLikeStatus = (payload: { id: string; status: boolean }) => {
        const { id, status } = payload
        if (state.item.data && state.item.data._id === id) {
            if (status)
                state.item.data.like++
            else state.item.data.like--
            state.item.data.like_status = status
        }
        const index = state.lists.data.findIndex((item: Article) => item._id === id)
        if (index > -1) {
            const obj: Article = Object.assign({}, state.lists.data[index])
            if (status)
                obj.like++
            else obj.like--
            obj.like_status = status
            state.lists.data.splice(index, 1, obj)
        }
    }

    return {
        ...toRefs(state),
        getArticleList,
        getArticleItem,
        getTrending,
        modifyLikeStatus,
    }
})

export default usePiniaStore
export const frontendArticleStoreWithout = () => usePiniaStore(piniaInit)

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
