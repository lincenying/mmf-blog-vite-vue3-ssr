<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <a-input title="标题">
                <input v-model="form.title" type="text" placeholder="标题" class="base-input" name="title">
                <span class="input-info error">请输入标题</span>
            </a-input>
            <a-input title="分类" classes="select-item-wrap">
                <i class="icon icon-arrow-down" />
                <select v-model="form.category" class="select-item" name="category">
                    <option value="">请选择分类</option>
                    <option v-for="val in lists" :key="val._id" :value="val._id">{{ val.cate_name }}</option>
                </select>
                <span class="input-info error">请输入分类</span>
            </a-input>
            <div class="settings-section">
                <div id="modify-content" class="settings-item-content">
                    <client-only>
                        <v-md-editor
                            v-model="form.content"
                            :disabled-menus="[]"
                            mode="edit"
                            height="500px"
                            @upload-image="handleUploadImage"
                        />
                    </client-only>
                </div>
            </div>
        </div>
        <div class="settings-footer">
            <a href="javascript:;" class="btn btn-yellow" @click="handleModify">编辑文章</a>
            <router-link to="/backend/article/list" class="btn btn-blue">返回</router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { AnyFn } from '@vueuse/core'
import type { Article, Upload } from '@/types'
import api from '@/api/index-client'
import { uploadApi } from '@/api/upload-api'

defineOptions({
    name: 'BackendArticleModify',
    asyncData(ctx) {
        const { store, route, api } = ctx
        const globalCategoryStore = useGlobalCategoryStore(store)
        return globalCategoryStore.getCategoryList({ limit: 99, path: route.fullPath }, api)
    },
})

const { ctx } = useGlobal()
const route = useRoute()
const router = useRouter()

// pinia 状态管理 ===>
const globalCategoryStore = useGlobalCategoryStore()
const { lists } = $(storeToRefs(globalCategoryStore))

const backendArticleStore = useBackendArticleStore()
const { item } = $(storeToRefs(backendArticleStore))

const [loading, toggleLoading] = useToggle(false)

const form = reactive({
    id: route.params.id,
    title: '',
    category: '',
    category_name: '',
    category_old: '',
    content: '',
    html: '',
})

watch(
    () => form.category,
    (val) => {
        const obj = lists.find(item => item._id === val)
        if (obj)
            form.category_name = obj.cate_name
    },
)

watch(
    () => item,
    (val) => {
        if (val.data) {
            form.title = val.data.title
            form.category_old = val.data.category
            form.category = val.data.category
            form.content = val.data.content
        }
    },
    {
        deep: true,
    },
)

onMounted(async () => {
    backendArticleStore.getArticleItem({ id: route.params.id })
})

async function handleModify() {
    if (!form.title || !form.category || !form.content) {
        showMsg('请将表单填写完整!')
        return
    }
    if (loading.value)
        return
    toggleLoading(true)
    // form.html = this.$refs.md.d_render
    const { code, data, message } = await api.post<Article>('backend/article/modify', form)
    toggleLoading(false)
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        backendArticleStore.updateArticleItem(data)
        router.push('/backend/article/list')
    }
}

async function handleUploadImage(event: EventTarget, insertImage: AnyFn, files: FileList) {
    const loader = ctx.$loading.show()

    const formData = new FormData()
    formData.append('file', files[0])
    const { data } = await api.file<Upload>(`${uploadApi}/ajax.php?action=upload`, formData)
    if (data && data.filepath) {
        insertImage({
            url: `${uploadApi}/${data.filepath}`,
            desc: '',
            // width: 'auto',
            // height: 'auto',
        })
    }

    loader.hide()
}

const headTitle = ref('编辑文章 - M.M.F 小屋')
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
