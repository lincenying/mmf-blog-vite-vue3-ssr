import { acceptHMRUpdate, defineStore } from 'pinia'

import api from '@/api/index-client'
import type { AdminStore, ApiClientReturn, ApiConfig, ApiServerReturn, User } from '@/types'

const usePiniaStore = defineStore('backendAdminStore', () => {
    const state = reactive<AdminStore>({
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

    const getAdminList = async (config: ApiConfig, $api?: ApiServerReturn | ApiClientReturn) => {
        if (!$api)
            $api = api
        if (state.lists.data.length > 0 && config.path === state.lists.path && config.page === 1)
            return
        const { code, data } = await $api.get<ResponseDataLists<User[]>>('backend/admin/list', { ...config, path: undefined, cache: true })
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
    const getAdminItem = async (config: ApiConfig, $api?: ApiServerReturn | ApiClientReturn) => {
        if (!$api)
            $api = api
        const { code, data } = await $api.get<User>('backend/admin/item', { ...config, path: undefined })
        if (data && code === 200) {
            state.item = {
                data,
                ...config,
            }
        }
    }
    const updateAdminItem = (payload: User) => {
        state.item.data = payload
        const index = state.lists.data.findIndex(ii => ii._id === payload._id)
        if (index > -1)
            state.lists.data.splice(index, 1, payload)
    }
    const deleteAdmin = (id: string) => {
        const index = state.lists.data.findIndex(ii => ii._id === id)
        if (index > -1) {
            state.lists.data.splice(index, 1, {
                ...state.lists.data[index],
                is_delete: 1,
            })
        }
    }
    const recoverAdmin = (id: string) => {
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
        getAdminList,
        getAdminItem,
        updateAdminItem,
        deleteAdmin,
        recoverAdmin,
    }
})

export default usePiniaStore
export const backendAdminStoreWithout = () => usePiniaStore(piniaInit)

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
