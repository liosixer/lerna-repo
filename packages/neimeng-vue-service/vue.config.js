const IP_PROD = process.env.VUE_APP_IP_PROD;
const IP_DEV = process.env.VUE_APP_IP_DEV;
const NM_IP_DEV = process.env.VUE_APP_NM_IP_DEV;
const NM_IP_PROD = process.env.VUE_APP_NM_IP_PROD;
const HTTP_PREFIX = 'http://';
let requestUrl = '';
if (process.env.NODE_ENV === 'production') {
  requestUrl = `${HTTP_PREFIX}${IP_PROD}`;
} else {
  requestUrl = `${HTTP_PREFIX}${IP_DEV}`;
}

let nMRequestUrl = '';
if (process.env.NODE_ENV === 'production') {
  nMRequestUrl = `${HTTP_PREFIX}${NM_IP_PROD}`;
} else {
  nMRequestUrl = `${HTTP_PREFIX}${NM_IP_DEV}`;
}

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {
  regDev,
  cdnMap,
  externals,
  UglifyJsPluginOptions,
  splitChunksOptions,
} = require('./src/config/config.base');
module.exports = {
  outputDir: 'dist',
  assetsDir: 'static',
  publicPath: regDev.test(process.env.NODE_ENV) ? '/' : './',
  productionSourceMap: false,
  //是否使用包含运行时编译器的 Vue 构建版本
  //runtimeCompiler: true,
  devServer: {
    port: 8097,
    host: '0.0.0.0',
    open: true,
    proxy: {
      '/GT_API': {
        target: `${requestUrl}/gt-jy-zhaobiao/api`,
        changeOrigin: true,
        pathRewrite: {
          '^/GT_API': '',
        },
        ws: false,
      },
      '/NM_API': {
        target: `${nMRequestUrl}/nmg-jy-fuwu`,
        changeOrigin: true,
        pathRewrite: {
          '^/NM_API': '',
        },
        ws: false,
      },
      '/guotou-auth': {
        target: `${requestUrl}`, //京东
        changeOrigin: true,
        pathRewrite: {
          '^/guotou-auth': '/guotou-auth',
        },
        ws: false,
      },
      '/qykzt': {
        target: `${requestUrl}`,
        changeOrigin: true,
        pathRewrite: {
          '^qykzt': '/qykzt',
        },
        ws: false,
      },
      '/finance-erp-bus': {
        target: `${requestUrl}`,
        changeOrigin: true,
        pathRewrite: {
          '^finance-erp-bus': '/finance-erp-bus',
        },
        ws: false,
      },
      '/UPLOAD_API': {
        target: `${requestUrl}`,
        changeOrigin: true,
        pathRewrite: {
          '^/UPLOAD_API': 'UPLOAD_API',
        },
        ws: false,
      },
    },
  },

  // 在exports中添加，这里很关键，不配置不行
  transpileDependencies: ['element-ui'],
  chainWebpack(config) {
    // 在chainWebpack中添加下面的代码
    config.entry('main').add('babel-polyfill'); // main是入口js文件

    // 移除 prefetch 插件
    config.plugins.delete('prefetch');

    // 外部扩展
    config.externals(regDev.test(process.env.NODE_ENV) ? {} : externals);
    config.plugin('html').tap((args) => {
      args[0].cdn = regDev.test(process.env.NODE_ENV) ? {} : cdnMap;
      return args;
    });
    // 代码分割
    config.optimization.splitChunks(
      regDev.test(process.env.NODE_ENV) ? {} : splitChunksOptions
    );
  },
  configureWebpack(config) {
    //压缩代码
    if (!regDev.test(process.env.NODE_ENV)) {
      // 开发环境不执行
      config.plugins.push(new UglifyJsPlugin(UglifyJsPluginOptions));
    }
  },
};
