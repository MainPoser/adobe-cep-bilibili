import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'

// C:\Users\%USERNAME%\AppData\Local\Temp\cef_debug.log
// C:\Users\%USERNAME%\AppData\Local\Temp
let app = createApp(App).use(store).use(ElementPlus).use(router)
axios.defaults.headers.post['Content-Type'] = 'application/json';

app.config.globalProperties.$axios = axios
app.config.productionTip = false
app.mount('#app')
