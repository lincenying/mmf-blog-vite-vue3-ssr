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

<script>
import { computed, onMounted } from 'vue'

import useGlobal from '@/mixins/global'
import saveScroll from '@/mixins/save-scroll'
import { showMsg } from '@/utils'

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

        saveScroll()

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
            const scrollTop = store.state.appShell.historyPageScrollTop[route.path] || 0
            window.scrollTo(0, scrollTop)
            loadMore()
        })

        const handleRecover = async id => {
            const { code, message } = await store.$api.get('backend/category/recover', { id })
            if (code === 200) {
                showMsg({ type: 'success', content: message })
                store.commit('backend/category/recoverCategory', id)
            }
        }
        const handleDelete = async id => {
            const { code, message } = await store.$api.get('backend/category/delete', { id })
            if (code === 200) {
                showMsg({ type: 'success', content: message })
                store.commit('backend/category/deleteCategory', id)
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

        return {
            category,
            loading,
            loadMore,
            handleRecover,
            handleDelete
        }
    }
}
</script>
