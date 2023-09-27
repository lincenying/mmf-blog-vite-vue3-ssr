declare module '*.vue' {
    import type { defineComponent } from 'vue'

    const Component: ReturnType<typeof defineComponent>
    export default Component
}

export {}
declare module 'vue' {
    interface ComponentCustomOptions {
        asyncData?: (ctx: import('./types').AsyncDataConfig) => Promise<void | void[]>
    }
}
