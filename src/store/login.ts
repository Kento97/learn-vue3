import { getToken, http, setToken } from "@/utils";
import { defineStore } from "pinia";

interface LoginParams { mobile: string, code: string }
const useLoginStore = defineStore('login', {
    state: () => (
        {
            token: getToken() || ''
        }
    ),
    actions: {
        //通过 this 访问 whole store instance 并提供完整类型（和自动完成✨）支持
        async getTokenFromApi({ mobile, code }: LoginParams) {
            const res = await http.post('/authorizations', { mobile, code })
            console.log(res.data.data)
            this.token = res.data.data.token
            setToken('loginToken', this.token)
        }
    }
})
export { useLoginStore }