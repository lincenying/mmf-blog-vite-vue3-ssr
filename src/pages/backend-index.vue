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
        <backend-menu v-if="!isLogin" />
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'backend-index',
})

const { route } = useGlobal()

const key = computed(() => {
    return route.path.replace(/\//g, '_')
})

const isLogin = computed(() => {
    return ['/backend/login', '/backend/login/'].includes(route.path)
})
</script>
