import { createApp } from 'vue'
import App from '@/App.vue'
import router from './router'
import pinia from './stores'
import 'virtual:svg-icons-register'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './assets/tailwind.css'; // 引入 Tailwind 样式
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(router)



app.mount('#app')
