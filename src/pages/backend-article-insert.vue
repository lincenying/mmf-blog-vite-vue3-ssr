<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <a-input title="标题">
                <input type="text" v-model="form.title" placeholder="标题" class="base-input" name="title" />
                <span class="input-info error">请输入标题</span>
            </a-input>
            <a-input title="分类" :classes="'select-item-wrap'">
                <i class="icon icon-arrow-down"></i>
                <select v-model="form.category" class="select-item" name="category">
                    <option value="">请选择分类</option>
                    <option v-for="item in category" :key="item._id" :value="item._id + '|' + item.cate_name">{{ item.cate_name }}</option>
                </select>
                <span class="input-info error">请输入分类</span>
            </a-input>
            <div class="settings-section">
                <div id="post-content" class="settings-item-content">
                    <client-only>
                        <v-md-editor
                            v-if="isClient"
                            v-model="form.content"
                            @upload-image="handleUploadImage"
                            :disabled-menus="[]"
                            mode="edit"
                            height="500px"
                        ></v-md-editor>
                    </client-only>
                </div>
            </div>
        </div>
        <div class="settings-footer"><a @click="handleInsert" href="javascript:;" class="btn btn-yellow">添加文章</a></div>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue'

import useGlobal from '@/mixins/global'
import { showMsg } from '@/utils'
import { uploadApi } from '@/api/upload-api'

import aInput from '../components/_input.vue'

export default {
    name: 'backend-article-insert',
    components: {
        aInput
    },
    async asyncData({ store, route }, config = { limit: 99 }) {
        config.all = 1
        await store.dispatch('global/category/getCategoryList', {
            ...config,
            path: route.path
        })
    },
    setup() {
        // eslint-disable-next-line no-unused-vars
        const { ctx, options, route, router, store, useToggle, useHead, useLockFn, ref, reactive } = useGlobal()

        const isClient = ref(false)

        const category = computed(() => {
            return store.getters['global/category/getCategoryList']
        })

        const [loading, toggleLoading] = useToggle(false)

        const form = reactive({
            title: '',
            category: '',
            content: '',
            html: ''
        })

        onMounted(async () => {
            await options.asyncData({ route, store })
            isClient.value = true
        })

        const handleInsert = async () => {
            if (!form.title || !form.category || !form.content) {
                showMsg('请将表单填写完整!')
                return
            }
            if (loading.value) return
            toggleLoading(true)
            // form.html = this.$refs.md.d_render
            const { code, data, message } = await store.$api.post('backend/article/insert', form)
            toggleLoading(false)
            if (code === 200) {
                showMsg({ type: 'success', content: message })
                store.commit('backend/article/insertArticleItem', data)
                router.push('/backend/article/list')
            }
        }

        const handleUploadImage = async (event, insertImage, files) => {
            const formdata = new FormData()
            formdata.append('file', files)
            const { data } = await store.$api.file(uploadApi + '/ajax.php?action=upload', formdata)
            if (data && data.filepath) {
                insertImage({
                    url: uploadApi + '/' + data.filepath,
                    desc: ''
                    // width: 'auto',
                    // height: 'auto',
                })
            }
        }

        const headTitle = computed(() => {
            return '发布文章 - M.M.F 小屋'
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
            isClient,
            form,
            category,
            handleInsert,
            handleUploadImage
        }
    }
}
</script>
