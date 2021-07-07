<template>
    <el-card>
        <div slot="header" class="clearfix">
          <span class="global-card-header-name">基本信息</span>
        </div>
        <div class="global-card-content">
            <el-form ref="form" :model="searchForm" label-width="110px" size="small" label-position="right">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="规则名称：" prop="ruleName" :rules="ruleNameRule(true)">
                            <el-input v-model="searchForm.ruleName" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="规则编号：" prop="ruleBH" :rules="ruleBHRule(true)">
                            <el-input v-model="searchForm.ruleBH" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="计算方式：" prop="ptfwRuleType" :rules="validate.vdRequiredTC(true)">
                            <el-select v-model="searchForm.ptfwRuleType" placeholder="请选择" disabled>
                                <el-option :value="1" label="标准进制"></el-option>
                                <el-option :value="2" label="梯度进制"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="计算金额：">
                            <el-select v-model="searchForm.countAmount" placeholder="请选择">
                                <el-option value="" label="不限"></el-option>
                                <el-option :value="1" label="预算价"></el-option>
                                <el-option :value="2" label="成交价"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </el-card>
</template>


<script>
import ruleMixin from '../templates/ruleMixin'
const costObject = {
    ruleName: '', // 规则名称
    ruleBH: '', // 规则编号
    ptfwRuleType: '', // 计算方式
    countAmount: '', // 计算金额
}

export default {
    name: 'template-cost-header',
    props: {
        costData: {
            type: Object,
            default: function() {
                return {}
            }
        }
    },
    watch: {
        costData: {
            handler: function(val) {
                console.log(val)
                this.searchForm = Object.assign({}, costObject, val )
            },
            deep: true
        }
    },
    data() {
        return {
            searchForm: Object.assign({}, costObject, this.costData )
        }
    },
    mixins: [ruleMixin],
    methods: {
        validateForm(fn) {
            this.$refs.form.validate((validate) => {
                if (validate && fn) fn(this.searchForm)
            })
        }
    }
}
</script>