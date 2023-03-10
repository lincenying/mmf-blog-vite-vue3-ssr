<template>
    <div class="main wrap">
        <div class="main-left">
            <div class="card card-answer">
                <div class="answer-content">
                    <div class="flex py-40px justify-center">
                        <img src="/static/images/error_1.jpg" alt="" />
                    </div>
                </div>
            </div>
        </div>
        <div class="main-right"><aside-trending :trending="trending"></aside-trending></div>
    </div>
</template>
<script setup>
defineOptions({
    name: '404-page',
    asyncData({ store, route, api }) {
        const frontendArticleStore = useFrontendArticleStore(store)
        return frontendArticleStore.getTrending({ id: route.query.id }, api)
    }
})

// eslint-disable-next-line no-unused-vars
const { ctx, options, route, router, globalStore, appShellStore, useLockFn } = useGlobal('404-page')

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
            name: `description`,
            content: headTitle
        }
    ]
})
</script>
