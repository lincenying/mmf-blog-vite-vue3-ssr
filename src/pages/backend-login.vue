<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <form>
                <a-input title="账号">
                    <input v-model="form.username" type="text" placeholder="请输入管理员账号" class="base-input" name="username">
                    <span class="input-info error">请输入昵称</span>
                </a-input>
                <a-input title="密码">
                    <input v-model="form.password" type="password" placeholder="请输入管理员密码" class="base-input" name="password">
                    <span class="input-info error">请输入密码</span>
                </a-input>
            </form>
        </div>
        <div class="settings-footer"><a href="javascript:;" class="btn btn-yellow" @click="handleLogin">登录</a></div>
        <client-only />
    </div>
</template>

<script setup lang="ts">
import cookies from 'js-cookie'

import api from '@/api/index-client'

defineOptions({
    name: 'BackendLogin',
})

const { ctx } = useGlobal()
const router = useRouter()

const form = reactive({
    username: '',
    password: '',
})

const handleLogin = useLockFn(async () => {
    if (!form.username || !form.password)
        return showMsg('请输入用户名和密码!')

    const loader = ctx.$loading.show()
    const { code, data } = await api.post<UnfAble<string>>('backend/admin/login', form)
    loader.hide()
    if (code === 200 && data)
        router.push('/backend/article/list')
})

onMounted(() => {
    if (cookies.get('b_user'))
        router.push('/backend/article/list')
})

const headTitle = ref('管理员登录 - M.M.F 小屋')
useHead({
    // Can be static or computed
    title: headTitle,
    meta: [
        {
            name: 'description',
            content: headTitle,
        },
    ],
})
</script>
