function getToken() {
    return localStorage.getItem('loginToken')
}
function setToken(key: string, str: string) {
    localStorage.setItem(key, str)
}

function removeToken(key: string) {
    localStorage.removeItem(key)
}
export { getToken, setToken ,removeToken}