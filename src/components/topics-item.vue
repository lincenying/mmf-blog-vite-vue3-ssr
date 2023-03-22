<template>
    <div class="card feed">
        <div class="feed-content">
            <div class="feed-source-time">
                <span class="feed-source"
                    >来自分类
                    <router-link :to="`/category/${item.category}`" class="feed-minor-link">{{ item.category_name }}</router-link>
                </span>
                <span class="feed-time">{{ item.update_date }}</span>
            </div>
            <div class="feed-main-link-wrap">
                <router-link :to="`/article/${item._id}`" class="feed-main-link">{{ item.title }}</router-link>
            </div>
            <div class="feed-desc-wrap">
                <div class="feed-article-content markdown-body">{{ item.content }}</div>
            </div>
        </div>
        <item-actions :item="item"></item-actions>
    </div>
</template>
<script setup lang="ts">
import type { Article } from '@/types'

const prop = defineProps<{
    item: Article
}>()

defineOptions({
    name: 'topics-item'
})

const { item } = $(toRefs(prop))
</script>
