import { acceptHMRUpdate, defineStore } from 'pinia'

import type { ApiClientReturn, ApiConfig, ApiServerReturn, User, UserStore } from '@/types'

import api from '@/api/index-client'

const usePiniaStore = defineStore('backendUserStore', () => {
    const state = reactive<UserStore>({
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

    const getUserList = async (config: ApiConfig, $api?: ApiServerReturn | ApiClientReturn) => {
        if (!$api)
            $api = api
        if (state.lists.data.length > 0 && config.path === state.lists.path && config.page === 1)
            return
        const { code, data } = await $api.get<ResponseDataLists<User[]>>('backend/user/list', { ...config, path: undefined, cache: true })
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

            let _list

            if (page === 1)
                _list = list
            else
                _list = state.lists.data.concat(list)

            state.lists = {
                data: _list,
                hasNext,
                hasPrev,
                page: (page || 1) + 1,
                path,
            }
        }
    }
    const getUserItem = async (config: ApiConfig, $api?: ApiServerReturn | ApiClientReturn) => {
        if (!$api)
            $api = api
        const { code, data } = await $api.get<User>('backend/user/item', { ...config, path: undefined })
        if (data && code === 200) {
            state.item = {
                data,
                ...config,
            }
        }
    }
    const updateUserItem = (payload: User) => {
        state.item.data = payload
        const index = state.lists.data.findIndex(ii => ii._id === payload._id)
        if (index > -1)
            state.lists.data.splice(index, 1, payload)
    }
    const deleteUser = (id: string) => {
        const index = state.lists.data.findIndex(ii => ii._id === id)
        if (index > -1) {
            state.lists.data.splice(index, 1, {
                ...state.lists.data[index],
                is_delete: 1,
            })
        }
    }
    const recoverUser = (id: string) => {
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
        getUserList,
        getUserItem,
        updateUserItem,
        deleteUser,
        recoverUser,
    }
})

export default usePiniaStore
export const backendUserStoreWithout = () => usePiniaStore(piniaInit)

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
