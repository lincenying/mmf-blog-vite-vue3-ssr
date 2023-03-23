import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { loadEnv, defineConfig } from 'vite'

import vuePlugin from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { viteMockServe } from 'vite-plugin-mock'

import UnoCSS from 'unocss/vite'
import { createHtmlPlugin } from 'vite-plugin-html'

import VueMacros from 'unplugin-vue-macros/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { VitePWA } from 'vite-plugin-pwa'

import apiDomain from './src/api/url'

export const ssrTransformCustomDir = () => {
    return {
        props: [],
        needRuntime: true
    }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))

    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

    const localMock = true
    const prodMock = false

    const config = {
        server: {
            port: 7777,
            host: '0.0.0.0',
            hot: true,
            disableHostCheck: true,
            proxy: {
                '/api': {
                    target: apiDomain,
                    changeOrigin: true,
                    rewrite: (path: string) => path.replace(new RegExp(`^/api`), '/api')
                }
            }
        },
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true
                }
            }
        },
        plugins: [
            createHtmlPlugin({
                minify: false,
                inject: {
                    data: {
                        VITE_APP_ENV: process.env.VITE_APP_ENV,
                        VITE_APP_API_DOMAIN: process.env.VITE_APP_API_DOMAIN,
                        VITE_APP_API: process.env.VITE_APP_API,
                        MODE: mode
                    }
                }
            }),
            VueMacros({
                plugins: {
                    vue: vuePlugin({
                        template: {
                            compilerOptions: {
                                isCustomElement: tag => ['def'].includes(tag)
                            }
                        }
                    }),
                    vueJsx: vueJsx()
                }
            }),
            viteMockServe({
                mockPath: 'mock',
                localEnabled: command === 'serve' && localMock,
                prodEnabled: command !== 'serve' && prodMock,
                injectCode: `
                  import { setupProdMockServer } from './mockProdServer';
                  setupProdMockServer();
                `,
                logger: true
            }),
            AutoImport({
                eslintrc: {
                    enabled: true
                },
                include: [
                    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                    /\.vue$/,
                    /\.vue\?vue/, // .vue
                    /\.md$/ // .md
                ],
                imports: [
                    'vue',
                    'vue-router',
                    '@vueuse/core',
                    '@vueuse/head',
                    {
                        pinia: ['defineStore', 'storeToRefs'],
                        'vue-router': ['createRouter', 'createWebHashHistory'],
                        '@/utils': ['deepClone', 'deepMerge', '$is', 'showMsg']
                    }
                ],
                dts: 'src/auto-imports.d.ts',
                dirs: ['src/components', 'src/composables', 'src/pinia'],

                resolvers: [ElementPlusResolver()],
                defaultExportByFilename: false,
                vueTemplate: true,
                cache: false
            }),
            Components({
                include: [
                    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                    /\.vue$/,
                    /\.vue\?vue/, // .vue
                    /\.md$/ // .md
                ],
                extensions: ['vue', 'tsx', 'jsx'],
                resolvers: [ElementPlusResolver()],
                dts: 'src/components.d.ts'
            }),
            UnoCSS({
                /* options */
            }),
            VitePWA({
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
                        }
                    ]
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
})
