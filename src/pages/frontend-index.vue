<template>
    <div class="main wrap">
        <div class="main-left">
            <div class="home-feeds cards-wrap">
                <!-- <topics-item-none v-if="!topics.path">加载中, 请稍等...</topics-item-none> -->
                <div v-if="!topics.path" class="card card-content-loader">
                    <ContentLoader :height="160" :width="660" :speed="2" primary-color="#f3f3f3" secondary-color="#ecebeb">
                        <rect x="70" y="15" rx="4" ry="4" width="117" height="6.4" /> <rect x="70" y="35" rx="3" ry="3" width="85" height="6.4" />
                        <rect x="0" y="80" rx="3" ry="3" width="550" height="6.4" /> <rect x="0" y="100" rx="3" ry="3" width="620" height="6.4" />
                        <rect x="0" y="120" rx="3" ry="3" width="401" height="6.4" /> <rect x="0" y="140" rx="3" ry="3" width="501" height="6.4" />
                        <circle cx="30" cy="30" r="30" />
                    </ContentLoader>
                </div>
                <template v-else-if="topics.data.length > 0">
                    <topics-item v-for="item in topics.data" :key="item._id" :item="item" />
                    <div class="load-more-wrap">
                        <a v-if="topics.hasNext" href="javascript:;" class="load-more" :class="loading ? 'loading' : ''" @click="loadMore()">
                            {{ loading ? '加载中' : '更多' }} <i class="icon icon-circle-loading" />
                        </a>
                    </div>
                </template>
                <topics-item-none v-else>当前分类还没有文章...</topics-item-none>
            </div>
        </div>
        <div class="main-right">
            <aside-category :category="category" />
            <aside-trending :trending="trending" />
            <aside-other />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ContentLoader } from 'vue-content-loader'
import type { AsyncDataConfig } from '@/types'

defineOptions({
    name: 'frontend-index',
    asyncData(payload: AsyncDataConfig) {
        const { store, route, api } = payload
        const {
            params: { id, key, by },
            path,
        } = route
        const globalCategoryStore = useGlobalCategoryStore(store)
        const frontendArticleStore = useFrontendArticleStore(store)
        return Promise.all([
            globalCategoryStore.getCategoryList({}, api),
            frontendArticleStore.getTrending({}, api),
            frontendArticleStore.getArticleList({ page: 1, limit: 10, id, path, key, by }, api),
        ])
    },
})

const { route } = useGlobal()

// pinia 状态管理 ===>
const globalCategoryStore = useGlobalCategoryStore()
const { lists: category } = $(storeToRefs(globalCategoryStore))

const frontendArticleStore = useFrontendArticleStore()
const { lists: topics, trending } = $(storeToRefs(frontendArticleStore))

useSaveScroll()

const {
    params: { id, key, by },
    path,
} = route

const [loading, toggleLoading] = useToggle(false)
async function loadMore(page = topics.page + 1) {
    if (loading.value)
        return
    toggleLoading(true)
    await frontendArticleStore.getArticleList({ page, limit: 10, id, path, key, by })
    toggleLoading(false)
}

onActivated(() => {
    console.log(`frontend-index onActivated:${route.path}`)
    if (topics.path !== route.path)
        loadMore(1)
})

// onMounted(() => {
//     loadMore(1)
// })

const headTitle = computed(() => {
    let title = 'M.M.F 小屋'
    const { id, key, by } = route.params
    if (id) {
        const obj = category.find(item => item._id === id)
        if (obj)
            title = `${obj.cate_name} - ${title}`
    }
    else if (key) {
        title = `搜索: ${key} - ${title}`
    }
    else if (by) {
        title = `热门 - ${title}`
    }
    return title
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
