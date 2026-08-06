<template>
    <div class="card settings-main">
        <div class="settings-main-content">
            <div class="list-section list-header">
                <div class="list-title">分类名称</div>
                <div class="list-date">分类排序</div>
                <div class="list-action">操作</div>
            </div>
            <div v-for="item in category" :key="item._id" class="list-section">
                <div class="list-title" :class="item.is_delete ? 'text-red-500 line-through' : ''">{{ item.cate_name }}</div>
                <div class="list-date">{{ item.cate_order }}</div>
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
import { useBackendSoftDeleteList } from '@/composables/use-backend-soft-delete-list'
import { useGlobalCategoryStore } from '@/stores/use-global-category-store'

defineOptions({
    name: 'BackendCategoryList',
    asyncData(ctx) {
        const { store, route, api } = ctx
        const globalCategoryStore = useGlobalCategoryStore(store)
        return globalCategoryStore.getCategoryList({ limit: 99, path: route.fullPath }, api)
    },
})

const route = useRoute()
const globalCategoryStore = useGlobalCategoryStore()
const { lists: category } = storeToRefs(globalCategoryStore)

const { handleRecover, handleDelete } = useBackendSoftDeleteList({
    isEmpty: () => category.value.length === 0,
    fetchPage: page => globalCategoryStore.getCategoryList({ page, limit: 99, path: route.fullPath }),
    deleteUrl: 'backend/category/delete',
    recoverUrl: 'backend/category/recover',
    onDeleted: id => globalCategoryStore.deleteCategory(id),
    onRecovered: id => globalCategoryStore.recoverCategory(id),
    headTitle: '分类列表 - M.M.F 小屋',
})
</script>
