<template>
  <el-dialog
    custom-class="cus-dialog data-edit"
    :title="title"
    :visible="visible"
    width="640px"
    :append-to-body="true"
    @close="clickCancel"
  >
    <el-form
      label-position="right"
      label-width="120px"
      :model="formModel"
      ref="formRef"
      :rules="formRules"
      size="small"
    >
      <el-form-item label="角色编号：" prop="roleNo">
        <el-input placeholder="请输入" v-model="formModel.roleNo" />
      </el-form-item>
      <el-form-item label="角色名称：" prop="roleName">
        <el-input placeholder="请输入" v-model="formModel.roleName" />
      </el-form-item>
      <el-form-item label="所属子系统：" prop="roleSystem">
        <el-select
          style="width: 100%"
          v-model="formModel.roleSystem"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in systemOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="所属子系统：" prop="childrenIds">
        <el-select
          style="width: 100%;"
          v-model="formModel.childrenIds"
          multiple
          placeholder="请选择"
          popper-class="system-select"
        >
          <el-option
            v-for="item in systemOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <el-checkbox :value="formModel.childrenIds.includes(item.value)">{{
              item.label
            }}</el-checkbox>
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="是否有效：" prop="status">
        <el-radio-group v-model="formModel.status">
          <el-radio :label="1" style="line-height: 32px">有效</el-radio>
          <el-radio :label="0" style="line-height: 32px">无效</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入"
          v-model="formModel.remark"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button key="close" @click="clickCancel">取消</el-button>
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
export default {
  name: 'RoleEdit',
  props: {
    title: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
    values: {
      type: Object,
      default: null,
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
      handler(newVal, oldVal) {
        console.log(newVal);
        if (newVal) {
          this.formModel.roleNo = newVal.roleNo;
          this.formModel.roleName = newVal.roleName;
          this.formModel.roleSystem = newVal.roleSystem;
          this.formModel.status = newVal.status;
          this.formModel.remark = newVal.remark;
        } else {
          this.formModel.roleNo = '';
          this.formModel.roleName = '';
          this.formModel.roleSystem = null;
          this.formModel.status = 1;
          this.formModel.remark = '';
        }
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      onSubmitLoading: false, // 提交loading
      systemOptions: [
        { label: '招标系统', value: 1 },
        { label: '投标系统', value: 2 },
        { label: '服务系统', value: 3 },
      ],
      formModel: {
        roleNo: '',
        roleName: '',
        roleSystem: null,
        status: 1,
        remark: '',
      },
      formRules: {
        roleNo: [
          { required: true, message: '请输入角色编号', trigger: 'blur' },
        ],
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
        ],
        roleSystem: [
          {
            required: true,
            message: '所属子系统为必选',
            trigger: 'change',
          },
        ],
        status: [{ required: true, message: '是否有效', trigger: 'change' }],
      },
    };
  },
  methods: {
    clickCancel() {
      this.$refs['formRef'].resetFields(); // 有bug
      this.formModel.roleNo = '';
      this.formModel.roleName = '';
      this.formModel.roleSystem = null;
      this.formModel.status = 1;
      this.formModel.remark = '';
      this.onCancel();
    },
    onsubmit() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          this.onSubmitLoading = true;
          // this.onFinish(this.formModel);
          setTimeout(() => {
            this.onSubmitLoading = false;
          }, 1500);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.system-select {
  &.el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after {
    display: none;
  }
}
</style>
