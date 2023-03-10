<template>
    <div class="card">
        <div class="comments">
            <div class="comment-back">
                <router-link to="/backend/article/list" class="btn btn-blue">返回</router-link>
            </div>
            <div class="comment-items-wrap">
                <div v-for="item in lists.data" :key="item._id" class="comment-item">
                    <a href="javascript:;" class="comment-author-avatar-link">
                        <img :src="$f.avatar(item.email)" alt="" class="avatar-img" />
                    </a>
                    <div class="comment-content-wrap">
                        <span class="comment-author-wrap">
                            <a href="javascript:;" class="comment-author">{{ item.username }}</a>
                        </span>
                        <div class="comment-content">{{ item.content }}</div>
                        <div class="comment-footer">
                            <span class="comment-time">{{ $f.timeAgo(item.timestamp) }}</span>
                            <a v-if="item.is_delete" @click="handleRecover(item._id)" href="javascript:;" class="comment-action-item comment-reply"
                                >恢复</a
                            >
                            <a v-else @click="handleDelete(item._id)" href="javascript:;" class="comment-action-item comment-reply">删除</a>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="lists.hasNext" class="load-more-wrap">
                <a v-if="!loading" @click="loadMore()" href="javascript:;" class="comments-load-more">加载更多</a>
                <a v-else href="javascript:;" class="comments-load-more">加载中...</a>
            </div>
        </div>
    </div>
</template>

<script setup>
import api from '@/api/index-client'

defineOptions({
    name: 'backend-article-comment',
    asyncData({ store, route, api }) {
        const globalCommentStore = useGlobalCommentStore(store)
        return globalCommentStore.getCommentList({ page: 1, path: route.path, all: 1, id: route.params.id }, api)
    }
})

// eslint-disable-next-line no-unused-vars
const { ctx, options, route, router, globalStore, appShellStore, useLockFn } = useGlobal('backend-article-comment')

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
const handleRecover = async id => {
    const { code, message } = await api.get('frontend/comment/recover', { id })
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        globalCommentStore.recoverComment(id)
    }
}
const handleDelete = async id => {
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
