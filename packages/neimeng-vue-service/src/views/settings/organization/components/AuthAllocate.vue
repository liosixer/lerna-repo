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
          <el-form-item label="登录名：">
            <el-input placeholder="请输入" v-model="values.loginName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系方式：">
            <el-input placeholder="请输入" v-model="values.mobile" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属部门：">
            <el-input placeholder="请输入" v-model="currentNode.label" />
          </el-form-item>
        </el-col>
        <el-col :span="12"> </el-col>
      </el-row>
    </el-form>

    <h1 class="form-title">角色权限</h1>
    <div class="auth-wrap">
      <div class="checkbox-wrap">
        <div v-for="item in permissions" :key="item.guid">
          <div v-if="!item.checked" style="padding: 10px 0;">
            <el-checkbox
              :label="item.roleName"
              @change="(val) => handleChange(val, item)"
            ></el-checkbox>
          </div>
        </div>
      </div>
      <div class="selected-wrap">
        <div v-for="item in permissions" :key="item.guid">
          <div v-if="item.checked" class="selected-cell">
            <span>{{ item.roleName }}</span>
            <i class="el-icon-error" @click="handleRemove(item)"></i>
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
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      onSubmitLoading: false, // 提交loading
      permissions: [],
    };
  },
  computed: {
    ...mapState({
      currentNode: (state) => state.organization.currentNode,
    }),
  },
  created() {
    // this.formModel.department = this.currentNode.label;
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
    },
    handleChange(val, data) {
      this.$set(data, 'checked', true);
    },
    handleRemove(data) {
      this.$set(data, 'checked', false);
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
