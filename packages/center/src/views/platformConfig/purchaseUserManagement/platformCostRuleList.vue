<template>
  <!-- 平台使用费收费规则 -->
  <el-card>
    <div slot="header" class="clearfix">
      <span class="global-card-header-name">平台使用费收费规则</span>
    </div>
    <div class="global-card-content">
      <self-table border v-loading="loading" :data="tableData" stripe style="width: 100%" height="420">
      <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column prop="projectType" label="项目类型" min-width="120" show-overflow-tooltip>
        <template slot-scope="{row}">
          {{row.projectType | translate(globalSetting.common.projectType)}}类
        </template>
      </el-table-column>
      <el-table-column prop="zbFangShi" label="采购方式" min-width="120" show-overflow-tooltip>
        <template slot-scope="{row}">
          {{row.zbFangShi | translate(globalSetting.common.PurchaseType)}}
        </template>
      </el-table-column>
      <el-table-column prop="shouFeiMethod" label="收费方式" min-width="120" show-overflow-tooltip>
        <template slot-scope="{row}">
          <!-- <template v-if="row.shouFeiMethod == 1 || row.shouFeiMethod == 2">
            {{row.shouFeiMethod | translate(globalSetting.platformConfig.costType)}}
          </template> -->
          <el-select v-model="row.shouFeiMethod" placeholder="请选择" @change="val => handleChangePay(val, row)" size="small">
            <el-option
              v-for="item in globalSetting.platformConfig.costType"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="shouFeiRuler" label="收费规则" min-width="120" show-overflow-tooltip>
        <template slot-scope="{row}">
          <template v-if="row.shouFeiMethod == 1 || row.shouFeiMethod == 2">
            <!-- {{getRuleName(row)}} -->
            {{row.shouFeiRuler}}
          </template>
          <template v-else>
            <el-input v-model="row.shouFeiRuler" @blur="event => handleInputBlur(row)" size="small">
              <template v-if="row.shouFeiMethod == 3" slot="suffix">元</template>
              <template v-if="row.shouFeiMethod == 4" slot="suffix">%</template>
            </el-input>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="shouFeiTimes" label="收费次数" min-width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="shouFeiAmount" label="收费金额（元）" min-width="120" class-name="table-column-money" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" min-width="120" align="left" fixed="right" v-if="!disabledEdit">
        <template slot-scope="{row, $index}">
          <el-button-group class="operation-button-group">
            <el-button v-if="row.shouFeiMethod == 1 || row.shouFeiMethod == 2" @click="handleEdit(row, $index)" size="mini" type="primary" plain class="operation-button">
              <i class="iconfont icon-bianji2"><span>修改规则</span></i>
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
      <div slot="empty" class="custom-empty"></div>
    </self-table>
    <v-pagination
      v-if="total > 0"
      :total="total"
      :page="searchFormList.pageNo"
      :limit="searchFormList.pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></v-pagination>
    </div>

    <rule-list-dialog
      :dialog-visible.sync="ruleVisible"
      @handleSelect="handleSelectRule"
      :rule-type="editRuleObj.shouFeiMethod"
    ></rule-list-dialog>
  </el-card>
</template>

<script>
import VPagination from "@/components/VPagination";
import ruleListDialog from "./ruleListDialog"

export default {
  name: "platformCostRuleList",
  inject: ["globalSetting"],
  props: {
    guid: {
      type: String,
      default: ""
    },
    disabledEdit: {
      type: Boolean,
      default: false
    },
    baseForm: {
      type: Object,
      default: () => ({})
    },
    isShow: {
      type: Boolean,
      default: false
    },
    // 是否是租户
    isLessee:{
      type: Boolean,
      default: false
    }
  },
  components: {
    VPagination,
    ruleListDialog,
  },
  data() {
    return {
      tableData: [],
      loading: false,
      total: 0,
      searchFormList: {
        pageNo: 1,
        pageSize: 10,
      },
      ruleVisible: false,
      editRuleObj: {},
    }
  },
  watch: {
    'isShow': {
      handler(val, old) {
        if (val) {
          this.getList()
        }
      },
      immediate: true,
    }
  },
  methods: {
    // 获取列表数据
    async getList() {
      this.loading = true
      const res = await this.portService.fetchCostRuleList({
        ...this.searchFormList,
        zuHuGuid: this.guid,
      })
      if (res && res.code == 1) {
        this.loading = false
        this.tableData = res.data.rows
        this.total = res.data.total
      }
    },
    // 收费方式
    getRuleName(row) {
      function translate(val, arr) {
        let res = arr.find((e) => e.code === val)
        if (res) return res.name
        else return val
      }
      let project = translate(row.projectType, this.globalSetting.common.projectType)
      let purchase = translate(row.zbFangShi, this.globalSetting.common.PurchaseType)
      let rule = translate(row.shouFeiMethod, this.globalSetting.platformConfig.costType)
      return `${project}类${purchase}${rule}`
    },
    // 收费方式
    async handleChangePay(val, row) {
      if (val == 1 || val == 2) {
        this.handleSaveRule(row, "other")
      } else {
        this.handleCheckInput(row)
      }
    },
    // 金额/比例
    handleInputBlur(row) {
      this.handleCheckInput(row)
    },
    // 输入框校验
    handleCheckInput(row) {
      let regNumFloat = /^[0-9]+[.]?[0-9]{0,2}$/
      let regNumInt = /^[0-9]+$/
      if (row.shouFeiRuler == null && row.shouFeiRuler != 0) {
        return this.$message.warning("请修改对应收费规则")
      } else if (row.shouFeiRuler || row.shouFeiRuler == 0) {
        if (row.shouFeiMethod == 4) {
          if (!regNumFloat.test(row.shouFeiRuler)) {
            return this.$message.warning("输入最多两位小数")
          }
          if (row.shouFeiRuler > 100 || row.shouFeiRuler < 0) {
            return this.$message.warning("比例值大于0小于100")
          }
          this.handleSaveRule(row)
        } else if (row.shouFeiMethod == 3 && !regNumInt.test(row.shouFeiRuler)) {
          return this.$message.warning("只能输入数字")
        } else {
          this.handleSaveRule(row)
        }
      }
    },
    // 保存规则--金额、比例
    async handleSaveRule(row, type) {
      let res = await this.portService.fetchSaveCostRule({
        guid: row.guid,
        rulerGuid: "",
        shouFeiMethod: row.shouFeiMethod,
        shouFeiRuler: type ? "" : row.shouFeiRuler,
      })
      if (res && res.code == 1) {
        this.$message.success("修改成功")
        this.getList()
      }
    },
    // 修改规则
    handleEdit(row, i) {
      this.editRuleObj = { ...row }
      this.ruleVisible = true
    },
    // 选择规则--保存 标准、梯度
    async handleSelectRule(row) {
      let res = await this.portService.fetchSaveCostRule({
        guid: this.editRuleObj.guid,
        rulerGuid: row.guid,
        shouFeiMethod: this.editRuleObj.shouFeiMethod,
        shouFeiRuler: row.ruleName,
      })
      if (res && res.code == 1) {
        this.$message.success("修改成功")
        this.getList()
      }
    },
    // 分页大小改变
    handleSizeChange(val) {
      this.searchFormList.pageSize = val
      this.getList()
    },
    // 页码改变
    handleCurrentChange(val) {
      this.searchFormList.pageNo = val
      this.getList()
    },
  },
}
</script>