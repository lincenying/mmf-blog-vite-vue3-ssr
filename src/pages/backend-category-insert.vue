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
        <div class="settings-footer"><a href="javascript:;" class="btn btn-yellow" @click="handleInsert">添加分类</a></div>
    </div>
</template>

<script setup lang="ts">
import api from '@/api/index-client'
import type { Category } from '@/types'

defineOptions({
    name: 'BackendCategoryInsert',
})

const router = useRouter()

// pinia 状态管理 ===>
const globalCategoryStore = useGlobalCategoryStore()
const { item } = $(storeToRefs(globalCategoryStore))

const [loading, toggleLoading] = useToggle(false)

const form = reactive({
    cate_name: '',
    cate_order: '',
})

watch(item, (val) => {
    if (val.data) {
        form.cate_name = val.data.cate_name
        form.cate_order = val.data.cate_order
    }
})

onMounted(() => {
    if (item && item.data) {
        form.cate_name = item.data.cate_name
        form.cate_order = item.data.cate_order
    }
})

async function handleInsert() {
    if (!form.cate_name || !form.cate_order) {
        showMsg('请将表单填写完整!')
        return
    }
    if (loading.value)
        return
    toggleLoading(true)
    const { code, data, message } = await api.post<Category>('backend/category/insert', form)
    toggleLoading(false)
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        globalCategoryStore.insertCategoryItem({
            ...form,
            ...data,
        })
        router.push('/backend/category/list')
    }
}

const headTitle = ref('添加分类 - M.M.F 小屋')
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
