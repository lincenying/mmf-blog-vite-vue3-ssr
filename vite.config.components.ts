import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { unheadVueComposablesImports } from '@unhead/vue'
import type { PluginOption } from 'vite'

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
