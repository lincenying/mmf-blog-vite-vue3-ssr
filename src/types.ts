import type { Pinia } from 'pinia'
import type { RouteLocationNormalized } from 'vue-router'

export interface anyObject {
    [propName: string]: any
}

export interface anyArray {
    [index: number]: any
}

// eslint-disable-next-line no-unused-vars
export type Fn = (...args: any[]) => void

export interface ApiConfig {
    page?: number
    path?: string
    from?: string
    key?: string | string[]
    by?: string | string[]
    limit?: number
    all?: number
    id?: string | string[]
}

export interface AdminUser {
    _id: string
    username: string
    email: string
    password: string
    creat_date: string
    update_date: string
    is_delete: number
    timestamp: number
}

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

export interface Category {
    _id: string
    cate_name: string
    cate_order: string
    cate_num: number
    creat_date: string
    update_date: string
    is_delete: number
    timestamp: number
}

export interface Comment {
    _id: string
    article_id: string
    userid: anyObject
    content: string
    creat_date: string
    is_delete: number
    timestamp: number
}

export interface User {
    _id: string
    username: string
    email: string
    password: string
    creat_date: string
    update_date: string
    is_delete: number
    timestamp: number
    wx_avatar: string
    wx_signature: string
    userid?: anyObject
}

export interface itemConfig {
    data: anyObject
    path?: string
    [propName: string]: any
}
export interface ArticleItemConfig {
    data: Article
    path?: string
    [propName: string]: any
}

export interface listConfig {
    hasNext?: number
    hasPrev?: number
    path?: string
    page: number
    data: any[]
    [propName: string]: any
}

export interface asyncDataConfig {
    store: Pinia
    route: RouteLocationNormalized
    api?: any
}
