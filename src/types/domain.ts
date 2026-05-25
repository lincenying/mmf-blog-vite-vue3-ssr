/**
 * 文章详情
 */
export interface IArticle {
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
    likes: string[]
    like_status?: boolean
}

/** @deprecated 使用 IArticle */
export type Article = IArticle

/**
 * 分类详情
 */
export interface ICategory {
    _id: string
    cate_name: string
    cate_order: string
    cate_num?: number
    creat_date?: string
    update_date?: string
    is_delete?: number
    timestamp?: number
}

/** @deprecated 使用 ICategory */
export type Category = ICategory

/**
 * 评论详情
 */
export interface IComment {
    _id: string
    article_id: string
    userid: IUser
    content: string
    creat_date: string
    is_delete: number
    timestamp: number
    email?: string
    username?: string
}

/** @deprecated 使用 IComment */
export type Comment = IComment

/**
 * 用户详情
 */
export interface IUser {
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
    userid?: Objable
}

/** @deprecated 使用 IUser */
export type User = IUser
