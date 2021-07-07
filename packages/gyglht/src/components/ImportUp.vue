<template>
    <div style="display: inline-block;vertical-align: middle;">
        <el-upload
                :headers="token"
                accept=".xls"
                :action="upUrl"
                multiple
                :show-file-list="false"
                :on-success="uploadSuccess"
                :before-upload="handleBeforeUpload"
                :data="paramData"
        >
            <el-button type="primary" size="small" >{{btnText}}</el-button>
        </el-upload>
    </div>
</template>
<script>
    export default {
        name: "import",
        props: {
            upUrl: {
                type: String,
                default: "",
            },
            paramData: {
                type: Object,
                default: {}
            },
            planType: {
                type: String,
                default: "",
            },
            btnText:{
                type: String,
                default: "批量导入"
            }
        },
        data() {
            return {
                token: {
                    Authorization: "Bearer " + this.$store.state.loginCookie.access_token,
                },
            };
        },
        methods: {
            // 导入成功
            uploadSuccess(res) {
                console.log(res);
                if (res.code == 1) {
                    this.$message.success(res.info)
                    this.$emit("uploadSuccess", "")
                } else {
                    this.$message.error(res.info)
                }
            },
            handleBeforeUpload() {
            },
        },
    };
</script>
