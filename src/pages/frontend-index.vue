<template>
    <div class="main wrap">
        <div class="main-left">
            <div class="home-feeds cards-wrap">
                <!-- <topics-item-none v-if="!topics.path">加载中, 请稍等...</topics-item-none> -->
                <div v-if="!topics.path" class="card card-content-loader">
                    <content-loader :height="160" :width="660" :speed="2" primaryColor="#f3f3f3" secondaryColor="#ecebeb">
                        <rect x="70" y="15" rx="4" ry="4" width="117" height="6.4" /> <rect x="70" y="35" rx="3" ry="3" width="85" height="6.4" />
                        <rect x="0" y="80" rx="3" ry="3" width="550" height="6.4" /> <rect x="0" y="100" rx="3" ry="3" width="620" height="6.4" />
                        <rect x="0" y="120" rx="3" ry="3" width="401" height="6.4" /> <rect x="0" y="140" rx="3" ry="3" width="501" height="6.4" />
                        <circle cx="30" cy="30" r="30" />
                    </content-loader>
                </div>
                <template v-else-if="topics.data.length > 0">
                    <topics-item v-for="item in topics.data" :item="item" :key="item._id"></topics-item>
                    <div class="load-more-wrap">
                        <a v-if="topics.hasNext" @click="loadMore()" href="javascript:;" class="load-more" :class="loading ? 'loading' : ''"
                            >{{ loading ? '加载中' : '更多' }} <i class="icon icon-circle-loading"></i>
                        </a>
                    </div>
                </template>
                <topics-item-none v-else>当前分类还没有文章...</topics-item-none>
            </div>
        </div>
        <div class="main-right">
            <category :category="category"></category>
            <trending :trending="trending"></trending>
            <other></other>
        </div>
    </div>
</template>
<script>
import { onActivated, computed } from 'vue'

import { ContentLoader } from 'vue-content-loader'

import saveScroll from '@/mixins/save-scroll'
import useGlobal from '@/mixins/global'

import topicsItem from '../components/topics-item.vue'
import topicsItemNone from '../components/topics-item-none.vue'
import category from '../components/aside-category.vue'
import trending from '../components/aside-trending.vue'
import other from '../components/aside-other.vue'

export default {
    name: 'frontend-index',
    components: {
        ContentLoader,
        topicsItem,
        topicsItemNone,
        category,
        trending,
        other
    },
    beforeRouteUpdate(to, form, next) {
        console.log(to)
        next()
    },
    setup() {
        // eslint-disable-next-line no-unused-vars
        const { ctx, options, route, router, store, useToggle, useHead, useLockFn, ref, reactive } = useGlobal()

        saveScroll()

        const topics = computed(() => {
            return store.getters['frontend/article/getArticleList']
        })
        const category = computed(() => {
            return store.getters['global/category/getCategoryList']
        })
        const trending = computed(() => {
            return store.getters['frontend/article/getTrending']
        })

        const [loading, toggleLoading] = useToggle(false)
        const loadMore = async (page = topics.value.page + 1) => {
            if (loading.value) return
            toggleLoading(true)
            await options.asyncData({ store, route }, { page })
            toggleLoading(false)
        }

        onActivated(() => {
            console.log('frontend-index onActivated:' + route.path)
            if (topics.value.path !== route.path) loadMore(1)
        })

        // onMounted(() => {
        //     loadMore(1)
        // })

        const headTitle = computed(() => {
            let title = 'M.M.F 小屋'
            const { id, key, by } = route.params
            if (id) {
                const obj = category.value.find(item => item._id === id)
                if (obj) {
                    title = obj.cate_name + ' - ' + title
                }
            } else if (key) {
                title = '搜索: ' + key + ' - ' + title
            } else if (by) {
                title = '热门 - ' + title
            }
            return title
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
            loading,
            topics,
            category,
            trending,
            loadMore
        }
    },
    async asyncData({ store, route }, config = { page: 1 }) {
        const {
            params: { id, key, by },
            path
        } = route
        await Promise.all([
            store.dispatch('global/category/getCategoryList'),
            store.dispatch('frontend/article/getTrending'),
            store.dispatch('frontend/article/getArticleList', { ...config, limit: 10, id, path, key, by })
        ])
    }
}
</script>
