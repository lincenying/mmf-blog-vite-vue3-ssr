/**
 * @file store index
 * @author lincenying(lincenying@qq.com)
 */

import { createStore as _createStore } from 'vuex'

import { createAppShellState } from './modules/app-shell'
import backendAdmin from './modules/backend-admin'
import backendArticle from './modules/backend-article'
import backendUser from './modules/backend-user'
import frontendArticle from './modules/frontend-article'
import global from './modules/global'
import globalCategory from './modules/global-category'
import globalComment from './modules/global-comment'

export function createStore() {
    return _createStore({
        modules: {
            appShell: createAppShellState(),
            backend: {
                namespaced: true,
                modules: {
                    admin: backendAdmin,
                    article: backendArticle,
                    user: backendUser
                }
            },
            frontend: {
                namespaced: true,
                modules: {
                    article: frontendArticle
                }
            },
            global: {
                namespaced: true,
                ...global,
                modules: {
                    category: globalCategory,
                    comment: globalComment
                }
            }
        }
    })
}
