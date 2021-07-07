export { default as common } from "./common";
export { default as status } from "./status";
export { default as form } from "./form";
export { default as supplierManagement } from "./supplierManagement"
export { default as logManagement } from "./logManagement"
export { default as platformConfig } from "./platformConfig"

/**
 * 使用方式：
 * 自己组件里：	inject: ["globalSetting"],
 * 参考页面：@/veiws/procurement-plan/Yearprocurementplan.vue
 *
 * 注意：这里只是配置，如果在组件中要修改这里的数据，使用之前请提前复制一份
 * 比如：searchForm: Object.assign({}, this.globalSetting.form.searchForm),
 * 
 * 如果要在filters中使用this.globalSetting，请参考页面@/veiws/procurement-plan/Yearprocurementplan.vue
 */
