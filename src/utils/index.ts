import { ElMessage } from '@/plugins/element'

interface IShowMsgConfig {
    content?: string
    type?: 'success' | 'warning' | 'info' | 'error'
}

/**
 * element-plus弹窗
 * @param config 弹窗数据
 * @example
 * ```
 * showMsg('content')
 * showMsg({ type: 'success' | 'warning' | 'info' | 'error', content: 'content'})
 * ```
 */
export function showMsg(config: IShowMsgConfig | string | string[]) {
    let content: string
    let type: 'success' | 'warning' | 'info' | 'error'
    if (!config) {
        content = '接口返回数据错误'
        type = 'error'
    }
    else if (typeof config === 'string') {
        content = config
        type = 'error'
    }
    else if (Array.isArray(config)) {
        content = config.join(', ')
        type = 'error'
    }
    else {
        content = config.content || '接口返回数据错误'
        type = config.type || 'error'
    }
    ElMessage[type](content)
}
