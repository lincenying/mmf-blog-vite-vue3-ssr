import type { IApiConfig, IComment, ICommentStore } from '~/types'

import { acceptHMRUpdate, defineStore } from 'pinia'
import { piniaInit } from '.'

const usePiniaStore = defineStore('globalCommentStore', () => {
    const state: ICommentStore = reactive({
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
     */
    const getCommentList = async (config: IApiConfig, $api: ApiType = capi) => {
        if (config.path === state.lists.path && config.page === 1) {
            return
        }
        const { code, data } = await $api.get<ResDataLists<IComment>>('frontend/comment/list', { ...config, path: undefined, cache: true })
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
     */
    const insertCommentItem = (payload: IComment) => {
        state.lists.data = [payload].concat(state.lists.data)
    }
    /**
     * 删除评论成功后, 更新评论数据
     */
    const deleteComment = (id: string) => {
        const index = state.lists.data.findIndex(item => item._id === id)
        if (index > -1) {
            state.lists.data.splice(index, 1, {
                ...state.lists.data[index],
                is_delete: 1,
            })
        }
    }

    /**
     * 恢复评论成功后, 更新评论数据
     */
    const recoverComment = (id: string) => {
        const index = state.lists.data.findIndex(item => item._id === id)
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
