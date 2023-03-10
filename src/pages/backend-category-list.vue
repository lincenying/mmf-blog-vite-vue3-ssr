<template>
    <div class="settings-main card">
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
                    <router-link :to="'/backend/category/modify/' + item._id" class="badge badge-success">编辑</router-link>
                    <template v-if="!item.cate_num">
                        <a v-if="item.is_delete" @click="handleRecover(item._id)" href="javascript:;">恢复</a>
                        <a v-else @click="handleDelete(item._id)" href="javascript:;">删除</a>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import api from '@/api/index-client'

defineOptions({
    name: 'backend-category-list',
    asyncData({ store, route, api }) {
        const globalCategoryStore = useGlobalCategoryStore(store)
        return globalCategoryStore.getCategoryList({ limit: 99, path: route.path }, api)
    }
})

// eslint-disable-next-line no-unused-vars
const { ctx, options, route, router, globalStore, appShellStore, useLockFn } = useGlobal('backend-category-list')

// pinia 状态管理 ===>
const globalCategoryStore = useGlobalCategoryStore()
const { lists: category } = $(storeToRefs(globalCategoryStore))

const { historyPageScrollTop } = $(storeToRefs(appShellStore))

useSaveScroll()

const [loading, toggleLoading] = useToggle(false)

const loadMore = async () => {
    if (loading.value) return
    toggleLoading(true)
    await globalCategoryStore.getCategoryList({ limit: 99, path: route.path }, api)
    toggleLoading(false)
}

onMounted(() => {
    if (category.path === '') {
        loadMore(1)
    } else {
        const scrollTop = historyPageScrollTop[route.path] || 0
        window.scrollTo(0, scrollTop)
    }
})

const handleRecover = async id => {
    const { code, message } = await api.get('backend/category/recover', { id })
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        globalCategoryStore.recoverCategory(id)
    }
}
const handleDelete = async id => {
    const { code, message } = await api.get('backend/category/delete', { id })
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        globalCategoryStore.deleteCategory(id)
    }
}

const headTitle = computed(() => {
    return '分类列表 - M.M.F 小屋'
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
