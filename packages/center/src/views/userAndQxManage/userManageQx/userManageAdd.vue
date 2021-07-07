<template>
  <div class="container">
    <div class="global-title">
      <page-crumb :d="{breadcrumbList:breadcrumbList}">
        <div slot="btns">
          <el-button
            size="small"
            @click="saveBtn"
            type="primary"
            v-if="!($route.query.methods === 'see')"
          >保存</el-button>
          <el-button size="small" @click="$router.go(-1)">返回</el-button>
        </div>
      </page-crumb>
      <!-- <div class="global-title-box">
                <span class="global-title-name">角色管理</span>
                <div class="global-title-btns fr">
                    <el-button size="small"  @click="saveBtn" type="primary">保存</el-button>
                    <el-button size="small" @click="$router.go(-1)">返回</el-button>
                </div>
      </div>-->
    </div>

    <div class="global-content">
      <div class="global-content-detail">
        <el-form
          :model="roleForm"
          :rules="roleRules"
          :disabled="$route.query.methods === 'see'"
          ref="roleForm"
          size="small"
          label-width="80px"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="角色名称" prop="roleName">
                <el-input v-model.trim="roleForm.roleName" placeholder="请输入角色名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否有效" prop="roleZhuangTai">
                <el-radio-group v-model="roleForm.roleZhuangTai">
                  <el-radio :label="1">有效</el-radio>
                  <el-radio :label="0">无效</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input v-model="roleForm.beiZhu" type="textarea" :rows="4" placeholder="请输入备注"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" v-if="this.$route.query.methods === 'edit' || this.$route.query.methods === 'see'">
            <el-col :span="12">
              <el-form-item label="创建人">
                <el-input v-model.trim="roleForm.creatorName" placeholder="读取中..." :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建时间">
                <el-input
                  :value="roleForm.createTime | timestampChange"
                  placeholder="读取中..."
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" v-if="this.$route.query.methods === 'edit' || this.$route.query.methods === 'see'">
            <el-col :span="12">
              <el-form-item label="修改人">
                <el-input
                  v-model.trim="roleForm.modifierName"
                  placeholder="读取中..."
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="修改时间">
                <el-input
                  :value="roleForm.modifyTime | timestampChange"
                  placeholder="读取中..."
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { saveRoleData } from "@/service/roleAndDepartment";
import PageCrumb from "@/components/PageCrumb";
export default {
  name: "userManageAdd",
  components: {
    PageCrumb,
  },
  data() {
    return {
      breadcrumbList: [
        // { label: "用户及权限管理 ", link: "" },
        { label: "角色权限", link: "/userAndQxManage/userManageTable" },
        { label: "", link: "" },
      ],
      roleForm: {
        roleZhuangTai: 1,
      },
      roleRules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            pattern: /^[\u4e00-\u9fa5a-z\d]+$/gi,
            message: "角色名称特殊字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    if (
      this.$route.query.methods === "edit" ||
      this.$route.query.methods === "see"
    ) {
      this.roleQuery();
    }
    if (this.$route.query.methods == "see") {
      this.breadcrumbList[1].label = "查看";
    } else if (this.$route.query.methods == "edit") {
      this.breadcrumbList[1].label = "编辑";
    } else {
      this.breadcrumbList[1].label = "新增";
    }
  },
  methods: {
    /**
     * 角色管理-查询
     */
    async roleQuery() {
      const data = await this.portService.roleQuery({
        guid: this.$route.query.id,
      });

      if (data) {
        this.roleForm = data;
      }
    },
    /**
     * 角色管理-保存
     */
    async roleSave() {
      const { code, data } = await this.portService.roleSave(this.roleForm);

      if (code) {
        this.$router.go(-1);
        this.$message({ type: "success", message: data.message });
      } else {
        this.$message({ type: "error", message: data.message });
      }
    },
    /**
     * 角色管理-更新
     */
    async roleUpdate() {
      const { code, data } = await this.portService.roleUpdate(this.roleForm);

      if (code) {
        this.$router.go(-1);
        this.$message({ type: "success", message: data.message });
      } else {
        this.$message({ type: "error", message: data.message });
      }
    },
    saveBtn() {
      // this.$router.push({ name: "financialBookKeepingXq", params: { guid: guid } })
      this.$refs.roleForm.validate((v) => {
        if (v) {
          if (this.$route.query.methods === "edit") {
            this.roleUpdate();
          } else {
            this.roleSave();
          }
        }
      });
    },
  },
};
</script>