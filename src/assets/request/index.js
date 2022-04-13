// axios封装
import axios from 'axios'
import store from '@/store'
import router from '@/router'
// 实例化
// 1. baseURL
// 2. 超时时间
// 3. 大数处理
const instance = axios.create({
    baseURL: 'https://www.bijian.com/', // 接口根地址
    timeout: 5000 // 超时时间
})

// 拦截器

// 1.请求拦截器  全局注入token
instance.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    // 从store里面拿到当前的用户token 放到请求headers中
    // 1. 获取token
    const token = store.state.user.token
    // 2. 请求头设置token
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
}, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 2.响应拦截器
//   1. token失效 401 跳转到登录页
//   2. 当后端接口不是以http 200 - 300 而是通过自定义字段展示一个接口的成功状态
//      success -> true

// 添加响应拦截器
instance.interceptors.response.use((response) => {
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
    return "{\"msg\":\"响应了401\"}"
})

// 封装一个通用的函数 帮助用户解决get post 传参形式的不一样
// axios get  -> params  post -> data

/**
 * @description: 请求函数
 * @param {*} url  请求地址
 * @param {*} method  请求方法 GET/POST
 * @param {*} reqData  请求参数 Object
 * @return {*} Promise
 */
export default function index(url, method, reqData) {
    return instance({
        url,
        method,
        [method.toLowerCase() === 'get' ? 'params' : 'data']: reqData
    })
}
