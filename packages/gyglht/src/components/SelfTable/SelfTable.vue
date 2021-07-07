<!--简单封装el-table，便于全局统一设置、修改-->
<template>
    <el-table ref="selfTable" v-bind="$attrs" v-on="$listeners">
        <slot></slot>
        <div slot="empty" class="custom-empty"></div>
        <slot name="emptyDis"  slot="empty"></slot>
    </el-table>
</template>
<script>
    export default {
        name: "self-table",
        mounted() {
            // 由于对el-table的滚动条的宽度做了修改（改为了8px），
            // 当同时出横向、纵向滚动条时，会导致左、右固定列的定位（fixed）,离两侧的间距计算错误。故对此修正。
            this.$refs.selfTable.layout.gutterWidth = 8;
        },
    }
</script>

<style scoped>

</style>
