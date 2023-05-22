import { VitePWA } from 'vite-plugin-pwa'

export default () => (VitePWA({
    // mode: 'development',
    base: '/',
    registerType: 'autoUpdate',
    workbox: {
        cacheId: 'mmf-blog-vite-vue3-ssr',
        globPatterns: ['**/*.{js,css}'],
        navigateFallback: null,
        runtimeCaching: [
            {
                urlPattern: /api\/.*/i,
                handler: 'CacheFirst',
                method: 'GET',
                options: {
                    // networkTimeoutSeconds: 1,
                    cacheName: 'api-cache',
                    cacheableResponse: {
                        statuses: [0, 200],
                    },
                },
            },
            {
                urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
                handler: 'CacheFirst',
                method: 'GET',
                options: {
                    // networkTimeoutSeconds: 1,
                    cacheName: 'cdn-cache',
                    cacheableResponse: {
                        statuses: [0, 200],
                    },
                },
            },
        ],
    },
    manifest: {
        name: 'M.M.F小屋',
        short_name: 'M.M.F小屋',
        theme_color: '#54d9e0',
        background_color: '#ffffff',
        icons: [
            {
                src: '/static/img/icons/android-chrome-48x48.png',
                sizes: '48x48',
                type: 'image/png',
            },
            {
                src: '/static/img/icons/android-chrome-72x72.png',
                sizes: '72x72',
                type: 'image/png',
            },
            {
                src: '/static/img/icons/android-chrome-96x96.png',
                sizes: '96x96',
                type: 'image/png',
            },
            {
                src: '/static/img/icons/msapplication-icon-144x144.png',
                sizes: '144x144',
                type: 'image/png',
            },
            {
                src: '/static/img/icons/android-chrome-168x168.png',
                sizes: '168x168',
                type: 'image/png',
            },
            {
                src: '/static/img/icons/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/static/img/icons/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
        start_url: '/',
        display: 'standalone',
        lang: 'zh-CN',
    },
}))
