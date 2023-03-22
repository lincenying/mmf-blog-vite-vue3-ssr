import { acceptHMRUpdate } from 'pinia'

import api from '@/api/index-client'
import type { User, ApiConfig, AdminStore } from '@/types'

const useStore = defineStore('backendAdminStore', {
    state: (): AdminStore => ({
        lists: {
            hasNext: 0,
            hasPrev: 0,
            path: '',
            page: 1,
            data: []
        },
        item: {
            data: null,
            path: ''
        }
    }),
    getters: {
        getBackendAdminStore: state => state
    },
    actions: {
        async getAdminList(config: ApiConfig, $api?: any) {
            if (!import.meta.env.SSR) $api = api
            if (this.lists.data.length > 0 && config.path === this.lists.path && config.page === 1) return
            const { code, data } = await $api.get('backend/admin/list', { ...config, path: undefined, cache: true })
            if (data && code === 200) {
                const {
                    list = [],
                    path,
                    hasNext = 0,
                    hasPrev = 0,
                    page
                } = {
                    ...data,
                    path: config.path,
                    page: config.page
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
                    page: page + 1,
                    path
                }
            }
        },
        async getAdminItem(config: ApiConfig, $api?: any) {
            if (!import.meta.env.SSR) $api = api
            const { code, data } = await $api.get('backend/admin/item', { ...config, path: undefined })
            if (data && code === 200) {
                this.item = {
                    data,
                    ...config
                }
            }
        },
        updateAdminItem(payload: User) {
            this.item.data = payload
            const index = this.lists.data.findIndex(ii => ii._id === payload._id)
            if (index > -1) {
                this.lists.data.splice(index, 1, payload)
            }
        },
        deleteAdmin(id: string) {
            const index = this.lists.data.findIndex(ii => ii._id === id)
            if (index > -1) {
                this.lists.data.splice(index, 1, {
                    ...this.lists.data[index],
                    is_delete: 1
                })
            }
        },
        recoverAdmin(id: string) {
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
