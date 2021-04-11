<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <a-input title="账号">
                <input type="text" v-model="form.username" placeholder="请输入管理员账号" class="base-input" name="username" />
                <span class="input-info error">请输入昵称</span>
            </a-input>
            <a-input title="密码">
                <input type="password" v-model="form.password" placeholder="请输入管理员密码" class="base-input" name="password" />
                <span class="input-info error">请输入密码</span>
            </a-input>
        </div>
        <div class="settings-footer"><a @click="handleLogin" href="javascript:;" class="btn btn-yellow">登录</a></div>
    </div>
</template>

<script>
import { computed } from 'vue'
import cookies from 'js-cookie'

import useGlobal from '@/mixins/global'
import { showMsg } from '@/utils'

import aInput from '@/components/_input.vue'

export default {
    name: 'backend-login',
    components: {
        aInput
    },
    beforeRouteEnter(to, from, next) {
        if (cookies.get('b_user')) {
            return next('/backend/article/list')
        }
        next()
    },
    setup() {
        // eslint-disable-next-line no-unused-vars
        const { ctx, options, route, router, store, useToggle, useHead, useLockFn, ref, reactive } = useGlobal()

        const form = reactive({
            username: '',
            password: ''
        })

        const handleLogin = useLockFn(async () => {
            if (!form.username || !form.password) {
                return showMsg('请输入用户名和密码!')
            }
            const { code, data } = await store.$api.post('backend/admin/login', form)
            if (data && code === 200) {
                router.push('/backend/article/list')
            }
        })

        const headTitle = computed(() => {
            return '管理员登录 - M.M.F 小屋'
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
            handleLogin
        }
    }
}
</script>
