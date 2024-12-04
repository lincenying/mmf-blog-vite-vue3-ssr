import type { UserConfigExport } from 'vite'

import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

import { viteMockServe } from '@lincy/vite-plugin-mock'
import UnoCSS from 'unocss/vite'
import { defineConfig, loadEnv } from 'vite'

import Build from './vite.config.build'
import Components from './vite.config.components'
import Css from './vite.config.css'
import Macros from './vite.config.macros'
import PWA from './vite.config.pwa'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))

    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

    const localMock = true

    const config: UserConfigExport = {
        base: '/',
        server: Build.server,
        build: Build.build,
        css: Css,
        plugins: [
            UnoCSS({}),
            viteMockServe({
                mockPath: 'mock',
                enable: command === 'serve' && localMock,
                logger: true,
            }),
            ...Macros(),
            ...Components(),
            ...PWA(),
        ],
        resolve: {
            alias: {
                '@': path.join(__dirname, './src'),
                '~': path.join(__dirname, './src'),
            },
        },
    }
    return config
})
