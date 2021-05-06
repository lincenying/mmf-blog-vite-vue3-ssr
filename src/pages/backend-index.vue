<template>
    <div class="main wrap">
        <div class="main-left">
            <div class="home-feeds cards-wrap">
                <router-view v-slot="{ Component }" class="app-view">
                    <Suspense>
                        <component :is="Component" :key="key" />
                    </Suspense>
                </router-view>
            </div>
        </div>
        <backend-menu v-if="!isLogin"></backend-menu>
    </div>
</template>

<script>
import { computed } from 'vue'

import useGlobal from '@/mixins/global'

import backendMenu from '../components/backend-menu.vue'
import account from '../components/aside-account.vue'

export default {
    name: 'backend-index',
    components: {
        backendMenu,
        account
    },
    setup() {
        // eslint-disable-next-line no-unused-vars
        const { ctx, options, route, router, store, useToggle, useHead, useLockFn, ref, reactive } = useGlobal()

        const key = computed(() => {
            return route.path.replace(/\//g, '_')
        })

        const isLogin = computed(() => {
            return ['/backend-login', '/backend-login/'].includes(route.path)
        })

        return {
            key,
            isLogin
        }
    }
}
</script>
