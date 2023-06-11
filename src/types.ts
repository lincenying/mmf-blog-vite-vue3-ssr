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
    /**
     * 文章标题
     */
    title: string
    /**
     * 文章内容: markdown
     */
    content: string
    /**
     * 文章内容: html
     */
    html: string
    /**
     * 文章导航
     */
    toc: string
    /**
     * 分类ID
     */
    category: string
    /**
     * 分类名称
     */
    category_name: string
    /**
     * 访问数
     */
    visit: number
    /**
     * 点赞数
     */
    like: number
    /**
     * 评论数
     */
    comment_count: number
    /**
     * 发布时间
     */
    creat_date: string
    /**
     * 编辑时间
     */
    update_date: string
    /**
     * 是否删除: 0: 正常 | 1: 删除
     */
    is_delete: number
    /**
     * 发布时间戳
     */
    timestamp: number
    /**
     * 点赞用户ID列表
     */
    likes: [string]
    /**
     * 登录用户是否已点赞
     */
    like_status?: boolean
}

/**
 * 分类详情
 */
export interface Category {
    _id: string
    /**
     * 分类名称
     */
    cate_name: string
    /**
     * 分类排序
     */
    cate_order: string
    /**
     * 分类中文章数量
     */
    cate_num?: number
    /**
     * 创建时间
     */
    creat_date?: string
    /**
     * 编辑时间
     */
    update_date?: string
    /**
     * 是否删除: 0: 正常 | 1: 已删除
     */
    is_delete?: number
    /**
     * 发布时间戳
     */
    timestamp?: number
}

/**
 * 评论详情
 */
export interface Comment {
    _id: string
    /**
     * 评论所属文章ID
     */
    article_id: string
    /**
     * 发布评论的用户
     */
    userid: Record<string, any>
    /**
     * 评论内容
     */
    content: string
    /**
     * 创建时间
     */
    creat_date: string
    /**
     * 是否删除: 0: 正常 | 1: 已删除
     */
    is_delete: number
    /**
     * 发布时间戳
     */
    timestamp: number
    /**
     * 用户邮箱
     */
    email?: string
    /**
     * 用户名
     */
    username?: string
}

/**
 * 用户详情
 */
export interface User {
    _id: string
    /**
     * 用户名
     */
    username: string
    /**
     * 邮箱
     */
    email: string
    /**
     * 密码
     */
    password: string
    /**
     * 创建时间
     */
    creat_date: string
    /**
     * 编辑时间
     */
    update_date: string
    /**
     * 是否删除: 0: 正常 | 1: 已删除
     */
    is_delete: number
    /**
     * 发布时间戳
     */
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
export interface ListStore<T> {
    hasNext?: number | boolean
    hasPrev?: number | boolean
    path?: string
    page: number
    data: T
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
    /**
     * 显式登录弹窗
     */
    showLoginModal: boolean
    /**
     * 显式注册弹窗
     */
    showRegisterModal: boolean
    /**
     * 是否开发环境
     */
    ISDEV: boolean
    /**
     * 是否预发布环境
     */
    ISPRE: boolean
    /**
     * 是否生产环境
     */
    ISPROD: boolean
}

/**
 * Sheel Pinia Store
 */
export interface ShellStore {
    /**
     * 是否需要页面切换动画
     */
    needPageTransition: boolean
    /**
     * 多个页面是否处于切换中
     */
    isPageSwitching: boolean
    /**
     * 多个页面切换效果名称
     */
    pageTransitionName: string
    /**
     * 上个页面 scroll 的信息
     */
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
