import { readFile } from 'node:fs/promises'
import lincy from '@lincy/eslint-config'
import plugin from '@unocss/eslint-plugin'

const autoImport = JSON.parse(
    await readFile(new URL('./.eslintrc-auto-import.json', import.meta.url)),
)

const config = lincy(
    {
        overrides: {
            ignores: [
                '**/assets',
                '**/static',
            ],
        },
    },
    {
        plugins: {
            '@unocss': plugin,
        },
        rules: {
            ...plugin.configs.recommended.rules,
            '@unocss/order': 'off',
        },
    },
    {
        languageOptions: {
            globals: {
                ...autoImport.globals,
            },
        },
    },
)

export default config
