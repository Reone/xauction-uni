import request from "./request";

export function offerList(params = {}) {
    return request({
        url: '/offer/list',
        method: 'get',
        params
    })
}

export function offerInfo(id) {
    return request({
        url: '/offer/info',
        method: 'get',
        params: {id}
    })
}

export function addOffer(data) {
    return request({
        url: '/offer/add',
        method: 'post',
        data
    })
}

export function updateOffer(data) {
    return request({
        url: '/offer/update',
        method: 'post',
        data
    })
}

export function deleteOffer(id) {
    return request({
        url: '/offer/delete',
        method: 'post',
        data: {id}
    })
}
