import type { PluginOption } from 'vite'

import vuePlugin from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default (): PluginOption[] => ([
    vuePlugin({
        template: {
            compilerOptions: {
                isCustomElement: (tag: string) => ['def'].includes(tag),
            },
        },
    }),
    vueJsx(),
])
