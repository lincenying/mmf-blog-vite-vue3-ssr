<template>
    <frontend-main-layout>
        <div class="cards-wrap home-feeds">
            <router-view v-slot="{ Component }">
                <Suspense>
                    <component :is="Component" :key="key" />
                </Suspense>
            </router-view>
        </div>
        <template #aside>
            <aside-account />
        </template>
    </frontend-main-layout>
</template>

<script setup lang="ts">
import '@/assets/styles/style/backend-settings.scss'

defineOptions({
    name: 'FrontendUser',
})

const route = useRoute()

const key = computed(() => route.path.replace(/\//g, '_'))
</script>
