import {tansParams, toast} from "../util/common";
import errorCode from "./errorCode";

let timeout = 15000
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
    return new Promise((resolve, reject) => {
        uni.request({
            method: config.method || 'get',
            timeout: config.timeout || timeout,
            url: config.baseUrl || baseUrl + config.url,
            data: config.data,
            header: config.header,
            dataType: 'json'
        }).then(res => {
            const code = res.data.code || 200
            const msg = errorCode[code] || res.data.msg || errorCode['default']
            if (code !== 200) {
                toast(msg)
                reject(code)
            }
            resolve(res.data)
        }).catch(error => {
            let {message, errMsg} = error;
            message = message || errMsg || "";
            if (message === 'Network Error') {
                message = '后端接口连接异常'
            } else if (message.includes('timeout') || message.includes('time out')) {
                message = '网络异常，请退出小程序后重启网络（断开流量和WiFi并重新连接）后重试'
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
