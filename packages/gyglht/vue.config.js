const { VUE_APP_URI_PREFIX, VUE_APP_URI_IP, VUE_APP_URI_PORT } = process.env;
const baseUrl = `${VUE_APP_URI_PREFIX}${VUE_APP_URI_IP}` +  (!!VUE_APP_URI_PORT ? ":" : "")  + `${VUE_APP_URI_PORT}`;
const requestUrl = baseUrl;

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {
    regDev,
    cdnMap,
    externals,
    UglifyJsPluginOptions,
    splitChunksOptions
} = require("./src/config/config.base")
module.exports = {
    outputDir: 'dist',
    assetsDir: "static",
    publicPath: (regDev.test(process.env.NODE_ENV)) ? "/" : "./",
    productionSourceMap: false,
    devServer: {
        port: 8089,
        host: '0.0.0.0',
        open: true,
        proxy: {
            '/qykzt': {
                target: `${requestUrl}`,
                changeOrigin: true,
                pathRewrite: {
                },
                ws: false
            },
            '/guotou-auth': {
                target: `${requestUrl}`,
                changeOrigin: true,
                pathRewrite: {
                    '^/guotou-auth': '/guotou-auth'
                },
                ws: false
            },
            '/UPLOAD_API': {
                target: `${requestUrl}/file-web`,
                changeOrigin: true,
                pathRewrite: {
                    '^/UPLOAD_API': ''
                },
                ws: false
            },
            '/SZZSWebService.asmx': {
                target: `http://112.zhulong.com.cn:10080/capt/caws-guotou`,
                changeOrigin: true,
                pathRewrite: {
                    '^/SZZSWebService.asmx': '/SZZSWebService.asmx'
                },
                ws: false
            },
            '/guotou-file-business': {
                target: requestUrl,
                changeOrigin: true,
                pathRewrite: {
                    '^/guotou-file-business': '/guotou-file-business'
                },
                ws: false
            },
            '/file-web': {
                target: requestUrl,
                changeOrigin: true,
                pathRewrite: {
                    '^/file-web': '/file-web'
                },
                ws: false
            },
        }
    },
    // 在exports中添加，这里很关键，不配置不行
    transpileDependencies: ['element-ui'],
    chainWebpack(config) {
        config.entry('main').add('babel-polyfill');
        config.plugins.delete('prefetch');

        const isDevelopment = regDev.test(process.env.NODE_ENV);
        config.externals(isDevelopment ? {} : externals)
        config.plugin('html').tap(args => {
            args[0].cdn = isDevelopment ? {} : cdnMap
            return args
        })
        config.optimization.splitChunks(isDevelopment ? {} : splitChunksOptions)
    },
    configureWebpack(config) {
        //压缩代码
        // if (!regDev.test(process.env.NODE_ENV)) { // 开发环境不执行
        //     config.plugins.push(
        //         new UglifyJsPlugin(UglifyJsPluginOptions)
        //     )
        // }
    }

}
