import { ElLoading, ElMessage as _ElMessage, ElMessageBox as _ElMessageBox } from 'element-plus'

import type { App } from 'vue'

function install(app: App) {
    app.use(ElLoading)
    app.config.globalProperties.$msgbox = _ElMessageBox
    app.config.globalProperties.$alert = _ElMessageBox.alert
    app.config.globalProperties.$confirm = _ElMessageBox.confirm
    app.config.globalProperties.$prompt = _ElMessageBox.prompt
    app.config.globalProperties.$message = _ElMessage
    return app
}
export default install
export const ElMessage = _ElMessage
export const ElMessageBox = _ElMessageBox
