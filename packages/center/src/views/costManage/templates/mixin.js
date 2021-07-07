
/**
 * @author dg_callbackfn_y
 * 此函数用于给组合组件调用
 * 请在需调用处使用 mixins: []
 * 并且在另一组件methods中加入searchList函数
 */

import VPagination from "@/components/VPagination";

export default {
    components: {VPagination},
    data() {
        return {
            /**
             * 分页总条数
             */
            total: 0
        }
    },
    methods: {
        /**
         * 当分页器 分页数 改变调用
         * @param {String,Number} val 传入的条数
         * 调用一次组合组件的查询表格函数
         */
        handleSizeChange(val) {
          this.searchFrom.rows = val;
          this.searchList();
        },
        /**
         * 当分页器 页码 改变
         * @param {String,Number} val 传入的页数
         * 调用一次组合组件查询表格的函数
         */
        handleCurrentChange(val) {
          this.searchFrom.page = val;
          this.searchList();
        }
    }
}