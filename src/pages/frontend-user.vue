<template>
    <frontend-main-layout>
        <router-view v-slot="{ Component }">
            <Suspense>
                <component :is="Component" :key="key" />
            </Suspense>
        </router-view>
        <template #aside>
            <aside-account />
        </template>
    </frontend-main-layout>
</template>

<script setup lang="ts">
defineOptions({
    name: 'FrontendUser',
})

const route = useRoute()

const key = computed(() => route.path.replace(/\//g, '_'))
</script>
