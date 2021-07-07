export { default as archiveManagement } from "./archiveManagement";
export { default as enum_bidBond } from "./bidBond";
export { default as common } from "./common";
export { default as costManage } from "./costManage";
export { default as dbsx } from "./dbsx";
export { default as form } from "./form";
export { default as marginManage } from "./marginManage";
export { default as status } from "./status";
export { default as openForm } from "./openForm";
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
