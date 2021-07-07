<template>
    <el-card>
        <div slot="header" class="clearfix">
            <span class="global-card-header-name">计算规则</span>
            <el-button
                class="fr"
                @click="handleAdd"
                type="text"
                size="small"
            >添加</el-button>
        </div>
        <div class="global-card-content">
            <self-table border :data="tableData" stripe v-loading="loading">
                <!-- <el-table-column type="index" label="档次"  align="center"> </el-table-column> -->
                <el-table-column prop="sequence" label="档次" min-width="120"></el-table-column>
                <el-table-column prop="minValue" label="最小值（万元）" min-width="120"></el-table-column>
                <el-table-column prop="sequenceName" label="名称" min-width="120"></el-table-column>
                <el-table-column prop="maxValue" label="最大值（万元）" min-width="120"></el-table-column>
                <el-table-column prop="feiLv" label="收费金额（元）" min-width="120" v-if="type == 2" class-name="table-column-money"></el-table-column>
                <el-table-column prop="feiLv" label="费率（%）" min-width="120" v-if="type == 1"></el-table-column>
                <el-table-column fixed="right" label="操作" min-width="150" align="left">
                    <template slot-scope="scope">
                        <el-button-group class="operation-button-group">
                            <el-button
                                @click="handleEdit(scope.row)"
                                type="primary" plain class="operation-button"
                                size="small"
                            ><i class="iconfont icon-bianji2"><span>编辑</span></i></el-button>

                            <el-button
                                @click="handleDel(scope.row)"
                                type="info" plain class="operation-button"
                                size="small"
                            ><i class="iconfont icon-shanchu1"><span>删除</span></i></el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
            </self-table>
        </div>
    </el-card>
</template>

<script>
export default {
    name: 'template-cost-set-table',
    props: {
        tableData: {
            type: Array,
            default: function() {
                return []
            }
        },
        type: {
            type: [String,Number],
            default: 1
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
         * 添加按钮被点击 提供父组件调用
         */
        handleAdd(row) {
            this.$emit('on-handleAdd', row)
        },
        /**
         * 删除按钮被点击 提供父组件调用
         */
        handleDel(row) {
            this.$emit('on-handleDel', row)
        }
    }
}
</script>
