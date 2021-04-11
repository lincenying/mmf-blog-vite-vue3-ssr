import lruCache from 'lru-cache'

const cached = false

export default {
    api: 'http://localhost:4000/api/',
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
