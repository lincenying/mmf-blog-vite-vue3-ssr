import process from 'node:process'

const url = process.env.API_URL || 'http://127.0.0.1:4000'
export default url
