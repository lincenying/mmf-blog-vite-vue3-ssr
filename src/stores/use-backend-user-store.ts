import type { IApiConfig, IUser, IUserStore } from '~/types'

import { acceptHMRUpdate, defineStore } from 'pinia'
import {
    fetchCrudItem,
    fetchCrudList,
    setCrudDeleteFlag,
    updateCrudItem,
} from './create-crud-list-helpers'

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
        await fetchCrudList(state, config, 'backend/user/list', $api)
    }

    /**
     * 读取用户详情
     */
    const getUserItem = async (config: IApiConfig, $api: ApiType = capi) => {
        await fetchCrudItem(state, config, 'backend/user/item', $api)
    }

    /**
     * 编辑用户成功后, 更新用户数据
     */
    const updateUserItem = (payload: IUser) => {
        updateCrudItem(state, payload)
    }

    /**
     * 删除用户成功, 更新用户数据
     */
    const deleteUser = (id: string) => {
        setCrudDeleteFlag(state, id, 1)
    }

    /**
     * 恢复用户成功, 更新用户数据
     */
    const recoverUser = (id: string) => {
        setCrudDeleteFlag(state, id, 0)
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

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
}
