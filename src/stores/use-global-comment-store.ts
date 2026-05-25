import type { ApiConfig, Comment, CommentStore } from '~/types'

import { acceptHMRUpdate, defineStore } from 'pinia'

const usePiniaStore = defineStore('globalCommentStore', () => {
    const state: CommentStore = reactive({
        lists: {
            data: [],
            hasNext: 0,
            hasPrev: 0,
            page: 1,
            path: '',
        },
    })

    /**
     * 读取评论列表
     * @param config 请求参数
     * @param $api
     */
    const getCommentList = async (config: ApiConfig, $api: ApiType = capi) => {
        if (config.path === state.lists.path && config.page === 1) {
            return
        }
        const { code, data } = await $api.get<ResDataLists<Comment>>('frontend/comment/list', { ...config, path: undefined, cache: true })
        if (code === 200 && data) {
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
    /**
     * 添加评论成功后, 插入评论
     * @param payload 评论详情
     */
    const insertCommentItem = (payload: Comment) => {
        state.lists.data = [payload].concat(state.lists.data)
    }
    /**
     * 删除评论成功后, 更新评论数据
     * @param id 评论ID
     */
    const deleteComment = (id: string) => {
        const index = state.lists.data.findIndex(ii => ii._id === id)
        if (index > -1) {
            state.lists.data.splice(index, 1, {
                ...state.lists.data[index],
                is_delete: 1,
            })
        }
    }

    /**
     * 恢复评论成功后, 更新评论数据
     * @param id 评论ID
     */
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

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
}
