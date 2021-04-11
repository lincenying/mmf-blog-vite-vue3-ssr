<template>
    <div class="main wrap">
        <div class="main-left">
            <div class="home-feeds cards-wrap">
                <div class="settings-main card">
                    <div class="settings-main-content">
                        <a-input title="当前密码">
                            <input type="password" v-model="form.old_password" placeholder="当前密码" class="base-input" name="old_password" />
                        </a-input>
                        <a-input title="新的密码">
                            <input type="password" v-model="form.password" placeholder="新的密码" class="base-input" name="password" />
                        </a-input>
                        <a-input title="确认密码">
                            <input type="password" v-model="form.re_password" placeholder="确认密码" class="base-input" name="re_password" />
                        </a-input>
                    </div>
                    <div class="settings-footer"><a @click="handleSubmit" href="javascript:;" class="btn btn-yellow">保存设置</a></div>
                </div>
            </div>
        </div>
        <div class="main-right"><account></account></div>
    </div>
</template>

<script>
import { computed } from 'vue'

import useGlobal from '@/mixins/global'
import { showMsg } from '@/utils'

import account from '@/components/aside-account.vue'
import aInput from '@/components/_input.vue'

export default {
    name: 'frontend-user-password',
    components: {
        aInput,
        account
    },
    setup() {
        // eslint-disable-next-line no-unused-vars
        const { ctx, options, route, router, store, useToggle, useHead, useLockFn, ref, reactive } = useGlobal()

        const form = reactive({
            old_password: '',
            password: '',
            re_password: ''
        })

        const handleSubmit = useLockFn(async () => {
            if (!form.password || !form.old_password || !form.re_password) {
                return showMsg('请将表单填写完整!')
            } else if (form.password !== form.re_password) {
                return showMsg('两次密码输入不一致!')
            }
            const { code, data } = await store.$api.post('frontend/user/password', form)
            if (code === 200) {
                showMsg({
                    type: 'success',
                    content: data
                })
                form.old_password = ''
                form.password = ''
                form.re_password = ''
            }
        })

        const headTitle = computed(() => {
            return '密码 - M.M.F 小屋'
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
            handleSubmit
        }
    }
}
</script>
