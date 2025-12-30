import type { AxiosResponse } from 'axios'

import axios from 'axios'
import qs from 'qs'

import config from './config-client'

axios.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

axios.interceptors.response.use(
    response => response,
    (error) => {
        const response = {} as AxiosResponse
        response.config = error.config
        response.data = null
        response.headers = error.config.headers
        response.status = error.code
        response.statusText = error.message
        response.request = error.request
        return Promise.resolve(response)
    },
)

/**
 * 检查HTTP响应的状态，并返回处理后的响应数据。
 * @param response - AxiosResponse对象，包含从服务器接收的完整响应信息。
 * @returns 返回一个ResponseData对象，要么是原始响应数据，要么是包含错误代码、错误消息和空数据的对象。
 */
function checkStatus(response: AxiosResponse): ResponseData<any> {
    if (response.status === 200 || response.status === 304) {
        return response.data
    }
    if (response.status === 401) {
        return {
            code: 401,
            info: response.statusText || response.toString(),
            data: response.statusText || response.toString(),
            message: `您还没有登录, 或者登录超时!`,

        }
    }
    if (response.status === 429) {
        return {
            code: 429,
            info: response.statusText || response.toString(),
            data: response.statusText || response.toString(),
            message: `请求过于频繁!`,

        }
    }
    return {
        code: -404,
        info: response.statusText || response.toString(),
        data: response.statusText || response.toString(),
        message: `接口返回数据错误, 错误代码: ${response.status || '未知'}`,
    }
}

/**
 * 检查响应码并根据不同的响应码执行相应的操作。
 * @param data - 包含响应数据和状态码的对象。
 * @returns 返回原始的响应对象。
 */
function checkCode(data: ResponseData<any>): ResponseData<any> {
    // 根据不同的响应码重定向到不同的页面或显示消息
    if (data.code === -500) {
        window.location.href = '/backend'
    }
    else if (data.code === -400) {
        window.location.href = '/'
    }
    else if (data.code !== 200) {
        showMsg(data.message)
    }

    return data
}

/**
 * axios Api 封装
 * @returns ApiClient
 * @example
 * ```
 * get(url: '/api/url', params: {}, headers: {})
 * post(url: '/api/url', data: {}, headers: {})
 * file(url: '/api/url', data: {}, headers: {})
 * ```
 */
function createInstance(): ApiClient {
    const api = axios.create({
        baseURL: config.api,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
        timeout: config.timeout,
    })
    return {
        async get(url, params, headers = {}) {
            const response = await api({
                method: 'get',
                url,
                params,
                headers: {
                    ...headers,
                },
            })
            const res = checkStatus(response)
            return checkCode(res)
        },
        async post(url, data, headers = {}) {
            const response = await api({
                method: 'post',
                url,
                data: qs.stringify(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    ...headers,
                },
            })
            const res = checkStatus(response)
            return checkCode(res)
        },
        async file(url, data, headers = {}) {
            const response = await api({
                method: 'post',
                url,
                data,
                headers: {
                    ...headers,
                },
            })
            const res = checkStatus(response)
            return checkCode(res)
        },
    }
}

export default createInstance()
