import type { AxiosInstance } from 'axios'
import type { Pinia } from 'pinia'
import type { RouteLocationNormalized } from 'vue-router'

/**
 * 服务端回传参数
 * ```
 * {
 *    store: Pinia
  *   route: RouteLocationNormalized
 *    api: ApiServerReturn
 * }
 * ```
 */
export interface AsyncDataConfig {
    store: Pinia
    route: RouteLocationNormalized
    api: ApiServerReturn
}

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
 * 上传返回数据
 * ```
 * {
    filepath: string
}
 * ```
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
 * 分类详情
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
 * 评论详情
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
 * 用户详情
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
    userid?: Obj
}

export interface ArticleItemConfig {
    data: Article
    path?: string
    [propName: string]: any
}

/**
 * 通用分页列表型数据
 */
export interface ListConfig {
    hasNext?: number | boolean
    hasPrev?: number | boolean
    path?: string
    page: number
    [propName: string]: any
}

/**
 * 管理员列表
 */
interface AdminStoreList extends ListConfig {
    data: User[]
}

/**
 * 管理员 Pinia Store
 */
export interface AdminStore {
    lists: AdminStoreList
    item: {
        data: Nullable<User>
        path?: string
        [propName: string]: any
    }
}

/**
 * 文章列表
 */
interface ArticleStoreList extends ListConfig {
    data: Article[]
}

/**
 * 后台文章 Pinia Store
 */
export interface ArticleStore {
    lists: ArticleStoreList
    item: {
        data: Nullable<Article>
        path?: string
        [propName: string]: any
    }
}

/**
 * 前台文章 Pinia Store
 */
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

/**
 * 用户分页列表
 */
interface UserStoreList extends ListConfig {
    data: User[]
}

/**
 * 用户 Pinia Store
 */
export interface UserStore {
    lists: UserStoreList
    item: {
        data: Nullable<User>
        path?: string
        [propName: string]: any
    }
}

/**
 * 分类 Pinia Store
 */
export interface CategoryStore {
    lists: Category[]
    item: {
        data: Nullable<Category>
    }
}

/**
 * 评论分页列表
 */
export interface CommentStoreList extends ListConfig {
    data: Comment[]
}

/**
 * 评论 Pinia Store
 */
export interface CommentStore {
    lists: CommentStoreList
}

/**
 * 用户 cookies
 */
export interface UserCookies {
    user?: string
    userid?: string
    username?: string
    useremail?: string
    [propName: string]: any
}

/**
 * 通用数据 Pinia Store
 */
export interface GlobalStore {
    loading: boolean
    cookies: UserCookies
    showLoginModal: boolean
    showRegisterModal: boolean
    ISDEV: boolean
    ISPRE: boolean
    ISPROD: boolean
}

/**
 * Sheel Pinia Store
 */
export interface ShellStore {
    needPageTransition: boolean
    isPageSwitching: boolean
    pageTransitionName: string
    historyPageScrollTop: ObjT<number>
}

/**
 * Api 浏览器端封装类型
 */
export interface ApiClientReturn {
    get<T>(url: string, params: Obj, headers?: Obj): Promise<ResponseData<T>>
    post<T>(url: string, data: Obj, headers?: Obj): Promise<ResponseData<T>>
    file<T>(url: string, data: Obj, headers?: Obj): Promise<ResponseData<T>>
}

/**
 * Api Node端封装类型
 */
export interface ApiServerReturn {
    post<T>(url: string, data: Obj, headers?: Obj): Promise<ResponseData<T>>
    get<T>(url: string, params: Obj, headers?: Obj): Promise<ResponseData<T>>
    cookies: UserCookies
    api: AxiosInstance
    getCookies: () => UserCookies
}
