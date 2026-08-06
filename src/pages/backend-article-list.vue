<template>
    <div class="settings-main card">
        <div class="settings-main-content" flex="~ justify-end" border-b="1px solid hex-f4f4f4">
            <input v-model="searchKey" placeholder="请输入标题, 记得按回车哦" name="search" class="base-input my-10px w-500px" @keyup.enter="onSearch">
        </div>
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
                    <router-link v-if="item.comment_count > 0" :to="`/backend/article/comment/${item._id}`" class="badge badge-success">
                        评论
                    </router-link>
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
import { getDateDiff } from '@lincy/utils'
import { useBackendSoftDeleteList } from '@/composables/use-backend-soft-delete-list'
import useBackendArticleStore from '@/stores/use-backend-article-store'

defineOptions({
    name: 'BackendArticleList',
    asyncData(ctx) {
        const { store, route, api } = ctx
        const backendArticleStore = useBackendArticleStore(store)
        return backendArticleStore.getArticleList({ page: 1, path: route.fullPath }, api)
    },
})

const route = useRoute()
const backendArticleStore = useBackendArticleStore()
const { lists } = storeToRefs(backendArticleStore)

const searchKey = ref('')

const { loading, loadMore, handleRecover, handleDelete } = useBackendSoftDeleteList({
    isEmpty: () => lists.value.path === '',
    getPage: () => lists.value.page,
    fetchPage: page => backendArticleStore.getArticleList({ page, key: searchKey.value, path: route.fullPath }),
    deleteUrl: 'backend/article/delete',
    recoverUrl: 'backend/article/recover',
    onDeleted: id => backendArticleStore.deleteArticle(id),
    onRecovered: id => backendArticleStore.recoverArticle(id),
    headTitle: '文章列表 - M.M.F 小屋',
})

/**
 * 按标题关键词重新搜索（从第 1 页开始）。
 */
function onSearch() {
    loadMore(1)
}
</script>
