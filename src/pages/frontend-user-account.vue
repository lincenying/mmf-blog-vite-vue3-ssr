<template>
    <div class="cards-wrap home-feeds">
        <div class="card settings-main">
            <div class="settings-main-content">
                <form>
                    <a-input title="昵称">
                        <input type="text" :value="username" placeholder="昵称" class="base-input" name="username" readonly>
                        <span class="input-info error">请输入昵称</span>
                    </a-input>
                    <a-input title="邮箱">
                        <input v-model="email" type="text" placeholder="邮箱" class="base-input" name="email">
                        <span class="input-info error">请输入邮箱</span>
                    </a-input>
                </form>
            </div>
            <div class="settings-footer">
                <a href="javascript:;" class="btn btn-yellow" @click="handleSubmit">保存设置</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IUser } from '~/types'
import { useLockFn } from '@/composables'
import { useGlobalStore } from '@/stores/use-global-store'

defineOptions({
    name: 'FrontendUserAccount',
})

const globalStore = useGlobalStore()

// pinia 状态管理 ===>
const { cookies } = storeToRefs(globalStore)

// SSR 可用 cookies 公开字段做初值；完整账号信息在 hydration 后拉取
const username = ref(cookies.value.username || '')
const email = ref(cookies.value.useremail || '')

/**
 * 拉取当前登录用户账号信息。
 */
async function getUser() {
    const { code, data } = await capi.get<IUser>('frontend/user/account', {})
    if (code === 200) {
        username.value = data.username
        email.value = data.email
    }
}

onMounted(() => {
    getUser()
})

const handleSubmit = useLockFn(async () => {
    const reg = /^[\w\-.]+@[\w-]+\.[\w-]+$/
    if (!email.value) {
        showMsg('请填写邮箱地址!')
        return
    }
    else if (!reg.test(email.value)) {
        showMsg('邮箱格式错误!')
        return
    }
    const { code } = await capi.post<'success' | 'error'>('frontend/user/account', {
        email: email.value,
        username: username.value,
        id: cookies.value.userid,
    })
    if (code === 200) {
        globalStore.setCookies({
            ...cookies.value,
            useremail: email.value,
        })
        showMsg({ type: 'success', content: '保存成功!' })
    }
})

const headTitle = ref('帐号 - M.M.F 小屋')

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
