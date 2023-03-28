import { ElMessage } from '@/plugin/element'

export const showMsg = (config: Record<string, any> | string) => {
    let content, type: 'success' | 'warning' | 'info' | 'error'
    if (!config) {
        content = '接口返回数据错误'
        type = 'error'
    } else if (typeof config === 'string') {
        content = config
        type = 'error'
    } else {
        content = config.content
        type = config.type
    }
    ElMessage[type](content)
}
