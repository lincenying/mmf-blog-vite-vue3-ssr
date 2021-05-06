<template>
    <div class="home-feeds cards-wrap">
        <div class="settings-main card">
            <div class="settings-main-content">
                <form>
                    <a-input title="昵称">
                        <input type="text" :value="username" placeholder="昵称" class="base-input" name="username" readonly />
                        <span class="input-info error">请输入昵称</span>
                    </a-input>
                    <a-input title="邮箱">
                        <input type="text" v-model="email" placeholder="邮箱" class="base-input" name="email" />
                        <span class="input-info error">请输入邮箱</span>
                    </a-input>
                </form>
            </div>
            <div class="settings-footer">
                <a @click="handleSubmit" href="javascript:;" class="btn btn-yellow">保存设置</a>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, computed } from 'vue'

import useGlobal from '@/mixins/global'
import { showMsg } from '@/utils'

import aInput from '../components/_input.vue'

export default {
    name: 'frontend-user-account',
    components: {
        aInput
    },
    setup() {
        // eslint-disable-next-line no-unused-vars
        const { ctx, options, route, router, store, useToggle, useHead, useLockFn, ref, reactive } = useGlobal()

        const username = ref('')
        const email = ref('')

        const getUser = async () => {
            const { code, data } = await store.$api.get('frontend/user/account')
            if (code === 200) {
                username.value = data.username
                email.value = data.email
            }
        }

        onMounted(() => {
            getUser()
        })

        const handleSubmit = useLockFn(async () => {
            const reg = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_-]+)(\.[a-zA-Z0-9_-]+)$/i
            if (!email) {
                showMsg('请填写邮箱地址!')
                return
            } else if (!reg.test(email)) {
                showMsg('邮箱格式错误!')
                return
            }
            const { code, message } = await store.$api.post('frontend/user/account', {
                email,
                username,
                id: ctx.$oc(store.state, 'global.cookies.userid')
            })
            if (code === 200) {
                store.commit('global/setCookies', {
                    ...ctx.$oc(store.state, 'global.cookies'),
                    useremail: email
                })
                showMsg({ type: 'success', content: message })
            }
        })

        const headTitle = computed(() => {
            return '帐号 - M.M.F 小屋'
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
            username,
            email,
            handleSubmit
        }
    }
}
</script>
