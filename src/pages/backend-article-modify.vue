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
                    <option v-for="item in category" :key="item._id" :value="item._id">{{ item.cate_name }}</option>
                </select>
                <span class="input-info error">请输入分类</span>
            </a-input>
            <div class="settings-section">
                <div id="modify-content" class="settings-item-content">
                    <client-only>
                        <v-md-editor
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
        <div class="settings-footer">
            <a @click="handleModify" href="javascript:;" class="btn btn-yellow">编辑文章</a>
            <router-link to="/backend/article/list" class="btn btn-blue">返回</router-link>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, watch } from 'vue'

import useGlobal from '@/mixins/global'
import { showMsg } from '@/utils'
import { uploadApi } from '@/api/upload-api'

import aInput from '../components/_input.vue'

export default {
    name: 'backend-article-modify',
    components: {
        aInput
    },
    setup() {
        // eslint-disable-next-line no-unused-vars
        const { ctx, options, route, router, store, useToggle, useHead, useLockFn, ref, reactive } = useGlobal()

        const category = computed(() => {
            return store.getters['global/category/getCategoryList']
        })

        const [loading, toggleLoading] = useToggle(false)

        const form = reactive({
            id: route.params.id,
            title: '',
            category: '',
            category_name: '',
            category_old: '',
            content: '',
            html: ''
        })

        watch(
            () => form.category,
            val => {
                const obj = category.value.find(item => item._id === val)
                if (obj) form.category_name = obj.cate_name
            }
        )

        onMounted(async () => {
            await options.asyncData({ route, store })
            const data = await store.dispatch('backend/article/getArticleItem', { id: route.params.id })
            form.title = data.title
            form.category_old = data.category
            form.category = data.category
            form.content = data.content
        })

        const handleModify = async () => {
            if (!form.title || !form.category || !form.content) {
                showMsg('请将表单填写完整!')
                return
            }
            if (loading.value) return
            toggleLoading(true)
            // form.html = this.$refs.md.d_render
            const { code, data, message } = await store.$api.post('backend/article/modify', form)
            toggleLoading(false)
            if (code === 200) {
                showMsg({ type: 'success', content: message })
                store.commit('backend/article/updateArticleItem', data)
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
            return '编辑文章 - M.M.F 小屋'
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
            form,
            category,
            handleModify,
            handleUploadImage
        }
    },
    async asyncData({ store, route }, config = { limit: 99 }) {
        config.all = 1
        await store.dispatch('global/category/getCategoryList', {
            ...config,
            path: route.path
        })
    }
}
</script>
