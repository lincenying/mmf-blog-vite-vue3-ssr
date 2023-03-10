import { acceptHMRUpdate } from 'pinia'

import api from '@/api/index-client'

const useStore = defineStore('backendAdminStore', {
    state: () => ({
        lists: {
            hasNext: false,
            hasPrev: false,
            path: '',
            page: 1,
            data: []
        },
        item: {
            data: {},
            path: ''
        }
    }),
    getters: {
        getBackendAdminStore: state => state
    },
    actions: {
        async getAdminList(config, $api) {
            if (!import.meta.env.SSR) $api = api
            if (this.lists.data.length > 0 && config.path === this.lists.path && config.page === 1) return
            const { code, data } = await $api.get('backend/admin/list', { ...config, cache: true })
            if (data && code === 200) {
                const { list, path, hasNext, hasPrev, page } = {
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
        async getAdminItem(config, $api) {
            if (!import.meta.env.SSR) $api = api
            const { code, data } = await $api.get('backend/admin/item', config)
            if (data && code === 200) {
                this.item = {
                    data,
                    ...config
                }
            }
        },
        updateAdminItem(payload) {
            this.item.data = payload
            const index = this.lists.data.findIndex(ii => ii._id === payload._id)
            if (index > -1) {
                this.lists.data.splice(index, 1, payload)
            }
        },
        deleteAdmin(id) {
            const index = this.lists.data.findIndex(ii => ii._id === id)
            if (index > -1) {
                this.lists.data.splice(index, 1, {
                    ...this.lists.data[index],
                    is_delete: 1
                })
            }
        },
        recoverAdmin(id) {
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
