<template>
    <div :class="backend ? 'backend' : 'frontend'">
        <global-navigation :is-backend="backend"></global-navigation>
        <router-view v-slot="{ Component }" class="app-view relative">
            <transition :name="pageTransitionName" mode="out-in" @before-enter="handleBeforeEnter" @after-enter="handleAfterEnter">
                <keep-alive :key="key" :include="cacheFrontendComponents">
                    <Suspense>
                        <component :is="Component" :key="key" />
                    </Suspense>
                </keep-alive>
            </transition>
        </router-view>
        <sign-in :show="showLoginModal"></sign-in>
        <sign-up :show="showRegisterModal"></sign-up>
        <back-top></back-top>
        <client-only>
            <bg-plum></bg-plum>
            <reload-prompt></reload-prompt>
        </client-only>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'app-root'
})

// eslint-disable-next-line no-unused-vars
const { route, globalStore } = useGlobal()

// pinia 状态管理 ===>
const { showLoginModal, showRegisterModal } = storeToRefs(globalStore)

const appShellStore = useAppShellStore()
const { pageTransitionName } = storeToRefs(appShellStore)

// const isSSR = ref(!!import.meta.env.SSR)
// const isPROD = ref(!!import.meta.env.PROD)

const cacheFrontendComponents = $ref('frontend-index,frontend-about')
// const cacheBackendComponents = ref('backend-admin-list,backend-article-list,backend-user-list')

const key = $computed(() => {
    const path = (route.meta.path as string) || route.path
    return path.replace(/\//g, '_')
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
</script>
