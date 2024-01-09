<template>
    <div class="card card-trending">
        <h2 class="card-title">热门文章</h2>
        <div class="card-content">
            <div v-for="(item, index) in trending" :key="item._id" class="trending-item">
                <span class="trending-rank-num">{{ index + 1 }}</span>
                <a href="javascript:;" :to="`/article/${item._id}`" class="trending-title" @click="goTo(item._id)">{{ item.title }}</a>
                <div class="trending-meta">
                    <div class="trending-meta-item"><i class="icon icon-action-voteup" />{{ item.like }}</div>
                    <div class="trending-meta-item"><i class="icon icon-action-comment" />{{ item.comment_count }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Article } from '@/types'

defineOptions({
    name: 'AsideTrending',
})

const props = defineProps<{
    trending: Article[]
}>()

const { trending } = $(toRefs(props))

const router = useRouter()
function goTo(id: string) {
    console.log(id)
    router.push(`/article/${id}`)
}
</script>
