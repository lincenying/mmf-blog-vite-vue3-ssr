import { LRUCache } from 'lru-cache'

import apiDomain from './url'

/** 是否开启`LRUCache` */
const cached = true

const cache: Nullable<LRUCache<string, Objable>> = (cached && new LRUCache({
    max: 1000,
    ttl: 1000 * 10,
})) || null

const config = {
    api: `${apiDomain}/api/`,
    port: 8080,
    /** SSR 超时宜短，超时后走降级响应，避免拖垮 TTFB */
    timeout: 8000,
    cached: cache,
}

export default config
