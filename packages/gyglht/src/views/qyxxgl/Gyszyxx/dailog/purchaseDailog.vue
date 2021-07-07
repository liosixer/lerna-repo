<template>
  <div>
    <div>
      <el-dialog
        title="选择采购单位"
        :visible.sync="dialogVisible"
        width="950px"
        :append-to-body="true"
        :before-close="handleClose"
      >
        <div class="q_body">
          <div class="p_header">
            <el-form
              label-width="100px"
              :model="searchData"
              ref="searchDataForm"
              label-position="right"
              size="small"
            >
              <el-row :gutter="20">
                <el-col :span="10">
                  <el-form-item label="单位名称">
                    <el-input
                      v-model="searchData.qiYe_Name"
                      size="small"
                      type="text"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="企业代码">
                    <el-input
                      size="small"
                      type="text"
                      v-model="searchData.qiYe_BH"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label-width="0px">
                    <el-button
                      size="small"
                      type="primary"
                      icon="el-icon-search"
                      @click="handleSerchEnterprise"
                    >查询</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="p_body">
            <self-table border :data="tableData" stripe style="width: 100%" height="350">
              <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
              <el-table-column prop="qiYe_Name" label="单位名称" width="180"></el-table-column>
              <el-table-column prop="qiYe_BH" label="企业代码"></el-table-column>
              <el-table-column label="操作" width="120" align="left" fixed="right">
                <template slot-scope="scope">
                  <el-button-group class="operation-button-group">
                    <el-button
                      type="primary"
                      plain
                      class="operation-button"
                      size="mini"
                      @click="handleSelectEnterprise(scope.row)"
                    >
                      <i class="iconfont icon-xuanze-">
                        <span>选择</span>
                      </i>
                    </el-button>
                  </el-button-group>
                </template>
              </el-table-column>
              <div slot="empty" class="custom-empty"></div>
            </self-table>
            <v-pagination
              :total="total"
              :page="this.page"
              :limit="this.limit"
              v-if="total > 0"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            ></v-pagination>
          </div>
        </div>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        title="专业供应商申请"
        :append-to-body="true"
        :visible.sync="qshow"
        width="950px"
        :before-close="handleClose1"
      >
        <div>
          <el-form
            label-width="110px"
            :model="formData"
            ref="formData"
            :rules="formDataRules"
            size="small"
            label-position="right"
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="采购单位名称" prop="caiGouDanWei">
                  <el-input
                    placeholder="请选择企业"
                    size="small"
                    readonly
                    v-model="formData.caiGouDanWei"
                    style="width: 260px; margin-right: 10px"
                  ></el-input>
                  <el-button type="primary" size="small" @click="handleShowSelector">选择</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="企业代码" prop="caiGouDanWeiBH">
                  <el-input
                    placeholder="请选择企业"
                    v-model="formData.caiGouDanWeiBH"
                    size="small"
                    readonly
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="专业分类" prop="zhuanYeFenLei">
                  <!-- :showCheckbox="Object.keys(pData).length ? false : true"  修改专业职能单选 -->
                  <!-- :showCheckbox="Object.keys(pData).length ? false : true"  -->
                  <Tree
                    :nodes="cats"
                    v-if="catFlag"
                    :checkeds="typeof formData.zhuanYeFenLei === 'string' ? formData.zhuanYeFenLei.split(','):formData.zhuanYeFenLei"
                    v-model="formData.zhuanYeFenLei"
                    treeId="id"
                    nodeKey="id"
                    refName="hangYeFenLei"
                    fullPath
                    :defaultProps="{ children: 'children', label: 'name' }"
                    :source="'supplierZhuanYeFenLei'"
                    ref="zhuanYeFenLeiRef"
                  />
                </el-form-item>
<!--                :showCheckbox="Object.keys(pData).length ? false : true"-->
<!--                :isStrictly="true"-->
              </el-col>
              <el-col :span="12">
                <el-form-item label="申请资料模板">
                  <p v-if="materialTemplate" class="down-link" @click="handleDownMaterial">{{materialName}}</p>
                  <!-- <a href="#" class="a_link" @click="downloadTemp('15030f0a-8d0f-4dd7-aeb0-cb62a5404f5c')">专业申请材料模板.doc</a> -->
                  <p v-else>暂无</p>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="申请资料上传" prop="shenQiZiLiaoGuid" :rules="materialTemplate ? [{ required: true, message: '资质证书上传', trigger: 'change' }] : {}">
                  <upLoader
                    action="/upload"
                    :limitNum="1"
                    @onRemoveFn="handleonRemoveFnImage"
                    :uploadedList="formData.shenQiZiLiaoName?[{guid: formData.shenQiZiLiaoGuid, fileName:formData.shenQiZiLiaoName}]:[]"
                    @sucData="handleImageUpdoadSuc"
                  ></upLoader>
                  <el-input
                    type="text"
                    style="display:none"
                    placeholder="请输入"
                    v-model="formData.shenQiZiLiaoName"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose1" size="small">取 消</el-button>
          <el-button type="primary" @click="handlePostForm" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import upLoader from "@/components/Upload";
import Tree from "@/components/tree/Tree";
import {
  getAllQiYe,
  saveOrUpdateApp,
  getCascaderCat,
  queryCatByQiyeHB,
  fetchMaterialTemplate
} from "@/service/enterpriseInfo";
import utils from "@/utils/utils.js";
import util from "@/utils/util"
import hyfl from "@/assets/js/hyfl.js"

export default {
  props: {
    pData: {
      type: Object,
      default: () => {}
    },
    subjectCat: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      page: 1,
      limit: 10,
      total: 0,
      qshow: false,
      searchData: {
        qiYe_BH: "",
        qiYe_Name: ""
      },
      catFlag: false,
      formData: {
        caiGouDanWei: "",
        caiGouDanWeiBH: "",
        zhuanYeFenLei: "",
        shenQiZiLiaoName: "",
        shenQiZiLiaoGuid: "",
        guid: ""
      },
      formDataRules: {
        caiGouDanWei: [
          { required: true, message: "请选择采购单位", trigger: "change" }
        ],
        zhuanYeFenLei: [
          { required: true, message: "请选择专业分类", trigger: "change" }
        ],
        caiGouDanWeiBH: [
          { required: true, message: "请选择采购单位", trigger: "change" }
        ],
        // shenQiZiLiaoName: [
        //   { required: true, message: "资质证书上传", trigger: "change" }
        // ]
      },
      cats: [],
      materialTemplate: "",
      materialName: "",
    };
  },
  components: {
    upLoader,
    Tree
  },
  async created() {
    await this._getEnterList();
    this.catFlag = false;
    // getCascaderCat().then(res => {
    //   const data = res
    //   data.forEach(i => {
    //     if (i.children.length) {
    //       i.children.forEach(j => {
    //         Reflect.deleteProperty(j, 'children')
    //       })
    //     }
    //   })
    //   this.cats = data
    //   this.catFlag = true
    // })
    const d = this.pData;
    if (d.caiGouDanWeiBH) {
      // this.getCats(d.caiGouDanWeiBH);
      await this.getDiabledIndustry(d.caiGouDanWeiBH)
    }
    if (d.caiGouDanWei) {
      this.qshow = true;
      let res = await fetchMaterialTemplate({ qiyeBH: this.pData.caiGouDanWeiBH })
      if (res && res.code == 1) {
        this.materialTemplate = res.data.data || ""
        if (this.materialTemplate) {
          let file = await util.getFiles(this.materialTemplate)
          this.materialName = file.name
        } else {
          this.materialName = ""
        }
      }
      this.dialogVisible = false;
    } else {
      this.qshow = false;
      this.dialogVisible = true;
    }
  },
  mounted() {
    if (Object.keys(this.pData).length) {
      this.formData = Object.assign(this.formData, this.pData);
    }
  },
  methods: {
    // 禁用行业二级子节点
    getDiabledIndustry(qiYe_BH) {
      let arr = util.deepClone(hyfl)
      queryCatByQiyeHB({ qiYe_BH: qiYe_BH }).then(res => {
        arr.map(item => {
          if (item.children && item.children.length) {
            this.formatAddAttr(item.children, res)
          }
        })
        this.cats = util.deepClone(arr)
        this.cats.forEach(item=>{
          item.disabled = true;
          if(item.children.length>0){
            item.children.forEach(item1=>{
              console.log(item1)
              if(item1.children && item1.children.length>0){
                item1.disabled = true;
              }else{
                item1.disabled = false;
              }
            })
          }
        })
        this.catFlag = true
      })
    },
    // 递归 遍历
    formatAddAttr(arr = [], data = []) {
      arr.every(item => {
        if (data.includes(item.id)) {
          item.disabled = true
        } else {
          item.disabled = false
        }
        if (item.children && item.children.length) {
            item.children.every(c => {
              if (item.disabled) {
                c.disabled = true
              } else {
                c.disabled = false
              }
              if (c.children) {
                delete c.children
              }
              return c
            })
          }
        return item
      })
      return arr
    },
    downloadTemp(guid) {
      utils.downLoad(guid);
    },
    resetData() {
      this.$refs.formData.resetFields();
      this.formData = {
        caiGouDanWei: "",
        caiGouDanWeiBH: "",
        zhuanYeFenLei: "",
        shenQiZiLiaoName: "",
        shenQiZiLiaoGuid: "",
        guid: ""
      };
    },
    // 提交数据
    handlePostForm() {
      this.$refs.formData.validate(valid => {
        this.formData.zhuanYeFenLei =
          typeof this.formData.zhuanYeFenLei === "string"
            ? this.formData.zhuanYeFenLei
            : this.formData.zhuanYeFenLei.join(",");
        if (valid) {
          let arr = this.$refs.zhuanYeFenLeiRef.erParentList
          let erji = arr.join(",")
          saveOrUpdateApp({ ...this.formData, erjizhuanYeFenLei: erji })
            .then(res => {
              this.$message.success(res.info);
              this.$emit("onShow", false);
              this.$emit("onSuc");
            })
            .catch(e => {
              console.error(e);
            });
        }
      });
    },
    // 上传组件回调
    handleImageUpdoadSuc(data) {
      this.formData.shenQiZiLiaoName = data.name;
      this.formData.shenQiZiLiaoGuid = data.groupGuid;
    },
    handleonRemoveFnImage() {
      this.formData.shenQiZiLiaoName = "";
      this.formData.shenQiZiLiaoGuid = "";
    },
    // 关闭窗口后清空数据
    handleClose(done) {
      this.dialogVisible = false;
      this.$emit("onShow", false);
    },
    handleClose1() {
      this.resetData();
      this.$emit("onShow", false);
    },
    handleQCancel() {
      this.handleClose();
    },
    handleQOK() {},
    // 打开企业选择
    handleShowSelector() {
      this.dialogVisible = true;
    },
    //分页相关
    handleSizeChange(data) {
      this.limit = data;
      this._getEnterList();
    },
    //分页相关
    handleCurrentChange(data) {
      this.page = data;
      this._getEnterList();
    },
    // 选中企业
    async handleSelectEnterprise(data) {
      const { qiYe_Name, qiYe_BH, userQiYe_Guid } = data;
      this.formData.caiGouDanWei = qiYe_Name;
      this.formData.caiGouDanWeiBH = qiYe_BH;
      let res = await fetchMaterialTemplate({ qiYeGuid: userQiYe_Guid })
      if (res && res.code == 1) {
        this.materialTemplate = res.data.data || ""
        if (this.materialTemplate) {
          let file = await util.getFiles(this.materialTemplate)
          this.materialName = file.name
        } else {
          this.materialName = ""
        }
      }
      this.dialogVisible = false;
      this.qshow = true;
      // this.getCats(qiYe_BH);
      this.getDiabledIndustry(qiYe_BH)
      
    },
    // 下载文件模板
    async handleDownMaterial() {
      const url = await util.getDownSrc(this.materialTemplate)
      window.open(url)
    },
    getCats(qiYe_BH) {
      queryCatByQiyeHB({ qiYe_BH: qiYe_BH }).then(res => {
        this.cats = res;
        this.catFlag = true;
      });
    },
    // 搜索企业
    handleSerchEnterprise() {
      this._getEnterList();
    },
    _getEnterList() {
      getAllQiYe({
        page: this.page,
        rows: this.limit,
        ...this.searchData
      })
        .then(res => {
          if (res.code === 1) {
            this.tableData = res.data.rows;
            this.total = res.data.total;
          }
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.p_header {
  padding: 20px 0 0;
  border-bottom: 1px solid #eee;
  border-top: 1px solid #eee;
}
.a_link {
  color: brown;
}
.down-link{
  color: #409eff;
  cursor: pointer;
}
</style>
