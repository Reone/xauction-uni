export function getCurrentUser() {
    return uni.getStorageSync('user') || {}
}

export function isAdmin() {
    const user = getCurrentUser()
    return user && (user.role === 1 || user.role === -1)
}

export function getUserId() {
    return getCurrentUser().id
}