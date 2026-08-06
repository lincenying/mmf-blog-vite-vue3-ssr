<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <div class="list-section list-header">
                <div class="list-username">用户名</div>
                <div class="list-email">邮箱</div>
                <div class="list-date">时间</div>
                <div class="list-action">操作</div>
            </div>
            <div v-for="item in lists.data" :key="item._id" class="list-section">
                <div class="list-username" :class="item.is_delete ? 'text-red-500 line-through' : ''">{{ item.username }}</div>
                <div class="list-email">{{ item.email }}</div>
                <div class="list-date">{{ UTC2Date(item.update_date) }}</div>
                <div class="list-action">
                    <router-link :to="`/backend/user/modify/${item._id}`" class="badge badge-success">编辑</router-link>
                    <a v-if="item.is_delete" href="javascript:;" @click="handleRecover(item._id)">恢复</a>
                    <a v-else href="javascript:;" @click="handleDelete(item._id)">删除</a>
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
import { UTC2Date } from '@lincy/utils'
import { useBackendSoftDeleteList } from '@/composables/use-backend-soft-delete-list'
import useBackendUserStore from '@/stores/use-backend-user-store'

defineOptions({
    name: 'BackendUserList',
    asyncData(ctx) {
        const { store, route, api } = ctx
        const backendUserStore = useBackendUserStore(store)
        return backendUserStore.getUserList({ page: 1, path: route.fullPath }, api)
    },
})

const route = useRoute()
const backendUserStore = useBackendUserStore()
const { lists } = storeToRefs(backendUserStore)

const { loading, loadMore, handleRecover, handleDelete } = useBackendSoftDeleteList({
    isEmpty: () => lists.value.path === '',
    getPage: () => lists.value.page,
    fetchPage: page => backendUserStore.getUserList({ page, path: route.fullPath }),
    deleteUrl: 'backend/user/delete',
    recoverUrl: 'backend/user/recover',
    onDeleted: id => backendUserStore.deleteUser(id),
    onRecovered: id => backendUserStore.recoverUser(id),
    headTitle: '用户列表 - M.M.F 小屋',
})
</script>
