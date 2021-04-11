<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <div class="list-section">
                <div class="list-title">分类名称</div>
                <div class="list-time">分类排序</div>
                <div class="list-action">操作</div>
            </div>
            <div v-for="item in category" :key="item._id" class="list-section">
                <div class="list-title">{{ item.cate_name }}</div>
                <div class="list-time">{{ item.cate_order }}</div>
                <div class="list-action">
                    <router-link :to="'/backend/category/modify/' + item._id" class="badge badge-success">编辑</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue'

import useGlobal from '@/mixins/global'

export default {
    name: 'backend-category-list',
    async asyncData({ store, route }, config = { limit: 99 }) {
        config.all = 1
        await store.dispatch('global/category/getCategoryList', {
            ...config,
            path: route.path
        })
    },
    setup() {
        // eslint-disable-next-line no-unused-vars
        const { ctx, options, route, router, store, useToggle, useHead, useLockFn, ref, reactive } = useGlobal()

        const category = computed(() => {
            return store.getters['global/category/getCategoryList']
        })

        const [loading, toggleLoading] = useToggle(false)

        const loadMore = async () => {
            if (loading.value) return
            toggleLoading(true)
            await options.asyncData({ store, route })
            toggleLoading(false)
        }

        onMounted(() => {
            loadMore()
        })

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

        return {
            category,
            loading,
            loadMore
        }
    }
}
</script>
