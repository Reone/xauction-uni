import request from "./request";

export function generateCode() {
    return request({
        url: '/user/generateCode',
        method: 'get'
    })
}

export function registerUser(data) {
    return request({
        url: '/user/register',
        method: 'post',
        data: data
    })
}

export function loginByCode(data) {
    return request({
        url: '/user/loginByCode',
        method: 'post',
        data: data
    })
}

export function userList() {
    return request({
        url: '/user/list',
        method: 'get'
    })
}