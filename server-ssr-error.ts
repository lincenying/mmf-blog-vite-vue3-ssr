import type { Response } from 'express'

/**
 * 将文本中的 HTML 特殊字符转义，避免错误页反射 XSS。
 */
function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
}

/**
 * SSR 渲染失败时写回响应；`exposeStack` 为 true 时输出堆栈（仅建议开发环境）。
 */
export function handleSsrRouteError(res: Response, err: unknown, exposeStack: boolean): void {
    const error = err instanceof Error ? err : new Error(String(err))
    console.error('[SSR]', error.stack || error.message)
    res.status(500).set({ 'Content-Type': 'text/html; charset=utf-8' })
    if (exposeStack) {
        const body = escapeHtml(error.stack || error.message)
        res.end(`<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8"><title>500</title></head><body><pre>${body}</pre></body></html>`)
    }
    else {
        res.end('<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8"><title>错误</title></head><body><p>服务器繁忙，请稍后重试。</p></body></html>')
    }
}
