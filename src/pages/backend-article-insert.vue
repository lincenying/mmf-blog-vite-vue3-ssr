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
                    <option v-for="item in lists" :key="item._id" :value="`${item._id}|${item.cate_name}`">{{ item.cate_name }}</option>
                </select>
                <span class="input-info error">请输入分类</span>
            </a-input>
            <div class="settings-section">
                <div id="post-content" class="settings-item-content">
                    <client-only>
                        <v-md-editor
                            v-if="isClient"
                            v-model="form.content"
                            :disabled-menus="[]"
                            mode="edit"
                            height="500px"
                            left-toolbar="undo redo clear | h bold italic strikethrough link | ul ol table hr | image quote code tip | save"
                            @upload-image="handleUploadImage"
                        />
                    </client-only>
                </div>
            </div>
        </div>
        <div class="settings-footer">
            <label mr-10px inline-flex items-center>
                <input v-model="frontHtml" type="checkbox" value="1">
                <span ml-5px>使用前端生成Html?</span>
            </label>
            <a href="javascript:;" class="btn btn-yellow" @click="handleInsert">添加文章</a>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { AnyFn } from '@vueuse/core'
import type { Article, Upload } from '~/types'

import VueMarkdownEditor from '@/plugin/v-md-editor'

defineOptions({
    name: 'BackendArticleInsert',
    asyncData(ctx) {
        const { store, route, api } = ctx
        const globalCategoryStore = useGlobalCategoryStore(store)
        return globalCategoryStore.getCategoryList({ limit: 99, path: route.fullPath }, api)
    },
})

const { ctx } = useGlobal()
const router = useRouter()

// pinia 状态管理 ===>
const globalCategoryStore = useGlobalCategoryStore()
const { lists } = $(storeToRefs(globalCategoryStore))

const backendArticleStore = useBackendArticleStore()

let isClient = $ref(false)

const frontHtml = ref(true)

const [loading, toggleLoading] = useToggle(false)

const form = reactive({
    title: '',
    category: '',
    content: '',
    html: '',
})

onMounted(async () => {
    isClient = true
})

async function handleInsert() {
    if (!form.title || !form.category || !form.content) {
        showMsg('请将表单填写完整!')
        return
    }
    if (loading.value) {
        return
    }
    toggleLoading(true)
    // form.html = this.$refs.md.d_render
    if (frontHtml.value) {
        const html = VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(form.content)
        form.html = html
    }
    const { code, data, message } = await capi.post<Article>('backend/article/insert', form)
    toggleLoading(false)
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        backendArticleStore.insertArticleItem(data)
        router.push('/backend/article/list')
    }
}

async function handleUploadImage(_event: EventTarget, insertImage: AnyFn, files: FileList) {
    const loader = ctx.$loading.show()

    const formData = new FormData()
    formData.append('file', files[0])
    try {
        const { data } = await capi.file<Upload>(`${uploadApi}/api/fetch/upload`, formData)
        if (data && data.filepath) {
            insertImage({
                url: `${uploadApi}/${data.filepath}`,
                desc: '',
                // width: 'auto',
                // height: 'auto',
            })
        }
    }
    catch (error) {
        console.log(error)
    }

    loader.hide()
}

const headTitle = ref('发布文章 - M.M.F 小屋')
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
