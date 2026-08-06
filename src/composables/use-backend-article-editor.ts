import type { AnyFn } from '@vueuse/core'
import type { App } from 'vue'
import type { IUpload } from '~/types'

import { useGlobal } from '@/composables'
import { ensureVMdEditor } from '@/plugins/load-v-md-editor'

type MarkdownEditor = Awaited<ReturnType<typeof ensureVMdEditor>>

/**
 * 后台文章编辑器共用逻辑：按需加载编辑器、图片上传、前端渲染 HTML。
 */
export function useBackendArticleEditor() {
    const { ctx } = useGlobal()
    const instance = getCurrentInstance()

    const isClient = ref(false)
    const frontHtml = ref(true)
    const [loading, toggleLoading] = useToggle(false)

    let markdownEditor: MarkdownEditor | null = null

    /**
     * 挂载后加载并注册 Markdown 编辑器。
     */
    async function setupEditor(app?: App) {
        const targetApp = app || instance?.appContext.app
        if (!targetApp) {
            return
        }
        markdownEditor = await ensureVMdEditor(targetApp)
        isClient.value = true
    }

    /**
     * 按需用前端 Markdown 解析器生成 HTML。
     */
    function renderHtml(content: string): string {
        if (!frontHtml.value || !markdownEditor) {
            return ''
        }
        return markdownEditor.vMdParser.themeConfig.markdownParser.render(content)
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
            if (data?.filepath) {
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

    /**
     * 校验文章表单必填字段。
     */
    function validateArticleForm(form: { title: string, category: string, content: string }): boolean {
        if (!form.title || !form.category || !form.content) {
            showMsg('请将表单填写完整!')
            return false
        }
        return true
    }

    return {
        isClient,
        frontHtml,
        loading,
        toggleLoading,
        setupEditor,
        renderHtml,
        handleUploadImage,
        validateArticleForm,
    }
}
