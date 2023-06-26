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
import api from '@/api/index-client'

defineOptions({
    name: 'BackendAdminList',
    asyncData(ctx) {
        const { store, route, api } = ctx
        const backendAdminStore = useBackendAdminStore(store)
        return backendAdminStore.getAdminList({ page: 1, path: route.fullPath }, api)
    },
})

const route = useRoute()

const appShellStore = useAppShellStore()

// pinia 状态管理 ===>
const backendAdminStore = useBackendAdminStore()
const { lists } = $(storeToRefs(backendAdminStore))

const { historyPageScrollTop } = $(storeToRefs(appShellStore))

useSaveScroll()

const [loading, toggleLoading] = useToggle(false)

async function loadMore(page = lists.page + 1) {
    if (loading.value)
        return
    toggleLoading(true)
    await backendAdminStore.getAdminList({ page, path: route.path })
    toggleLoading(false)
}
async function handleRecover(id: string) {
    const { code, message } = await api.get<'success' | 'error'>('backend/admin/recover', { id })
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        backendAdminStore.recoverAdmin(id)
    }
}
async function handleDelete(id: string) {
    const { code, message } = await api.get<'success' | 'error'>('backend/admin/delete', { id })
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        backendAdminStore.deleteAdmin(id)
    }
}

onMounted(() => {
    if (lists.path === '') {
        loadMore(1)
    }
    else {
        const scrollTop = historyPageScrollTop[route.path] || 0
        window.scrollTo(0, scrollTop)
    }
})

const headTitle = ref('管理员列表 - M.M.F 小屋')
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
