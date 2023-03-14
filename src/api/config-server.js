import lruCache from 'lru-cache'

import apiDomain from './url.js'

const cached = false

export default {
    api: `${apiDomain}/api/`,
    port: 8080,
    timeout: 30000,
    cached:
        cached &&
        new lruCache({
            max: 1000,
            maxAge: 1000 * 60 * 15
        }),
    cachedItem: {}
}
