const path = require('path')
// import styleImport from 'vite-plugin-style-import'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
// import legacy from '@vitejs/plugin-legacy'

export const ssrTransformCustomDir = () => {
    return {
        props: [],
        needRuntime: true
    }
}

// https://vitejs.dev/config/
export default () => {
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
            target: 'es2015'
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
                    fileExtensions: ['vue', 'js', 'ts'] // also enabled scanning for js/ts
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
