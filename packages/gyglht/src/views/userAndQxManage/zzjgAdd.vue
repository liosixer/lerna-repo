<template>
  <div>
    <div class="content_title">
      <h3>
        {{ $store.state.roleAnddepartment.currentDepartment["departName"] }}
      </h3>
      <div class="content_title_con">
        <el-button type="primary" size="small" @click="handelSaveUser" :disabled="disabled">保存并继续</el-button>
        <el-button type="primary" size="small" @click="handelSaveUser(1)" :disabled="disabled">保存</el-button>
        <el-button size="small" @click="handleBack">返回</el-button>
      </div>
    </div>
    <div class="content_form">
      <el-form label-width="150px" :model="ruleForm" :rules="rules" ref="ruleForm">
        <div class="from_wrapper">
          <div class="form_left">
            <el-form-item label="登录名" prop="accountName">
              <el-input placeholder="请输入登录名" v-model="ruleForm.accountName" size="small"></el-input>
              <el-tooltip placement="top" v-if="$store.state.logoType == 1">
                <div slot="content">登录名将作为该用户登录采购系统及开评标系统的账号</div>
                <span style="display:inline-block;margin-right:10px"><img src="@/assets/help.png" alt=""/></span>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input placeholder="请输入密码" size="small" type="password" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="user_Name">
              <el-input placeholder="请输入姓名" size="small" v-model="ruleForm.user_Name"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码" prop="user_BH">
              <el-input placeholder="请输入身份证号码" size="small" v-model="ruleForm.user_BH"></el-input>
              <el-tooltip placement="top" v-if="$store.state.logoType == 1">
                <div slot="content">身份证号码将作为该用户后续在CA平台申请CA的唯一识别码</div>
                <span style="display:inline-block;margin-right:10px"><img src="@/assets/help.png" alt=""/></span>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="手机号码" prop="user_Phone">
              <el-input placeholder="请输入手机号码" size="small" v-model="ruleForm.user_Phone"></el-input>
            </el-form-item>
            <el-form-item label="所属部门" class="el_form_item_pos" prop="deptGuid">
              <Tree
                :nodes="nodes"
                :showCheckbox="false"
                @click="handleShowSelector"
                v-model="ruleForm.deptGuid"
                @setNode="handleSetNode"
                :checkeds="userDepartment"
                objed
                treeId="departGuid"
                v-if="loaded"
              ></Tree>
            </el-form-item>
            <el-form-item label="身份" prop="shenfen">
              <el-radio-group v-model="ruleForm.shenfen">
                <el-radio :label="1">普通成员</el-radio>
                <el-radio :label="2">部门负责人</el-radio>
                <el-tooltip placement="top" v-if="$store.state.logoType == 1">
                  <div slot="content">若设置为部门负责人，在后续设置审核流程时，可选择成为高级审批人</div>
                  <span style="display:inline-block;margin-right:10px"><img src="@/assets/help.png" alt=""/></span>
                </el-tooltip>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="员工职工号" prop="userpeople_ID">
              <el-input placeholder="请输入员工职工号" size="small" v-model="ruleForm.userpeople_ID"></el-input>
            </el-form-item>
            <el-form-item label="座机" prop="user_Mobile">
              <el-input placeholder="请输入座机号" size="small" v-model="ruleForm.user_Mobile"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="user_Email">
              <el-input placeholder="请输入邮箱" size="small" v-model="ruleForm.user_Email"></el-input>
            </el-form-item>
            <el-form-item label="用户签名" prop="">
              <Uploader action="/upload"
                  :limitNumType = '1'
                  :acceptType="'.gif'"
                  @sucData="getYhqm"
                  @onRemoveFn="onRemoveTemplate"
                  :uploadedList="qianmingList"
                  :isImgSize = "isImgeSize"
                  ref="upload"
              ></Uploader>
              <div style="color:#CCCCCC">仅支持.gif格式，大小为120*100像素</div>
              <span style="color:red;">用于发布公开招标项目时,推送公共服务平台的附件读取项目经理签章</span>
            </el-form-item>
            <el-form-item label="是否有效" prop="isYouXiao">
              <el-radio-group v-model="ruleForm.isYouXiao">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { saveUser, getUserInfo, isUserBHExist } from "@/service/roleAndDepartment";
import Tree from "@/components/tree/Tree";
import Uploader from "@/components/Upload";
import util from "@/utils/util";
export default {
  data() {
    const reg = /((^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[\da-zA-Z\W]{8,20}$)|(^(?=.*\d)(?=.*[A-Z])(?=.*\W)[\da-zA-Z\W]{8,20}$)|(^(?=.*\d)(?=.*[a-z])(?=.*\W)[\da-zA-Z\W]{8,20}$)|(^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\da-zA-Z\W]{8,20}$))/;

    const vRule = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else {
        if (value.length < 8 || value.length > 20) {
          callback(new Error("长度在 8 到 20 个字符"));
        } else if (!reg.test(value)) {
          callback(new Error("8-20位字符,至少包含大写字母、小写字母、数字、特殊字符中的三种"));
        } else {
          callback();
        }
      }
    };
    const passwordValidate = (rule, value, callback) => {
      let reg = /((^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[\da-zA-Z\W]{8,20}$)|(^(?=.*\d)(?=.*[A-Z])(?=.*\W)[\da-zA-Z\W]{8,20}$)|(^(?=.*\d)(?=.*[a-z])(?=.*\W)[\da-zA-Z\W]{8,20}$)|(^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\da-zA-Z\W]{8,20}$))/;
      if (!this.$route.query.id) {
        vRule(rule, value, callback);
      } else {
        if (this.pwd === value) {
          callback();
        } else {
          vRule(rule, value, callback);
        }
      }
    };
    return {
      isImgeSize:true,
      imageUrl: "",
      loaded: false,
      showSelector: true,
      disabled: false,
      pwd: "",
      rules: {
        accountName: [
          { required: true, message: "请输入登录名", trigger: "blur" },
          {
            pattern: /^[\u4e00-\u9fa5a-z\d]+$/gi,
            message: "登录名不能包含特殊字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: passwordValidate, trigger: "blur" }],
        user_Name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            pattern: /^[\u4e00-\u9fa5a-z\d]+$/gi,
            message: "用户名称不能包含特殊字符",
            trigger: "blur",
          },
        ],
        userpeople_ID: [
          { required: true, message: "请输入员工职工编号", trigger: "blur" },
          { pattern: /^[\d]{5,13}$/g, message: "员工职工编号必须是5到13位数字", trigger: "blur" },
          // { type: 'number', message: '员工职工编号必须为数字值'},
        ],
        user_BH: [
          { required: true, message: "请输入身份证编号", trigger: "blur" },
          {
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            message: "请输入正确的身份证编号",
          },
          {
            validator: this.isUserBHExistValidate,
            trigger: "blur",
          },
        ],
        user_Email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        user_Phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        user_Mobile: [
          {
            pattern: /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,
            message: "请输入正确的座机号码",
            trigger: "blur",
          },
        ],
        deptGuid: [{ required: true, message: "请选择所在部门", trigger: "change" }],
      },
      ruleForm: {
        accountName: "", //登录名
        password: "", //登陆密码
        user_Name: "", // 用户名
        user_BH: "", //身份证编号
        deptGuid: "", //所属部门guid
        shenfen: 1, //身份 1：普通成员   2：部门负责人
        user_Email: "", //邮箱
        isYouXiao: 0, //是否有效
        user_Guid: "", //用户guid
        zhiwei: "",
        fuJianGuid: "",
        fuJianName: "",
        userpeople_ID: "",
        user_Mobile: "",
        user_Phone: "",
        userSign:""
      },
      copyId: "",
      userDepartment: [],
      qianmingList:[]
    };
  },
  components: {
    Tree,
    Uploader,
  },
  watch: {
    'ruleForm.userSign':{
        async handler(n, o) {
            if (n) {
                const cgzdAttachmentObj = await util.getFiles(this.ruleForm.userSign);
                this.qianmingList = []
                this.qianmingList.push({guid:cgzdAttachmentObj.guid,fileName:cgzdAttachmentObj.name})
            }
        },
    },
  },
  async created() {
    // console.log(this.$route.matched)
    let guid = this.$route.query.id;
    let deptGuid = this.$route.query.did;
    // console.log(guid
    if (guid) {
      getUserInfo(`/user/queryUserInfo?guid=${guid}`).then((res) => {
        if (res.code === 1) {
          const d = JSON.parse(JSON.stringify(res.data));
          this.ruleForm = Object.assign(this.ruleForm, d);
          this.pwd = this.ruleForm.password;
          this.copyId = this.ruleForm.user_BH;
          if(this.ruleForm.userSign){
              util.getFiles(this.ruleForm.userSign).then(res1=>{
                this.qianmingList=[]
                this.qianmingList.push({guid:res1.guid,fileName:res1.name})
                this.$refs['upload'].getFileList()
              })
          }
        }
        this.loaded = true;
      });
    } else {
      this.loaded = true;
    }

    if (this.$route.query.id) {
      const arr = this.flatten(this.nodes);
      this.userDepartment = arr.filter((i) => {
        if (i.departGuid === deptGuid) return i;
      });
    } else {
      this.userDepartment = [this.$store.state.roleAnddepartment.currentDepartment];
    }
  },
  computed: {
    nodes() {
      return this.$store.state.roleAnddepartment.department;
    },
  },
  methods: {
    getYhqm(res, id){
      this.ruleForm.userSign = res.groupGuid;
    },
    onRemoveTemplate(data){
      this.ruleForm.userSign = ''
    },
    isUserBHExistValidate(rule, value, callback) {
      const me = this;
      const validate = async function() {
        const flag = await isUserBHExist({ user_BH: value });
        if (flag.info === "该身份证号已存在") {
          return callback(new Error(flag.info));
        } else {
          return callback();
        }
      };
      if (me.$route.query.id) {
        if (me.ruleForm.user_BH === me.copyId) {
          callback();
        } else {
          validate();
        }
      } else {
        validate();
      }
    },
    flatten(data) {
      var arr = [];
      for (var i = 0; i < data.length; i++) {
        let obj = {};
        for (var e in data[i]) {
          if (e !== "children") {
            obj[e] = data[i][e];
          }
        }
        arr.push(obj);
        if (data[i].children.length) {
          arr = arr.concat(this.flatten(data[i].children));
        }
      }
      return arr;
    },
    handleSetNode(data) {
      this.$store.commit("setCurrentDepartment", data);
    },
    // 上传文件回调
    handleUploadImage(data) {
      this.ruleForm.fuJianGuid = data.guid;
      this.ruleForm.fuJianName = data.name;
    },
    handleBack() {
      this.$router.back();
    },
    handelSaveUser(type) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.disabled = true;
          saveUser(this.ruleForm).then((res) => {
            if (res && res.code == 1) {
              if(res.data.status == 0){
                this.$message({type: "error", message: res.info});
                this.disabled = false;
                return false
              }else{
                this.$message({type: "success", message: "添加成功！"});
              }
            } else {
              return false
            }
            if (type && type === 1) {
              this.$router.back();
            } else {
              let departGuid = this.ruleForm.deptGuid;
              this.$refs.ruleForm.resetFields();
              this.ruleForm.fuJianName = "";
              this.ruleForm.fuJianGuid = "";
              this.ruleForm.user_Guid = "";
              this.ruleForm.modify_Time = "";
              this.ruleForm.modifier_Name = "";
              this.ruleForm.creator_Name = "";
              this.ruleForm.creatorGuid = "";
              this.ruleForm.create_Time = "";
              this.ruleForm.deptGuid = departGuid;
            }
            this.disabled = true;
            this.disabled = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleShowSelector() {
      this.showSelector = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.content_title {
  height: 60px;
  display: flex;
  justify-content: space-between;
  line-height: 50px;
  width: 100%;
  border-bottom: 1px solid #f4f5f9;
  h3 {
    font-size: 16px;
    font-weight: normal;
  }
  span {
    padding: 0px 5px;
    color: #666;
    opacity: 0.3;
  }
}
.content-btns {
  padding: 10px;
  background: #dfeffa;
  border: 1px solid #f4f5f9;
}
.form_left {
  width: 800px;
  float: left;
  flex-grow: 0;
  flex-shrink: 0;
  .el-input {
    width: 85%;
  }
  .tree_selector {
    width: 85%;
  }
}
.form_right {
  width: 200px;
  flex-grow: 0;
  flex-shrink: 0;
}
.content_form {
  margin-top: 20px;
  position: relative;
}
.from_wrapper {
  display: flex;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px solid #d9d9d9;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.input_mask {
  height: 100px;
  width: 400px;
  background: brown;
}
</style>
