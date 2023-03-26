import { acceptHMRUpdate } from 'pinia'

import type { anyObject, ApiClientReturn, ApiConfig, ApiServerReturn, Article, FArticleStore } from '@/types'

import api from '@/api/index-client'

const useStore = defineStore('frontendArticleStore', {
    state: (): FArticleStore => ({
        lists: {
            data: [],
            path: '',
            hasNext: 0,
            hasPrev: 0,
            page: 1
        },
        item: {
            data: null,
            path: ''
        },
        trending: []
    }),
    getters: {
        getFrontendArticleStore: state => state
    },
    actions: {
        async getArticleList(config: ApiConfig, $api?: ApiServerReturn | ApiClientReturn) {
            if (!import.meta.env.SSR) $api = api
            if (this.lists.data.length > 0 && config.path === this.lists.path && config.page === 1) return
            const { code, data } = await $api!.get('frontend/article/list', { ...config, path: undefined, cache: true })
            if (data && code === 200) {
                const {
                    list = [],
                    path,
                    hasNext = 0,
                    hasPrev = 0,
                    page
                } = {
                    ...data,
                    path: config.path,
                    page: config.page
                }

                let _list

                if (page === 1) {
                    _list = [].concat(list)
                } else {
                    _list = this.lists.data.concat(list)
                }

                this.lists = {
                    data: _list,
                    hasNext,
                    hasPrev,
                    page: page + 1,
                    path
                }
            }
        },
        async getArticleItem(config: ApiConfig, $api?: ApiServerReturn | ApiClientReturn) {
            if (!import.meta.env.SSR) $api = api
            const { code, data } = await $api!.get('frontend/article/item', { ...config, path: undefined, markdown: 1, cache: true })
            if (data && code === 200) {
                this.item = {
                    data,
                    ...config,
                    isLoad: true
                }
            }
        },
        async getTrending(_: any, $api?: ApiServerReturn | ApiClientReturn) {
            if (!import.meta.env.SSR) $api = api
            if (this.trending.length) return
            const { code, data } = await $api!.get('frontend/trending', { cache: true })
            if (data && code === 200) {
                this.trending = data.list
            }
        },
        modifyLikeStatus(payload: { id: string; status: boolean }) {
            const { id, status } = payload
            if (this.item.data && this.item.data._id === id) {
                if (status) this.item.data.like++
                else this.item.data.like--
                this.item.data.like_status = status
            }
            const index = this.lists.data.findIndex((item: anyObject) => item._id === id)
            if (index > -1) {
                const obj: Article = Object.assign({}, this.lists.data[index])
                if (status) obj.like++
                else obj.like--
                obj.like_status = status
                this.lists.data.splice(index, 1, obj)
            }
        }
    }
})
export default useStore

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
