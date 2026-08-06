import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import axios from 'axios'
import qs from 'qs'

import config from './config-client'

/** 进行中的 GET 请求，用于同 key 并发去重 */
const pendingGets = new Map<string, Promise<ResponseData<unknown>>>()

/**
 * 生成 GET 请求去重 key。
 */
function createGetKey(url: string, params: Objable): string {
    return `${url}?${qs.stringify(params)}`
}

/**
 * 将网络/HTTP 错误转为统一业务响应结构。
 */
function toErrorResponse(error: AxiosError | Error): ResponseData<null> {
    const axiosError = error as AxiosError
    const status = axiosError.response?.status
    const message = axiosError.message || '网络请求失败'
    return {
        code: typeof status === 'number' ? status : -404,
        info: message,
        data: null,
        message: status === 401
            ? '您还没有登录, 或者登录超时!'
            : status === 429
                ? '请求过于频繁!'
                : `接口返回数据错误, 错误代码: ${status || '未知'}`,
    }
}

/**
 * 检查HTTP响应的状态，并返回处理后的响应数据。
 */
function checkStatus(response: AxiosResponse): ResponseData<unknown> {
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
 */
function checkCode<T>(data: ResponseData<T>): ResponseData<T> {
    if (data.code === -500) {
        if (!window.location.pathname.startsWith('/backend')) {
            window.location.href = '/backend'
        }
    }
    else if (data.code === -400) {
        if (window.location.pathname !== '/') {
            window.location.href = '/'
        }
    }
    else if (data.code !== 200) {
        showMsg(data.message)
    }

    return data
}

/**
 * axios Api 封装
 * @returns ApiClient
 */
function createInstance(): ApiClient {
    const api = axios.create({
        baseURL: config.api,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
        timeout: config.timeout,
    })

    api.interceptors.request.use(
        (reqConfig: InternalAxiosRequestConfig) => reqConfig,
        (error: AxiosError) => Promise.reject(error),
    )

    api.interceptors.response.use(
        response => response,
        (error: AxiosError) => Promise.reject(error),
    )

    return {
        async get<T = void>(url: string, params: Objable, headers: Objable<string> = {}) {
            const key = createGetKey(url, params)
            const inflight = pendingGets.get(key)
            if (inflight) {
                return inflight as Promise<ResponseData<T>>
            }

            const request = (async (): Promise<ResponseData<T>> => {
                try {
                    const response = await api({
                        method: 'get',
                        url,
                        params,
                        headers: {
                            ...headers,
                        },
                    })
                    return checkCode(checkStatus(response) as ResponseData<T>)
                }
                catch (error) {
                    return checkCode(toErrorResponse(error as AxiosError) as ResponseData<T>)
                }
                finally {
                    pendingGets.delete(key)
                }
            })()

            pendingGets.set(key, request as Promise<ResponseData<unknown>>)
            return request
        },
        async post<T = void>(url: string, data: Objable, headers: Objable<string> = {}) {
            try {
                const response = await api({
                    method: 'post',
                    url,
                    data: qs.stringify(data),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        ...headers,
                    },
                })
                return checkCode(checkStatus(response) as ResponseData<T>)
            }
            catch (error) {
                return checkCode(toErrorResponse(error as AxiosError) as ResponseData<T>)
            }
        },
        async file<T = void>(url: string, data: FormData, headers: Objable<string> = {}) {
            try {
                const response = await api({
                    method: 'post',
                    url,
                    data,
                    headers: {
                        ...headers,
                    },
                })
                return checkCode(checkStatus(response) as ResponseData<T>)
            }
            catch (error) {
                return checkCode(toErrorResponse(error as AxiosError) as ResponseData<T>)
            }
        },
    }
}

export default createInstance()
