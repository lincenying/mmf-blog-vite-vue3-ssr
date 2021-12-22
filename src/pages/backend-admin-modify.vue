<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <form>
                <a-input title="昵称">
                    <input type="text" v-model="form.username" placeholder="昵称" class="base-input" name="username" />
                    <span class="input-info error">请输入昵称</span>
                </a-input>
                <a-input title="邮箱">
                    <input type="text" v-model="form.email" placeholder="邮箱" class="base-input" name="email" />
                    <span class="input-info error">请输入邮箱</span>
                </a-input>
                <a-input title="密码">
                    <input type="password" v-model="form.password" placeholder="密码" class="base-input" name="password" />
                    <span class="input-info error">请输入密码</span>
                </a-input>
            </form>
        </div>
        <div class="settings-footer">
            <a @click="handleModify" href="javascript:;" class="btn btn-yellow">编辑管理员</a>
            <router-link to="/backend/admin/list" class="btn btn-blue">返回</router-link>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, watch } from 'vue'

import useGlobal from '@/mixins/global'
import { showMsg } from '@/utils'

import aInput from '@/components/_input.vue'

export default {
    name: 'backend-admin-modify',
    components: {
        aInput
        // backendMenu
    },
    setup() {
        // eslint-disable-next-line no-unused-vars
        const { ctx, options, route, router, store, useToggle, useHead, useLockFn, ref, reactive } = useGlobal()

        const item = computed(() => {
            return store.getters['backend/admin/getAdminItem']
        })

        const [loading, toggleLoading] = useToggle(false)

        const form = reactive({
            id: route.params.id,
            username: '',
            email: '',
            password: ''
        })

        watch(item, val => {
            form.username = val.data.username
            form.email = val.data.email
        })

        onMounted(async () => {
            await options.asyncData({ route, store })
            if (item && item.data) {
                form.username = item.data.username
                form.email = item.data.email
            }
        })

        const handleModify = async () => {
            if (!form.username || !form.email) {
                showMsg('请将表单填写完整!')
                return
            }
            if (loading.value) return
            toggleLoading(true)
            const { code, data, message } = await store.$api.post('backend/admin/modify', form)
            toggleLoading(false)
            if (code === 200) {
                showMsg({ type: 'success', content: message })
                store.commit('backend/admin/updateAdminItem', data)
                router.push('/backend/admin/list')
            }
        }

        const headTitle = computed(() => {
            return '编辑管理员 - M.M.F 小屋'
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
            form,
            handleModify
        }
    },
    async asyncData({ store, route }) {
        await store.dispatch('backend/admin/getAdminItem', {
            id: route.params.id,
            path: route.path
        })
    }
}
</script>
