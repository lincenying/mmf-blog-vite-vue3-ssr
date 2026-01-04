<template>
    <div class="main wrap">
        <div class="main-left">
            <div v-if="!isLoad" class="card card-content-loader">
                <ContentLoader :height="160" :width="660" :speed="2" primary-color="#f3f3f3" secondary-color="#ecebeb">
                    <rect x="70" y="15" rx="4" ry="4" width="117" height="6.4" /> <rect x="70" y="35" rx="3" ry="3" width="85" height="6.4" />
                    <rect x="0" y="80" rx="3" ry="3" width="550" height="6.4" /> <rect x="0" y="100" rx="3" ry="3" width="620" height="6.4" />
                    <rect x="0" y="120" rx="3" ry="3" width="401" height="6.4" /> <rect x="0" y="140" rx="3" ry="3" width="501" height="6.4" />
                    <circle cx="30" cy="30" r="30" />
                </ContentLoader>
            </div>
            <template v-else-if="articleData">
                <ClientOnly>
                    <div v-if="showToc === 'show'" class="toc">
                        <div class="card card-trending">
                            <h2 class="card-title">文章导航</h2>
                            <div class="card-content">
                                <el-scrollbar max-height="calc(100vh - 150px)">
                                    <div v-for="(sub_item, sub_index) in titlesTree" :key="sub_index" class="toc-item" :style="`--padding-left: ${sub_item.indent * 20}px`" @click="handleAnchorClick(sub_item)">{{ sub_item.title }}</div>
                                </el-scrollbar>
                            </div>
                        </div>
                        <div class="btn-toc close-toc" @click="showToc = 'hide'">
                            <el-tooltip class="box-item" effect="dark" content="收起导航" placement="top">
                                <i class="i-mdi-transfer-left"></i>
                            </el-tooltip>
                        </div>
                    </div>
                </ClientOnly>
                <div class="card card-question-head">
                    <div class="question-content">
                        <router-link :to="`/category/${articleData.category}`" class="topic-link-item">{{ articleData.category_name }}</router-link>
                        <h2 class="question-title">
                            <router-link :to="`/article/${articleData._id}`" class="question-title-link">{{ articleData.title }}</router-link>
                        </h2>
                    </div>
                    <ClientOnly>
                        <div v-if="showToc === 'hide'" class="btn-toc open-toc" @click="showToc = 'show'">
                            <el-tooltip class="box-item" effect="dark" content="展开导航" placement="top">
                                <i class="i-mdi-transfer-right"></i>
                            </el-tooltip>
                        </div>
                    </ClientOnly>
                </div>
                <div class="card card-answer">
                    <div class="answer-content">
                        <div ref="preview" class="markdown-body vuepress-markdown-body github-markdown-body article-content" v-html="articleData.html" />
                    </div>
                    <item-actions :item="articleData" />
                </div>
                <frontend-comment :comments="comments" />
            </template>
            <template v-else>
                <div class="card card-answer"><div class="answer-content">该文章不存在, 或者该文章已经被删除</div></div>
            </template>
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

defineOptions({
    name: 'FrontendArticle',
    asyncData(ctx) {
        const { store, route, api } = ctx
        const {
            fullPath: path,
            params: { id },
        } = route
        const globalCategoryStore = useGlobalCategoryStore(store)
        const frontendArticleStore = useFrontendArticleStore(store)
        const globalCommentStore = useGlobalCommentStore(store)
        return Promise.all([
            globalCategoryStore.getCategoryList({}, api),
            frontendArticleStore.getTrending(undefined, api),
            globalCommentStore.getCommentList({ id, path, page: 1, limit: 10 }, api),
            frontendArticleStore.getArticleItem({ id, path }, api),
        ])
    },
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

const showToc = ref<'none' | 'hide' | 'show'>('none')

const preview = useTemplateRef('preview')

interface TitleItem {
    title: string
    lineIndex: string | null
    indent: number
}

const titlesTree = ref<TitleItem[]>([])

function getAnchors() {
    const anchors = preview.value?.querySelectorAll('h1,h2,h3,h4,h5,h6')
    if (!anchors) {
        return
    }
    const titles = Array.from(anchors).filter(title => !!title.textContent.trim())

    if (!titles.length) {
        titlesTree.value = []
        return
    }
    const hTags = Array.from(new Set(titles.map(title => title.tagName))).sort()

    titlesTree.value = titles.map(el => ({
        title: el.textContent?.trim() || '',
        lineIndex: el.getAttribute('data-v-md-line'),
        indent: hTags.indexOf(el.tagName),
    }))

    if (titlesTree.value.length) {
        showToc.value = 'show'
    }
    else {
        showToc.value = 'none'
    }
}

function handleAnchorClick(anchor: TitleItem) {
    const { lineIndex } = anchor

    const heading = preview.value?.querySelector(`[data-v-md-line="${lineIndex}"]`)

    if (heading) {
        heading.scrollIntoView({ behavior: 'smooth' })
    }
}

onMounted(() => {
    getAnchors()
})

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
            name: 'description',
            content: headTitle,
        },
    ],
})
</script>
