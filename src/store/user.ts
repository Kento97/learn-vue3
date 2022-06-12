import { http } from "@/utils";
import { defineStore } from "pinia";

const useUserStore = defineStore('user', {
    state: () => ({
        userInfo: {}
    }),
    actions: {
        async getUserInfo() {
            const res = await http.get("/user/profile")
            this.userInfo = res.data
            return this.userInfo
        }
    }
})
export { useUserStore }