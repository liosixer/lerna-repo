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
      <el-form-item
        v-if="
          ['addModule', 'modifyModule', 'addMenu', 'modifyMenu'].includes(
            eidtType
          )
        "
        label="所属子系统："
        prop="systemName"
      >
        <el-input
          placeholder="请输入"
          v-model="formModel.systemName"
          disabled
        />
      </el-form-item>
      <el-form-item
        v-if="['addMenu', 'modifyMenu'].includes(eidtType)"
        label="所属子模块："
        prop="moduleName"
      >
        <el-input
          placeholder="请输入"
          v-model="formModel.moduleName"
          disabled
        />
      </el-form-item>
      <el-form-item :label="_label('名称：')" prop="name">
        <el-input placeholder="请输入" v-model="formModel.name" />
      </el-form-item>
      <el-form-item label="编码：" prop="no">
        <el-input placeholder="请输入" v-model="formModel.no" />
      </el-form-item>
      <el-form-item label="图标：" prop="photoUrl">
        <el-input placeholder="请输入" v-model="formModel.photoUrl" />
      </el-form-item>
      <el-form-item label="是否显示：" prop="status">
        <el-radio-group v-model="formModel.status">
          <el-radio :label="1" style="line-height: 32px">是</el-radio>
          <el-radio :label="0" style="line-height: 32px">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="路径：" prop="url">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入"
          v-model="formModel.url"
        />
      </el-form-item>
      <el-form-item label="功能描述：" prop="remark">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入"
          v-model="formModel.remark"
        />
      </el-form-item>
      <el-form-item label="地址：" prop="address">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入"
          v-model="formModel.address"
        />
      </el-form-item>
      <el-form-item
        v-if="['addSystem', 'modifySystem'].includes(eidtType)"
        label="子系统ID："
        prop="childrenIds"
      >
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
  name: 'DataEdit',
  props: {
    eidtType: {
      type: String,
      required: true,
    },
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
  computed: {
    _label() {
      return (name) => {
        let prefix = '';
        switch (this.eidtType) {
          case 'addSystem':
          case 'modifySystem':
            prefix = '子系统';
            break;
          case 'addModule':
          case 'modifyModule':
            prefix = '模块';
            break;
          case 'addMenu':
          case 'modifyMenu':
            prefix = '菜单';
            break;
          default:
            break;
        }
        return prefix + name;
      };
    },
  },
  watch: {
    values: {
      handler(newVal, oldVal) {
        console.log(newVal);
        if (newVal) {
          this.formModel.systemName = newVal.systemName;
          this.formModel.moduleName = newVal.moduleName;
          this.formModel.name = newVal.name;
          this.formModel.no = newVal.no;
          this.formModel.photoUrl = newVal.photoUrl;
          this.formModel.status = newVal.status;
          this.formModel.url = newVal.url;
          this.formModel.remark = newVal.remark;
          this.formModel.address = newVal.address;
          this.formModel.childrenIds = newVal.childrenIds;
        } else {
          this.formModel.systemName = '';
          this.formModel.moduleName = '';
          this.formModel.name = '';
          this.formModel.no = '';
          this.formModel.photoUrl = '';
          this.formModel.status = 1;
          this.formModel.url = '';
          this.formModel.remark = '';
          this.formModel.address = '';
          this.formModel.childrenIds = [];
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
        { label: '招标系统', value: 'zhaobiao' },
        { label: '投标系统', value: 'toubiao' },
        { label: '服务系统', value: 'fuwu' },
      ],
      formModel: {
        systemName: '', // 所属子系统
        moduleName: '', // 所属模块
        name: '', // 名称
        no: '', // 编号
        photoUrl: '', // 图标
        status: 1, // 是否有效
        url: '', // 路径
        remark: '', // 功能描述
        address: '', // 地址
        childrenIds: [], // 子系统id
      },
      formRules: {
        systemName: [
          { required: true, message: '请输入所属子系统', trigger: 'blur' },
        ],
        moduleName: [
          { required: true, message: '请输入所属模块', trigger: 'blur' },
        ],
        name: [
          {
            required: true,
            message: '名称为必填项',
            trigger: 'blur',
          },
        ],
        no: [{ required: true, message: '编码为必填项', trigger: 'blur' }],
        photoUrl: [
          { required: true, message: '图标为必填项', trigger: 'blur' },
        ],
        status: [{ required: true, message: '是否有效', trigger: 'change' }],
        childrenIds: [
          { required: true, message: '子系统ID为必填', trigger: 'change' },
        ],
      },
    };
  },
  methods: {
    clickCancel() {
      this.$refs['formRef'].resetFields(); // 有bug
      this.formModel.systemName = '';
      this.formModel.moduleName = '';
      this.formModel.name = '';
      this.formModel.no = '';
      this.formModel.photoUrl = '';
      this.formModel.status = 1;
      this.formModel.url = '';
      this.formModel.remark = '';
      this.formModel.address = '';
      this.formModel.childrenIds = [];
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
