import type { App } from 'vue'

type VMdEditorModule = typeof import('./v-md-editor').default

let loadPromise: Promise<VMdEditorModule> | null = null
let editorModule: VMdEditorModule | null = null
let installed = false

/**
 * 按需加载 Markdown 编辑器及其样式，并注册到当前应用。
 * 仅后台文章编辑页需要，避免打进前台首屏 vendor。
 */
export async function ensureVMdEditor(app: App): Promise<VMdEditorModule> {
    if (!loadPromise) {
        loadPromise = (async () => {
            await import('@kangc/v-md-editor/lib/style/base-editor.css')
            const mod = await import('./v-md-editor')
            return mod.default
        })()
    }

    editorModule = await loadPromise

    if (!installed) {
        app.use(editorModule)
        installed = true
    }

    return editorModule
}
