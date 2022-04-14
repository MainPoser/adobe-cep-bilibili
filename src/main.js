import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import adobe_cep from './assets/adobe-cep'

// C:\Users\%USERNAME%\AppData\Local\Temp\cef_debug.log
// C:\Users\%USERNAME%\AppData\Local\Temp
let app = createApp(App).use(store).use(ElementPlus).use(router)
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 设置请求拦截器
axios.interceptors.request.use(
    function (config) {
        //在请求之前做些什么
        return config
    },
    function (error) {
        //对请求错误做些什么
        adobe_cep.alertMsg("请求异常!" + error)
        return Promise.reject(error)
    }
)

// 设置响应拦截器
axios.interceptors.response.use(
    function (response) {
        if (200 === response.status) {
            return response.data
        }
        //对响应数据做点什么
        return response.data
    },
    function (error) {
        //对响应错误做点什么
        switch (error.response.status) {
            // 401: 未登录
            // 未登录则跳转登录页面，并携带当前页面的路径
            // 在登录成功后返回当前页面，这一步需要在登录页操作。
            case 401:
                adobe_cep.alertMsg("身份验证失败，请关闭重新进入。")
                break;
            // 403 token过期
            // 登录过期对用户进行提示
            // 清除本地token和清空vuex中token对象
            // 跳转登录页面
            case 403:
                adobe_cep.alertMsg("登录过期，请关闭重新进入。")
                // 清除token
                break;

            // 404请求不存在
            case 404:
                adobe_cep.alertMsg("您访问的地址不存在。")
                break;
            // 其他错误，直接抛出错误提示
            default:
                adobe_cep.alertMsg(error.response.data.message)
                return Promise.reject(error)
        }
    }
)

app.config.globalProperties.$axios = axios
app.config.productionTip = false
app.mount('#app')
