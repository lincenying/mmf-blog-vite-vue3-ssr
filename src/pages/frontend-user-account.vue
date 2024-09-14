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
import type { User } from '~/types'

defineOptions({
    name: 'FrontendUserAccount',
})

const globalStore = useGlobalStore()

// pinia 状态管理 ===>
const { cookies } = $(toRefs(globalStore))

let username = $ref('')
let email = $ref('')

async function getUser() {
    const { code, data } = await capi.get<User>('frontend/user/account', {})
    if (code === 200) {
        username = data.username
        email = data.email
    }
}

onMounted(() => {
    getUser()
})

const handleSubmit = useLockFn(async () => {
    const reg = /^[\w\-.]+@[\w-]+\.[\w-]+$/
    if (!email) {
        showMsg('请填写邮箱地址!')
        return
    }
    else if (!reg.test(email)) {
        showMsg('邮箱格式错误!')
        return
    }
    const { code, message } = await capi.post<'success' | 'error'>('frontend/user/account', {
        email,
        username,
        id: cookies.userid,
    })
    if (code === 200) {
        globalStore.setCookies({
            ...cookies,
            useremail: email,
        })
        showMsg({ type: 'success', content: message })
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
