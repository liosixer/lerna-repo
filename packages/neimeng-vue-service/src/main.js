import '@/assets/styles/index.scss';
import SelfTable from '@/components/SelfTable/SelfTable';
import VPagination from '@/components/VPagination';
import axios from 'axios';
import md5 from 'js-md5';
import Vue from 'vue';
import Print from 'vue-print-nb';
import '../element-variables.scss';
import App from './App.vue';
import enum1 from './assets/js/emun';
import filter from './assets/js/filter';
import validate from './assets/js/validate';
import './assets/styles/iconfont/iconfont.css';
import './assets/styles/iconfont/iconfont.js';
import './assets/styles/index.scss';
import * as filters from './filters'; // 全局的过滤器
import i18n from './i18n/i18n';
import router from './router';
import store from './store';
import global from './utils/global';
import _ from 'lodash';

import $ from 'jquery';
Vue.prototype.$ = $;

// 引入echarts
import echarts from 'echarts';
//挂载全局使用
Vue.prototype.$echarts = echarts;

Vue.use(Print);

//去除空格
Vue.prototype.trimData = (e) => {
  console.log(e.target.value);
  e.target.value = e.target.value.replace(/(\s*)/g, '');
};
Vue.prototype.global = global;
Vue.prototype.$axios = axios;

const regDev = RegExp(/development/);
// if (regDev.test(process.env.NODE_ENV)) {
//开发模式
const ElementUI = require('element-ui');
// require("element-ui/lib/theme-chalk/index.css");
const locale = require('element-ui/lib/locale/lang/zh-CN');
Vue.use(ElementUI, {
  size: 'small',
  locale,
});
// }

Object.keys(filter).forEach((k) => Vue.filter(k, filter[k]));

Vue.prototype.validate = validate;
Vue.config.productionTip = false;
let base64 = require('js-base64').Base64;
Vue.prototype.$base64 = base64;
Vue.prototype.enum = {
  ...enum1,
};
//全局绑定当前的环境变量
Vue.prototype.env = process.env;

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
Vue.prototype.md5 = md5;
Vue.prototype.base64 = base64;
Vue.component('v-pagination', VPagination);
Vue.component('selfTable', SelfTable);

Vue.prototype._ = _;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
