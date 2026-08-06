import type { BuildOptions, ServerOptions } from 'vite'

import path from 'node:path'
import { fileURLToPath } from 'node:url'

import apiDomain from './src/api/url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const config: { server: ServerOptions, build: BuildOptions } = {
    server: {
        port: 7777,
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: apiDomain,
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, '/api'),
                configure: (proxy, _options) => {
                    proxy.on('proxyReq', (proxyReq, req, _res) => {
                        proxyReq.setHeader('X-Real-IP', req.socket.remoteAddress || 'unknown')
                    })
                },
            },
        },
        hmr: {
            port: 25678,
        },
    },
    build: {
        target: 'es2022',
        cssTarget: 'chrome90',
        minify: true,
        assetsInlineLimit: 4096,
        chunkSizeWarningLimit: 1000,
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
            },
            output: {
                manualChunks(id: string) {
                    // 处理css分块
                    if (id.includes('node_modules')) {
                        // 编辑器仅后台动态 import，不归入首屏 vendor
                        if (
                            id.includes('@kangc/v-md-editor')
                            || id.includes('/prismjs/')
                            || id.includes('\\prismjs\\')
                        ) {
                            return
                        }
                        if (id.includes('element-plus')) {
                            return 'element-plus'
                        }
                        return 'vendor'
                    }
                    if (id.includes('__uno.css')) {
                        return 'unocss'
                    }
                    // 按路由引入的样式保持独立，避免打进首屏 main-style
                    if (
                        id.includes('backend-settings')
                        || id.includes('/assets/css/vuepress')
                        || id.includes('/assets/css/hljs/')
                        || id.includes('base-editor')
                        || id.includes('/assets/styles/style/markdown')
                    ) {
                        return
                    }
                    if (id.includes('/assets/')) {
                        return 'main-style'
                    }
                },
            },
        },
    },
}

export default config
