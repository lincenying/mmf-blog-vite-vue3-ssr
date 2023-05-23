<template>
    <div class="main wrap">
        <div class="main-left">
            <router-view v-slot="{ Component }">
                <Suspense>
                    <component :is="Component" :key="key" />
                </Suspense>
            </router-view>
        </div>
        <div class="main-right"><aside-account /></div>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'FrontendUser',
})

const route = useRoute()

const key = computed(() => {
    return route.path.replace(/\//g, '_')
})
</script>
