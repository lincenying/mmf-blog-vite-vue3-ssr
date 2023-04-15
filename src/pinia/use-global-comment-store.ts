import { acceptHMRUpdate } from 'pinia'

import type { ApiClientReturn, ApiConfig, ApiServerReturn, Comment, CommentStore } from '@/types'

import api from '@/api/index-client'

const useStore = defineStore('globalCommentStore', () => {
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

            let _list

            if (page === 1)
                _list = list
            else
                _list = state.lists.data.concat(list)

            state.lists = {
                data: _list,
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

export default useStore

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useStore as any, import.meta.hot))
