<template>
    <div class="modal-wrap modal-sign-in-wrap" :class="show ? 'active' : ''">
        <span class="center-helper" />
        <div class="modal modal-signup">
            <h2 class="modal-title">登录</h2>
            <a href="javascript:;" class="modal-close" @click="handleClose"><i class="icon icon-close-black" /></a>
            <div class="modal-content">
                <form class="sign-up-form">
                    <div class="input-wrap">
                        <input v-model="form.username" type="text" placeholder="昵称" class="base-input">
                        <p class="error-info input-info hidden">长度至少 6 位</p>
                    </div>
                    <div class="input-wrap">
                        <input v-model="form.password" type="password" placeholder="密码" class="base-input" autocomplete="off">
                        <p class="error-info input-info hidden">长度至少 6 位</p>
                    </div>
                    <a href="javascript:;" class="btn sign-up-btn btn-yellow" @click="handleLogin">确认登录</a>
                    <a href="javascript:;" class="btn sign-up-btn btn-blue block" @click="handleRegister">我要注册</a>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import api from '@/api/index-client'

const props = defineProps<{
    show: boolean
}>()

defineOptions({
    name: 'sign-in',
})

const { show } = $(toRefs(props))

const { globalStore } = useGlobal()

const form = reactive({
    username: '',
    password: '',
})

function handleClose() {
    globalStore.setLoginModal(false)
}
function handleRegister() {
    globalStore.setLoginModal(false)
    globalStore.setRegisterModal(true)
}
const handleLogin = useLockFn(async () => {
    if (!form.username || !form.password)
        return showMsg('请将表单填写完整!')

    const { code, message } = await api.post('frontend/user/login', form)
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        window.location.reload()
    }
})
</script>
