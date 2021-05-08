import VueMarkdownEditor from '@kangc/v-md-editor'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import cookies from 'js-cookie'

import { createApp } from './main'
import api from './api/index-client'

import reloadPrompt from './components/reload-prompt.vue'

import 'virtual:windi.css'
import 'toastr/build/toastr.css'
import './assets/css/hljs/googlecode.css'
import './assets/css/github-markdown.css'
import './assets/scss/style.scss'

VueMarkdownEditor.use(vuepressTheme)

const { app, router, store } = createApp(true)

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
    app.component('reload-prompt', reloadPrompt)
    app.use(VueMarkdownEditor).mount('#app')
    console.log('client router ready')
})

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

store.$api = store.state.$api = api
store.commit('global/setCookies', {
    user: cookies.get('user'),
    userid: cookies.get('userid'),
    username: cookies.get('username'),
    useremail: cookies.get('useremail')
})
window.$$store = store
