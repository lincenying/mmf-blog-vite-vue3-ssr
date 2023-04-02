<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <div class="list-section list-header">
                <div class="list-title">标题</div>
                <div class="list-category">分类</div>
                <div class="list-date">最后更新</div>
                <div class="list-action">操作</div>
            </div>
            <div v-for="item in lists.data" :key="item._id" class="list-section">
                <div class="list-title" :class="item.is_delete ? 'text-red-500 line-through' : ''">{{ item.title }}</div>
                <div class="list-category">{{ item.category_name }}</div>
                <div class="list-date">{{ getDateDiff(item.update_date) }}</div>
                <div class="list-action">
                    <router-link :to="`/backend/article/modify/${item._id}`" class="badge badge-success">编辑</router-link>
                    <a v-if="item.is_delete" href="javascript:;" @click="handleRecover(item._id)">恢复</a>
                    <a v-else href="javascript:;" @click="handleDelete(item._id)">删除</a>
                    <router-link v-if="item.comment_count > 0" :to="`/backend/article/comment/${item._id}`" class="badge badge-success"
                        >评论</router-link
                    >
                </div>
            </div>
        </div>
        <div v-if="lists.hasNext" class="settings-footer">
            <a v-if="!loading" class="admin-load-more" href="javascript:;" @click="loadMore()">加载更多</a>
            <a v-else class="admin-load-more" href="javascript:;">加载中...</a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getDateDiff } from 'lcy-utils'
import type { asyncDataConfig } from '@/types'
import api from '@/api/index-client'

defineOptions({
    name: 'backend-article-list',
    asyncData(payload: asyncDataConfig) {
        const { store, route, api } = payload
        const backendArticleStore = useBackendArticleStore(store)
        return backendArticleStore.getArticleList({ page: 1, path: route.path }, api)
    }
})

// eslint-disable-next-line no-unused-vars
const { route, appShellStore } = useGlobal()

// pinia 状态管理 ===>
const backendArticleStore = useBackendArticleStore()
const { lists } = $(storeToRefs(backendArticleStore))

const { historyPageScrollTop } = $(storeToRefs(appShellStore))

useSaveScroll()

const [loading, toggleLoading] = useToggle(false)

const loadMore = async (page = lists.page + 1) => {
    if (loading.value) return
    toggleLoading(true)
    await backendArticleStore.getArticleList({ page, path: route.path })
    toggleLoading(false)
}
const handleRecover = async (id: string) => {
    const { code, message } = await api.get('backend/article/recover', { id })
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        backendArticleStore.recoverArticle(id)
    }
}
const handleDelete = async (id: string) => {
    const { code, message } = await api.get('backend/article/delete', { id })
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        backendArticleStore.deleteArticle(id)
    }
}

onMounted(() => {
    if (lists.path === '') {
        loadMore(1)
    } else {
        const scrollTop = historyPageScrollTop[route.path] || 0
        window.scrollTo(0, scrollTop)
    }
})

const headTitle = computed(() => {
    return '文章列表 - M.M.F 小屋'
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
