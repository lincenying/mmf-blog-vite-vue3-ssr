import type { AxiosInstance } from 'axios'
import type { Pinia } from 'pinia'
import type { RouteLocationNormalized } from 'vue-router'

export interface AnyArray {
    [index: number]: any
}

export type Fn = (...args: any[]) => void

/**
 * 请求参数合集
 * ```
 * {
        all?: number
        by?: string | string[]
        from?: string
        id?: string | string[]
        limit?: number
        page?: number
        path?: string
        key?: string | string[]
    }
 * ```
 */
export interface ApiConfig {
    all?: number
    by?: string | string[]
    from?: string
    id?: string | string[]
    limit?: number
    page?: number
    path?: string
    key?: string | string[]
}

/**
 * 上传
 */
export interface Upload {
    filepath: string
}

/**
 * 文章详情
 */
export interface Article {
    _id: string
    title: string
    content: string
    html: string
    toc: string
    category: string
    category_name: string
    visit: number
    like: number
    comment_count: number
    creat_date: string
    update_date: string
    is_delete: number
    timestamp: number
    likes: [string]
    like_status?: boolean
}

/**
 * 分类
 */
export interface Category {
    _id: string
    cate_name: string
    cate_order: string
    cate_num?: number
    creat_date?: string
    update_date?: string
    is_delete?: number
    timestamp?: number
}

/**
 * 评论
 */
export interface Comment {
    _id: string
    article_id: string
    userid: Record<string, any>
    content: string
    creat_date: string
    is_delete: number
    timestamp: number
    email?: string
    username?: string
}

/**
 * 用户
 */
export interface User {
    _id: string
    username: string
    email: string
    password: string
    creat_date: string
    update_date: string
    is_delete: number
    timestamp: number
    wx_avatar?: string
    wx_signature?: string
    userid?: Record<string, any>
}

export interface ArticleItemConfig {
    data: Article
    path?: string
    [propName: string]: any
}

export interface ListConfig {
    hasNext?: number | boolean
    hasPrev?: number | boolean
    path?: string
    page: number
    [propName: string]: any
}

export interface AsyncDataConfig {
    store: Pinia
    route: RouteLocationNormalized
    api?: any
}

interface AdminStoreList extends ListConfig {
    data: User[]
}
export interface AdminStore {
    lists: AdminStoreList
    item: {
        data: Nullable<User>
        path?: string
        [propName: string]: any
    }
}

interface ArticleStoreList extends ListConfig {
    data: Article[]
}
export interface ArticleStore {
    lists: ArticleStoreList
    item: {
        data: Nullable<Article>
        path?: string
        [propName: string]: any
    }
}

export interface FArticleStore {
    lists: ArticleStoreList
    item: {
        data: Nullable<Article>
        path?: string
        isLoad?: boolean
        [propName: string]: any
    }
    trending: Article[]
}

interface UserStoreList extends ListConfig {
    data: User[]
}
export interface UserStore {
    lists: UserStoreList
    item: {
        data: Nullable<User>
        path?: string
        [propName: string]: any
    }
}

export interface CategoryStore {
    lists: Category[]
    item: {
        data: Nullable<Category>
    }
}

export interface CommentStoreList extends ListConfig {
    data: Comment[]
}
export interface CommentStore {
    lists: CommentStoreList
}

export interface UserCookies {
    user?: string
    userid?: string
    username?: string
    useremail?: string
    [propName: string]: any
}

export interface GlobalStore {
    loading: boolean
    cookies: UserCookies
    showLoginModal: boolean
    showRegisterModal: boolean
    ISDEV: boolean
    ISPRE: boolean
    ISPROD: boolean
}

export interface ShellStore {
    needPageTransition: boolean
    isPageSwitching: boolean
    pageTransitionName: string
    historyPageScrollTop: Record<string, number>
}

export interface ApiClientReturn {
    get<T>(url: string, params: Record<string, any>, headers?: Record<string, any>): Promise<ResponseData<T>>
    post<T>(url: string, data: Record<string, any>, headers?: Record<string, any>): Promise<ResponseData<T>>
    file<T>(url: string, data: Record<string, any>, headers?: Record<string, any>): Promise<ResponseData<T>>
}

export interface ApiServerReturn {
    post<T>(url: string, data: Record<string, any>, headers?: Record<string, any>): Promise<ResponseData<T>>
    get<T>(url: string, params: Record<string, any>, headers?: Record<string, any>): Promise<ResponseData<T>>
    cookies: UserCookies
    api: AxiosInstance
    getCookies: () => UserCookies
}
