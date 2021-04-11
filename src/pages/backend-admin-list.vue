<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <div class="list-section list-header">
                <div class="list-username">用户名</div>
                <div class="list-email">邮箱</div>
                <div class="list-date">时间</div>
                <div class="list-action">操作</div>
            </div>
            <div v-for="item in admin.data" :key="item._id" class="list-section">
                <div class="list-username">{{ item.username }}</div>
                <div class="list-email">{{ item.email }}</div>
                <div class="list-date">{{ $filters.timeYmd(item.update_date) }}</div>
                <div class="list-action">
                    <router-link :to="'/backend/admin/modify/' + item._id" class="badge badge-success">编辑</router-link>
                    <a v-if="item.is_delete" @click="handleRecover(item._id)" href="javascript:;">恢复</a>
                    <a v-else @click="handleDelete(item._id)" href="javascript:;">删除</a>
                </div>
            </div>
        </div>
        <div v-if="admin.hasNext" class="settings-footer">
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
    name: 'backend-admin-list',
    async asyncData({ store, route }, config = { page: 1 }) {
        await store.dispatch('backend/admin/getAdminList', {
            ...config,
            path: route.path
        })
    },
    setup() {
        // eslint-disable-next-line no-unused-vars
        const { ctx, options, route, router, store, useToggle, useHead, useLockFn, ref, reactive } = useGlobal()

        const admin = computed(() => {
            return store.getters['backend/admin/getAdminList']
        })

        const [loading, toggleLoading] = useToggle(false)

        const loadMore = async (page = admin.value.page + 1) => {
            if (loading.value) return
            toggleLoading(true)
            await options.asyncData({ store, route }, { page })
            toggleLoading(false)
        }
        const handleRecover = async id => {
            const { code, message } = await store.$api.get('backend/admin/recover', { id })
            if (code === 200) {
                showMsg({
                    type: 'success',
                    content: message
                })
                store.commit('backend/admin/recoverAdmin', id)
            }
        }
        const handleDelete = async id => {
            const { code, message } = await store.$api.get('backend/admin/delete', { id })
            if (code === 200) {
                showMsg({
                    type: 'success',
                    content: message
                })
                store.commit('backend/admin/deleteAdmin', id)
            }
        }

        onMounted(() => {
            loadMore(1)
        })

        const headTitle = computed(() => {
            return '管理员列表 - M.M.F 小屋'
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
            admin,
            loading,
            loadMore,
            handleRecover,
            handleDelete
        }
    }
}
</script>
