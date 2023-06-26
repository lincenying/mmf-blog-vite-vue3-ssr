<template>
    <div class="wrap main">
        <div class="main-left">
            <div class="cards-wrap home-feeds">
                <router-view v-slot="{ Component }" class="app-view">
                    <Suspense>
                        <component :is="Component" :key="key" />
                    </Suspense>
                </router-view>
            </div>
        </div>
        <backend-menu v-if="!isLogin" />
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'BackendIndex',
})

const route = useRoute()

const key = computed(() => route.path.replace(/\//g, '_'))

const isLogin = computed(() => ['/backend/login', '/backend/login/'].includes(route.path))
</script>
