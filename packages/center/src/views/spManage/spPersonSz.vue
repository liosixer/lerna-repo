<template>
    <section class="container">
        <div class="spszrlHeader">
            <PageCrumb :d="{ breadcrumbList: breadcrumbList }"></PageCrumb>
            <div>
                <ul>
                    <li>
                        <h3>审批设置</h3>
                    </li>
                    <li>
                        <el-button type="primary" size="small" @click="saveSpFunc(spszData)">保存</el-button>
                        <el-button @click="$router.go(-1)" size="small">返回</el-button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="spszrlContent">
            <div class="spszDiv">
                <h3>审批设置</h3>
                <div class="bottomLine"></div>
                <el-form :inline="true" :model="spszData" :rules="spszRuleData" ref="spszData" class="spszForm">
                    <el-form-item label="审批事项:">
                        <el-input placeholder="自动读取" v-model="spszData.spsxObj.spsxName" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="审批级别:" prop="spszVal">
                        <el-select v-model="spszData.spszVal" placeholder="请选择" @change="spjbFunc">
                            <el-option v-for="item in spszData.spsz" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设置人:">
                        <el-input placeholder="自动读取" v-model="spszData.creatorName" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="设置时间:">
                        <el-input placeholder="自动读取" v-model="spszData.createTime" :disabled="true"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="dijspDiv" v-show="dijspBloon">
                <div class="topDiv">
                    <ul>
                        <li>
                            <h3>第一级审批</h3>
                        </li>
                        <li>
                            <el-button type="primary" @click="addYjSp">添加</el-button>
                        </li>
                    </ul>
                </div>
                <div class="bottomLine"></div>
                <self-table border :data="dijspData" header-cell-class-name="headercell" style="width:100%;margin:0;" :fit="true">
                    <el-table-column type="index" label="序号" show-overflow-tooltip></el-table-column>
                    <!--<el-table-column prop="roleName" label="类别" min-width="150px" show-overflow-tooltip></el-table-column>-->
                    <el-table-column prop="name" label="姓名" min-width="150px" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="createTime" label="添加时间" min-width="150px" show-overflow-tooltip :formatter="timeChange"></el-table-column>
                    <el-table-column fixed="right" label="操作" min-width="100" align="left">
                        <template slot-scope="scope">
                            <el-button-group class="operation-button-group">
                                <el-button type="info" plain class="operation-button" size="small" @click="deletYj(scope.$index,dijspData)">
                                    <i class="iconfont icon-shanchu1"><span>删除</span></i>
                                </el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </self-table>
            </div>
            <div class="dejspDiv" v-show="dejspBloon">
                <div class="topDiv">
                    <ul>
                        <li>
                            <h3>第二级审批</h3>
                        </li>
                        <li>
                            <el-button type="primary" @click="addejSp">添加</el-button>
                        </li>
                    </ul>
                </div>
                <div class="bottomLine"></div>
                <self-table border :data="dejspData" header-cell-class-name="headercell" style="width:100%;margin:0;" :fit="true">
                    <el-table-column type="index" label="序号" show-overflow-tooltip></el-table-column>
                    <!--<el-table-column prop="roleName" label="类别" min-width="150px" show-overflow-tooltip></el-table-column>-->
                    <el-table-column prop="name" label="姓名" min-width="150px" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="createTime" label="添加时间" min-width="150px" show-overflow-tooltip :formatter="timeChange"></el-table-column>
                    <el-table-column fixed="right" label="操作" min-width="100" align="left">
                        <template slot-scope="scope">
                            <el-button-group class="operation-button-group">
                                <el-button type="info" plain class="operation-button" size="small" @click="deletEj(scope.$index,dejspData)">
                                    <i class="iconfont icon-shanchu1"><span>删除</span></i>
                                </el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </self-table>
            </div>
            <div class="dsjspDiv" v-show="dsjspBloon">
                <div class="topDiv">
                    <ul>
                        <li>
                            <h3>第三级审批</h3>
                        </li>
                        <li>
                            <el-button type="primary" @click="addsjSp">添加</el-button>
                        </li>
                    </ul>
                </div>
                <div class="bottomLine"></div>
                <self-table border :data="dsjspData" header-cell-class-name="headercell" style="width:100%;margin:0;" :fit="true">
                    <el-table-column type="index" label="序号" show-overflow-tooltip></el-table-column>
                    <!--<el-table-column prop="roleName" label="类别" min-width="150px" show-overflow-tooltip></el-table-column>-->
                    <el-table-column prop="name" label="姓名" min-width="150px" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="createTime" label="添加时间" min-width="150px" show-overflow-tooltip :formatter="timeChange"></el-table-column>
                    <el-table-column fixed="right" label="操作" min-width="100" align="left">
                        <template slot-scope="scope">
                            <el-button-group class="operation-button-group">
                            <el-button type="info" plain class="operation-button" size="small" @click="deletSj(scope.$index,dsjspData)">
                                <i class="iconfont icon-shanchu1"><span>删除</span></i>
                            </el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </self-table>
            </div>
            <spryDialog ref="spryDialog" @qyDataFunc="getQyData"></spryDialog>
        </div>
    </section>
</template>

<script>
    import spryDialog from "./spryDialog";
    import PageCrumb from "@/components/PageCrumb";
    import util from "@/utils/utils.js"
    export default {
        name: 'spPersonSz',
        components: { spryDialog , PageCrumb},
        data() {
            return {
                breadcrumbList: [
                    { label: "首页", link: "/qyxxgl" },
                    { label: "审批管理", link: "/spManage/spLevelSz" },
                    { label: "审批级别设置", link: "" }
                ],
                sxGuid:"",
                spszData: {
                    spsxObj:{
                        spsxName:"",
                        spsxVal: "",
                    },
                    spsz: [
                        {
                            label: "不审批",
                            value: "0"
                        },
                        {
                            label: "一级",
                            value: "1"
                        },
                        {
                            label: "二级",
                            value: "2"
                        },
                        {
                            label: "三级",
                            value: "3"
                        }
                    ],
                    spszVal: "0",
                    creatorName:"",
                    createTime:""
                },
                spszRuleData: {
                    spszVal: [
                        { required: true, message: '请选择审批级别', trigger: 'change' }
                    ]
                },
                dijspData: [],
                dejspData:[],
                dsjspData:[],
                dijspBloon:false,
                dejspBloon: false,
                dsjspBloon: false,
                nowTime: util.getCurrentTime().getTime(),
                level:"",
                formData:{
                    guid:"",
                    shenPiJiBie:"",
                    yijiRenYuanList:[],
                    erjiRenYuanList: [],
                    sanjiRenYuanList: [],
                }
            }
        },
        methods: {
            //保存新增招标人
            async saveShenPiRenYuan() {
                if(this.spszData.spszVal==1&& this.dijspData.length==0){
                    this.$message({
                        type:"warning",
                        center: true,
                        duration: 2000,
                        message: "请添加一级审批人员!"
                    });
                    return false
                }
                if(this.spszData.spszVal==2){
                    if(this.dijspData.length==0){
                        this.$message({
                            type:"warning",
                            center: true,
                            duration: 2000,
                            message: "请添加一级审批人员!"
                        });
                        return false
                    }else if(this.dejspData.length==0){
                        this.$message({
                            type:"warning",
                            center: true,
                            duration: 2000,
                            message: "请添加二级审批人员!"
                        });
                        return false
                    }
                }
                if(this.spszData.spszVal==3){
                    if(this.dijspData.length==0){
                        this.$message({
                            type:"warning",
                            center: true,
                            duration: 2000,
                            message: "请添加一级审批人员!"
                        });
                        return false
                    }else if(this.dejspData.length==0){
                        this.$message({
                            type:"warning",
                            center: true,
                            duration: 2000,
                            message: "请添加二级审批人员!"
                        });
                        return false
                    }else if(this.dsjspData.length==0){
                        this.$message({
                            type:"warning",
                            center: true,
                            duration: 2000,
                            message: "请添加三级审批人员!"
                        });
                        return false
                    }
                }
                if(this.dijspData.length>0){
                    for(let i=0;i<this.dijspData.length;i++){
                        var obj={
                            leiBie: this.dijspData[i].roleName,
                            name: this.dijspData[i].name,
                            createTime: this.dijspData[i].createTime,
                            guid: this.dijspData[i].guid,
                            userid: this.dijspData[i].userid
                        }
                        this.formData.yijiRenYuanList.push(obj)
                    }
                }
                if(this.dejspData.length>0){
                    for(let i=0;i<this.dejspData.length;i++){
                        var obj={
                            leiBie: this.dejspData[i].roleName,
                            name: this.dejspData[i].name,
                            createTime: this.dejspData[i].createTime,
                            guid: this.dejspData[i].guid,
                            userid: this.dejspData[i].userid
                        }
                        this.formData.erjiRenYuanList.push(obj)
                    }
                }
                if(this.dsjspData.length>0){
                    for(let i=0;i<this.dsjspData.length;i++){
                        var obj={
                            leiBie: this.dsjspData[i].roleName,
                            name: this.dsjspData[i].name,
                            createTime: this.dsjspData[i].createTime,
                            guid: this.dsjspData[i].guid,
                            userid: this.dsjspData[i].userid
                        }
                        this.formData.sanjiRenYuanList.push(obj)
                    }
                }
                this.formData={
                    guid:this.sxGuid,
                    shenPiJiBie:this.spszData.spszVal,
                    yijiRenYuanList:this.formData.yijiRenYuanList,
                    erjiRenYuanList: this.formData.erjiRenYuanList,
                    sanjiRenYuanList: this.formData.sanjiRenYuanList
                }
                const res = await this.portService.saveShenPiRenYuan(this.formData)
                .then(res => {
                    if(res.code==1){
                        this.$message({
                            type: "success",
                            center: true,
                            duration: 1000,
                            message: "保存成功!"
                        });
                        this.$router.push({ path: "/spManage/spLevelSz" })
                    }
                }).catch(error => {

                })
            },
            //保存审批设置
            saveSpFunc(spszData){
                this.$confirm('确定保存现有审批人员设置吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                .then(() => {
                    this.$refs.spszData.validate((valid) => {
                        if (valid) {
                            this.saveShenPiRenYuan()
                        } else {
                            this.$message({
                                type:"error",
                                center: true,
                                duration: 1000,
                                message: "部分内容校验失败,请核查!"
                            });
                            return false;
                        }
                    });
                })
                .catch(() => {})
            },
            //审批级别联动
            spjbFunc(val){
                if(val=="0"){
                    this.dijspBloon=false
                    this.dejspBloon = false
                    this.dsjspBloon = false
                    this.dijspData= []
                    this.dejspData = []
                    this.dsjspData = []
                }else if(val=="1"){
                    this.dijspBloon=true
                    this.dejspBloon = false
                    this.dsjspBloon = false
                    this.dejspData = []
                    this.dsjspData = []
                }else if(val=="2"){
                    this.dijspBloon=true
                    this.dejspBloon = true
                    this.dsjspBloon = false
                    this.dsjspData = []
                }else if(val=="3"){
                    this.dijspBloon=true
                    this.dejspBloon = true
                    this.dsjspBloon = true
                }
            },
            //时间戳转时间
            formatDate: function (value) {
                if(value===null){
                    return ""
                }else{
                    let date = new Date(value);
                    let y = date.getFullYear();
                    let MM = date.getMonth() + 1;
                    MM = MM < 10 ? ('0' + MM) : MM;
                    let d = date.getDate();
                    d = d < 10 ? ('0' + d) : d;
                    let h = date.getHours();
                    h = h < 10 ? ('0' + h) : h;
                    let m = date.getMinutes();
                    m = m < 10 ? ('0' + m) : m;
                    let s = date.getSeconds();
                    s = s < 10 ? ('0' + s) : s;
                    return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
                }
            },
            //获取设置信息
            async queryShenPiRenYuan() {
                var param = {
                    guid: this.sxGuid
                }
                const res = await this.portService.queryShenPiRenYuan(param)
                if (res.data) {
                    var thisData = res.data
                    this.spszData.spsxObj.spsxName= thisData.shenPiShiXiangName
                    this.spszData.spsxObj.spsxVal = thisData.guid

                    this.spszData.spszVal= thisData.shenPiJiBie
                    this.spjbFunc(this.spszData.spszVal)

                    this.dijspData= thisData.yijiRenYuanList
                    this.dejspData = thisData.erjiRenYuanList
                    this.dsjspData = thisData.sanjiRenYuanList
                }
            },
            //点击一级审批添加按钮
            addYjSp(){
                this.level=1
                this.$refs.spryDialog.qyBoolen()
            },
            //点击二级审批添加按钮
            addejSp(){
                this.level = 2
                this.$refs.spryDialog.qyBoolen()
            },
            //点击三级审批添加按钮
            addsjSp(){
                this.level = 3
                this.$refs.spryDialog.qyBoolen()
            },
            //点击一级审批删除按钮
            deletYj(index, list){
                list.splice(index, 1)
            },
            //点击二级审批删除按钮
            deletEj(index, list){
                list.splice(index, 1)
            },
            //点击三级审批删除按钮
            deletSj(index, list){
                list.splice(index, 1)
            },
            //选择审批人员
            getQyData(payload){
                if(this.level == 1){
                    for(let i=0;i<payload.length;i++){
                        this.dijspData.push(payload[i])
                    }

                    this.dijspData=this.arrayQC(this.dijspData)
                }else if(this.level == 2){
                    for(let i=0;i<payload.length;i++){
                        this.dejspData.push(payload[i])
                    }

                    this.dejspData=this.arrayQC(this.dejspData)
                }else if(this.level == 3){
                    for(let i=0;i<payload.length;i++){
                        this.dsjspData.push(payload[i])
                    }

                    this.dsjspData=this.arrayQC(this.dsjspData)
                }
            },
            arrayQC(arr){
                var arr2 = arr.filter((x, index,self)=>{
                    var arrids = []
                    arr.forEach((item,i) => {
                        arrids.push(item.userid)
                    })
                    return arrids.indexOf(x.userid) === index
                })
                return arr2
            },
            //转换时间格式
            timeChange(row, column, cellValue, index){
                return this.formatDate(cellValue)
            },
        },
        create() {
        },
        mounted() {
            //路由获取id
            this.sxGuid = this.$route.params.id
            this.queryShenPiRenYuan()

            this.spszData.creatorName = this.$store.state.loginCookie.userInfo.name
            this.spszData.createTime = this.formatDate(this.nowTime)
        },
        destroyed() { },
        watch: {
        },
    }

</script>

<style lang="scss" scoped>
    .container {
        width: 100%;
    }

    /*头部样式*/
    .spszrlHeader {
        width: 100%;
        height: 90px;
        background: #fff;
        div {
            width: calc(100% - 40px);
            height: 40px;
            margin: 0 auto;
            ul {
                overflow: hidden;
                width: 100%;
                height: 100%;
                li {
                    float: left;
                    width: 50%;
                    height: 100%;
                    h3 {
                        height: 40px;
                        color: #000;
                        font-size: 16px;
                        line-height: 40px;
                    }
                }
                li:last-child {
                    float: right;
                    text-align: right;
                     ::v-deep.el-button {
                        width:60px;
                        height: 40px!important;
                        padding:0;
                    }
                }
            }
        }
        div:first-child {
            color: #404040;
            font-size: 14px;
            line-height: 40px;
        }
    }

    /*主体内容样式*/
    .spszrlContent {
        width: calc(100% - 10px);
        margin: 5px;
        .bottomLine {
            width: 100%;
            border-bottom: 1px solid #e9e9e9;
        }
        >div {
            width: 100%;
            margin-bottom: 20px;
            padding-bottom:10px;
            background: #fff;
        }
        h3 {
            width: calc(100% - 40px);
            height: 40px;
            margin: 0 auto;
            color: #333;
            font-size: 16px;
            line-height: 40px;
        }
        .spszDiv {
            padding-bottom:0;
            .bottomLine{
                margin-bottom:10px;
            }
            .spszForm {
                width: calc(100% - 40px);
                height:120px;
                margin: 0 auto;
                 ::v-deep.el-form-item {
                    width: 50%;
                    height: 60px;
                    margin-right: 0;
                    margin-bottom:0;
                    .el-form-item__label {
                        width: 100PX!important;/*no*/
                        height: 40px;
                        padding-left: 12px;
                        font-size:14px;
                        line-height: 40px;
                    }
                    .el-form-item__content {
                        width: calc(100% - 100PX);/*no*/
                        line-height: 0;
                        height: 40px;
                        .el-input {
                            width: 100%;
                            height: 40px;
                            .el-input__inner {
                                width: 100%;
                                height: 40px;
                                font-size:14px;
                            }
                        }
                        .el-select {
                            width: 100%;
                            height: 40px;
                            font-size:14px;
                        }
                    }
                }
            }
        }
        .topDiv{
            width: calc(100% - 40px);
            height: 50px;
            margin: 0 auto;
            ul{
                overflow:hidden;
                width:100%;
                height:50px;
                li{
                    float: left;
                    width:50%;
                    height:50px;
                    line-height: 50px;
                    h3{
                        width:100%;
                        height:50px;
                        color: #333;
                        font-size: 14px;
                        line-height: 50px;
                    }
                }
                li:last-child{
                    text-align:right;
                    ::v-deep.el-button {
                        width:60px;
                        height: 40px!important;
                        padding:0;
                    }
                }
            }

        }
        ::v-deep.el-table{
            .el-table__header tr th{
                height:48px;
                padding:0;
            }
            .el-table__body tr td{
                height:48px;
                padding:0;
            }
            .cell {
                padding: 0;
            }
            .el-button{
                color:#f00;
            }
        }
    }
</style>
