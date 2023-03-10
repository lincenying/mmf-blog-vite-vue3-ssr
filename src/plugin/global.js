/* eslint-disable no-useless-concat */
import ls from 'store2'

import filters from '@/filters'
import { oc, is, deepClone, deepMerge } from '@/utils'

function install(app) {
    app.config.globalProperties.$ls = ls
    app.config.globalProperties.$oc = oc
    app.config.globalProperties.$is = is
    app.config.globalProperties.$clone = deepClone
    app.config.globalProperties.$merge = deepMerge

    filters(app)
}
export default {
    install
}
