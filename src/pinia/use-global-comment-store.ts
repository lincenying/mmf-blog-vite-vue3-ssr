import { acceptHMRUpdate } from 'pinia'

import type { ApiClientReturn, ApiConfig, ApiServerReturn, Comment, CommentStore } from '@/types'

import api from '@/api/index-client'

const useStore = defineStore('globalCommentStore', {
    state: (): CommentStore => ({
        lists: {
            data: [],
            hasNext: 0,
            hasPrev: 0,
            page: 1,
            path: ''
        }
    }),
    getters: {
        getGlobalCommentStore: state => state
    },
    actions: {
        async getCommentList(config: ApiConfig, $api?: ApiServerReturn | ApiClientReturn) {
            if (!import.meta.env.SSR) $api = api
            if (config.path === this.lists.path && config.page === 1) return
            const { code, data } = await $api!.get('frontend/comment/list', { ...config, path: undefined, cache: true })
            if (data && code === 200) {
                const {
                    list = [],
                    path = '',
                    hasNext = 0,
                    hasPrev = 0,
                    page = 1
                } = {
                    ...config,
                    ...data
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
                    page,
                    path
                }
            }
        },
        insertCommentItem(payload: Comment) {
            this.lists.data = [payload].concat(this.lists.data)
        },
        deleteComment(id: string) {
            const index = this.lists.data.findIndex(ii => ii._id === id)
            if (index > -1) {
                this.lists.data.splice(index, 1, {
                    ...this.lists.data[index],
                    is_delete: 1
                })
            }
        },
        recoverComment(id: string) {
            const index = this.lists.data.findIndex(ii => ii._id === id)
            if (index > -1) {
                this.lists.data.splice(index, 1, {
                    ...this.lists.data[index],
                    is_delete: 0
                })
            }
        }
    }
})
export default useStore

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
