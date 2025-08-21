export function isAdmin() {
    let user = uni.getStorageSync('user')
    console.log('isAdmin',user)
    return user.role === 1
}