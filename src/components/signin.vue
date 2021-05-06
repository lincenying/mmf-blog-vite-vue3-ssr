<template>
    <div class="modal-wrap modal-signin-wrap" :class="show ? 'active' : ''">
        <span class="center-helper"></span>
        <div class="modal modal-signup">
            <h2 class="modal-title">登录</h2>
            <a @click="handleClose" href="javascript:;" class="modal-close"><i class="icon icon-close-black"></i></a>
            <div class="modal-content">
                <form class="signup-form">
                    <div class="input-wrap">
                        <input v-model="form.username" type="text" placeholder="昵称" class="base-input" />
                        <p class="error-info input-info hidden">长度至少 6 位</p>
                    </div>
                    <div class="input-wrap">
                        <input v-model="form.password" type="password" placeholder="密码" class="base-input" autocomplete="off" />
                        <p class="error-info input-info hidden">长度至少 6 位</p>
                    </div>
                    <a @click="handleLogin" href="javascript:;" class="btn signup-btn btn-yellow">确认登录</a>
                    <a @click="handleRegister" href="javascript:;" class="btn signup-btn btn-blue block">我要注册</a>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import useGlobal from '@/mixins/global'
import { showMsg } from '@/utils'

export default {
    name: 'sign-in',
    props: ['show'],
    setup() {
        // eslint-disable-next-line no-unused-vars
        const { ctx, options, route, router, store, useToggle, useHead, useLockFn, ref, reactive } = useGlobal()

        const form = reactive({
            username: '',
            password: ''
        })

        const handleClose = () => {
            store.commit('global/showLoginModal', false)
        }
        const handleRegister = () => {
            store.commit('global/showLoginModal', false)
            store.commit('global/showRegisterModal', true)
        }
        const handleLogin = useLockFn(async () => {
            if (!form.username || !form.password) {
                return showMsg('请将表单填写完整!')
            }
            const { code, message } = await store.$api.post('frontend/user/login', form)
            if (code === 200) {
                showMsg({ type: 'success', content: message })
                window.location.reload()
            }
        })

        return {
            form,
            handleClose,
            handleRegister,
            handleLogin
        }
    },
    methods: {}
}
</script>
