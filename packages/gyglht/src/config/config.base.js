'use strict';
const path = require('path');
//cdn外链地址 对应的版本可以看package.json
exports.cdnMap = {
    css: [
        // 'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/theme-chalk/index.css'
    ],
    js: [
        'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
        'https://cdn.bootcdn.net/ajax/libs/vuex/3.1.3/vuex.min.js',
        'https://cdn.bootcdn.net/ajax/libs/vue-router/3.1.6/vue-router.min.js',
        'https://cdn.bootcdn.net/ajax/libs/axios/0.19.2/axios.min.js',
        'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/index.js',
        'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/locale/zh-CN.min.js',
    ]
}

// 需要扩展的资源
exports.externals = {
    vue: "Vue",
    vuex: "Vuex",
    "vue-router": "VueRouter",
    "element-ui":"element-ui",
    "axios":"axios",
}

//正则检测当前是否为开发环境
exports.regDev = RegExp(/development/);
//路径指定函数
function resolve(dir){
    return path.join(__dirname, dir)
}

//压缩代码配置
exports.UglifyJsPluginOptions={
    uglifyOptions: {
        compress: {
            drop_debugger: true, //生产环境自动删除debugger
            drop_console: true,  //生产环境自动删除console
        },
        warnings: false,
    },
    sourceMap: false,//是否生成map文件
    parallel: true,//使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
}

// 代码分割配置
exports.splitChunksOptions={
    chunks: 'all',
    cacheGroups: {
        libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
        },
        commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
        }
    }
}
