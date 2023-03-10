<template>
    <div class="home-feeds cards-wrap">
        <div class="settings-main card">
            <div class="settings-main-content">
                <form>
                    <a-input title="当前密码">
                        <input
                            type="password"
                            v-model="form.old_password"
                            placeholder="当前密码"
                            class="base-input"
                            name="old_password"
                            autocomplete="off"
                        />
                    </a-input>
                    <a-input title="新的密码">
                        <input type="password" v-model="form.password" placeholder="新的密码" class="base-input" name="password" autocomplete="off" />
                    </a-input>
                    <a-input title="确认密码">
                        <input
                            type="password"
                            v-model="form.re_password"
                            placeholder="确认密码"
                            class="base-input"
                            name="re_password"
                            autocomplete="off"
                        />
                    </a-input>
                </form>
            </div>
            <div class="settings-footer"><a @click="handleSubmit" href="javascript:;" class="btn btn-yellow">保存设置</a></div>
        </div>
    </div>
</template>

<script setup>
import api from '@/api/index-client'

defineOptions({
    name: 'frontend-user-password'
})

// eslint-disable-next-line no-unused-vars
const { ctx, options, route, router, globalStore, appShellStore, useLockFn } = useGlobal('frontend-user-password')

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
    const { code, message } = await api.post('frontend/user/password', form)
    if (code === 200) {
        showMsg({ type: 'success', content: message })
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
</script>
