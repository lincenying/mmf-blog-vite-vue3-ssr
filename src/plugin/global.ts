/* eslint-disable no-useless-concat */
import type { App } from 'vue'
import element from './element'
import { oc } from '@/utils'

function install(app: App) {
    app.config.globalProperties.$oc = oc

    element(app)
}
export default {
    install
}
