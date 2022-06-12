import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import 'normalize.css'
import 'element-plus/dist/index.css'
const app = createApp(App)
app
.use(router)
.use(ElementPlus)
.use(createPinia())
.mount('#app')
