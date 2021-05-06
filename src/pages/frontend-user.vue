<template>
    <div class="main wrap">
        <div class="main-left">
            <router-view v-slot="{ Component }">
                <Suspense>
                    <component :is="Component" :key="key" />
                </Suspense>
            </router-view>
        </div>
        <div class="main-right"><account></account></div>
    </div>
</template>

<script>
import { computed } from 'vue'

import useGlobal from '@/mixins/global'

import account from '../components/aside-account.vue'

export default {
    name: 'frontend-user',
    components: {
        account
    },
    setup() {
        // eslint-disable-next-line no-unused-vars
        const { ctx, options, route, router, store, useToggle, useHead, useLockFn, ref, reactive } = useGlobal()

        const key = computed(() => {
            return route.path.replace(/\//g, '_')
        })

        return {
            key
        }
    }
}
</script>
