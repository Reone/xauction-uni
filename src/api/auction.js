import request from "./request";

export function auctionList(params = {}) {
    return request({
        url: '/auction/list',
        method: 'get',
        params
    })
}

export function auctionInfo(id) {
    return request({
        url: '/auction/info',
        method: 'get',
        params: {id}
    })
}

export function uploadAuctionImages(files) {
    const formData = new FormData()
    files.forEach((file, index) => {
        formData.append(`files[${index}]`, file)
    })
    return request({
        url: '/auction/uploadImages',
        method: 'post',
        header: {'content-type': 'multipart/form-data'},
        data: formData
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

export function deleteAuction(id) {
    return request({
        url: '/auction/delete',
        method: 'post',
        data: {id}
    })
}