<template>
    <div class="card">
        <div class="comments">
            <div class="comment-post-wrap">
                <img :src="useAvatar(userEmail)" alt="" class="avatar-img">
                <div class="comment-post-input-wrap base-textarea-wrap">
                    <textarea id="content" v-model="form.content" class="base-input textarea-input" cols="30" rows="4" />
                </div>
                <div class="comment-post-actions"><a href="javascript:;" class="btn btn-blue" @click="handlePostComment">发表评论</a></div>
            </div>
            <div class="comment-items-wrap">
                <div v-for="item in comments.data" :key="item._id" class="comment-item">
                    <a href="javascript:;" class="comment-author-avatar-link">
                        <img :src="useAvatar(item.userid.email)" alt="" class="avatar-img">
                    </a>
                    <div class="comment-content-wrap">
                        <span class="comment-author-wrap">
                            <a href="javascript:;" class="comment-author">{{ item.userid.username }}</a>
                        </span>
                        <div class="comment-content">{{ item.content }}</div>
                        <div class="comment-footer">
                            <span class="comment-time">{{ item.creat_date }}</span>
                            <a href="javascript:;" class="comment-action-item comment-reply" @click="handleReply(item)">回复</a>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="comments.hasNext" class="load-more-wrap">
                <a v-if="!loading" href="javascript:;" class="comments-load-more" @click="handleLoadComment">加载更多</a>
                <a v-else href="javascript:;" class="comments-load-more">加载中...</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Comment, CommentStoreList } from '~/types'

defineOptions({
    name: 'FrontendComment',
})

const props = defineProps<{
    comments: CommentStoreList
}>()

const { comments } = $(toRefs(props))

const globalStore = useGlobalStore()
const { cookies } = $(toRefs(globalStore))

const globalCommentStore = useGlobalCommentStore()

const [loading, toggleLoading] = useToggle(false)

const route = useRoute()
const form = reactive({
    id: route.params.id,
    content: '',
})

const user = $computed(() => cookies.user)
const userEmail = $computed(() => cookies.useremail)

async function handleLoadComment() {
    toggleLoading(true)
    await globalCommentStore.getCommentList({
        id: route.params.id,
        page: comments.page + 1,
        limit: 10,
    })
    toggleLoading(false)
}
const handlePostComment = useLockFn(async () => {
    if (!user) {
        showMsg('请先登录!')
        globalStore.setLoginModal(true)
    }
    else if (form.content === '') {
        showMsg('请输入评论内容!')
    }
    else {
        const { code, data } = await capi.post<Comment>('frontend/comment/insert', form)
        if (code === 200) {
            form.content = ''
            showMsg({ type: 'success', content: '评论发布成功!' })
            globalCommentStore.insertCommentItem(data)
        }
    }
})
function handleReply(item: Comment) {
    form.content = `回复 @${item.userid?.username}: `
    const content: HTMLTextAreaElement = document.querySelector('#content')!
    content.focus()
}
</script>
