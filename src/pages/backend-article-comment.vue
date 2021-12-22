<template>
    <div class="card">
        <div class="comments">
            <div class="comment-back">
                <router-link to="/backend/article/list" class="btn btn-blue">返回</router-link>
            </div>
            <div class="comment-items-wrap">
                <div v-for="item in comments.data" :key="item._id" class="comment-item">
                    <a href="javascript:;" class="comment-author-avatar-link">
                        <img :src="$filters.avatar(item.email)" alt="" class="avatar-img" />
                    </a>
                    <div class="comment-content-wrap">
                        <span class="comment-author-wrap">
                            <a href="javascript:;" class="comment-author">{{ item.username }}</a>
                        </span>
                        <div class="comment-content">{{ item.content }}</div>
                        <div class="comment-footer">
                            <span class="comment-time">{{ $filters.timeAgo(item.timestamp) }}</span>
                            <a v-if="item.is_delete" @click="handleRecover(item._id)" href="javascript:;" class="comment-action-item comment-reply"
                                >恢复</a
                            >
                            <a v-else @click="handleDelete(item._id)" href="javascript:;" class="comment-action-item comment-reply">删除</a>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="comments.hasNext" class="load-more-wrap">
                <a v-if="!loading" @click="loadMore()" href="javascript:;" class="comments-load-more">加载更多</a>
                <a v-else href="javascript:;" class="comments-load-more">加载中...</a>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue'

import useGlobal from '@/mixins/global'
import { showMsg } from '@/utils'

export default {
    name: 'backend-article-comment',
    setup() {
        // eslint-disable-next-line no-unused-vars
        const { ctx, options, route, router, store, useToggle, useHead, useLockFn, ref, reactive } = useGlobal()

        const comments = computed(() => {
            return store.getters['global/comment/getCommentList']
        })

        const [loading, toggleLoading] = useToggle(false)

        const loadMore = async (page = comments.value.page + 1) => {
            if (loading.value) return
            toggleLoading(true)
            await options.asyncData({ store, route }, { page })
            toggleLoading(false)
        }
        const handleRecover = async id => {
            const { code, message } = await store.$api.get('frontend/comment/recover', { id })
            if (code === 200) {
                showMsg({ type: 'success', content: message })
                store.commit('frontend/comment/recoverComment', id)
            }
        }
        const handleDelete = async id => {
            const { code, message } = await store.$api.get('frontend/comment/delete', { id })
            if (code === 200) {
                showMsg({ type: 'success', content: message })
                store.commit('frontend/comment/deleteComment', id)
            }
        }

        onMounted(() => {
            loadMore(1)
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

        return {
            comments,
            loading,
            loadMore,
            handleRecover,
            handleDelete
        }
    },
    async asyncData({ store, route }, config = { page: 1 }) {
        config.all = 1
        config.id = route.params.id
        await store.dispatch('global/comment/getCommentList', {
            ...config,
            path: route.path
        })
    }
}
</script>
