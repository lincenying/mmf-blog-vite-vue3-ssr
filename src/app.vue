<template>
    <div :class="backend ? 'backend' : 'frontend'">
        <Navigation :backend="backend"></Navigation>
        <router-view v-slot="{ Component }" class="app-view relative">
            <transition :name="appShell.pageTransitionName" @before-enter="handleBeforeEnter" @after-enter="handleAfterEnter" mode="out-in">
                <keep-alive :include="cacheFronentComponents">
                    <Suspense>
                        <component :is="Component" :key="key" />
                    </Suspense>
                </keep-alive>
            </transition>
        </router-view>
        <sign-up :show="global.showRegisterModal"></sign-up>
        <sign-in :show="global.showLoginModal"></sign-in>
        <back-top></back-top>
        <client-only>
            <reload-prompt></reload-prompt>
        </client-only>
    </div>
</template>

<script>
import { computed } from 'vue'

import useGlobal from '@/mixins/global'

import Navigation from './components/navigation.vue'
import signUp from './components/signup.vue'
import signIn from './components/signin.vue'
import backTop from './components/backtop.vue'
// import reloadPrompt from './components/reload-prompt.vue'

export default {
    name: 'app',
    components: {
        Navigation,
        signUp,
        signIn,
        backTop
        // reloadPrompt
    },
    setup() {
        // eslint-disable-next-line no-unused-vars
        const { ctx, options, route, router, store, useToggle, useHead, useLockFn, ref, reactive } = useGlobal()

        const isSSR = ref(!!import.meta.env.SSR)
        const isPROD = ref(!!import.meta.env.PROD)

        const cacheFronentComponents = ref('frontend-index,frontend-about')
        const cacheBackendComponents = ref('backend-admin-list,backend-article-list,backend-user-list')

        const global = computed(() => {
            return store.getters['global/get']
        })
        const appShell = computed(() => {
            return store.getters['appShell/get']
        })
        const key = computed(() => {
            return (route.meta.path || route.path).replace(/\//g, '_')
        })
        const backend = computed(() => {
            return route.path.indexOf('backend') >= 0
        })
        const handleBeforeEnter = () => {
            store.dispatch('appShell/setPageSwitching', true)
        }
        const handleAfterEnter = () => {
            store.dispatch('appShell/setPageSwitching', false)
        }
        const handleClickHeaderBack = () => {
            router.go(-1)
        }

        return {
            isSSR,
            isPROD,
            cacheFronentComponents,
            cacheBackendComponents,
            global,
            appShell,
            key,
            backend,
            handleBeforeEnter,
            handleAfterEnter,
            handleClickHeaderBack
        }
    }
}
</script>
