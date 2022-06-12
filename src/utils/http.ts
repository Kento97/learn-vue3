import axios, { AxiosResponse, type AxiosRequestConfig } from "axios";

const http = axios.create({
    baseURL: "http://geek.itheima.net/v1_0",
    timeout: 5000
})
http.interceptors.request.use((config: AxiosRequestConfig<any>) => {
    const token = localStorage.getItem('loginToken')
    token && (config.headers!.authorizations = `Bearer ${token}`)
    return config
}, (err: any) => {
    return Promise.reject(err)
})

http.interceptors.response.use((response: AxiosResponse<any>) => {
    return response
}, (err) => {
    return Promise.reject(err)
})

export { http }