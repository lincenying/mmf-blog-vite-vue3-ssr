<template>
    <div class="card card-topics">
        <router-link v-for="item in category" :key="item._id" :to="`/category/${item._id}`" class="topic-item">
            <span class="avatar-link"><img src="/static/images/topic-1.png" class="avatar-image" alt="" /></span>
            <div>
                <h3 class="topic-title">{{ item.cate_name }}</h3>
                <p class="topic-meta">{{ item.cate_num || 0 }} 篇文章</p>
                <i class="icon icon-arrow-right"></i>
            </div>
        </router-link>
    </div>
</template>
<script setup lang="ts">
import type { Category } from '@/types'

const prop = defineProps<{
    category: Category[]
}>()

defineOptions({
    name: 'aside-category'
})

const { category } = $(toRefs(prop))
</script>
