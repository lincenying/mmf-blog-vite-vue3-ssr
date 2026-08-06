/**
 * 可选：为极旧浏览器生成 polyfill 包。
 * 当前构建目标为 es2022，默认不再注入 polyfill；需要时执行 `pnpm build:polyfill`。
 */
import fs from 'node:fs'

import polyfillLibrary from 'polyfill-library'

polyfillLibrary.getPolyfillString({
    uaString: 'Mozilla/5.0 (compatible; modern)',
    minify: true,
    features: {
        es2022: { flags: ['gated'] },
        fetch: { flags: ['gated'] },
    },
    excludes: ['AggregateError'],
}).then((bundleString) => {
    if (typeof bundleString === 'string') {
        fs.writeFileSync('./public/static/js/polyfill.js', bundleString)
    }
})
