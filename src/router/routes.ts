import { guardRoute, guardRouteBackend } from './guards'

const NotFound = () => import('@/pages/404.vue')

const FrontendIndex = () => import('@/pages/frontend-index.vue')
const FrontendArticle = () => import('@/pages/frontend-article.vue')
const FrontendAbout = () => import('@/pages/frontend-about.vue')
const FrontendUser = () => import('@/pages/frontend-user.vue')
const FrontendAccount = () => import('@/pages/frontend-user-account.vue')
const FrontendPassword = () => import('@/pages/frontend-user-password.vue')

const BackendLogin = () => import('@/pages/backend-login.vue')
const BackendIndex = () => import('@/pages/backend-index.vue')
const BackendArticleList = () => import('@/pages/backend-article-list.vue')
const BackendArticleInsert = () => import('@/pages/backend-article-insert.vue')
const BackendArticleModify = () => import('@/pages/backend-article-modify.vue')
const BackendArticleComment = () => import('@/pages/backend-article-comment.vue')
const BackendCategoryList = () => import('@/pages/backend-category-list.vue')
const BackendCategoryInsert = () => import('@/pages/backend-category-insert.vue')
const BackendCategoryModify = () => import('@/pages/backend-category-modify.vue')
const BackendAdminList = () => import('@/pages/backend-admin-list.vue')
const BackendAdminModify = () => import('@/pages/backend-admin-modify.vue')
const BackendUserList = () => import('@/pages/backend-user-list.vue')
const BackendUserModify = () => import('@/pages/backend-user-modify.vue')

const backendConfig = {
    meta: { index: 1, path: '/backend' },
    beforeEnter: guardRouteBackend,
}

export const routes = [
    { path: '/index.html', redirect: '/' },
    { name: 'index', path: '/', component: FrontendIndex, meta: { index: 1 } },
    { name: 'trending', path: '/trending/:by', component: FrontendIndex, meta: { index: 1 } },
    { name: 'category', path: '/category/:id', component: FrontendIndex, meta: { index: 1 } },
    { name: 'search', path: '/search/:key', component: FrontendIndex, meta: { index: 1 } },
    { name: 'article', path: '/article/:id', component: FrontendArticle, meta: { index: 2 } },
    { name: 'about', path: '/about', component: FrontendAbout, meta: { index: 1 } },
    {
        name: 'account',
        path: '/user',
        component: FrontendUser,
        meta: { index: 1 },
        beforeEnter: guardRoute,
        children: [
            { path: 'account', component: FrontendAccount, meta: { path: '/user' } },
            { path: 'password', component: FrontendPassword, meta: { path: '/user' } },
        ],
    },

    {
        name: 'backend',
        path: '/backend',
        component: BackendIndex,
        redirect: '/backend/article/list',
        children: [
            { name: 'login', path: 'login', component: BackendLogin },
            { name: 'admin_list', path: 'admin/list', component: BackendAdminList, ...backendConfig },
            { name: 'admin_modify', path: 'admin/modify/:id', component: BackendAdminModify, ...backendConfig },
            { name: 'article_list', path: 'article/list', component: BackendArticleList, ...backendConfig },
            { name: 'article_insert', path: 'article/insert', component: BackendArticleInsert, ...backendConfig },
            { name: 'article_modify', path: 'article/modify/:id', component: BackendArticleModify, ...backendConfig },
            { name: 'article_comment', path: 'article/comment/:id', component: BackendArticleComment, ...backendConfig },
            { name: 'category_list', path: 'category/list', component: BackendCategoryList, ...backendConfig },
            { name: 'category_insert', path: 'category/insert', component: BackendCategoryInsert, ...backendConfig },
            { name: 'category_modify', path: 'category/modify/:id', component: BackendCategoryModify, ...backendConfig },
            { name: 'user_list', path: 'user/list', component: BackendUserList, ...backendConfig },
            { name: 'user_modify', path: 'user/modify/:id', component: BackendUserModify, ...backendConfig },
        ],
    },

    { name: '404', path: '/:catchAll(.*)', component: NotFound },
]
