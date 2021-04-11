<template>
    <div class="card">
        <div class="comments">
            <div class="comment-post-wrap">
                <img :src="$filters.avatar(userEmail)" alt="" class="avatar-img" />
                <div class="comment-post-input-wrap base-textarea-wrap">
                    <textarea v-model="form.content" id="content" class="textarea-input base-input" cols="30" rows="4"></textarea>
                </div>
                <div class="comment-post-actions"><a @click="postComment" href="javascript:;" class="btn btn-blue">发表评论</a></div>
            </div>
            <div class="comment-items-wrap">
                <div v-for="item in comments.data" :key="item._id" class="comment-item">
                    <a href="javascript:;" class="comment-author-avatar-link">
                        <img :src="$filters.avatar(item.userid.email)" alt="" class="avatar-img" />
                    </a>
                    <div class="comment-content-wrap">
                        <span class="comment-author-wrap">
                            <a href="javascript:;" class="comment-author">{{ item.userid.username }}</a>
                        </span>
                        <div class="comment-content">{{ item.content }}</div>
                        <div class="comment-footer">
                            <span class="comment-time">{{ item.creat_date }}</span>
                            <a @click="handleReply(item)" href="javascript:;" class="comment-action-item comment-reply">回复</a>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="comments.hasNext" class="load-more-wrap">
                <a v-if="!loading" @click="loadcomment()" href="javascript:;" class="comments-load-more">加载更多</a>
                <a v-else href="javascript:;" class="comments-load-more">加载中...</a>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue'

import useGlobal from '@/mixins/global'
import { showMsg } from '@/utils'

export default {
    name: 'frontend-comment',
    props: ['comments'],
    setup(props) {
        // eslint-disable-next-line no-unused-vars
        const { ctx, options, route, router, store, useToggle, useHead, useLockFn, ref, reactive } = useGlobal()

        const [loading, toggleLoading] = useToggle(false)

        const form = reactive({
            id: route.params.id,
            content: ''
        })

        const user = computed(() => {
            return ctx.$oc(store.state, 'global.cookies.user')
        })
        const userEmail = computed(() => {
            return ctx.$oc(store.state, 'global.cookies.useremail')
        })

        const loadcomment = async () => {
            toggleLoading(true)
            await store.dispatch(`global/comment/getCommentList`, {
                id: route.params.id,
                page: props.comments.page + 1,
                limit: 10
            })
            toggleLoading(false)
        }
        const postComment = useLockFn(async () => {
            if (!user.value) {
                showMsg('请先登录!')
                store.commit('global/showLoginModal', true)
            } else if (form.content === '') {
                showMsg('请输入评论内容!')
            } else {
                const { code, data } = await store.$api.post('frontend/comment/insert', form)
                if (code === 200) {
                    form.content = ''
                    showMsg({
                        content: '评论发布成功!',
                        type: 'success'
                    })
                    store.commit('global/comment/insertCommentItem', data)
                }
            }
        })
        const handleReply = item => {
            console.log(item)
            form.content = '回复 @' + item.userid.username + ': '
            document.querySelector('#content').focus()
        }

        return {
            form,
            loading,
            userEmail,
            loadcomment,
            postComment,
            handleReply
        }
    }
}
</script>
