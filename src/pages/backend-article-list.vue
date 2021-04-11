<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <div class="list-section list-header">
                <div class="list-title">标题</div>
                <div class="list-category">分类</div>
                <div class="list-date">最后更新</div>
                <div class="list-action">操作</div>
            </div>
            <div v-for="item in topics.data" :key="item._id" class="list-section">
                <div class="list-title">{{ item.title }}</div>
                <div class="list-category">{{ item.category_name }}</div>
                <div class="list-date">{{ $filters.timeAgo(item.update_date) }}</div>
                <div class="list-action">
                    <router-link :to="'/backend/article/modify/' + item._id" class="badge badge-success">编辑</router-link>
                    <a v-if="item.is_delete" @click="handleRecover(item._id)" href="javascript:;">恢复</a>
                    <a v-else @click="handleDelete(item._id)" href="javascript:;">删除</a>
                    <router-link v-if="item.comment_count > 0" :to="'/backend/article/comment/' + item._id" class="badge badge-success"
                        >评论</router-link
                    >
                </div>
            </div>
        </div>
        <div v-if="topics.hasNext" class="settings-footer">
            <a v-if="!loading" @click="loadMore()" class="admin-load-more" href="javascript:;">加载更多</a>
            <a v-else class="admin-load-more" href="javascript:;">加载中...</a>
        </div>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue'

import useGlobal from '@/mixins/global'
import { showMsg } from '@/utils'

export default {
    name: 'backend-article-list',
    async asyncData({ store, route }, config = { page: 1 }) {
        await store.dispatch('backend/article/getArticleList', {
            ...config,
            path: route.path
        })
    },
    setup() {
        // eslint-disable-next-line no-unused-vars
        const { ctx, options, route, router, store, useToggle, useHead, useLockFn, ref, reactive } = useGlobal()

        const topics = computed(() => {
            return store.getters['backend/article/getArticleList']
        })

        const [loading, toggleLoading] = useToggle(false)

        const loadMore = async (page = topics.value.page + 1) => {
            if (loading.value) return
            toggleLoading(true)
            await options.asyncData({ store, route }, { page })
            toggleLoading(false)
        }
        const handleRecover = async id => {
            const { code, message } = await store.$api.get('backend/article/recover', { id })
            if (code === 200) {
                showMsg({
                    type: 'success',
                    content: message
                })
                store.commit('backend/article/recoverArticle', id)
            }
        }
        const handleDelete = async id => {
            const { code, message } = await store.$api.get('backend/article/delete', { id })
            if (code === 200) {
                showMsg({
                    type: 'success',
                    content: message
                })
                store.commit('backend/article/deleteArticle', id)
            }
        }

        onMounted(() => {
            loadMore(1)
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

        return {
            topics,
            loading,
            loadMore,
            handleRecover,
            handleDelete
        }
    }
}
</script>
