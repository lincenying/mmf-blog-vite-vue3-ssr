/* eslint-disable no-inline-comments */
/**
 * @file router
 * @author lincenying(lincenying@qq.com)
 */

import cookies from 'js-cookie'
import { createMemoryHistory, createRouter as _createRouter, createWebHistory } from 'vue-router'
import { inBrowser } from '@/utils'

// 定义切割点，异步加载路由组件
const notFound = () => import('./pages/404.vue')

const index = () => import('./pages/frontend-index.vue')
const article = () => import('./pages/frontend-article.vue')
const about = () => import('./pages/frontend-about.vue')
const user = () => import('./pages/frontend-user.vue')
const account = () => import('./pages/frontend-user-account.vue')
const password = () => import('./pages/frontend-user-password.vue')

const login = () => import('./pages/backend-login.vue')
const backend = () => import('./pages/backend-index.vue')
const articleList = () => import('./pages/backend-article-list.vue')
const articleInsert = () => import('./pages/backend-article-insert.vue')
const articleModify = () => import('./pages/backend-article-modify.vue')
const articleComment = () => import('./pages/backend-article-comment.vue')
const categoryList = () => import('./pages/backend-category-list.vue')
const categoryInsert = () => import('./pages/backend-category-insert.vue')
const categoryModify = () => import('./pages/backend-category-modify.vue')
const adminList = () => import('./pages/backend-admin-list.vue')
const adminModify = () => import('./pages/backend-admin-modify.vue')
const userList = () => import('./pages/backend-user-list.vue')
const userModify = () => import('./pages/backend-user-modify.vue')

const guardRoute = (to, from, next) => {
    var token = cookies.get('user')
    if (inBrowser && !token) {
        next('/')
    } else {
        next()
    }
}

// eslint-disable-next-line no-unused-vars
const guardRouteBackend = (to, from, next) => {
    const token = cookies.get('b_user')
    if (inBrowser && !token) {
        next('/backend-login')
    } else {
        next()
    }
}

const scrollBehavior = (/*to*/) => {
    const position = {}
    // if (to.hash) {
    //     position.selector = to.hash
    // }
    // if (to.matched.some(mm => mm.meta.scrollToTop)) {
    //     position.x = 0
    //     position.y = 0
    // }
    position.x = 0
    position.y = 0
    return position
}

const backendConfig = {
    meta: { index: 1, path: '/backend' },
    beforeEnter: guardRouteBackend
}

const routes = [
    { name: 'index', path: '/', component: index, meta: { index: 1 } },
    { name: 'trending', path: '/trending/:by', component: index, meta: { index: 1 } },
    { name: 'category', path: '/category/:id', component: index, meta: { index: 1 } },
    { name: 'search', path: '/search/:key', component: index, meta: { index: 1 } },
    { name: 'article', path: '/article/:id', component: article, meta: { index: 2 } },
    { name: 'about', path: '/about', component: about, meta: { index: 1 } },
    {
        name: 'account',
        path: '/user',
        component: user,
        meta: { index: 1 },
        beforeEnter: guardRoute,
        children: [
            {
                path: 'account',
                component: account,
                meta: { path: '/user' }
            },
            {
                path: 'password',
                component: password,
                meta: { path: '/user' }
            }
        ]
    },

    { name: 'login', path: '/backend-login', component: login },
    {
        name: 'backend',
        path: '/backend',
        component: backend,
        children: [
            { name: 'admin_list', path: 'admin/list', component: adminList, ...backendConfig },
            { name: 'admin_modify', path: 'admin/modify/:id', component: adminModify, ...backendConfig },
            { name: 'article_list', path: 'article/list', component: articleList, ...backendConfig },
            { name: 'article_insert', path: 'article/insert', component: articleInsert, ...backendConfig },
            { name: 'article_modify', path: 'article/modify/:id', component: articleModify, ...backendConfig },
            { name: 'article_comment', path: 'article/comment/:id', component: articleComment, ...backendConfig },
            { name: 'category_list', path: 'category/list', component: categoryList, ...backendConfig },
            { name: 'category_insert', path: 'category/insert', component: categoryInsert, ...backendConfig },
            { name: 'category_modify', path: 'category/modify/:id', component: categoryModify, ...backendConfig },
            { name: 'user_list', path: 'user/list', component: userList, ...backendConfig },
            { name: 'user_modify', path: 'user/modify/:id', component: userModify, ...backendConfig }
        ]
    },

    { name: '404', path: '/:catchAll(.*)', component: notFound }
]

export function createRouter(store) {
    const router = _createRouter({
        // use appropriate history implementation for server/client
        // import.meta.env.SSR is injected by Vite.
        history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
        scrollBehavior,
        routes
    })

    const slideLeft = 'slide-left'
    const slideRight = 'slide-right'

    router.beforeEach((to, from, next) => {
        if (store) {
            // 如果不需要切换动画，直接返回
            if (store.state.appShell.needPageTransition) {
                // 根据 alwaysBackPage, alwaysForwardPage 来判断切换动画
                // 判断当前是前进还是后退，添加不同的动画效果
                // const pageTransitionName = isForward(to, from) ? slideLeft : slideRight
                // =================== //
                // 根据路由中的 meta.index 来判断切换动画
                let pageTransitionName
                if (!from.meta.index || to.meta.index === from.meta.index) {
                    pageTransitionName = 'fade'
                } else if (to.meta.index > from.meta.index) {
                    pageTransitionName = slideLeft
                } else {
                    pageTransitionName = slideRight
                }
                store.commit(`appShell/setPageTransitionName`, { pageTransitionName })
            }
        }
        next()
    })

    return router
}
