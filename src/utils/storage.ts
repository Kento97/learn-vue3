function getToken() {
    return localStorage.getItem('loginToken')
}
function setToken(key: string, str: string) {
    localStorage.setItem(key, str)
}
export { getToken, setToken }