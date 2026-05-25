import type { IApiConfig, IUser, IUserStore } from '~/types'

import { acceptHMRUpdate, defineStore } from 'pinia'
import { piniaInit } from '.'

const usePiniaStore = defineStore('backendUserStore', () => {
    const state: IUserStore = reactive({
        lists: {
            hasNext: 0,
            hasPrev: 0,
            path: '',
            page: 1,
            data: [],
        },
        item: {
            data: null,
            path: '',
        },
    })
    /**
     * 读取用户列表 - 后台
     */
    const getUserList = async (config: IApiConfig, $api: ApiType = capi) => {
        if (state.lists.data.length > 0 && config.path === state.lists.path && config.page === 1) {
            return
        }
        const { code, data } = await $api.get<ResDataLists<IUser>>('backend/user/list', { ...config, path: undefined })
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
     * 读取用户详情
     */
    const getUserItem = async (config: IApiConfig, $api: ApiType = capi) => {
        const { code, data } = await $api.get<IUser>('backend/user/item', { ...config, path: undefined })
        if (code === 200 && data) {
            state.item = {
                data,
                ...config,
            }
        }
    }
    /**
     * 编辑用户成功后, 更新用户数据
     */
    const updateUserItem = (payload: IUser) => {
        state.item.data = payload
        const index = state.lists.data.findIndex(item => item._id === payload._id)
        if (index > -1) {
            state.lists.data.splice(index, 1, payload)
        }
    }
    /**
     * 删除用户成功, 更新用户数据
     */
    const deleteUser = (id: string) => {
        const index = state.lists.data.findIndex(item => item._id === id)
        if (index > -1) {
            state.lists.data.splice(index, 1, {
                ...state.lists.data[index],
                is_delete: 1,
            })
        }
    }
    /**
     * 恢复用户成功, 更新用户数据
     */
    const recoverUser = (id: string) => {
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
        getUserList,
        getUserItem,
        updateUserItem,
        deleteUser,
        recoverUser,
    }
})

export default usePiniaStore
export const backendUserStoreWithout = () => usePiniaStore(piniaInit)

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
}
