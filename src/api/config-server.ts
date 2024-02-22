import { LRUCache } from 'lru-cache'

import apiDomain from './url.js'

const cached = true

const cache: Nullable<LRUCache<string, Objable>> = (cached && new LRUCache({
    max: 1000,
})) || null

const config = {
    api: `${apiDomain}/api/`,
    port: 8080,
    timeout: 30000,
    cached: cache,
}

export default config
