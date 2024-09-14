import VueMarkdownEditor from '@kangc/v-md-editor'
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index'
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
    })
    .use(createLineNumbertPlugin())

export default VueMarkdownEditor
