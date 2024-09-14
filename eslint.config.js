import { readFileSync } from 'node:fs'

import lincy from '@lincy/eslint-config'

const autoImport = JSON.parse(readFileSync(new URL('./.eslintrc-auto-import.json', import.meta.url)))

const config = lincy(
    {
        unocss: true,
        formatters: {
            css: false,
            graphql: true,
            html: true,
            markdown: true,
            toml: true,
        },
        overrides: {
            ignores: [
                '**/assets',
                '**/static',
            ],
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
