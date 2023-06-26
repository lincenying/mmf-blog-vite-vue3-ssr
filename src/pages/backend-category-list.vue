<template>
    <div class="card settings-main">
        <div class="settings-main-content">
            <div class="list-section">
                <div class="list-title">分类名称</div>
                <div class="list-time">分类排序</div>
                <div class="list-action">操作</div>
            </div>
            <div v-for="item in category" :key="item._id" class="list-section">
                <div class="list-title" :class="item.is_delete ? 'text-red-500 line-through' : ''">{{ item.cate_name }}</div>
                <div class="list-time">{{ item.cate_order }}</div>
                <div class="list-action">
                    <router-link :to="`/backend/category/modify/${item._id}`" class="badge badge-success">编辑</router-link>
                    <template v-if="!item.cate_num">
                        <a v-if="item.is_delete" href="javascript:;" @click="handleRecover(item._id)">恢复</a>
                        <a v-else href="javascript:;" @click="handleDelete(item._id)">删除</a>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import api from '@/api/index-client'

defineOptions({
    name: 'BackendCategoryList',
    asyncData(ctx) {
        const { store, route, api } = ctx
        const globalCategoryStore = useGlobalCategoryStore(store)
        return globalCategoryStore.getCategoryList({ limit: 99, path: route.fullPath }, api)
    },
})

const route = useRoute()
const appShellStore = useAppShellStore()

// pinia 状态管理 ===>
const globalCategoryStore = useGlobalCategoryStore()
const { lists: category } = $(storeToRefs(globalCategoryStore))

const { historyPageScrollTop } = $(storeToRefs(appShellStore))

useSaveScroll()

const [loading, toggleLoading] = useToggle(false)

async function loadMore(page: number) {
    if (loading.value)
        return
    toggleLoading(true)
    await globalCategoryStore.getCategoryList({ page, limit: 99, path: route.path }, api)
    toggleLoading(false)
}

onMounted(() => {
    if (category.length === 0) {
        loadMore(1)
    }
    else {
        const scrollTop = historyPageScrollTop[route.path] || 0
        window.scrollTo(0, scrollTop)
    }
})

async function handleRecover(id: string) {
    const { code, message } = await api.get<'success' | 'error'>('backend/category/recover', { id })
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        globalCategoryStore.recoverCategory(id)
    }
}

async function handleDelete(id: string) {
    const { code, message } = await api.get<'success' | 'error'>('backend/category/delete', { id })
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        globalCategoryStore.deleteCategory(id)
    }
}

const headTitle = ref('分类列表 - M.M.F 小屋')
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
