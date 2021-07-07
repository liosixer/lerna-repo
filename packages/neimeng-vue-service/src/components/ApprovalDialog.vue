<!--审核弹窗-->
<template>
    <el-dialog title="审核意见" :visible.sync="dialogVisible" width="400px" :append-to-body="true">
        <div>
            <el-form :model="checkForm" 
                 ref="checkForm" 
                 label-width="80px" 
                 class="demo-form-inline" 
                 size="small"
                 label-position="left">
                 <el-row>
                    <el-col :span="24">
                        <el-form-item label="审核意见" prop="opinion" :rules="validate.vdLength(255,true)">
                            <el-input class="shyj" v-model="checkForm.opinion" type="textarea" :rows="4"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div style="text-align: right;margin-top: 20px;">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" size="small" @click="commitOpinion">提 交</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "ApprovalDialog",
        data() {
            return {
                //审核不通过弹窗
                dialogVisible: false,
                checkForm: {opinion: ''}
            }
        },
        methods: {
            openDialog() {
                this.dialogVisible = true
            },
            commitOpinion() {
                this.$refs['checkForm'].validate(async (valid) => {
                    if (valid) {
                        this.$emit('submmitOpition', this.checkForm.opinion)
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .shyj{
        .el-textarea__inner{
            width: 100%
        }
    }
</style>