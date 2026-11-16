import { LRUCache } from 'lru-cache'

import apiDomain from './url'

/** 是否开启`LRUCache` */
const cached = true

/** SSR 接口缓存项。只约定读取时用到的 data，AxiosResponse 可以写入 */
export interface ISsrApiCacheEntry {
    data: ResponseData<unknown>
}

const cache: Nullable<LRUCache<string, ISsrApiCacheEntry>> = (cached && new LRUCache({
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
