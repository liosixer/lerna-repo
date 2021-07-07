<template>
  <el-dialog
    title="供应商管理"
    :visible.sync="dialogVisible"
    width="980px"
    :append-to-body="true"
    :before-close="handleClose">
    <div class="m-wrapper">
      <el-form :model="params" ref="formData" label-width="120px" size="small">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="供应商名称" prop="guanLiLeiXing">
              <el-input v-model="params.qiYeName"  placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业代码">
               <el-input v-model="params.qiYeBH"  placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" size="mini" style="float:right" @click="search">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="global-content-detail">
      <self-table border :data="tableData" :fit="true" ref="multipleTable" v-loading="serachFlag"  @select="handleSelectionChange">
          <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
          <el-table-column prop="qiYeName" label="供应商名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="qiYeBH" label="企业代码"  show-overflow-tooltip></el-table-column>
         <el-table-column
          type="selection"
          width="55">
        </el-table-column>
      </self-table>
      <div class="com-table-pagination clearfix" ref="table_pagination">
          <v-pagination
              :total="total"
              :page="params.pageNo"
              :limit="params.pageSize"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
          ></v-pagination>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="small">取 消</el-button>
      <el-button type="primary" @click="handleSaveInfo" size="small">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {saveSupplierInfo} from '@/service/enterpriseInfo'
export default {
  props: {
    selectedGongyingshangGuid: {
      type: String
    },
    infoGuid:{
      type: String
    }
  },
  components: {
  },
  data() {
    return {
      dialogVisible: true,
      tableData:[],
      serachFlag:false,
      total:0,
      params: {
        qiYeName:'',
        qiYeBH:'',
        pageNo: 1,
        pageSize: 10
      },
      selectedShangjia:[]
    }
  },
  created(){
    this.getTableData()
  },
  methods: {
    async getTableData(){
      console.log(this.selectedGongyingshangGuid)
      let data = Object.assign(this.params,{exceptGuids:this.selectedGongyingshangGuid})
      const res = await this.portService.queryXietongQiyeList(data)
      console.log(res.data.rows)
      if(res.code == 1){
        this.tableData = res.data.rows
        this.total = res.data.total
        let currentSelected = this.selectedShangjia[this.params.pageNo - 1]
        let that = this
        if(currentSelected){
          that.$nextTick(() => {
            that.toggleSelection(currentSelected)
          });
        }
      }  
    },
    handleSaveInfo () { 
      let data = this.selectedShangjia
      if(data.length == 0){
        this.$message.warning('请选择供应商')
        return
      }
      let arr = []
      data.forEach((pageSelect)=>{
        pageSelect.forEach((item)=>{
          arr.push(item)
        })
      })
      arr.forEach((item)=>{
        item.xieTongLevel = 0
      })
      this.portService.saveXietongDetail({infoGuid:this.infoGuid,qiyeArray:arr}).then(res => {
        if (res.code === 1) {
          this.$message.success('保存成功')
          this.handleClose()
        }
      })
    },
    handleClose () {
      this.params = {
        qiYeName:'',
        qiYeBH:'',
        pageNo: 1,
        pageSize: 10
      },
      this.$emit('onSuccess', false)
    },
    handleSizeChange(val) {
        this.params.pageSize = val
        this.getTableData()
        
    },
    handleCurrentChange(val) {
        this.params.pageNo = val
        this.getTableData()
    },
    handleSelectionChange(selection){
      this.selectedShangjia[this.params.pageNo - 1] = []
      this.selectedShangjia[this.params.pageNo - 1] = selection
      console.log(this.selectedShangjia)
    },
    toggleSelection(rows) {
      let that = this
      let indexList = []
      this.tableData.forEach((item,index)=>{
        rows.forEach((row,index1)=>{
          if(item.qiYeGuid == row.qiYeGuid){
            indexList.push(index)
          }
        })
      })

      if (rows) {
        indexList.forEach(index => {
          that.$refs.multipleTable.$refs.selfTable.toggleRowSelection(this.tableData[index],true);
        });
      } else {
        that.$refs.multipleTable.$refs.selfTable.clearSelection();
      }
    },
    search(){
      this.params.pageNo = 1
      this.params.pageSize = 10
      this.getTableData()
    }
  },
  watch: {
  }
}
</script>
