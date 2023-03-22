<template>
    <div class="actions-wrap">
        <a v-if="item.like_status" href="javascript:;" class="action-item active" @click="handleLike">
            <i class="icon icon-action-voteup-active"></i><span class="text">{{ item.like }} 赞</span>
        </a>
        <a v-else href="javascript:;" class="action-item" @click="handleLike">
            <i class="icon icon-action-voteup"></i><span class="text">{{ item.like }} 赞</span>
        </a>
        <a href="javascript:;" class="action-item">
            <i class="icon icon-action-comment"></i><span class="text">{{ item.comment_count }} 评论</span>
        </a>
        <a href="javascript:;" class="action-item action-item-fav">
            <i class="icon icon-action-fav"></i><span class="text">{{ item.visit }} 浏览</span>
        </a>
        <a href="javascript:;" class="action-item" @click="handleShare"> <i class="icon icon-action-share"></i><span class="text">分享</span> </a>
    </div>
</template>
<script setup lang="ts">
import type { Article } from '@/types'

import api from '@/api/index-client'

const prop = defineProps<{
    item: Article
}>()

defineOptions({
    name: 'item-actions'
})

const { item } = $(toRefs(prop))

// eslint-disable-next-line no-unused-vars
const { globalStore } = useGlobal()

const { cookies } = $(storeToRefs(globalStore))

const frontendArticleStore = useFrontendArticleStore()

const isLogin = $computed(() => !!cookies.user)

const handleLike = useLockFn(async () => {
    if (!isLogin) {
        showMsg('请先登录!')
        globalStore.setLoginModal(true)
        return
    }
    let url = 'frontend/like'
    if (item.like_status) url = 'frontend/unlike'
    const { code, message } = await api.get(url, { id: item._id })
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        frontendArticleStore.modifyLikeStatus({
            id: item._id,
            status: !item.like_status
        })
    }
})
const handleShare = () => {
    const top = window.screen.height / 2 - 250
    const left = window.screen.width / 2 - 300
    const title = `${item.title} - M.M.F 小屋`
    const url = `https://www.mmxiaowu.com/article/${item._id}`
    window.open(
        `http://service.weibo.com/share/share.php?title=${encodeURIComponent(
            title.replace(/&nbsp;/g, ' ').replace(/<br \/>/g, ' ')
        )}&url=${encodeURIComponent(url)}`,
        '分享至新浪微博',
        `height=500, width=600, top=${top}, left=${left}, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no`
    )
}
</script>
