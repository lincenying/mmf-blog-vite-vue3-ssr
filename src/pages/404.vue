<template>
    <div class="main wrap">
        <div class="main-left">
            <div class="card card-answer">
                <div class="answer-content">
                    <div class="flex py-40px justify-center">
                        <img src="/static/images/error_1.jpg" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="main-right"><aside-trending :trending="trending" /></div>
    </div>
</template>

<script setup lang="ts">
import type { AsyncDataConfig } from '@/types'

defineOptions({
    name: '404-page',
    asyncData(payload: AsyncDataConfig) {
        const { store, route, api } = payload
        const frontendArticleStore = useFrontendArticleStore(store)
        return frontendArticleStore.getTrending({ id: route.query.id }, api)
    },
})

const frontendArticleStore = useFrontendArticleStore()
const { trending } = $(storeToRefs(frontendArticleStore))

const headTitle = computed(() => {
    return 'Page Not Found - M.M.F 小屋'
})
useHead({
    // Can be static or computed
    title: headTitle,
    meta: [
        {
            name: 'description',
            content: headTitle,
        },
    ],
})
</script>
