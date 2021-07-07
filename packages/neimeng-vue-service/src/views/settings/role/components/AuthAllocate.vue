<template>
  <el-dialog
    custom-class="cus-dialog auth-allocate"
    title="组织架构分配权限"
    :visible="visible"
    width="700px"
    :append-to-body="true"
    @close="onCancel"
  >
    <h1 class="form-title">基本信息</h1>
    <el-form label-position="right" label-width="90px" size="small" disabled>
      <el-row :gutter="16" type="flex" justify="end" style="flex-wrap: wrap;">
        <el-col :span="12">
          <el-form-item label="角色名称：">
            <el-input placeholder="请输入" v-model="values.roleName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建时间：">
            <el-date-picker
              style="width: 100%;"
              v-model="values.createTime"
              type="datetime"
              placeholder="请选择"
              value-format="timestamp"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <h1 class="form-title">角色权限</h1>
    <div class="auth-wrap">
      <div class="checkbox-wrap">
        <!-- <div v-for="item in permissions" :key="item.guid">
          <div v-if="!item.checked" style="padding: 10px 0;">
            <el-checkbox
              :label="item.roleName"
              @change="(val) => handleChange(val, item)"
            ></el-checkbox>
          </div>
        </div> -->
        <el-tree
          ref="tree"
          :data="permissions"
          show-checkbox
          node-key="id"
          :default-expand-all="true"
          :default-checked-keys="checkedKeys"
          :props="defaultProps"
          @check-change="handleCheckChange"
        >
        </el-tree>
      </div>
      <div class="selected-wrap">
        <div v-for="(item, index) in selecteds" :key="item.id">
          <div class="selected-cell">
            <span>{{ item.label }}</span>
            <i class="el-icon-error" @click="handleRemove(item, index)"></i>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <el-button key="close" @click="onCancel">取消</el-button>
      <el-button
        key="submit"
        type="primary"
        :loading="onSubmitLoading"
        @click="onsubmit"
        >提交</el-button
      >
    </template>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex';
import { getUserRoleList } from '../service';
export default {
  name: 'AuthAllocate',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    values: {
      type: Object,
      default: {},
    },
    onCancel: {
      type: Function,
      default: () => {},
    },
    onFinish: {
      type: Function,
    },
  },
  watch: {
    values: {
      async handler(newVal) {
        console.log(newVal);
        await this.getRoles();
        this.checkedKeys = [5, 7];
        const selecteds = [];
        this.handleSelecteds([5, 7], this.permissions, selecteds);
        this.selecteds = selecteds;
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      onSubmitLoading: false, // 提交loading
      permissions: [],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      selecteds: [],
      checkedKeys: [],
    };
  },
  computed: {
    ...mapState({
      currentNode: (state) => state.organization.currentNode,
    }),
  },
  methods: {
    onsubmit() {
      this.onSubmitLoading = true;
      // this.onFinish(this.formModel);
      setTimeout(() => {
        this.onSubmitLoading = false;
      }, 1500);
    },
    async getRoles() {
      const {
        page: { list },
      } = await getUserRoleList();
      const userRoles = this.values.userRoles;
      list.map((item) => {
        if (userRoles && userRoles.includes(item.roleNo)) {
          item.checked = true;
        } else {
          item.checked = false;
        }
      });
      this.permissions = list;
      this.permissions = [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1',
                },
                {
                  id: 10,
                  label: '三级 1-1-2',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1',
            },
            {
              id: 6,
              label: '二级 2-2',
            },
          ],
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1',
            },
            {
              id: 8,
              label: '二级 3-2',
            },
          ],
        },
      ];
    },
    handleSelecteds(ids, sources = [], targets = []) {
      for (const item of sources) {
        if (ids.includes(item.id)) {
          targets.push(item);
        }
        if (item.children) {
          this.handleSelecteds(ids, item.children, targets);
        }
      }
    },
    handleChange(val, data) {
      this.$set(data, 'checked', true);
    },
    handleRemove(data, index) {
      this.selecteds.splice(index, 1);
      const checkedKeys = this._.map(this.selecteds, 'id');
      this.$refs.tree.setCheckedKeys(checkedKeys);
    },
    handleCheckChange(node, checked, childrenCheckeds) {
      console.log(node, checked, childrenCheckeds);
      const checkedKeys = this.$refs.tree.getCheckedKeys();
      const selecteds = [];
      this.handleSelecteds(checkedKeys, this.permissions, selecteds);
      this.selecteds = selecteds;
    },
  },
};
</script>

<style lang="scss" scoped>
.auth-allocate {
  .form-title {
    font-size: 16px;
    font-weight: bold;
    color: #000000;
    line-height: 24px;
    padding: 0 0 16px 16px;
  }
  .auth-wrap {
    padding: 0 16px;
    display: flex;
    & > div {
      height: 360px;
      overflow-y: auto;
      flex: 1;
      border: 1px solid #f0f0f0;
      &:first-child {
        padding: 6px 16px;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
      &:last-child {
        padding: 6px 16px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
  }
  .selected-cell {
    padding: 10px 0;
    display: flex;
    align-items: center;
    i {
      margin-left: auto;
      cursor: pointer;
    }
  }
}
</style>
