/* eslint-disable no-useless-concat */
import type { App } from 'vue'
import element from './element'

function install(app: App) {
    element(app)
}
export default {
    install
}
