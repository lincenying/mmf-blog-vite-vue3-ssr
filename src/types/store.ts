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
}

export interface ICommentStoreList extends IListConfig {
    data: IComment[]
}

export interface ICommentStore {
    lists: ICommentStoreList
}

export interface IUserCookies {
    user?: string
    userid?: string
    username?: string
    useremail?: string
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
