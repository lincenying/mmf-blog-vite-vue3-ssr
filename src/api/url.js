import process from 'node:process'

const url = process.env.API_URL || 'http://127.0.0.1:4000'
console.log(`当前API地址: ${url}`)
export default url
