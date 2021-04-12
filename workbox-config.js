module.exports = {
    cacheId: 'mmf-blog-vite-vue3-ssr',
    globDirectory: 'dist/client/',
    globPatterns: ['**/*.{js,png,jpg,jpeg,css,woff2,ttf,svg}'],
    swDest: 'dist/client/sw.js',
    skipWaiting: true,
    runtimeCaching: [
        {
            urlPattern: /api/,
            handler: 'NetworkFirst',
            options: {
                networkTimeoutSeconds: 1,
                cacheName: 'api-cache',
                cacheableResponse: {
                    statuses: [0, 200]
                }
            }
        },
        {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net/,
            handler: 'NetworkFirst',
            options: {
                networkTimeoutSeconds: 1,
                cacheName: 'cdn-cache',
                cacheableResponse: {
                    statuses: [0, 200]
                }
            }
        }
    ]
}
