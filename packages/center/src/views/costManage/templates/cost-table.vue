<template>
    <self-table border :data="tableData" stripe v-loading="loading"  height="100%">
        <el-table-column type="index" label="序号"  align="center" width="80"> </el-table-column>
        <el-table-column prop="ruleName" label="规则名称" min-width="160" show-overflow-tooltip></el-table-column>
        <el-table-column prop="ruleBH" label="规则编号" min-width="160" show-overflow-tooltip></el-table-column>

        <el-table-column prop="ptfwRuleType" label="计算方式" min-width="100">
            <template slot-scope="{row}">
                <span v-if="row.ptfwRuleType === 1">标准进制</span>
                <span v-else-if="row.ptfwRuleType === 2">梯度进制</span>
            </template>
        </el-table-column>

        <el-table-column prop="creatTime" label="规则创建时间" min-width="160">
            <template slot-scope="{row}">
                {{ row.creatTime | timestampChange}}
            </template>
        </el-table-column>

        <el-table-column label="状态" min-width="80">
            <template slot-scope="{row}">
                <span v-if="row.isYouXiao === 1" class="cost-success">有效</span>
                <span v-if="row.isYouXiao === 0" class="cost-error">无效</span>
            </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" min-width="160" align="left">
            <template slot-scope="{row}">
                <el-button-group class="operation-button-group">
                    <el-button
                        @click="handleEdit(row)"
                        type="primary" plain class="operation-button"
                        size="small"
                    ><i class="iconfont icon-bianji2"><span>编辑</span></i></el-button>

                    <el-button
                        @click="handleDel(row)"
                        type="info" plain class="operation-button"
                        size="small"
                    ><i class="iconfont icon-shanchu1"><span>删除</span></i></el-button>
                </el-button-group>
            </template>
        </el-table-column>
    </self-table>
</template>

<script>
export default {
    name: 'template-cost-table',
    props: {
        tableData: {
            type: Array,
            default: function() {
                return []
            }
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        /**
         * 编辑按钮被点击 提供父组件调用
         */
        handleEdit(row) {
            this.$emit('on-handleEdit', row)
        },
        /**
         * 删除按钮被点击
         */
        handleDel(row) {
            this.$emit('on-handleDel', row)
        }
    }
}
</script>

<style lang="scss" scoped>
.cost-success{
    padding-left: 10px;
    position: relative;
    &::before {
        content: '';
        width: 6px;
        height: 6px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(0 , -50%);
        border-radius: 50%;
        background-color: #52C41A;
    }
}
.cost-error{
    padding-left: 10px;
    position: relative;
    &::before {
        width: 6px;
        height: 6px;
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(0 , -50%);
        border-radius: 50%;
        background-color: #F5222D;
    }
}
</style>
