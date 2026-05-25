import type { IArticle, ICategory, IComment, IUser } from './domain'

export interface IArticleItemConfig {
    data: IArticle
    path?: string
    [propName: string]: unknown
}

/** @deprecated 使用 IArticleItemConfig */
export type ArticleItemConfig = IArticleItemConfig

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

/** @deprecated 使用 IListConfig */
export type ListConfig = IListConfig

export interface IListStore<T> {
    hasNext?: number | boolean
    hasPrev?: number | boolean
    path?: string
    page: number
    data: T
    [propName: string]: unknown
}

/** @deprecated 使用 IListStore */
export type ListStore<T> = IListStore<T>

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

/** @deprecated 使用 IAdminStore */
export type AdminStore = IAdminStore

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

/** @deprecated 使用 IArticleStore */
export type ArticleStore = IArticleStore

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

/** @deprecated 使用 IFArticleStore */
export type FArticleStore = IFArticleStore

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

/** @deprecated 使用 IUserStore */
export type UserStore = IUserStore

export interface ICategoryStore {
    lists: ICategory[]
    item: {
        data: Nullable<ICategory>
    }
}

/** @deprecated 使用 ICategoryStore */
export type CategoryStore = ICategoryStore

export interface ICommentStoreList extends IListConfig {
    data: IComment[]
}

/** @deprecated 使用 ICommentStoreList */
export type CommentStoreList = ICommentStoreList

export interface ICommentStore {
    lists: ICommentStoreList
}

/** @deprecated 使用 ICommentStore */
export type CommentStore = ICommentStore

export interface IUserCookies {
    user?: string
    userid?: string
    username?: string
    useremail?: string
    [propName: string]: string | number | boolean | undefined
}

/** @deprecated 使用 IUserCookies */
export type UserCookies = IUserCookies

export interface IGlobalStore {
    loading: boolean
    cookies: IUserCookies
    showLoginModal: boolean
    showRegisterModal: boolean
    ISDEV: boolean
    ISPRE: boolean
    ISPROD: boolean
}

/** @deprecated 使用 IGlobalStore */
export type GlobalStore = IGlobalStore

export interface IShellStore {
    needPageTransition: boolean
    isPageSwitching: boolean
    pageTransitionName: string
    historyPageScrollTop: Objable<number>
}

/** @deprecated 使用 IShellStore */
export type ShellStore = IShellStore
