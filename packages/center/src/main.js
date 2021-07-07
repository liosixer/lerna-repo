const regDev = RegExp(/development/);
// import '@babel/polyfill'
import Vue from "vue";
import App from "./App.vue";
import "./assets/styles/index.scss";
import './assets/styles/iconfont/iconfont.css'
import * as filters from "./filters"; // 全局的过滤器
import VPagination from "@/components/VPagination";
import SelfTable from "@/components/SelfTable/SelfTable";

import router from "./router";
import store from "./store";
if(regDev.test(process.env.NODE_ENV)){ //开发模式
  const ElementUI = require("element-ui");
  // require("element-ui/lib/theme-chalk/index.css");
  const locale = require("element-ui/lib/locale/lang/zh-CN");
  Vue.use(ElementUI, {
    locale,
  });
}
import "@/assets/styles/index.scss";
import "../element-variables.scss";

import filter from "./assets/js/filter";
Object.keys(filter).forEach((k) => Vue.filter(k, filter[k]));

import portService from "./service/index";
Vue.prototype.portService = portService;
import validate from "./assets/js/validate";
Vue.prototype.validate = validate;
import i18n from "./i18n/i18n";
Vue.config.productionTip = false;


Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.component("v-pagination", VPagination);
Vue.component("selfTable", SelfTable);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
