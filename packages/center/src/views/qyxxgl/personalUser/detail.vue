<template>
  <div class="page-detail">
    <div class="global-title">
      <page-crumb :d="{breadcrumbList:breadcrumbList}">
        <div slot="btns">
          <el-button size="small" @click="$router.go(-1)">返回</el-button>
        </div>
      </page-crumb>
    </div>
    <div class="global-content">
      <el-card>
        <div slot="header" class="clearfix">
          <span class="global-card-header-name">{{baseForm.creator_Name}}</span>
        </div>
        <div class="global-card-content">
          <div class="base-info-box">
            <el-form label-width="150px" class="info-form" :model="baseForm" ref="baseForm" size="small" disabled>
              <el-form-item label="登录名">
                <el-input placeholder="自动读取" v-model="baseForm.accountName"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input placeholder="自动读取" v-model="baseForm.password" type="password"></el-input>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input placeholder="自动读取" v-model="baseForm.user_Name"></el-input>
              </el-form-item>
              <el-form-item label="身份证号码">
                <el-input placeholder="自动读取" v-model="baseForm.user_BH"></el-input>
              </el-form-item>
              <el-form-item label="手机号码">
                <el-input placeholder="自动读取" v-model="baseForm.user_Phone"></el-input>
              </el-form-item>
              <el-form-item label="所属组织" class="el_form_item_pos">
                <el-input placeholder="自动读取" v-model="baseForm.deptName"></el-input>
              </el-form-item>
              <el-form-item label="身份">
                <el-radio-group v-model="baseForm.shenfen">
                  <el-radio :label="1">普通成员</el-radio>
                  <el-radio :label="2">负责人</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="员工职工号">
                <el-input placeholder="自动读取" v-model="baseForm.userpeople_ID"></el-input>
              </el-form-item>
              <el-form-item label="座机">
                <el-input placeholder="自动读取" v-model="baseForm.user_Mobile"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input placeholder="自动读取" v-model="baseForm.user_Email"></el-input>
              </el-form-item>
              <el-form-item label="是否有效">
                <el-radio-group v-model="baseForm.isYouXiao">
                  <el-radio :label="0">是</el-radio>
                  <el-radio :label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
            <div class="avater-box">
              <Uploader
                action="/upload"
                buttonType="image"
                :uploadedList="[{guid:baseForm.fuJianGuid, fileName:baseForm.fuJianName}]"
                :showFileList="false"
                :isDisabled="true"
              ></Uploader>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import PageCrumb from "@/components/PageCrumb";
import mixins from "@/mixins/mixins";
import Uploader from '@/components/Upload'

export default {
  name: "personalUserDetail",
  mixins: [mixins],
  inject: ["globalSetting"],
  components: {
    PageCrumb,
    Uploader,
  },
  data() {
    return {
      breadcrumbList: [
        { label: "企业信息管理", link: "" },
        { label: "个人用户查询", link: "/qyxxgl/personalUser" },
        { label: "详情", link: "" },
      ], // 面包屑配置
      baseForm: {},
      guid: "",
    }
  },
  created() {
    const { guid = "" } = this.$route.query
    this.guid = guid
    this.getDetail()
  },
  methods: {
    // 获取数据
    async getDetail() {
      let res = await this.portService.fetchUserInfo({
        userGuid: this.guid, 
      })
      if (res) {
        this.baseForm = res
      }
    },
  },
}
</script>

<style scoped lang="scss">
.base-info-box{
  display: flex;

  .info-form{
    flex: 0 0 600px;
    margin-right: 200px;
  }
}
.upload ::v-deep.el-upload {
  cursor: default;
}
</style>