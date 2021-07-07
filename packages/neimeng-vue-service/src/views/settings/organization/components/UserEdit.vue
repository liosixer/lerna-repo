<template>
  <el-dialog
    custom-class="cus-dialog user-edit"
    :title="title"
    :visible="visible"
    width="800px"
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
      <el-row :gutter="16" type="flex" justify="end" style="flex-wrap: wrap;">
        <el-col :span="12">
          <el-form-item label="登录名：" prop="loginName">
            <el-input placeholder="请输入" v-model="formModel.loginName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名：" prop="userName">
            <el-input placeholder="请输入" v-model="formModel.userName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证号码：" prop="idcardNo">
            <el-input placeholder="请输入" v-model="formModel.idcardNo" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属部门：" prop="department">
            <el-input
              placeholder="请输入"
              disabled
              v-model="formModel.department"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱：" prop="email">
            <el-input placeholder="请输入" v-model="formModel.email" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号：" prop="mobile">
            <el-input placeholder="请输入" v-model="formModel.mobile" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否有效：" prop="status">
            <el-radio-group v-model="formModel.status">
              <el-radio :label="1" style="line-height: 32px">有效</el-radio>
              <el-radio :label="0" style="line-height: 32px">无效</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否重置密码：">
            <el-radio-group v-model="resetPasswod">
              <el-radio :label="1" style="line-height: 32px">是</el-radio>
              <el-radio :label="0" style="line-height: 32px">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="用户类型：">
            <el-checkbox-group v-model="formModel.userType">
              <el-checkbox :label="1">审核用户</el-checkbox>
              <el-checkbox :label="2">招标用户</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <!-- <template v-if="formModel.userType && formModel.userType.length > 0">
          <el-col :span="12">
            <el-form-item label="密码：" prop="password">
              <el-input placeholder="请输入" v-model="formModel.password" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="确认密码：" prop="confirmPassword">
              <el-input
                placeholder="请输入"
                v-model="formModel.confirmPassword"
              />
            </el-form-item>
          </el-col>
        </template> -->
      </el-row>
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
import { mapState } from 'vuex';
export default {
  name: 'UserEdit',
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
  computed: {
    ...mapState({
      currentNode: (state) => state.organization.currentNode,
    }),
  },
  watch: {
    values: {
      handler(newVal, oldVal) {
        console.log(newVal);
        if (newVal) {
          this.formModel.loginName = newVal.loginName;
          this.formModel.userName = newVal.userName;
          this.formModel.idcardNo = newVal.idcardNo;
          this.formModel.email = newVal.email;
          this.formModel.mobile = newVal.mobile;
          this.formModel.status = newVal.status;
        } else {
          this.formModel.loginName = '';
          this.formModel.userName = '';
          this.formModel.idcardNo = '';
          this.formModel.email = '';
          this.formModel.mobile = '';
          this.formModel.status = 1;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.formModel.confirmPassword !== '') {
          this.$refs.formRef.validateField('confirmPassword');
        }
        callback();
      }
    };
    const validateConfirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.formModel.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      onSubmitLoading: false, // 提交loading
      resetPasswod: null,
      formModel: {
        loginName: '',
        userName: '',
        idcardNo: '',
        department: '',
        email: '',
        mobile: '',
        status: 1,
        userType: [1],
        // password: '',
        // confirmPassword: '',
      },
      formRules: {
        loginName: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
        ],
        userName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        idcardNo: [
          {
            required: true,
            message: '请输入身份证号码',
            trigger: 'blur',
          },
          {
            pattern: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/,
            message: '身份证号码格式错误',
            trigger: 'blur',
          },
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱地址',
            trigger: 'blur',
          },
          {
            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: '邮箱格式错误',
            trigger: 'blur',
          },
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur',
          },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '手机号格式错误',
            trigger: 'blur',
          },
        ],
        status: [
          { required: true, message: '请选择是否有效', trigger: 'change' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' },
        ],
        confirmPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validateConfirmPassword, trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    this.formModel.department = this.currentNode.label;
  },
  methods: {
    clickCancel() {
      this.$refs['formRef'].resetFields();
      this.resetPasswod = null;
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

<style lang="scss" scoped></style>
