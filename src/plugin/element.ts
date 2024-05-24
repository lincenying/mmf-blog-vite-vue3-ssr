import { ElLoading, ElMessage as _ElMessage, ElMessageBox as _ElMessageBox } from 'element-plus'

import type { App } from 'vue'

/**
 * 为应用安装自定义功能扩展
 * @param app - 需要安装扩展的应用实例
 * @returns 返回经过扩展的应用实例
 */
function install(app: App) {
    // 在应用中使用ElLoading插件
    app.use(ElLoading)

    // 将_ElMessageBox实例及其方法挂载到app的全局属性上，以便在任何地方使用
    app.config.globalProperties.$msgbox = _ElMessageBox
    app.config.globalProperties.$alert = _ElMessageBox.alert
    app.config.globalProperties.$confirm = _ElMessageBox.confirm
    app.config.globalProperties.$prompt = _ElMessageBox.prompt

    // 将_ElMessage实例挂载到app的全局属性上，用于全局消息提示
    app.config.globalProperties.$message = _ElMessage

    return app
}
export default install
export const ElMessage = _ElMessage
export const ElMessageBox = _ElMessageBox
