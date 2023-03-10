<template>
    <div :class="backend ? 'backend' : 'frontend'">
        <global-navigation :is-backend="backend"></global-navigation>
        <router-view v-slot="{ Component }" class="app-view relative">
            <transition :name="pageTransitionName" @before-enter="handleBeforeEnter" @after-enter="handleAfterEnter" mode="out-in">
                <keep-alive :include="cacheFrontendComponents" :key="key">
                    <Suspense>
                        <component :is="Component" :key="key" />
                    </Suspense>
                </keep-alive>
            </transition>
        </router-view>
        <sign-up :show="showRegisterModal"></sign-up>
        <sign-in :show="showLoginModal"></sign-in>
        <back-top></back-top>
        <client-only>
            <reload-prompt></reload-prompt>
        </client-only>
    </div>
</template>

<script setup>
import 'uno.css'
import 'toastr/build/toastr.css'
import './assets/css/hljs/googlecode.css'
import './assets/css/github-markdown.css'
import './assets/scss/style.scss'

defineOptions({
    name: 'app-root'
})

// eslint-disable-next-line no-unused-vars
const { ctx, options, route, router, globalStore, useLockFn } = useGlobal('app-root')

// pinia 状态管理 ===>
const { showRegisterModal, showLoginModal } = $(storeToRefs(globalStore))

const appShellStore = useAppShellStore()
const { pageTransitionName } = $(storeToRefs(appShellStore))

// const isSSR = ref(!!import.meta.env.SSR)
// const isPROD = ref(!!import.meta.env.PROD)

const cacheFrontendComponents = $ref('frontend-index,frontend-about')
// const cacheBackendComponents = ref('backend-admin-list,backend-article-list,backend-user-list')

const key = $computed(() => {
    return (route.meta.path || route.path).replace(/\//g, '_')
})
const backend = $computed(() => {
    return route.path.indexOf('backend') >= 0
})
const handleBeforeEnter = () => {
    appShellStore.setPageSwitching(true)
}
const handleAfterEnter = () => {
    appShellStore.setPageSwitching(false)
}
// eslint-disable-next-line no-unused-vars
const handleClickHeaderBack = () => {
    router.go(-1)
}
</script>
