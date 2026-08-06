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
import type { IArticle, IUpload } from '~/types'

import { useGlobal } from '@/composables'
import { ensureVMdEditor } from '@/plugins/load-v-md-editor'
import useBackendArticleStore from '@/stores/use-backend-article-store'
import { useGlobalCategoryStore } from '@/stores/use-global-category-store'

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
const instance = getCurrentInstance()

// pinia 状态管理 ===>
const globalCategoryStore = useGlobalCategoryStore()
const { lists } = $(storeToRefs(globalCategoryStore))

const backendArticleStore = useBackendArticleStore()

let isClient = $ref(false)
let markdownEditor: Awaited<ReturnType<typeof ensureVMdEditor>> | null = null

const frontHtml = ref(true)

const [loading, toggleLoading] = useToggle(false)

const form = reactive({
    title: '',
    category: '',
    content: '',
    html: '',
})

/**
 * 客户端挂载后按需加载并注册 Markdown 编辑器。
 */
onMounted(async () => {
    if (!instance) {
        return
    }
    markdownEditor = await ensureVMdEditor(instance.appContext.app)
    isClient = true
})

/**
 * 提交新增文章表单。
 */
async function handleInsert() {
    if (!form.title || !form.category || !form.content) {
        showMsg('请将表单填写完整!')
        return
    }
    if (loading.value) {
        return
    }
    toggleLoading(true)
    if (frontHtml.value && markdownEditor) {
        const html = markdownEditor.vMdParser.themeConfig.markdownParser.render(form.content)
        form.html = html
    }
    const { code, data } = await capi.post<IArticle>('backend/article/insert', form)
    toggleLoading(false)
    if (code === 200) {
        showMsg({ type: 'success', content: '添加成功!' })
        backendArticleStore.insertArticleItem(data)
        router.push('/backend/article/list')
    }
}

/**
 * 处理编辑器图片上传并插入 Markdown。
 */
async function handleUploadImage(_event: EventTarget, insertImage: AnyFn, files: FileList) {
    const loader = ctx.$loading.show()

    const formData = new FormData()
    formData.append('file', files[0])
    try {
        const { data } = await capi.file<IUpload>(`${uploadApi}/api/fetch/upload`, formData)
        if (data && data.filepath) {
            insertImage({
                url: `${uploadApi}/${data.filepath}`,
                desc: '',
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
    title: headTitle,
    meta: [
        {
            name: 'description',
            content: headTitle,
        },
    ],
})
</script>
