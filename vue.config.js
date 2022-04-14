const {defineConfig} = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,
    // 解决打包后用chrome浏览器直接打开本地index.html文件空白问题
    publicPath: './',
    devServer: {
/*        proxy: {
            '/api': {
                target: 'http://member.bilibili.com/', //API服务器的地址
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }*/

    }
})
