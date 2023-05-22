<template>
    <div :class="backend ? 'backend' : 'frontend'">
        <global-navigation :is-backend="backend" />
        <router-view v-slot="{ Component }" class="app-view relative">
            <transition :name="pageTransitionName" mode="out-in" @before-enter="handleBeforeEnter" @after-enter="handleAfterEnter">
                <keep-alive :key="key" :include="cacheFrontendComponents">
                    <Suspense>
                        <component :is="Component" :key="key" />
                    </Suspense>
                </keep-alive>
            </transition>
        </router-view>
        <sign-in :show="showLoginModal" />
        <sign-up :show="showRegisterModal" />
        <back-top />
        <client-only>
            <bg-plum />
            <reload-prompt />
        </client-only>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'AppRoot',
})

// pinia 状态管理 ===>
const globalStore = useGlobalStore()
const { showLoginModal, showRegisterModal } = toRefs(globalStore)

const appShellStore = useAppShellStore()
const { pageTransitionName } = storeToRefs(appShellStore)

// const isSSR = ref(!!import.meta.env.SSR)
// const isPROD = ref(!!import.meta.env.PROD)

const cacheFrontendComponents = $ref('frontend-index,frontend-about')
// const cacheBackendComponents = ref('backend-admin-list,backend-article-list,backend-user-list')

const route = useRoute()
const key = $computed(() => {
    const path = (route.meta.path as string) || route.path
    return path.replace(/\//g, '_')
})
const backend = $computed(() => {
    return route.path.includes('backend')
})

function handleBeforeEnter() {
    appShellStore.setPageSwitching(true)
}

function handleAfterEnter() {
    appShellStore.setPageSwitching(false)
}
</script>
