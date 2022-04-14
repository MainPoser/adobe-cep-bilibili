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
axios.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    // 从store里面拿到当前的用户token 放到请求headers中
    // 1. 获取token
    //const token = store.state.user.token
    // 2. 请求头设置token
    //if (token) config.headers.Authorization = `Bearer ${token}`
    return config
}, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
    // 对响应数据做点什么 200 -300
    return response
}, (e) => {
    // 对响应错误做点什么 除了200 - 300
    // 如果是401 token失效  跳回到登录页
    if (e.response && e.response.status === 401) {
        // route 内置了转码操作
        const redirectUrl = encodeURIComponent(router.currentRoute.value.fullPath)
        //router.push('/login?redirectUrl=' + redirectUrl)
        console.log("响应了401", redirectUrl)
    }
    //return Promise.reject(e)
    return "{\"msg\":\"响应了401\"}" + e
})

app.config.globalProperties.$axios = axios
app.config.productionTip = false
app.mount('#app')
