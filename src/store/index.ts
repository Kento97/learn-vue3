import { useLoginStore } from "./login";
import { useUserStore } from "./user";
const useStore = () => ({
    useLoginStore,useUserStore
})

export default useStore