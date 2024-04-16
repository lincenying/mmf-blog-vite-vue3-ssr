import fs from 'node:fs'
import polyfillLibrary from 'polyfill-library'

polyfillLibrary.getPolyfillString({
    uaString: 'Chrome/63',
    minify: true,
    features: {
        es2015: { flags: ['gated'] },
        es2016: { flags: ['gated'] },
        es2017: { flags: ['gated'] },
        es2018: { flags: ['gated'] },
        es2019: { flags: ['gated'] },
        es2020: { flags: ['gated'] },
        es2021: { flags: ['gated'] },
        es2022: { flags: ['gated'] },
        fetch: { flags: ['gated'] },
    },
    excludes: ['AggregateError'],
}).then((bundleString) => {
    if (typeof bundleString === 'string') {
        fs.writeFileSync('./public/static/js/polyfill.js', bundleString)
    }
})
