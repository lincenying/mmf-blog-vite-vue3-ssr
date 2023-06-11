import { acceptHMRUpdate, defineStore } from 'pinia'

import type { ApiClientReturn, ApiConfig, ApiServerReturn, Comment, CommentStore } from '@/types'

import api from '@/api/index-client'

const usePiniaStore = defineStore('globalCommentStore', () => {
    const state = reactive<CommentStore>({
        lists: {
            data: [],
            hasNext: 0,
            hasPrev: 0,
            page: 1,
            path: '',
        },
    })

    const getCommentList = async (config: ApiConfig, $api?: ApiServerReturn | ApiClientReturn) => {
        if (!$api)
            $api = api
        if (config.path === state.lists.path && config.page === 1)
            return
        const { code, data } = await $api.get<ResponseDataLists<Comment[]>>('frontend/comment/list', { ...config, path: undefined, cache: true })
        if (data && code === 200) {
            const {
                list = [],
                path = '',
                hasNext = 0,
                hasPrev = 0,
                page = 1,
            } = {
                ...config,
                ...data,
            }

            state.lists = {
                data: page === 1 ? list : state.lists.data.concat(list),
                hasNext,
                hasPrev,
                page,
                path,
            }
        }
    }
    const insertCommentItem = (payload: Comment) => {
        state.lists.data = [payload].concat(state.lists.data)
    }
    const deleteComment = (id: string) => {
        const index = state.lists.data.findIndex(ii => ii._id === id)
        if (index > -1) {
            state.lists.data.splice(index, 1, {
                ...state.lists.data[index],
                is_delete: 1,
            })
        }
    }
    const recoverComment = (id: string) => {
        const index = state.lists.data.findIndex(ii => ii._id === id)
        if (index > -1) {
            state.lists.data.splice(index, 1, {
                ...state.lists.data[index],
                is_delete: 0,
            })
        }
    }

    return {
        ...toRefs(state),
        getCommentList,
        insertCommentItem,
        deleteComment,
        recoverComment,
    }
})

export default usePiniaStore
export const globalCommentStoreWithout = () => usePiniaStore(piniaInit)

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
