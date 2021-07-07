<template>
  <el-dialog
    custom-class="cus-dialog"
    title="开标项目"
    :visible="visible"
    width="50%"
    :append-to-body="true"
    @close="onCancel"
  >
    <self-table border :data="tableData" stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column
        prop="bdName"
        label="标题"
        min-width="150"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column label="开标时间" width="180">
        <template slot-scope="{ row }">{{
          row.kbTime | dateFormater('YYYY-MM-DD HH:mm:ss')
        }}</template>
      </el-table-column>
      <el-table-column
        prop="projectArea"
        label="开标地点"
        show-overflow-tooltip
      ></el-table-column>
      <div slot="empty" class="custom-empty"></div>
    </self-table>
    <div class="com-table-pagination clearfix">
      <v-pagination
        :total="total"
        :page="searchFormList.currPage"
        :limit="searchFormList.pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></v-pagination>
    </div>
    <template #footer>
      <el-button key="close" @click="() => onCancel()">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script>
import VPagination from '@/components/VPagination';
import { getKbList } from './service';
import moment from 'moment';
export default {
  name: 'PurchaseProject',
  components: { VPagination },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    onCancel: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      tableData: [],
      searchFormList: {
        kbStartTime: moment()
          .startOf('week')
          .valueOf(),
        kbEndTime: moment()
          .endOf('week')
          .valueOf(),
        currPage: 1,
        pageSize: 10,
      },
      total: null,
    };
  },
  methods: {
    handleSizeChange(val) {
      this.searchFormList.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.searchFormList.currPage = val;
      this.getList();
    },
    async getList() {
      const { page } = await getKbList(this.searchFormList);
      this.tableData = page.list;
      this.total = page.totalCount;
    },
  },
};
</script>
