import md5 from 'md5'

import type { App } from 'vue'
import { Sleep } from '@/utils'

function pluralize(time: number, label: string): string {
    return time + label
}

function timeAgo(time: any) {
    const re = /^[\d]+$/
    const timestamp = re.test(time)
    if (!timestamp) {
        const tmp = Date.parse(time)
        time = tmp / 1000
    }
    const between = Date.now() / 1000 - Number(time)
    if (between < 60) {
        return '刚刚'
    } else if (between < 3600) {
        return pluralize(parseInt(`${between / 60}`, 10), ' 分钟前')
    } else if (between < 86400) {
        return pluralize(parseInt(`${between / 3600}`, 10), ' 小时前')
    }
    return pluralize(parseInt(`${between / 86400}`, 10), ' 天前')
}

function timeYmd(timestamp: string | number) {
    const re = /^[\d]+$/
    const isTimestamp = re.test(`${timestamp}`)
    if (!isTimestamp) {
        let time = Date.parse(`${timestamp}`)
        time /= 1000
        timestamp = time
    }
    const tmp = new Date(+timestamp * 1000)
    const year = tmp.getFullYear()
    const month = tmp.getMonth() + 1
    const date = tmp.getDate()
    return `${year}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}`
}

function avatar(email: string, width: number) {
    email = email || '123456'
    email = decodeURIComponent(email)
    width = width || 256
    // return `https://cdn.v2ex.com/gravatar/${md5(email)}?s=${width}&d=identicon&r=g`
    // return `https://dn-qiniu-avatar.qbox.me/avatar/${md5(email)}?s=${width}&d=identicon&r=g`
    // return `https://fdn.geekzu.org/avatar/${md5(email)}?s=${width}&d=identicon&r=g`
    return `https://cravatar.cn/avatar/${md5(email)}?s=${width}&d=identicon&r=g`
}

export default (app: App) => {
    app.config.globalProperties.$f = {
        timeAgo,
        timeYmd,
        avatar,
        Sleep
    }
    return app
}
