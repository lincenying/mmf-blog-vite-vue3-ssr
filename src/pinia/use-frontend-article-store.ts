import type { ApiConfig, Article, FArticleStore } from '~/types'

import { acceptHMRUpdate, defineStore } from 'pinia'

const usePiniaStore = defineStore('frontendArticleStore', () => {
    const state: FArticleStore = reactive({
        lists: {
            data: [],
            path: '',
            hasNext: 0,
            hasPrev: 0,
            page: 1,
        },
        item: {
            data: null,
            path: '',
        },
        trending: [],
    })

    /**
     * 异步获取文章列表。
     * @param config 包含请求需要的配置的对象，比如路径和页码。
     * @param $api 可选，API 接口实例，默认为全局 api 实例。
     * @returns 没有显式返回值，但会更新 state 中的 lists 状态。
     */
    const getArticleList = async (config: ApiConfig, $api: ApiType = capi) => {
        // 如果当前已有数据且请求的路径和页码相同，则无需重复请求
        if (state.lists.data.length > 0 && config.path === state.lists.path && config.page === 1) {
            return
        }

        // 发起 GET 请求获取文章列表数据
        const { code, data } = await $api.get<ResDataLists<Article>>('frontend/article/list', { ...config, path: undefined, cache: true })

        // 请求成功且返回数据时，处理返回的数据
        if (code === 200 && data) {
            // 解构并赋值返回的数据，同时修正部分字段的值
            const {
                list = [],
                path,
                hasNext = 0,
                hasPrev = 0,
                page,
            } = {
                ...data,
                path: config.path, // 修正路径信息
                page: config.page, // 修正页码信息
            }

            // 更新 state 中的 lists 状态
            state.lists = {
                data: page === 1 ? list : state.lists.data.concat(list), // 根据页码合并文章列表数据
                hasNext, // 是否有下一页
                hasPrev, // 是否有上一页
                page: (page || 1) + 1, // 更新当前页码
                path, // 更新路径信息
            }
        }
    }

    /**
     * 异步获取文章项。
     * @param config - API 配置对象。
     * @param $api - 可选的 API 实例，如果未提供，则使用默认的 api 实例。
     * 该函数不直接返回值，而是通过更新 state.item 来间接地返回结果。
     */
    const getArticleItem = async (config: ApiConfig, $api: ApiType = capi) => {
        // 向 API 发起请求获取文章详情，配置中排除了 path 属性，并以 markdown 格式返回，启用缓存
        const { code, data } = await $api.get<Article>('frontend/article/item', { ...config, path: undefined, markdown: 1, cache: true })
        // 如果请求成功且有返回数据，则更新 state 中的 item 信息
        if (code === 200 && data) {
            state.item = {
                data,
                ...config,
                isLoad: true,
            }
        }
    }

    /**
     * 异步获取热门趋势数据的函数。
     *
     * @param payload 可选参数，用于传递给API请求的额外信息，如文章ID。
     * @param payload.id 可选参数，文章ID。
     * @param $api 可选参数，用于发起请求的API实例，默认使用全局api实例。
     * @returns 无返回值。但会更新全局状态中的trending数据。
     */
    const getTrending = async (payload: { id?: string } = {}, $api: ApiType = capi) => {
        // 检查已有trending数据，若有则不再请求
        if (state.trending.length) {
            return
        }

        // 使用提供的$api实例发起GET请求获取trending数据
        const { code, data } = await $api.get<ResDataList<Article>>('frontend/trending', { ...payload, cache: true })

        // 请求成功且数据有效时更新trending数据
        if (code === 200 && data) {
            state.trending = data.list
        }
    }
    /**
     * 修改特定文章的喜欢状态。
     * @param payload 包含文章ID和新的喜欢状态的对象。
     * {
     *    id: string; // 文章的唯一标识符
     *    status: boolean; // 新的喜欢状态
     * }
     * 该函数会更新状态对象中与文章相关的信息，包括文章的喜欢数和喜欢状态。
     */

    const modifyLikeStatus = (payload: { id: string, status: boolean }) => {
        const { id, status } = payload

        // 更新状态对象中特定文章的喜欢数和喜欢状态
        if (state.item.data && state.item.data._id === id) {
            if (status) {
                state.item.data.like++
            }
            else {
                state.item.data.like--
            }
            state.item.data.like_status = status
        }

        // 在文章列表中查找文章，更新其喜欢数和喜欢状态
        const index = state.lists.data.findIndex((item: Article) => item._id === id)
        if (index > -1) {
            // 复制对象以避免直接修改原始数据
            const obj: Article = Object.assign({}, state.lists.data[index])
            if (status) {
                obj.like++
            }
            else {
                obj.like--
            }
            obj.like_status = status
            state.lists.data.splice(index, 1, obj)
        }
    }

    return {
        ...toRefs(state),
        getArticleList,
        getArticleItem,
        getTrending,
        modifyLikeStatus,
    }
})

export default usePiniaStore
export const frontendArticleStoreWithout = () => usePiniaStore(piniaInit)

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
}
