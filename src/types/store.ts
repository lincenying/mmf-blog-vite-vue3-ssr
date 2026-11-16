import type { IArticle, ICategory, IComment, IUser } from './domain'

export interface IArticleItemConfig {
    data: IArticle
    path?: string
    [propName: string]: unknown
}

/**
 * 通用分页列表型数据
 */
export interface IListConfig {
    hasNext?: number | boolean
    hasPrev?: number | boolean
    path?: string
    page: number
    [propName: string]: unknown
}

export interface IListStore<T> {
    hasNext?: number | boolean
    hasPrev?: number | boolean
    path?: string
    page: number
    data: T
    [propName: string]: unknown
}

interface IAdminStoreList extends IListConfig {
    data: IUser[]
}

export interface IAdminStore {
    lists: IAdminStoreList
    item: {
        data: Nullable<IUser>
        path?: string
        [propName: string]: unknown
    }
}

interface IArticleStoreList extends IListConfig {
    data: IArticle[]
}

export interface IArticleStore {
    lists: IArticleStoreList
    item: {
        data: Nullable<IArticle>
        path?: string
        [propName: string]: unknown
    }
}

export interface IFArticleStore {
    lists: IArticleStoreList
    item: {
        data: Nullable<IArticle>
        path?: string
        isLoad?: boolean
        [propName: string]: unknown
    }
    trending: IArticle[]
    /** 当前热门数据对应的文章 id，空字符串表示不按文章过滤 */
    trendingId: string
    /** 当前 trendingId 是否已经请求过，空列表也算已加载 */
    trendingLoaded: boolean
}

interface IUserStoreList extends IListConfig {
    data: IUser[]
}

export interface IUserStore {
    lists: IUserStoreList
    item: {
        data: Nullable<IUser>
        path?: string
        [propName: string]: unknown
    }
}

export interface ICategoryStore {
    lists: ICategory[]
    item: {
        data: Nullable<ICategory>
    }
    /** 最近一次拉到列表时的 limit 与 page */
    loadedKey: string
}

export interface ICommentStoreList extends IListConfig {
    data: IComment[]
}

export interface ICommentStore {
    lists: ICommentStoreList
}

export interface IUserCookies {
    /** 登录态标记（store 中仅为 '1'，真实 token 不进 Pinia） */
    user?: string
    userid?: string
    username?: string
    useremail?: string
    /** 后台登录态标记（store 中仅为 '1'，真实 token 不进 Pinia） */
    b_user?: string
    [propName: string]: string | number | boolean | undefined
}

export interface IGlobalStore {
    loading: boolean
    cookies: IUserCookies
    showLoginModal: boolean
    showRegisterModal: boolean
    ISDEV: boolean
    ISPRE: boolean
    ISPROD: boolean
}

export interface IShellStore {
    needPageTransition: boolean
    isPageSwitching: boolean
    pageTransitionName: string
    historyPageScrollTop: Objable<number>
}
