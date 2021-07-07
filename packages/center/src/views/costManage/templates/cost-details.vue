<template>
  <div>
    <!-- <ContentHeader title="平台使用费设置-详情"> -->
    <page-crumb :d="{breadcrumbList:breadcrumbList}">
      <template slot="btns">
        <el-button size="small" @click="saveBtn" type="primary" :loading="loading">保存</el-button>
        <el-button size="small" @click="$router.go(-1)">返回</el-button>
      </template>
    </page-crumb>

    <!-- <ContentHeader :title="$route.meta.routeName">
            <template slot="btns">
                <el-button size="small"  @click="saveBtn" type="primary">保存</el-button>
                <el-button size="small" @click="$router.go(-1)">返回</el-button>
            </template>
    </ContentHeader>-->
    <!-- </ContentHeader> -->

    <div class="global-content global-clear-bg">
      <cost-set-header :costData="costData" ref="cost"></cost-set-header>

      <cost-set-table
        :type="costData.ptfwRuleType"
        @on-handleDel="handleDel"
        @on-handleAdd="handleAdd"
        @on-handleEdit="handleEdit"
        :tableData="tableData"
      ></cost-set-table>
    </div>

    <cost-set-add
      v-model="showModal"
      @on-addSuccess="addSuccess"
      :data="rowData"
      :type="costData.ptfwRuleType"
    ></cost-set-add>
  </div>
</template>

<script>
import costSetHeader from "./cost-set-header";
import costSetTable from "./cost-set-table";
import costSetAdd from "./cost-set-add";
// import ContentHeader from "@/components/contentHeader/ContentHeader";
import PageCrumb from "@/components/PageCrumb";

export default {
  name: "cost-Details",
  components: {
    costSetHeader,
    costSetTable,
    costSetAdd,
    // ContentHeader
    PageCrumb,
  },
  data() {
    return {
      showModal: false,
      costData: {},
      rowData: {},
      searchFrom: {
        page: 1,
        rows: 10,
      },
      tableData: [],
      breadcrumbList: [
        {
          label:
            this.$route.query.type == 1 ? "代理服务费设置" : "平台使用费设置",
          link:
            this.$route.query.type == 1
              ? "/costManage/agentCost"
              : "/costManage/platformCost",
        },
        { label: "编辑", link: "" },
      ],
    };
  },
  created() {
    this.costDetail();
  },
  methods: {
    /**
     * 初始化查询
     */
    async costDetail() {
      const { code, data } = await this.portService.costDetail({
        guid: this.$route.query.guid,
      });

      if (code) {
        this.costData = data;
        this.tableData = data.ptfwfRuleInfoVOList;
      }
    },
    /**
     * 跟新时-查询表格数据
     */
    async searchList() {
      const { code, data } = await this.portService.costGetInfoListByRuleId({
        ruleGuid: this.$route.query.guid,
      });

      if (code) {
        this.tableData = data;
      }
    },
    /**
     * 编辑规则详细
     */
    async editRule(data) {
      this.loading = true;
      const req = await this.portService.costManageUpdate(data).catch(() => {
        this.loading = false;
        this.$message.error("提交失败");
      });

      this.loading = false;
      if (req.code) {
        this.$message({ type: "success", message: req.info });
      } else {
        this.$message({ type: "error", message: req.info });
      }
    },
    /**
     * 删除费用管理规则
     */
    async costDeleteOneRule(data) {
      const req = await this.portService.costDeleteOneRule(data);

      if (req.code) {
        this.searchList();
        this.$message({ type: "success", message: req.info });
      } else {
        this.$message({ type: "error", message: req.info });
      }
    },
    /**
     * 编辑保存
     */
    saveBtn() {
      this.$refs.cost.validateForm((validate) => {
        if (validate) this.editRule(validate);
      });
    },

    /**
     * 表格 删除按钮被点击
     * @param {Object} row 表格的当前条数据
     */
    handleDel(row) {
      this.$confirm("此操作将永久删除该计算规则, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.costDeleteOneRule({ guid: row.guid });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消删除" });
        });
    },
    /**
     * 表格 添加按钮被点击
     * @param {Object} row 表格的当前条数据
     */
    handleAdd() {
      this.rowData = {
        __type__: "add",
        ruleGuid: this.costData.guid,
        sequence: this.tableData.length + 1,
      };
      this.showModal = true;
    },
    /**
     * 表格 编辑按钮被点击
     * @param {Object} row 表格的当前条数据
     */
    handleEdit(row) {
      this.rowData = Object.assign({}, row, {
        __type__: "edit",
      });
      this.showModal = true;
    },
    /**
     * 添加请求成功
     */
    addSuccess() {
      this.showModal = false;
      this.searchList();
    },
  },
};
</script>