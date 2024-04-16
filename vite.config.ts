import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

import type { UserConfigExport } from 'vite'
import { defineConfig, loadEnv } from 'vite'

import vuePlugin from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import VueMacros from 'unplugin-vue-macros'

import { viteMockServe } from '@lincy/vite-plugin-mock'
import UnoCSS from 'unocss/vite'

import Components from './vite.config.components'
import PWA from './vite.config.pwa'
import Build from './vite.config.build'

function charsetRemoval() {
    return {
        postcssPlugin: 'internal:charset-removal',
        AtRule: {
            charset: (atRule: any) => {
                if (atRule.name === 'charset') {
                    atRule.remove()
                }
            },
        },
    }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))

    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

    const localMock = true

    const config: UserConfigExport = {
        base: '/',
        plugins: [
            VueMacros.vite({
                plugins: {
                    vue: vuePlugin({
                        template: {
                            compilerOptions: {
                                isCustomElement: tag => ['def'].includes(tag),
                            },
                        },
                    }),
                    vueJsx: vueJsx(),
                },
            }),
            viteMockServe({
                mockPath: 'mock',
                enable: command === 'serve' && localMock,
                logger: true,
            }),
            ...Components(),
            UnoCSS({}),
            ...PWA(),
        ],
        resolve: {
            alias: {
                '@': path.join(__dirname, './src'),
            },
        },
        ...Build,
        css: {
            postcss: {
                plugins: [
                    charsetRemoval(),
                ],
            },
        },
    }
    return config
})
