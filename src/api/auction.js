import request from "./request";

export function auctionList() {
    return request({
        url: '/auction/list',
        method: 'get'
    })
}

export function auctionInfo() {
    return request({
        url: '/auction/info',
        method: 'get'
    })
}

export function addAuction(data) {
    return request({
        url: '/auction/add',
        method: 'post',
        data: data
    })
}

export function updateAuction(data) {
    return request({
        url: '/auction/update',
        method: 'post',
        data: data
    })
}

export function deleteAuction(data) {
    return request({
        url: '/auction/delete',
        method: 'post',
        data: data
    })
}