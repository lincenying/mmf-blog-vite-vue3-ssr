import type { IAdminStore, IApiConfig, IUser } from '~/types'

import { acceptHMRUpdate, defineStore } from 'pinia'
import {
    fetchCrudItem,
    fetchCrudList,
    setCrudDeleteFlag,
    updateCrudItem,
} from './create-crud-list-helpers'

const usePiniaStore = defineStore('backendAdminStore', () => {
    const state: IAdminStore = reactive({
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
     * 异步获取管理员列表。
     */
    const getAdminList = async (config: Pick<IApiConfig, 'page' | 'path'>, $api: ApiType = capi) => {
        await fetchCrudList(state, config, 'backend/admin/list', $api)
    }

    /**
     * 异步获取管理员详情。
     */
    const getAdminItem = async (config: Pick<IApiConfig, 'id' | 'path'>, $api: ApiType = capi) => {
        await fetchCrudItem(state, config, 'backend/admin/item', $api)
    }

    /**
     * 编辑管理员
     */
    const updateAdminItem = (payload: IUser) => {
        updateCrudItem(state, payload)
    }

    /**
     * 删除管理员
     */
    const deleteAdmin = (id: string) => {
        setCrudDeleteFlag(state, id, 1)
    }

    /**
     * 恢复管理员
     */
    const recoverAdmin = (id: string) => {
        setCrudDeleteFlag(state, id, 0)
    }

    return {
        ...toRefs(state),
        getAdminList,
        getAdminItem,
        updateAdminItem,
        deleteAdmin,
        recoverAdmin,
    }
})

/**
 * 后台管理员 Store
 */
export default usePiniaStore

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
}
