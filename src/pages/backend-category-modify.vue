<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <a-input title="分类名称">
                <input v-model="form.cate_name" type="text" placeholder="分类名称" class="base-input" name="cate_name">
                <span class="input-info error">请输入分类名称</span>
            </a-input>
            <a-input title="分类排序">
                <input v-model="form.cate_order" type="text" placeholder="分类排序" class="base-input" name="cate_order">
                <span class="input-info error">请输入分类排序</span>
            </a-input>
        </div>
        <div class="settings-footer">
            <a href="javascript:;" class="btn btn-yellow" @click="handleModify">编辑分类</a>
            <router-link to="/backend/category/list" class="btn btn-blue">返回</router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Category } from '@/types'
import api from '@/api/index-client'

defineOptions({
    name: 'BackendCategoryModify',
    asyncData(ctx) {
        const { store, route, api } = ctx
        const globalCategoryStore = useGlobalCategoryStore(store)
        return globalCategoryStore.getCategoryItem({ path: route.fullPath, id: route.params.id }, api)
    },
})

const route = useRoute()
const router = useRouter()

// pinia 状态管理 ===>
const globalCategoryStore = useGlobalCategoryStore()
const { item } = $(storeToRefs(globalCategoryStore))

const [loading, toggleLoading] = useToggle(false)

const form = reactive({
    id: route.params.id,
    cate_name: '',
    cate_order: '',
})

watch(item, (val) => {
    if (val.data) {
        form.cate_name = val.data.cate_name
        form.cate_order = val.data.cate_order
    }
})

onMounted(async () => {})

async function handleModify() {
    if (!form.cate_name || !form.cate_order) {
        showMsg('请将表单填写完整!')
        return
    }
    if (loading.value)
        return
    toggleLoading(true)
    const { code, data, message } = await api.post<Category>('backend/category/modify', form)
    toggleLoading(false)
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        globalCategoryStore.updateCategoryItem(data)
        router.push('/backend/category/list')
    }
}

const headTitle = ref('编辑分类 - M.M.F 小屋')
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
