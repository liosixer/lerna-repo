<template>
  <el-dialog :title="configuration.title" :visible.sync="dialogFormVisible" :append-to-body="true">
    <div>
      <el-form ref="form" :model="searchFormList" :before-close="handleClose" label-width="85px" size="small" v-if="searchItem.length > 0">
        <el-row :gutter="20">
          <el-col :span="8" v-for="item in searchItem" :key="item.key">
            <el-form-item :label="item.label">
              <el-input v-model="searchFormList[item.value]"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <div class="clearfix">
              <div>
                <el-button @click.stop="search()" type="primary" size="small" icon="el-icon-search">查询</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableData" border stripe ref="table" style="width: 100%" :row-key="getRowKey" @selection-change="handleSelectionChange">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <template v-for="item in tableItem">
          <el-table-column :prop="item.value" :label="item.label" show-overflow-tooltip></el-table-column>
        </template>
        <el-table-column type="selection" width="55" v-if="select" :reserve-selection="persistentData ? true : false"></el-table-column>
        <el-table-column label="操作" align="center" show-overflow-tooltip v-else>
          <template slot-scope="{ row }">
            <el-button-group class="operation-button-group">
              <el-button @click="selectit(row)" type="primary" plain class="operation-button" size="mini">
                <i class="iconfont icon-xuanze-">
                  <span>选择</span>
                </i>
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
        <div slot="empty" class="custom-empty"></div>
      </el-table>
      <div class="com-table-pagination clearfix">
        <v-pagination :total="total" :page="searchFormList.page" :limit="searchFormList.rows" @size-change="handleSizeChange" @current-change="handleCurrentChange"></v-pagination>
      </div>
      <div style="text-align: center;margin-top: 20px;" v-if="select">
        <el-button type="primary" size="small" @click="checkout()">确定</el-button>
        <el-button size="small" @click="cancel()">取消</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import VPagination from "@/components/VPagination";

export default {
  name: "dailog",
  props: ["query", "interface", "configuration", "select", "getDataType", "persistentData"],
  components: { VPagination },
  watch: {
    dialogFormVisible(val) {
      if (!val) {
        for (var i in this.searchFormList) {
          this.searchFormList[i] = "";
        }
        this.searchFormList = { ...this.searchFormList, page: 1, rows: 10 };
      }
    },
  },
  data() {
    return {
      dialogFormVisible: false,
      tableData: [],
      searchFormList: {
        page: 1,
        rows: 10,
      },
      total: 0,
      searchItem: [],
      tableItem: [],
      multipleSelection: [],
    };
  },
  methods: {
    handleSizeChange(val) {
      this.searchFormList.rows = val;
      this.getList();
    },
    handleSelectionChange(val) {
      this.$emit("multipleSelection", val);
      this.multipleSelection = val;
    },
    getRowKey(row) {
      if (this.persistentData) {
        return row[this.persistentData];
      }
    },
    handleCurrentChange(val) {
      this.searchFormList.page = val;
      this.getList();
    },
    handleClose() {
      this.cancel();
    },
    async getList() {
      console.log(this.query);
      const { code, data, total } = await this.portService[this.interface]({
        ...this.query,
        ...this.searchFormList,
      });
      if (code) {
        console.log(this.getDataType, "this.getDataType", this.query);
        if (this.getDataType == "list") {
          //  取后台list里边的数据
          this.tableData = data.list;
          if (total) {
            this.total = total;
          } else {
            this.total = data.totalCount;
          }
        } else {
          //  取后台rows里边的数据
          this.tableData = data.rows;
          if (total) {
            this.total = total;
          } else {
            this.total = data.total;
          }
        }
      }
    },
    cancel() {
      this.resetSearch();
      this.dialogFormVisible = false;
    },
    selectit(row) {
      this.$emit("getDetail", row);
      this.cancel();
    },
    search() {
      this.getList();
    },
    resetSearch() {
      // for (var i in this.searchFormList) {
      //   this.searchFormList[i] = "";
      // }
      // this.searchFormList.page = 1;
      // this.searchFormList.rows = 10;
      // this.tableData = [];
      if (this.persistentData) {
        this.$refs.table.clearSelection();
      }
    },
    checkout() {
      this.$emit("getDetail", this.multipleSelection);
      this.cancel();
    },
  },
  created() {
    Object.keys(this.configuration.searchItem).forEach((v) => {
      this.searchItem.push({
        value: v,
        label: this.configuration.searchItem[v],
      });
      // this.searchFormList[v] = "";
    });

    Object.keys(this.configuration.tableItem).forEach((v) => {
      this.tableItem.push({
        value: v,
        label: this.configuration.tableItem[v],
      });
    });
  },
};
</script>
<style lang="scss" scoped>
@import "./dialog.scss";
</style>
