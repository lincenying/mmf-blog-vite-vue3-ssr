import process from 'node:process'

/**
 * 服务端 API 根地址（未设置环境变量时的默认值）
 */
const API_BASE_URL = process.env.API_URL || 'http://127.0.0.1:4000'

console.log(`当前API地址: ${API_BASE_URL}`)

export default API_BASE_URL
