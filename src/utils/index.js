import toastr from 'toastr'
import get from 'lodash/get'

toastr.options.positionClass = 'toast-top-center'

export const inBrowser = typeof window !== 'undefined'

export const ua = () => {
    const userAgentInfo = inBrowser ? navigator.userAgent : ''
    const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod']
    let flag = 'PC'
    for (let vv = 0; vv < Agents.length; vv++) {
        if (userAgentInfo.indexOf(Agents[vv]) > 0) {
            flag = Agents[vv]
            break
        }
    }
    return flag
}

export const strlen = str => {
    let charCode = -1
    const len = str.length
    let realLength = 0
    for (let i = 0; i < len; i++) {
        charCode = str.charCodeAt(i)
        if (charCode >= 0 && charCode <= 128) realLength += 1
        else realLength += 2
    }
    return realLength
}

export const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const showMsg = message => {
    let content, type
    if (typeof message === 'string') {
        content = message
        type = 'error'
    } else {
        content = message.content
        type = message.type
    }
    toastr[type](content)
}

export const oc = (props, property, def) => {
    return get(props, property, def)
}
