<template>
    <div class="card">
        <div class="comments">
            <div class="comment-back">
                <router-link to="/backend/article/list" class="btn btn-blue">返回</router-link>
            </div>
            <div class="comment-items-wrap">
                <div v-for="item in lists.data" :key="item._id" class="comment-item">
                    <a href="javascript:;" class="comment-author-avatar-link">
                        <img :src="$f.Avatar(item.email)" alt="" class="avatar-img" />
                    </a>
                    <div class="comment-content-wrap">
                        <span class="comment-author-wrap">
                            <a href="javascript:;" class="comment-author">{{ item.username }}</a>
                        </span>
                        <div class="comment-content">{{ item.content }}</div>
                        <div class="comment-footer">
                            <span class="comment-time">{{ $f.timeAgo(item.timestamp) }}</span>
                            <a v-if="item.is_delete" href="javascript:;" class="comment-action-item comment-reply" @click="handleRecover(item._id)"
                                >恢复</a
                            >
                            <a v-else href="javascript:;" class="comment-action-item comment-reply" @click="handleDelete(item._id)">删除</a>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="lists.hasNext" class="load-more-wrap">
                <a v-if="!loading" href="javascript:;" class="comments-load-more" @click="loadMore()">加载更多</a>
                <a v-else href="javascript:;" class="comments-load-more">加载中...</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { asyncDataConfig } from '@/types'
import api from '@/api/index-client'

defineOptions({
    name: 'backend-article-comment',
    asyncData(payload: asyncDataConfig) {
        const { store, route, api } = payload
        const globalCommentStore = useGlobalCommentStore(store)
        return globalCommentStore.getCommentList({ page: 1, path: route.path, all: 1, id: route.params.id }, api)
    }
})

// eslint-disable-next-line no-unused-vars
const { route } = useGlobal()

const $f = useFilters()

// pinia 状态管理 ===>
const globalCommentStore = useGlobalCommentStore()
const { lists } = $(storeToRefs(globalCommentStore))

const [loading, toggleLoading] = useToggle(false)

const loadMore = async (page = lists.page + 1) => {
    if (loading.value) return
    toggleLoading(true)
    await globalCommentStore.getCommentList({ page, path: route.path, all: 1, id: route.params.id }, api)
    toggleLoading(false)
}
const handleRecover = async (id: string) => {
    const { code, message } = await api.get('frontend/comment/recover', { id })
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        globalCommentStore.recoverComment(id)
    }
}
const handleDelete = async (id: string) => {
    const { code, message } = await api.get('frontend/comment/delete', { id })
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        globalCommentStore.deleteComment(id)
    }
}

onMounted(() => {
    if (lists.path === '') {
        loadMore(1)
    }
})

const headTitle = computed(() => {
    return '评论列表 - M.M.F 小屋'
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
