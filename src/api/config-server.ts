import LruCache from 'lru-cache'

import apiDomain from './url.js'

const cached = false

const config = {
    api: `${apiDomain}/api/`,
    port: 8080,
    timeout: 30000,
    cached: (cached
        && new LruCache({
            max: 1000,
        })) as any,
    cachedItem: {},
}

export default config
