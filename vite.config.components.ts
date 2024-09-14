import type { PluginOption } from 'vite'

import { unheadVueComposablesImports } from '@unhead/vue'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export default (): PluginOption[] => ([
    AutoImport({
        eslintrc: {
            enabled: true,
        },
        include: [
            /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
            /\.vue$/,
            /\.vue\?vue/, // .vue
            /\.md$/, // .md
        ],
        imports: [
            'vue',
            'vue-router',
            '@vueuse/core',
            {
                'pinia': ['storeToRefs'],
                'vue-router': ['createRouter', 'createWebHashHistory'],
                '@/utils': ['showMsg'],
                '@/api/index-client': [
                    ['default', 'capi'],
                ],
                '@/api/index-server': [
                    ['api', 'sapi'],
                ],
                '@/api/upload-api': [
                    'uploadApi',
                ],
            },
            unheadVueComposablesImports,
        ],
        dts: 'src/auto-imports.d.ts',
        dirs: ['src/components', 'src/composables', 'src/pinia'],
        resolvers: [
            ElementPlusResolver(),
        ],
        defaultExportByFilename: false,
        vueTemplate: true,
    }),
    Components({
        include: [
            /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
            /\.vue$/,
            /\.vue\?vue/, // .vue
            /\.md$/, // .md
        ],
        extensions: ['vue', 'tsx', 'jsx'],
        resolvers: [
            ElementPlusResolver(),
        ],
        dts: 'src/components.d.ts',
    }),
])
