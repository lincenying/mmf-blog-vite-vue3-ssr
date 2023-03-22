/* eslint-disable no-useless-concat */
import type { App } from 'vue'
import element from './element'
import filters from '@/filters'
import { oc } from '@/utils'

function install(app: App) {
    app.config.globalProperties.$oc = oc

    element(filters(app))
}
export default {
    install
}
