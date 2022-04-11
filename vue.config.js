const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    // 开启代码反格式化
    productionSourceMap: false,
    // 解决打包后用chrome浏览器直接打开本地index.html文件空白问题
    publicPath: './'
})
