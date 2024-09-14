import type { AdminStore, ApiConfig, User } from '~/types'

import { acceptHMRUpdate, defineStore } from 'pinia'

const usePiniaStore = defineStore('backendAdminStore', () => {
    const state: AdminStore = reactive({
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
     * @param config 包含`page`和`path`属性的配置对象，用于指定获取数据的页码和路径。
     * @param $api 可选，ApiType类型的API实例，默认为api。
     * 该函数没有返回值，它主要用于更新状态。
     */
    const getAdminList = async (config: Pick<ApiConfig, 'page' | 'path'>, $api: ApiType = capi) => {
        // 如果当前列表数据已存在且路径与页码与请求配置相同，则不进行任何操作
        if (state.lists.data.length > 0 && config.path === state.lists.path && config.page === 1) {
            return
        }
        // 使用提供的API实例获取管理员列表数据
        const { code, data } = await $api.get<ResDataLists<User>>('backend/admin/list', { ...config, path: undefined })

        // 请求成功且返回数据有效时，更新状态中的列表数据
        if (code === 200 && data) {
            // 解构并赋值默认的列表、路径、是否有下一页和上一页、页码数据
            const {
                list = [],
                path,
                hasNext = 0,
                hasPrev = 0,
                page,
            } = {
                ...data,
                path: config.path, // 重设路径为请求时的路径
                page: config.page, // 重设页码为请求时的页码
            }

            // 更新状态，包括列表数据、是否有上下页、当前页码和路径
            state.lists = {
                data: page === 1 ? list : state.lists.data.concat(list), // 若为第一页，则替换列表数据；否则，追加到现有数据
                hasNext, // 是否有下一页
                hasPrev, // 是否有上一页
                page: (page || 1) + 1, // 更新当前页码，确保页码正确
                path, // 列表的路径
            }
        }
    }
    /**
     * 异步获取管理员项目信息。
     * @param config 包含`id`和`path`属性的ApiConfig部分对象，用于请求配置。
     * @param $api ApiType类型，默认为api，用于执行API请求。
     * 该函数没有返回值，但会更新状态（state）中的item属性。
     */
    const getAdminItem = async (config: Pick<ApiConfig, 'id' | 'path'>, $api: ApiType = capi) => {
        const { code, data } = await $api.get<User>('backend/admin/item', { ...config, path: undefined })
        if (code === 200 && data) {
            state.item = {
                data,
                ...config,
            }
        }
    }
    /**
     * 编辑管理员
     * @param payload 请求参数
     */
    const updateAdminItem = (payload: User) => {
        state.item.data = payload
        const index = state.lists.data.findIndex(ii => ii._id === payload._id)
        if (index > -1) {
            state.lists.data.splice(index, 1, payload)
        }
    }
    /**
     * 删除管理员
     * @param id 管理员ID
     */
    const deleteAdmin = (id: string) => {
        const index = state.lists.data.findIndex(ii => ii._id === id)
        if (index > -1) {
            state.lists.data.splice(index, 1, {
                ...state.lists.data[index],
                is_delete: 1,
            })
        }
    }
    /**
     * 恢复管理员
     * @param id 管理员ID
     */
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

/**
 * 后台管理员Store
 */
export default usePiniaStore
export const backendAdminStoreWithout = () => usePiniaStore(piniaInit)

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
}
