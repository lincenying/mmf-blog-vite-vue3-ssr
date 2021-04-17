/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
    register(`/sw.js`, {
        registrationOptions: { scope: '.' },
        ready() {
            console.log('应用由 “Service Worker” 从缓存中提供\n 有关更多详细信息，请访问 https://goo.gl/AFskqB')
        },
        registered() {
            console.log('“Service Worker” 已注册')
        },
        cached() {
            console.log('内容已缓存以供脱机使用')
        },
        updatefound() {
            console.log('正在下载新内容...')
        },
        updated() {
            console.log('有新内容可用, 请刷新...')
            const metas = document.head.getElementsByTagName('meta')

            for (let i = 0, len = metas.length; i < len; i++) {
                const meta = metas[i]

                if (meta.name === 'theme-color') {
                    meta.content = '#000'
                }
            }
            const html = `
                <div class="app-refresh" id="app-refresh">
                    <div class="app-refresh-wrap" onclick="location.reload()">
                        <label>发现新的版本, 请刷新加载最新版本</label>
                        <span>点击刷新</span>
                    </div>
                </div>
            `
            document.body.insertAdjacentHTML('beforeEnd', html)
            setTimeout(function () {
                document.getElementById('app-refresh').className += ' app-refresh-show'
            }, 16)
        },
        offline() {
            console.log('找不到互联网连接, 应用正在离线模式下运行')
        },
        error(error) {
            console.error('“Service Worker” 注册期间出错:', error)
        }
    })
}
