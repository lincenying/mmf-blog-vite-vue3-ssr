<template>
    <div class="main wrap">
        <div class="main-left">
            <div v-if="!isLoad" class="card card-content-loader">
                <content-loader :height="160" :width="660" :speed="2" primary-color="#f3f3f3" secondary-color="#ecebeb">
                    <rect x="70" y="15" rx="4" ry="4" width="117" height="6.4" /> <rect x="70" y="35" rx="3" ry="3" width="85" height="6.4" />
                    <rect x="0" y="80" rx="3" ry="3" width="550" height="6.4" /> <rect x="0" y="100" rx="3" ry="3" width="620" height="6.4" />
                    <rect x="0" y="120" rx="3" ry="3" width="401" height="6.4" /> <rect x="0" y="140" rx="3" ry="3" width="501" height="6.4" />
                    <circle cx="30" cy="30" r="30" />
                </content-loader>
            </div>
            <template v-else-if="articleData">
                <div class="card card-question-head">
                    <div class="question-content">
                        <router-link :to="`/category/${articleData.category}`" class="topic-link-item">{{ articleData.category_name }}</router-link>
                        <h2 class="question-title">
                            <router-link :to="`/article/${articleData._id}`" class="question-title-link">{{ articleData.title }}</router-link>
                        </h2>
                    </div>
                </div>
                <div class="card card-answer">
                    <div class="answer-content">
                        <!-- eslint-disable-next-line vue/no-v-html -->
                        <div class="article-content markdown-body" v-html="addTarget(articleData.html)"></div>
                    </div>
                    <item-actions :item="articleData"></item-actions>
                </div>
                <frontend-comment :comments="comments"></frontend-comment>
            </template>
            <template v-else>
                <div class="card card-answer"><div class="answer-content">该文章不存在, 或者该文章已经被删除</div></div>
            </template>
        </div>
        <div class="main-right">
            <aside-category :category="category"></aside-category>
            <aside-trending :trending="trending"></aside-trending>
            <aside-other></aside-other>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ContentLoader } from 'vue-content-loader'
import type { asyncDataConfig } from '@/types'

defineOptions({
    name: 'frontend-article',
    asyncData(payload: asyncDataConfig) {
        const { store, route, api } = payload
        const {
            path,
            params: { id }
        } = route
        const globalCategoryStore = useGlobalCategoryStore(store)
        const frontendArticleStore = useFrontendArticleStore(store)
        const globalCommentStore = useGlobalCommentStore(store)
        return Promise.all([
            globalCategoryStore.getCategoryList({}, api),
            frontendArticleStore.getTrending({}, api),
            globalCommentStore.getCommentList({ id, path, page: 1, limit: 10 }, api),
            frontendArticleStore.getArticleItem({ id, path }, api)
        ])
    }
})

// pinia 状态管理 ===>
const globalCategoryStore = useGlobalCategoryStore()
const { lists: category } = $(storeToRefs(globalCategoryStore))

const frontendArticleStore = useFrontendArticleStore()
const { item, trending } = $(storeToRefs(frontendArticleStore))

const isLoad = $computed(() => item.isLoad)
const articleData = $computed(() => item.data)

const globalCommentStore = useGlobalCommentStore()
const { lists: comments } = $(storeToRefs(globalCommentStore))

useSaveScroll()

const addTarget = (content: string) => {
    if (!content) return ''
    return content.replace(/<a(.*?)href="http/g, '<a$1target="_blank" href="http')
}

onMounted(() => {})

const headTitle = computed(() => {
    let title = 'M.M.F 小屋'
    title = articleData?.title ? `${articleData.title} - M.M.F 小屋` : 'M.M.F 小屋'
    return title
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
