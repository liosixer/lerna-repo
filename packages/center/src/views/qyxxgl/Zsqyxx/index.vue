<template>
      <div class="procurement-plan">
        <div class="procurement-plan-title global-title" ref="table_title">
          <page-crumb :d="{breadcrumbList:breadcrumbList}">
        <!-- </div>
        <div class=" global-content ">
            <div class="global-content-search clearfix" ref="table_search"> -->
            <div class="search-btnGroud" slot="btns">
                <el-popover class="search-term" placement="bottom" width="300" trigger="click" v-model="iscollapsider">
                    <el-form ref="form" :model="searchData" label-width="100px" size="small" label-position="right">
                            <el-form-item label="企业名称">
                                <el-input  placeholder="请输入" v-model="searchData.qiYeName" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="企业代码">
                                <el-input  v-model="searchData.qiYeBH"  placeholder="请输入"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人">
                                <el-input  v-model="searchData.userName"  placeholder="请输入"></el-input>
                            </el-form-item>
                            <el-form-item label="主体市场">
                                <el-select v-model="searchData.zhuTiLeiXing" placeholder="请选择">
                                    <el-option :value="item.code" :label="item.name" v-for="item in zhuTiType" :key="item.code"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="审核状态">
                                <el-select v-model="searchData.isYouXiao" placeholder="请选择">
                                    <el-option :value="item.code" :label="item.name" v-for="item in qyStatus" :key="item.code"></el-option>
                                </el-select>
                            </el-form-item>
                            <div class="search-form-footer">
                                <el-button @click.stop="searchBtn" size="small" type="primary" icon="el-icon-search">查询</el-button>
                                <el-button @click.stop="resetBtn" size="small" icon="el-icon-refresh-right">重置</el-button>
                            </div>
                    </el-form>
                    <el-button slot="reference" size="small" type="text">
                        筛选条件<i class="el-icon-arrow-down"></i>
                    </el-button>
                    </el-popover>
                    </div>
                </page-crumb>
            </div>
            <div class="global-content">
            <div class="global-content-search clearfix" ref="table_search">
            </div>
            <div class="global-content-detail">
                <self-table border :data="tableData" v-loading="loading" stripe style="width: 100%" :height="tableHeight">
                    <el-table-column type="index" label="序号"  width="80"></el-table-column>
                    <el-table-column prop="accountName" label="用户名" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="registrantPhone" label="注册手机号" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="qiYeName" label="企业名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="qiYeBH" label="企业代码" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="zhuTiLeiXing" label="交易市场主体" show-overflow-tooltip>
                        <template slot-scope="{ row }">
                            <span>{{ row.zhuTiLeiXing| zhuTiLeiXingFilter}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="fddbrName" label="联系人" show-overflow-tooltip></el-table-column>
<!--                    <el-table-column prop="fddbrPhone" label="联系电话" show-overflow-tooltip></el-table-column>-->
                    <el-table-column prop="createTime" label="入库时间" show-overflow-tooltip>
                        <template slot-scope="{ row }">
                            <span>{{ row.createTime| timestampChange}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="isYouXiao" label="是否有效"  show-overflow-tooltip>
                        <template slot-scope="{ row }">
                          <span v-if="row.isYouXiao===0" class="cost-success">有效</span>
                          <span v-else class="cost-error">无效</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" min-width="180"  align="left" fixed="right">
                        <template slot-scope="scope">
                            <el-button-group class="operation-button-group">
                                <el-button @click="checkout(scope.row)" size="mini" type="primary" plain class="operation-button">
                                    <i class="iconfont icon-anniutubiao-"><span>查看</span></i>
                                </el-button>
                                <el-button @click="updJyUser(scope.row.userQiYeGuid)" size="mini" type="primary" plain class="operation-button">
                                    <i class="iconfont icon-mima"><span>重置密码</span></i>
                                </el-button>
                                <el-button @click="updJyUserQiYe(scope.row.userQiYeGuid,scope.row.isYouXiao)" size="mini" type="primary" plain class="operation-button">
                                    <i class="iconfont icon-feiqi"><span>{{scope.row.isYouXiao===0?'设为无效':'设为有效'}}</span></i>
                                </el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </self-table>
            </div>
            <div class="com-table-pagination clearfix" ref="table_pagination">
                <v-pagination
                        :total="total"
                        :page="searchData.page"
                        :limit="searchData.rows"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                ></v-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import { timestampChange, getLabel } from "@/assets/js/filter";
    import Mixin from './mixin'
    import VPagination from "@/components/VPagination";
    import statusOptions from '@/setting/status'
    import commonOptions from '@/setting/common'
    import PageCrumb from "@/components/PageCrumb";
    export default {
        name: "zsqyxx",
        mixins: [Mixin],
        components: {
            VPagination,
            PageCrumb
        },
        data () {
            return {
                breadcrumbList: [
                    { label: "交易用户管理", link: "" },
                    { label: "正式企业信息", link: "" },
                ],
                loading: false,
                tableData: [],
                multipleSelection: [],
                iscollapsider: false,
                total: 0,
                searchData:{
                    page: 1,
                    rows: 10,
                    qiYeName: "",
                    qiYeBH: "",
                    zhuTiLeiXing: "",
                    userName: "",
                    isYouXiao: "",
                },
                qyStatus:'',
            }
        },
        created() {
            this.qyStatus = statusOptions.qyStatus
            this.zhuTiType = commonOptions.zhuTiType
            this.getData()
            this.computeTableHeight()
        },
        methods: {
            async getData() {
                this.loading = true;
                const {code,data} = await this.portService.queryAllQiYeList(this.searchData)
                this.loading = false;
                if (code) {
                    this.tableData = data.list
                    this.total = data.totalCount
                }
            },
            resetBtn(){
                this.searchData.qiYeName = "";
                this.searchData.qiYeBH = "";
                this.searchData.userName = "";
                this.searchData.isYouXiao = "";
                this.searchData.zhuTiLeiXing = "";
                this.getData()
            },
            searchBtn() {
                this.iscollapsider= false
                this.getData();
            },
            checkout(row) {
                this.$router.push({
                    // name: "ZsqyxxDetail",
                    path:'/qyxxgl/zsqyxxDetail',
                    query: {
                        methods: 'checkout',
                        id: row.userQiYeGuid
                    }
                });
            },
            async updJyUser(userQiYeGuid) {
                const {code,data} = await this.portService.updJyUser({'userQiYeGuid':userQiYeGuid});
                if(code) {
                    if (code == 1) {
                        this.$message({ message: data, type: "success" });
                    } else {
                        this.$message({ message: data, type: "warning" });
                    }
                }else{
                    this.$message({ message: data, type: "warning" });
                }

            },
            async updJyUserQiYe(userQiYeGuid,isyouxiao) {
                let params = {
                    userQiYeGuid : userQiYeGuid,
                    isYouXiao : isyouxiao===1?0:1,
                }
                const {code,data} = await this.portService.updJyUserQiYe(params);
                if(code) {
                    if (code == 1) {
                        this.$message({ message: data, type: "success" });
                        this.getData();
                    } else {
                        this.$message({ message: data, type: "warning" });
                    }
                }else{
                    this.$message({ message: data, type: "warning" });
                }

            },
            handleSizeChange(val) {
                this.searchData.rows = val
                this.getData()
            },
            handleCurrentChange(val) {
                this.searchData.page = val
                this.getData()
            },
        },
        filters: {
            zhuTiLeiXingFilter: function (value) {
                if (!value) return ''
                let zhuTiStr = '';
                let zhuTiArr = value.split(',')
                zhuTiArr.forEach(val => {
                    if('A'===val){
                        zhuTiStr+='招标代理机构,';
                    }else if ('B'===val){
                        zhuTiStr+='采购人/招标人,';
                    }else if ('T'===val){
                        zhuTiStr+='供应商/投标人,';
                    }
                });
                if(zhuTiStr){
                    zhuTiStr = zhuTiStr.substring(0,zhuTiStr.length-1)
                }
                return zhuTiStr
            }
        }
    }
</script>

<style lang="scss" scoped>
    .procurement-plan {
        text-align: left;
    }
    .el-table__row {
        .el-button--small,{
            padding: 0;
        }
    }
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
