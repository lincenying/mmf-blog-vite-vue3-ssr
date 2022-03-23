const path = require('path')

import { loadEnv } from 'vite'
// import styleImport from 'vite-plugin-style-import'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
// import legacy from '@vitejs/plugin-legacy'
import { VitePWA } from 'vite-plugin-pwa'

export const ssrTransformCustomDir = () => {
    return {
        props: [],
        needRuntime: true
    }
}

// https://vitejs.dev/config/
export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

    const config = {
        server: {
            port: 7777,
            host: '0.0.0.0',
            hot: true,
            disableHostCheck: true,
            proxy: {
                '/api': {
                    target: 'http://localhost:4000',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': '/api'
                    }
                }
            }
        },
        build: {
            target: 'es2015',
            chunkSizeWarningLimit: 1024
        },
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true
                }
            }
        },
        plugins: [
            // legacy({
            //     targets: ['defaults', 'not IE 11']
            // }),
            vue({
                template: {
                    ssr: true,
                    compilerOptions: {
                        directiveTransforms: {
                            loading: ssrTransformCustomDir
                        }
                    }
                }
            }),
            // styleImport({
            //     libs: [
            //         {
            //             libraryName: 'ant-design-vue',
            //             esModule: true,
            //             resolveStyle: name => {
            //                 return `ant-design-vue/es/${name}/style/index`
            //             }
            //         },
            //         {
            //             libraryName: 'antd',
            //             esModule: true,
            //             resolveStyle: name => {
            //                 return `antd/es/${name}/style/index`
            //             }
            //         },
            //         {
            //             libraryName: 'vant',
            //             esModule: true,
            //             resolveStyle: name => {
            //                 return `vant/es/${name}/style/index`
            //             }
            //         },
            //         {
            //             libraryName: 'element-plus',
            //             resolveStyle: name => {
            //                 return `element-plus/lib/theme-chalk/${name}.css`
            //             },
            //             resolveComponent: name => {
            //                 return `element-plus/lib/${name}`
            //             }
            //         }
            //     ]
            // }),
            WindiCSS({
                scan: {
                    dirs: ['.'], // all files in the cwd
                    fileExtensions: ['vue'] // also enabled scanning for vue/js/ts
                }
            }),
            VitePWA({
                // mode: 'development',
                base: '/',
                manifest: {
                    name: 'M.M.F小屋',
                    short_name: 'M.M.F小屋',
                    theme_color: '#54d9e0',
                    background_color: '#ffffff',
                    icons: [
                        {
                            src: '/static/img/icons/android-chrome-48x48.png',
                            sizes: '48x48',
                            type: 'image/png'
                        },
                        {
                            src: '/static/img/icons/android-chrome-72x72.png',
                            sizes: '72x72',
                            type: 'image/png'
                        },
                        {
                            src: '/static/img/icons/android-chrome-96x96.png',
                            sizes: '96x96',
                            type: 'image/png'
                        },
                        {
                            src: '/static/img/icons/msapplication-icon-144x144.png',
                            sizes: '144x144',
                            type: 'image/png'
                        },
                        {
                            src: '/static/img/icons/android-chrome-168x168.png',
                            sizes: '168x168',
                            type: 'image/png'
                        },
                        {
                            src: '/static/img/icons/android-chrome-192x192.png',
                            sizes: '192x192',
                            type: 'image/png'
                        },
                        {
                            src: '/static/img/icons/android-chrome-512x512.png',
                            sizes: '512x512',
                            type: 'image/png'
                        }
                    ],
                    start_url: '/',
                    display: 'standalone',
                    lang: 'zh-CN'
                },
                workbox: {
                    cacheId: 'mmf-blog-vite-vue3',
                    runtimeCaching: [
                        {
                            urlPattern: /api\/.*/i,
                            handler: 'CacheFirst',
                            method: 'GET',
                            options: {
                                // networkTimeoutSeconds: 1,
                                cacheName: 'api-cache',
                                cacheableResponse: {
                                    statuses: [0, 200]
                                }
                            }
                        },
                        {
                            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
                            handler: 'CacheFirst',
                            method: 'GET',
                            options: {
                                // networkTimeoutSeconds: 1,
                                cacheName: 'cdn-cache',
                                cacheableResponse: {
                                    statuses: [0, 200]
                                }
                            }
                        },
                        {
                            urlPattern: /^https:\/\/fdn\.geekzu\.org\/.*/i,
                            handler: 'CacheFirst',
                            method: 'GET',
                            options: {
                                // networkTimeoutSeconds: 1,
                                cacheName: 'avatar-cache',
                                cacheableResponse: {
                                    statuses: [0, 200]
                                }
                            }
                        }
                    ]
                }
            })
        ],
        resolve: {
            alias: {
                '@': path.join(__dirname, './src')
            }
        }
    }
    return config
}
