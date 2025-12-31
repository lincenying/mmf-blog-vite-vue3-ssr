import VueMarkdownEditor from '@kangc/v-md-editor'
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number'
import vuePressTheme from '@kangc/v-md-editor/lib/theme/vuepress'

// Prism
import Prism from 'prismjs'

// highlight code
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-twig'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-sass'
import 'prismjs/components/prism-less'
import 'prismjs/components/prism-bash'

VueMarkdownEditor
    .use(vuePressTheme, {
        Prism,
        codeHighlightExtensionMap: {
            vue: 'html',
        },
        extend(md: any) {
            md.set({
                breaks: true, // 启用换行符转换
                html: true, // 允许 HTML 标签
                linkify: true, // 自动转换 URL 为链接
                typographer: true, // 启用更美观的排版
            })
        },
    })
    .use((createLineNumbertPlugin.default || createLineNumbertPlugin)())

export default VueMarkdownEditor
