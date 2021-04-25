<template>
    <div class="main wrap">
        <div class="main-left">
            <div class="card card-answer">
                <div class="answer-content">
                    <div class="flex py-40px justify-center">
                        <img src="/static/images/error_1.jpg" alt="" />
                    </div>
                </div>
            </div>
        </div>
        <div class="main-right"><trending :trending="trending"></trending></div>
    </div>
</template>
<script>
import { onMounted, computed } from 'vue'

import useGlobal from '@/mixins/global'
import trending from '../components/aside-trending.vue'

export default {
    name: 'frontend-400',
    components: {
        trending
    },
    async asyncData({ store }) {
        await store.dispatch('frontend/article/getTrending')
    },
    setup() {
        // eslint-disable-next-line no-unused-vars
        const { ctx, options, route, router, store, useToggle, useHead, useLockFn, ref, reactive } = useGlobal()

        const trending = computed(() => {
            return store.getters['frontend/article/getTrending']
        })

        onMounted(() => {
            options.asyncData({ route, store })
        })

        const headTitle = computed(() => {
            return 'Page Not Found - M.M.F 小屋'
        })
        useHead({
            // Can be static or computed
            title: headTitle,
            meta: [
                {
                    name: `description`,
                    content: headTitle
                }
            ]
        })

        return {
            trending
        }
    }
}
</script>
