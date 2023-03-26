import axios from 'axios'
import qs from 'qs'

import type { AxiosResponse } from 'axios'
import config from './config-client'
import type { anyObject, ApiClientReturn } from '@/types'

import { showMsg } from '@/utils'

axios.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    response => response,
    error => Promise.resolve(error.response)
)

function checkStatus(response: AxiosResponse) {
    if (response && (response.status === 200 || response.status === 304)) {
        return response
    }
    return {
        data: {
            code: -404,
            message: (response && response.statusText) || '未知错误',
            data: ''
        }
    }
}

function checkCode(res: any) {
    if (res.data.code === -500) {
        window.location.href = '/backend'
    } else if (res.data.code === -400) {
        window.location.href = '/'
    } else if (res.data.code !== 200) {
        showMsg(res.data.message)
    }
    return res && res.data
}

const _api = (): ApiClientReturn => ({
    async file(url: string, data: anyObject) {
        const response = await axios({
            method: 'post',
            url,
            data,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        const res = checkStatus(response)
        return checkCode(res)
    },
    async post(url: string, data: anyObject) {
        const response = await axios({
            method: 'post',
            url: config.api + url,
            data: qs.stringify(data),
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
        const res = checkStatus(response)
        return checkCode(res)
    },
    async get(url: string, params: anyObject) {
        const response = await axios({
            method: 'get',
            url: config.api + url,
            params,
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        const res = checkStatus(response)
        return checkCode(res)
    }
})

export default _api()
