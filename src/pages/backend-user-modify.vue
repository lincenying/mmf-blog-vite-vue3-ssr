<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <form>
                <a-input title="昵称">
                    <input type="text" v-model="form.username" placeholder="昵称" class="base-input" name="username" />
                    <span class="input-info error">请输入昵称</span>
                </a-input>
                <a-input title="邮箱">
                    <input type="text" v-model="form.email" placeholder="邮箱" class="base-input" name="email" />
                    <span class="input-info error">请输入邮箱</span>
                </a-input>
                <a-input title="密码">
                    <input type="password" v-model="form.password" placeholder="密码" class="base-input" name="password" />
                    <span class="input-info error">请输入密码</span>
                </a-input>
            </form>
        </div>
        <div class="settings-footer">
            <a @click="handleModify" href="javascript:;" class="btn btn-yellow">编辑用户</a>
            <router-link to="/backend/user/list" class="btn btn-blue">返回</router-link>
        </div>
    </div>
</template>

<script setup>
import api from '@/api/index-client'

defineOptions({
    name: 'backend-user-modify',
    asyncData({ store, route, api }) {
        const backendUserStore = useBackendUserStore(store)
        return backendUserStore.getUserItem({ id: route.params.id, path: route.path, from: 'backend' }, api)
    }
})

// eslint-disable-next-line no-unused-vars
const { ctx, options, route, router, globalStore, appShellStore, useLockFn } = useGlobal('backend-user-modify')

// pinia 状态管理 ===>
const backendUserStore = useBackendUserStore()
const { item } = $(storeToRefs(backendUserStore))

const [loading, toggleLoading] = useToggle(false)

const form = reactive({
    id: route.params.id,
    username: '',
    email: '',
    password: ''
})

watch(item, val => {
    form.username = val.data.username
    form.email = val.data.email
})

onMounted(async () => {
    if (item && item.data) {
        form.username = item.data.username
        form.email = item.data.email
    }
})

const handleModify = async () => {
    if (!form.username || !form.email) {
        showMsg('请将表单填写完整!')
        return
    }
    if (loading.value) return
    toggleLoading(true)
    const { code, data, message } = await api.post('backend/user/modify', form)
    toggleLoading(false)
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        backendUserStore.updateUserItem(data)
        router.push('/backend/user/list')
    }
}

const headTitle = computed(() => {
    return '用户编辑 - M.M.F 小屋'
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
