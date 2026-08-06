import type { IApiConfig, IListStore } from '~/types'

/** 支持软删除标记的 CRUD 实体 */
export interface ICrudEntity {
    _id: string
    is_delete: number
}

/** 列表 + 详情 结构 */
export interface ICrudListState<T extends ICrudEntity> {
    lists: IListStore<T[]>
    item: {
        data: Nullable<T>
        path?: string
        [propName: string]: unknown
    }
}

/**
 * 拉取分页列表并写入 state（同 path/page 短路，支持可选 key）。
 */
export async function fetchCrudList<T extends ICrudEntity>(
    state: ICrudListState<T>,
    config: IApiConfig,
    listUrl: string,
    $api: ApiType = capi,
    options: { matchKey?: boolean } = {},
): Promise<void> {
    const sameKey = options.matchKey ? config.key === state.lists.key : true
    if (state.lists.data.length > 0 && config.path === state.lists.path && sameKey && config.page === 1) {
        return
    }

    const { code, data } = await $api.get<ResDataLists<T>>(listUrl, { ...config, path: undefined })
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
            ...state.lists,
            data: page === 1 ? list : state.lists.data.concat(list),
            hasNext,
            hasPrev,
            page: (page || 1) + 1,
            path,
            ...(options.matchKey ? { key: config.key } : {}),
        }
    }
}

/**
 * 拉取单条详情并写入 state.item。
 */
export async function fetchCrudItem<T extends ICrudEntity>(
    state: ICrudListState<T>,
    config: IApiConfig,
    itemUrl: string,
    $api: ApiType = capi,
): Promise<void> {
    const { code, data } = await $api.get<T>(itemUrl, { ...config, path: undefined })
    if (code === 200 && data) {
        state.item = {
            data,
            ...config,
        }
    }
}

/**
 * 更新列表与详情中的同一条记录。
 */
export function updateCrudItem<T extends ICrudEntity>(state: ICrudListState<T>, payload: T): void {
    state.item.data = payload
    const index = state.lists.data.findIndex(item => item._id === payload._id)
    if (index > -1) {
        state.lists.data.splice(index, 1, payload)
    }
}

/**
 * 设置软删除标记（删除/恢复）。
 */
export function setCrudDeleteFlag<T extends ICrudEntity>(
    state: ICrudListState<T>,
    id: string,
    isDelete: 0 | 1,
): void {
    const index = state.lists.data.findIndex(item => item._id === id)
    if (index > -1) {
        state.lists.data.splice(index, 1, {
            ...state.lists.data[index],
            is_delete: isDelete,
        })
    }
}

/**
 * 在列表头部插入新记录（若列表已有 path）。
 */
export function prependCrudItem<T extends ICrudEntity>(state: ICrudListState<T>, payload: T): void {
    if (state.lists.path) {
        state.lists.data = [payload].concat(state.lists.data)
    }
}
