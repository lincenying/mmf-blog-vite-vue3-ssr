<template>
    <div class="modal-wrap modal-signup-wrap" :class="show ? 'active' : ''">
        <span class="center-helper"></span>
        <div class="modal modal-signup">
            <h2 class="modal-title">注册</h2>
            <a href="javascript:;" class="modal-close" @click="handleClose"><i class="icon icon-close-black"></i></a>
            <div class="modal-content">
                <form class="sign-up-form">
                    <div class="input-wrap">
                        <input v-model="form.username" type="text" placeholder="昵称" class="base-input" />
                        <p class="error-info input-info hidden">长度至少 6 位</p>
                    </div>
                    <div class="input-wrap">
                        <input v-model="form.email" type="text" placeholder="邮箱" class="base-input" />
                        <p class="error-info input-info hidden">长度至少 6 位</p>
                    </div>
                    <div class="input-wrap">
                        <input v-model="form.password" type="password" placeholder="密码" class="base-input" autocomplete="off" />
                        <p class="error-info input-info hidden">长度至少 6 位</p>
                    </div>
                    <div class="input-wrap">
                        <input v-model="form.re_password" type="password" placeholder="重复密码" class="base-input" autocomplete="off" />
                        <p class="error-info input-info hidden">长度至少 6 位</p>
                    </div>
                    <a href="javascript:;" class="btn sign-up-btn btn-yellow" @click="handleRegister">确认注册</a>
                    <a href="javascript:;" class="btn sign-up-btn btn-blue block" @click="handleLogin">直接登录</a>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import api from '@/api/index-client'
import { strLen } from '@/utils'

const props = defineProps<{
    show: boolean
}>()

defineOptions({
    name: 'sign-up'
})

const { show } = $(toRefs(props))

// eslint-disable-next-line no-unused-vars
const { globalStore } = useGlobal()

const form = reactive({
    username: '',
    email: '',
    password: '',
    re_password: ''
})

const handleClose = () => {
    globalStore.setRegisterModal(false)
}
const handleLogin = () => {
    globalStore.setLoginModal(true)
    globalStore.setRegisterModal(false)
}
const handleRegister = useLockFn(async () => {
    const reg = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_-]+)(\.[a-zA-Z0-9_-]+)$/i
    if (!form.username || !form.password || !form.email) {
        return showMsg('请将表单填写完整!')
    } else if (strLen(form.username) < 4) {
        return showMsg('用户长度至少 2 个中文或 4 个英文!')
    } else if (!reg.test(form.email)) {
        return showMsg('邮箱格式错误!')
    } else if (strLen(form.password) < 8) {
        return showMsg('密码长度至少 8 位!')
    } else if (form.password !== form.re_password) {
        return showMsg('两次输入的密码不一致!')
    }
    const { code, message } = await api.post('frontend/user/insert', form)
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        handleLogin()
    }
})
</script>
