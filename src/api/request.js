import {tansParams, toast} from "../util/common";
import errorCode from "./errorCode";

let timeout = 30000
const baseUrl = '/api'

const request = config => {
    // get请求映射params参数
    let getParams = config.params
    if (config.params) {
        getParams = tansParams(config.params)
        let url = config.url + '?' + getParams
        url = url.slice(0, -1)
        config.url = url
    }
    
    // 设置请求头
    const header = config.header || {}
    
    // 添加 JWT Token
    const token = uni.getStorageSync('token')
    if (token && !header['Authorization']) {
        header['Authorization'] = `Bearer ${token}`
    }
    
    // 向后兼容：保留 user-id header
    const user = uni.getStorageSync('user') || {}
    if (user.id && !header['user-id']) {
        header['user-id'] = user.id
    }
    
    return new Promise((resolve, reject) => {
        uni.request({
            method: config.method || 'get',
            timeout: config.timeout || timeout,
            url: config.baseUrl || baseUrl + config.url,
            data: config.data,
            header,
            dataType: 'json'
        }).then(res => {
            const code = res.data.code || 200
            const msg = errorCode[code] || res.data.msg || errorCode['default']
            
            // 处理认证失败
            if (code === 401) {
                toast('登录已过期，请重新登录')
                uni.removeStorageSync('token')
                uni.removeStorageSync('user')
                setTimeout(() => {
                    uni.reLaunch({url: '/pages/login/index'})
                }, 1500)
                reject({code, message: msg})
                return
            }
            
            // 处理权限不足
            if (code === 403) {
                toast('无权限执行此操作')
                reject({code, message: msg})
                return
            }
            
            if (code !== 200) {
                toast(msg)
                reject(code)
                return
            }
            resolve(res.data)
        }).catch(error => {
            let {message, errMsg} = error;
            message = message || errMsg || "";
            if (message === 'Network Error') {
                message = '后端接口连接异常'
            } else if (message.includes('timeout')) {
                message = '网络请求超时，请检查网络后重试'
            } else if (message.includes('Request failed with status code')) {
                message = '系统接口' + message.substr(message.length - 3) + '异常'
            }
            message && toast(message)
            error.errMsg = message;
            reject(error)
        })
    })
}

export default request
