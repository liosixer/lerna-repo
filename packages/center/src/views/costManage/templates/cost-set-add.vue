<template>
    <el-dialog title="设置基数区间何费率" :visible.sync="visible" @close="closeEv">
        <el-form ref="form" :model="addForm" label-width="150px" size="small" label-position="right">
            
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-form-item label="计算基数（万元）：" prop="minValue" :rules="validateNumber(true)">
                        <el-input v-model="addForm.minValue" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <!-- <el-col :span="3">
                    <span v-html="`<第${number}档次≤`"></span>
                </el-col> -->
                <el-col :span="10">
                    <el-form-item :label="`<第${addForm.sequence}档次≤`" prop="maxValue" :rules="validateMan()" class="gt-from-lable">
                        <el-input v-model="addForm.maxValue" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-button @click="setMax" size="small" class="gt-set-btn">设为最大</el-button>
                </el-col>
            </el-row>
            <el-form-item label="费率（%）：" prop="feiLv" :rules="validateNumber(true)" v-if="type == 1">
                <el-input v-model="addForm.feiLv" placeholder="请输入"></el-input>
                <p>注：在此区间内，按该-费率-进行-标准累进制-的计算</p>
            </el-form-item>
            <el-form-item label="收费金额(元)：" prop="feiLv" :rules="validateNumber(true)" v-if="type == 2">
                <el-input v-model="addForm.feiLv" placeholder="请输入"></el-input>
                <p>注：在此区间内，按该-收费金额-进行-梯度收费-的计算</p>
            </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button @click="visible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="yes"  size="small">确 定</el-button>
        </div>
    </el-dialog>
    
</template>

<script>
const addObject = {
    feiLv: '',
    maxValue: '',
    minValue: '',
    sequence: 1
}
export default {
    name: 'cost-set-add',
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            default: function () {
                return {}
            }
        },
        type: {
            type: [String,Number],
            default: 1
        }
    },
    watch: {
        value(val) {
            this.visible = val
        },
        data: {
            handler: function(val) {
                this.addForm = Object.assign({}, addObject, val)
            },
            deep: true
        }
    },
    data() {
        return {
            visible: this.value,
            addForm: Object.assign({}, addObject, this.data)
        }
    },
    methods: {
        /**
         * 验证基础
         */
        validateBase(reg, txt) {
            const _Number = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('不能为空'))
                } else {
                    if (!reg.test(value)) {
                        callback(new Error(txt))
                    } else {
                        callback()
                    }
                }
            }
        
            return [
                {validator: _Number, trigger: 'blur'}
            ]
        },
        /**
         * 特殊验证
         */
        validateMan() {
            const reg = /^([∞]{1}$)|^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,2})$)|^(([1-9]+)$)/
            const txt = '必须为特色字符∞，或者全为数字'
            return this.validateBase(reg, txt)
        },
        /**
         * 验证数字
         */
        validateNumber() {
            const reg = /^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,2})$)|^(([1-9]+)$)/
            const txt = '请输入数字，如果是小数最多保留两位'
            return this.validateBase(reg, txt)
        },
        /**
         * 窗口关闭
         */
        closeEv() {
            this.$emit('change', false)
        },
        /**
         * 添加
         */
        async costAddOneRule() {
            const data = await this.portService.costAddOneRule(this.addForm);
            
            if (data.code) {
                this.$emit('on-addSuccess')
                this.$message({ type: 'success', message: data.info });
            } else {
                this.$message({ type: 'error', message: data.info });
            }
        },
        /**
         * 编辑
         */
        async costEditOneRule() {
            const data = await this.portService.costEditOneRule(this.addForm);

            if (data.code) {
                this.$emit('on-addSuccess')
                this.$message({ type: 'success', message: data.info });
            } else {
                this.$message({ type: 'error', message: data.info });
            }
        },
        /**
         * 设置最大值
         */
        setMax() {
            this.addForm.maxValue = '∞'
        },
        /**
         * 规则保存
         */
        yes() {
            this.$refs.form.validate((validate) => {
                if (validate && this.addForm.__type__ == 'add') {
                    this.costAddOneRule()
                } else if (validate && this.addForm.__type__ == 'edit') {
                    this.costEditOneRule()
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
::v-deep.gt-from-lable .el-form-item__label{
    text-align: center;
}
.gt-set-btn{
    width: 100%;
}
</style>