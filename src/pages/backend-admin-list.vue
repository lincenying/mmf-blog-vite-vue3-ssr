<template>
    <div class="card settings-main">
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
                    <router-link :to="`/backend/admin/modify/${item._id}`" class="badge badge-success">编辑</router-link>
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
import useBackendAdminStore from '@/stores/use-backend-admin-store'

defineOptions({
    name: 'BackendAdminList',
    asyncData(ctx) {
        const { store, route, api } = ctx
        const backendAdminStore = useBackendAdminStore(store)
        return backendAdminStore.getAdminList({ page: 1, path: route.fullPath }, api)
    },
})

const route = useRoute()
const backendAdminStore = useBackendAdminStore()
const { lists } = storeToRefs(backendAdminStore)

const { loading, loadMore, handleRecover, handleDelete } = useBackendSoftDeleteList({
    isEmpty: () => lists.value.path === '',
    getPage: () => lists.value.page,
    fetchPage: page => backendAdminStore.getAdminList({ page, path: route.fullPath }),
    deleteUrl: 'backend/admin/delete',
    recoverUrl: 'backend/admin/recover',
    onDeleted: id => backendAdminStore.deleteAdmin(id),
    onRecovered: id => backendAdminStore.recoverAdmin(id),
    headTitle: '管理员列表 - M.M.F 小屋',
})
</script>
