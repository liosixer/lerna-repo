<template>
  <div class="qyxxglContent page-detail">
    <!-- <ContentHeader title="基础信息审核">
      <template slot="btns">
        <el-button type="primary" @click="handleCheckDetail" size="small">查看核验结果</el-button>
        <template v-if="dataView.sheHeStatus == 1">
          <el-button type="primary" @click="handleCheckInfo(2)" size="small">审核通过</el-button><el-button type="warning"  @click="handleCheckInfo(3)" size="small">审核不通过</el-button>
        </template>
        <el-button @click="$router.back()" size="small">返回</el-button>
      </template>
    </ContentHeader>-->
    <div class="global-title" ref="table_title">
      <page-crumb :d="{breadcrumbList:breadcrumbList}">
        <div slot="btns">
          <el-button type="primary" @click="handleCheckDetail" size="small">查看核验结果</el-button>
          <template v-if="dataView.sheHeStatus === 1">
            <el-button :loading="saving" type="primary" @click="handleCheckInfo(2)" size="small">审核通过</el-button>
            <el-button :loading="saving" type="warning" @click="handleCheckInfo(3)" size="small">审核不通过</el-button>
          </template>
          <el-button @click="$router.back()" size="small">返回</el-button>
        </div>
      </page-crumb>
    </div>
    <!-- <page-crumb :d="{breadcrumbList:breadcrumbList}"></page-crumb> -->
    <!--    <div class="qyxxglContent" :class="{fold_content : !foldMemu}">-->
    <div class="global-content" :class="{fold_content : !foldMemu}">
      <el-form
        :model="dataView"
        :rules="rules"
        ref="dataView"
        label-position="right"
        label-width="130px"
        width="100%"
        size="small"
        disabled
      >
        <el-card>
          <div slot="header" class="clearfix">
            <span class="global-card-header-name">基础信息</span>
          </div>
          <div class="global-card-content">
            <el-row :gutter="20">
              <el-col :span="12">
                {{dataView.userType}}
                <el-form-item label="用户类别" prop="userType">
                  <el-radio-group v-model="dataView.qiYeBaseMessForm.userType">
                    <el-radio :label="1">企业</el-radio>
                    <el-radio :label="2">自然人</el-radio>
                  </el-radio-group>
                  <!-- <i
                    class="icon-ele icon-ele-simgle"
                    :class="formID.userType ? 'el-icon-check active': 'el-icon-close error'"
                  ></i>-->
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="企业名称"
                  prop="qiYe_Name"
                  :class="{'modeiy': selData.qiyeName}"
                  v-if="dataView.qiYeBaseMessForm.userType == 1"
                >
                  <el-input
                    placeholder="请输入"
                    type="text"
                    v-model="dataView.qiYeBaseMessForm.qiYeName"
                  >
                    <i
                      slot="append"
                      class="icon-ele"
                      :class="formID.qiYeName ? 'el-icon-check active': 'el-icon-close error'"
                    ></i>
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="自然人名称"
                  v-if="dataView.qiYeBaseMessForm.userType == 2"
                  :class="{'modeiy': selData.userName}"
                  prop="qiYe_Name"
                >
                  <el-input
                    placeholder="收起输入"
                    type="text"
                    v-model="dataView.qiYeBaseMessForm.userName"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  label="交易主体类型"
                  prop="zhuTiLeiXing"
                  :class="{'modeiy': selData.yeWuFanWei}"
                >
                  <el-checkbox-group v-model="dataView.qiYeBaseMessForm.zhuTiLeiXing">
                    <el-checkbox label="T">投标人/供应商</el-checkbox>
                    <el-checkbox label="B">招标人/采购人</el-checkbox>
                    <el-checkbox label="A">招标代理</el-checkbox>
                    <!-- <el-checkbox label="B" v-if="dataView.qiYeBaseMessForm.userType == 2"
                      >采购人/招标人</el-checkbox
                    >-->
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col
                :span="12"
                v-if="(dataView.qiYeBaseMessForm.zhuTiLeiXing.includes('B') ||dataView.qiYeBaseMessForm.zhuTiLeiXing.includes('A'))"
              >
                <el-form-item label="注册邀请码" prop="zhuCeYaoQingMa" v-if="$store.state.logoType == 1">
                  <el-input
                    type="text"
                    placeholder="请输入注册邀请码"
                    v-model="dataView.qiYeBaseMessForm.zhuCeYaoQingMa"
                  >
                    <i slot="append" class="el-icon-check icon-ele blank"></i>
                  </el-input>
                  <!-- <p class="item-info">如有注册邀请码，请务必填写，没有则不用填写。</p> -->
                  <p class="item-info">注册招标人、代理机构请与平台运营机构联系获取邀请码</p>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item
                  label="企业代码类型"
                  v-if="dataView.qiYeBaseMessForm.userType == 1"
                  prop="qiYeBHType"
                >
                  <el-radio-group v-model="dataView.qiYeBaseMessForm.qiYeBHType">
                    <el-radio :label="2" :value="2">统一社会信用代码</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item
                  label="证件类型"
                  prop="fddbrShengFenZhengType"
                  v-if="dataView.qiYeBaseMessForm.userType == 2"
                >
                  <el-radio-group v-model="dataView.qiYeBaseMessForm.fddbrShengFenZhengType">
                    <el-radio :label="100">居民身份证</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>-->
            </el-row>
            <el-row
              :gutter="20"
              v-if="(dataView.qiYeBaseMessForm.zhuTiLeiXing.includes('B') ||dataView.qiYeBaseMessForm.zhuTiLeiXing.includes('A'))  && dataView.internalUnitInfo"
            >
              <el-col :span="12">
                <el-form-item label="集团内部单位编码">
                  <el-input type="text" v-model="dataView.internalUnitInfo.internalCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="上层所属单位名称">
                  <el-input type="text"  v-model="dataView.internalUnitInfo.parentName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" v-if="dataView.internalUnitInfo">
              <el-col :span="12" v-if="(dataView.qiYeBaseMessForm.zhuTiLeiXing.includes('B') ||dataView.qiYeBaseMessForm.zhuTiLeiXing.includes('A'))  && $store.state.logoType == 1">
                <el-form-item label="上层所属单位编码">
                  <el-input type="text"  v-model="dataView.internalUnitInfo.parentCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="dataView.qiYeBaseMessForm.zhuTiLeiXing.includes('T')  && $store.state.logoType == 1">
                <el-form-item label="主数据单位编码">
                  <el-input type="text"  v-model="dataView.majorDataUnitCode"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <template v-if="logoType">
              <el-row :gutter="20" v-if="dataView.qiYeBaseMessForm.zhuTiLeiXing.includes('B')">
                <el-col :span="12">
                  <el-form-item label="是否深圳市属国企" prop="isShenZhenGuoQi">
                    <el-radio-group v-model="dataView.qiYeBaseMessForm.isShenZhenGuoQi">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="企业类型或企业" prop="suoShuQiYeDaiMa">
                    <el-select v-model="dataView.qiYeBaseMessForm.suoShuQiYeDaiMa">
                      <el-option
                        v-for="i of typeData"
                        :value="i.code"
                        :key="i.code"
                        :label="i.text"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  label="社会信用代码"
                  v-if="dataView.qiYeBaseMessForm.userType == 1"
                  prop="qiYe_BH"
                >
                  <el-input
                    v-model="dataView.qiYeBaseMessForm.qiYeBH"
                    type="text"
                    :disabled="$store.state.roleAnddepartment.enterPriseInfo.isHasSubmit == 1"
                    placeholder="请输入社会信用代码"
                  >
                    <i
                      slot="append"
                      class="icon-ele"
                      :class="formID.qiYeBH ? 'el-icon-check active': 'el-icon-close error'"
                    ></i>
                  </el-input>
                  <p class="item-info">填写社会信用代码，请与营业执照保持一致。</p>
                </el-form-item>
                <el-form-item label="身份证号码" prop="ziRanRenId" v-else>
                  <el-input
                    v-model="dataView.qiYeBaseMessForm.ziRanRenId"
                    type="text"
                    placeholder="请输入身份证号码"
                  >
                    <i
                      slot="append"
                      class="icon-ele"
                      :class="formID.ziRanRenId ? 'el-icon-check active': 'el-icon-close error'"
                    ></i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="营业执照附件"
                  v-if="dataView.qiYeBaseMessForm.userType == 1"
                  :class="{'modeiy': selData.zhiZhaoBh}"
                  prop="zhiZhao_FuJian_Name"
                >
                  <el-input
                    type="text"
                    style="display:none"
                    placeholder="请输入"
                    v-model="dataView.qiYeBaseMessForm.zhiZhaoFuJianName"
                  ></el-input>
                  <el-input
                    type="text"
                    style="display:none"
                    v-model="dataView.qiYeBaseMessForm.zhiZhaoFuJianName"
                  ></el-input>
                  <p>
                    <a
                      class="el-upload-list__item-name"
                      @click="downloadFile(dataView.qiYeBaseMessForm.zhiZhaoFuJian,dataView.qiYeBaseMessForm.zhiZhaoFuJianName)"
                    >
                      <i class="el-icon-document el-icon-document-link"></i>
                      {{dataView.qiYeBaseMessForm.zhiZhaoFuJianName}}
                    </a>
                  </p>
                </el-form-item>
                <el-form-item label="证件附件" v-else prop="fddbr_ShenFenZheng_FuJian_Name">
                  <p>
                    <a
                      class="el-upload-list__item-name"
                      @click="downloadFile(dataView.qiYeBaseMessForm.fddbrShenFenZhengBH,dataView.qiYeBaseMessForm.fddbrShenFenZhengFuJianName)"
                    >
                      <i class="el-icon-document el-icon-document-link"></i>
                      {{dataView.qiYeBaseMessForm.fddbrShenFenZhengFuJianName}}
                    </a>
                  </p>
                </el-form-item>
              </el-col>
            </el-row>
            <template v-if="dataView.qiYeBaseMessForm.userType == 1">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="营业范围">
                    <el-input
                      type="text"
                      v-model="dataView.qiYeBaseMessForm.yeWuFanWei"
                      placeholder="营业范围"
                    >
                      <i
                        slot="append"
                        class="icon-ele"
                        :class="formID.yeWuFanWei ? 'el-icon-check active': 'el-icon-close error'"
                      ></i>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="注册资金" prop="zhuCe_ZiJin">
                    <el-row :gutter="0">
                      <el-col :span="10">
                        <div style="padding-right:10px">
                          <el-input
                            type="number"
                            v-model="dataView.qiYeBaseMessForm.zhuCeZiJin"
                            placeholder="请请输入注册资金"
                          ></el-input>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div style="padding-right:10px">
                          <el-select
                            style="width:100%"
                            v-model="dataView.qiYeBaseMessForm.zhuCeZiJinDanWei"
                            placeholder="请选择单位"
                          >
                            <el-option value="1" label="元"></el-option>
                            <el-option value="2" label="万元"></el-option>
                            <el-option value="3" label="千元"></el-option>
                          </el-select>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div style="padding-right:10px">
                          <el-select
                            style="width:100%"
                            v-model="dataView.qiYeBaseMessForm.zhuCeZiJinBiZhong"
                            placeholder="请选择币种"
                          >
                            <el-option
                              v-for="i of moneyType"
                              :value="i.huoBiDaiMaNumber"
                              :key="i.guid"
                              :label="i.huoBiDaiMa_Name"
                            ></el-option>
                          </el-select>
                        </div>
                      </el-col>
                      <el-col :span="2">
                        <i
                          class="icon-ele icon-e"
                          :class="formID.zhuCeZiJin ? 'el-icon-check active': 'el-icon-close error'"
                        ></i>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="所在行政区域" prop="arear">
                    <el-input
                      :value="dataView.qiYeBaseMessForm.provinceName ? dataView.qiYeBaseMessForm.provinceName + ',' + dataView.qiYeBaseMessForm.cityName  + ',' +  dataView.qiYeBaseMessForm.areaName: ''"
                    >
                      <i
                        slot="append"
                        class="icon-ele"
                        :class="formID.provinceName && formID.cityName && formID.areaName ? 'el-icon-check active': 'el-icon-close error'"
                      ></i>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="行业分类" prop="qiYeHangYeOneName">
                    <el-input :value="dataView.qiYeBaseMessForm.qiYeHangYeOneName">
                      <i
                        slot="append"
                        class="icon-ele"
                        :class="formID.hangYeFenLei ? 'el-icon-check active': 'el-icon-close error'"
                      ></i>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="通讯地址" prop="jinYing_DiZhi">
                    <el-input
                      type="text"
                      v-model="dataView.qiYeBaseMessForm.jinYingDiZhi"
                      placeholder="请输入"
                    >
                      <i slot="append" class="el-icon-check icon-ele blank"></i>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="注册地址"
                    prop="zhuCe_DiZhi"
                    :class="{'modeiy': selData.zhuCeDiZhi}"
                  >
                    <el-input
                      type="text"
                      placeholder="请输入注册地址"
                      v-model="dataView.qiYeBaseMessForm.zhuCeDiZhi"
                    >
                      <i
                        slot="append"
                        class="icon-ele"
                        :class="formID.zhuCeDiZhi ? 'el-icon-check active': 'el-icon-close error'"
                      ></i>
                    </el-input>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="12">
                  <el-form-item
                    label="注册邀请码"
                    prop="zhuCeYaoQingMa"
                    v-if="$store.state.logoType == 1"
                  >
                    <el-input
                      type="text"
                      placeholder="请输入注册邀请码"
                      v-model="dataView.qiYeBaseMessForm.zhuCeYaoQingMa"
                    >
                      <i slot="append" class="el-icon-check icon-ele blank"></i>
                    </el-input>
                    <p class="item-info">如有注册邀请码，请务必填写，没有则不用填写。</p>
                  </el-form-item>
                </el-col>-->
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="联系人" prop="lianXiRen_Name">
                    <el-input
                      placeholder="请输入联系人"
                      v-model="dataView.qiYeBaseMessForm.lianXiRenName"
                    >
                      <i slot="append" class="el-icon-check icon-ele blank"></i>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系电话" prop="lianXiRenPhone">
                    <el-input
                      v-model="dataView.qiYeBaseMessForm.lianXiRenPhone"
                      placeholder="请输入联系电话"
                    >
                      <i slot="append" class="el-icon-check icon-ele blank"></i>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="是否高新企业" prop="isGaoXinQiYe">
                    <el-radio-group v-model="dataView.qiYeBaseMessForm.isGaoXinQiYe">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="是否小微企业" prop="isWeiXiaoQiYe">
                    <el-radio-group v-model="dataView.qiYeBaseMessForm.isWeiXiaoQiYe">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="企业电话" prop="qiYePhone">
                    <el-input placeholder="请输入企业电话" v-model="dataView.qiYeBaseMessForm.qiYePhone">
                      <i slot="append" class="el-icon-check icon-ele blank"></i>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="企业传真" prop="qiYeFax">
                    <el-input placeholder="请输入企业传真" v-model="dataView.qiYeBaseMessForm.qiYeFax">
                      <i slot="append" class="el-icon-check icon-ele blank"></i>
                    </el-input>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="12">
                  <el-form-item label="企业邮箱" prop="qiYeEmail">
                    <el-input v-model="dataView.qiYeBaseMessForm.qiYeEmail" placeholder="请输入企业邮箱">
                      <i
                        slot="append"
                        class="icon-ele"
                        :class="formID.qiYeEmail ? 'el-icon-check active': 'el-icon-close error'"
                      ></i>
                    </el-input>
                  </el-form-item>
                </el-col>-->
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="职工人数" prop="zhiGongNum">
                    <el-input
                      placeholder="请输入职工人数"
                      v-model="dataView.qiYeBaseMessForm.zhiGongNum"
                      type="text"
                    >
                      <!-- <i
                        slot="append"
                        class="icon-ele"
                        :class="formID.zhiGongNum ? 'el-icon-check active': 'el-icon-close error'"
                      ></i> -->
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="技术人员人数" prop="jiShuRenYuanNum">
                    <el-input
                      v-model="dataView.qiYeBaseMessForm.jiShuRenYuanNum"
                      placeholder="请输入技术人员人数 "
                      type="text"
                    >
                      <i slot="append" class="el-icon-check icon-ele blank"></i>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
            <template v-if="dataView.qiYeBaseMessForm.userType == 2">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item
                    label="营业范围"
                    prop="yeWuFanWeiIds"
                    :class="{'modeiy': selData.yeWuFanWei}"
                  >
                    <el-input
                      type="text"
                      v-model="dataView.qiYeBaseMessForm.yeWuFanWeiIds"
                      placeholder="营业范围"
                    >
                      <i
                        slot="append"
                        class="icon-ele"
                        :class="formID.yeWuFanWeiIds ? 'el-icon-check active': 'el-icon-close error'"
                      ></i>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所在行政区域" prop="arear">
                    <el-input
                      :value="dataView.qiYeBaseMessForm.provinceName ? dataView.qiYeBaseMessForm.provinceName + ',' + dataView.qiYeBaseMessForm.cityName  + ',' +  dataView.qiYeBaseMessForm.areaName: ''"
                    >
                      <i
                        slot="append"
                        class="icon-ele"
                        :class="formID.provinceName &&  formID.cityName && formID.areaName? 'el-icon-check active': 'el-icon-close error'"
                      ></i>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="通讯地址" prop="jinYing_DiZhi">
                    <el-input
                      placeholder="请输入通讯地址"
                      v-model="dataView.qiYeBaseMessForm.jinYingDiZhi"
                    >
                      <i slot="append" class="el-icon-check icon-ele blank"></i>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="邮编编码" prop="youBian">
                    <el-input
                      type="text"
                      v-model="dataView.qiYeBaseMessForm.youBian"
                      placeholder="请输入邮编编码"
                    >
                      <i slot="append" class="el-icon-check icon-ele blank"></i>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="联系人" prop="lianXiRen_Name">
                    <el-input
                      placeholder="请输入联系人"
                      v-model="dataView.qiYeBaseMessForm.lianXiRenName"
                    >
                      <i slot="append" class="el-icon-check icon-ele blank"></i>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系电话" prop="lianXiRen_Phone">
                    <el-input
                      v-model="dataView.qiYeBaseMessForm.lianXiRenPhone"
                      placeholder="请输入联系电话"
                    >
                      <i slot="append" class="el-icon-check icon-ele blank"></i>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="是否高新企业" prop="isGaoXinQiYe">
                    <el-radio-group v-model="dataView.qiYeBaseMessForm.isGaoXinQiYe">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="是否小微企业" prop="isWeiXiaoQiYe">
                    <el-radio-group v-model="dataView.qiYeBaseMessForm.isWeiXiaoQiYe">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="自然人邮箱" prop="qiYeEmail">
                    <el-input placeholder="请输入自然人邮箱" v-model="dataView.qiYeBaseMessForm.qiYeEmail">
                      <i slot="append" class="el-icon-check icon-ele blank"></i>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="行业分类" prop="qiYeHangYeOneName">
                    <el-input :value="dataView.qiYeBaseMessForm.qiYeHangYeOneName">
                      <i
                        slot="append"
                        class="icon-ele"
                        :class="formID.hangYeFenLei ? 'el-icon-check active': 'el-icon-close error'"
                      ></i>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注" class="mian">
                  <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入备注"
                    v-model="dataView.qiYeBaseMessForm.beiZhu"
                    style="width: 100%"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card v-if="dataView.qiYeBaseMessForm.userType == 1">
          <div slot="header" class="clearfix">
            <span class="global-card-header-name">法定代表人信息（负责人信息）</span>
          </div>
          <div class="global-card-content" ref="frdbInfo">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="姓名" prop="fddbr_Name">
                  <el-input
                    type="text"
                    v-model="dataView.fddbrfzr.fddbrName"
                    placeholder="请输入法定代表人姓名"
                  >
                    <i
                      slot="append"
                      class="icon-ele"
                      :class="formID.fddbrName ? 'el-icon-check active': 'el-icon-close error'"
                    ></i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证件类型" prop="fddbrShengFenZhengType">
                  <el-radio-group v-model="dataView.fddbrfzr.fddbrShengFenZhengType">
                    <el-radio :label="100">居民身份证</el-radio>
                    <el-radio :label="140">护照(其他)</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="证件号码" prop="fddbr_ShenFenZheng_BH">
                  <el-input
                    type="text"
                    v-model="dataView.fddbrfzr.fddbrShenFenZhengBH"
                    placeholder="请输入法定代证件号码"
                  >
                    <i slot="append" class="el-icon-check icon-ele blank"></i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证件附件" prop="fddbr_ShenFenZheng_FuJian_Name">
                  <p>
                    <a
                      class="el-upload-list__item-name"
                      @click="downloadFile(dataView.fddbrfzr.fddbrShenFenZhengFuJian,dataView.fddbrfzr.fddbrShenFenZhengFuJianName)"
                    >
                      <i class="el-icon-document el-icon-document-link"></i>
                      {{dataView.fddbrfzr.fddbrShenFenZhengFuJianName}}
                    </a>
                  </p>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <!-- </div> -->
        <el-card v-if="dataView.qiYeBaseMessForm.zhuTiLeiXing.includes('T')">
          <div slot="header" class="clearfix">
            <span class="global-card-header-name">发票信息</span>
          </div>
          <div class="global-card-content" ref="fbInfo">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="是否一般纳税人" prop="naShuiRenShiBieMa">
                  <el-radio-group v-model="dataView.faPiaoInfo.isYiBanNaShuiRen">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="纳税人识别码" prop="qiYe_BH">
                  <el-input
                    v-model="dataView.qiYeBaseMessForm.qiYeBH"
                    readonly
                    placeholder="请输入纳税人识别码"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="地址" prop="zhuCeDiZhi">
                  <el-input v-model="dataView.faPiaoInfo.zhuCeDiZhi" placeholder="请输入地址"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="电话" prop="zhuCe_Phone">
                  <el-input v-model="dataView.faPiaoInfo.zhuCePhone" placeholder="请输入电话"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="开户行" prop="kaiHuHangName">
                  <el-input v-model="dataView.faPiaoInfo.kaiHuHangName" placeholder="请输入开户行名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开户行账号" prop="kaiHuHangZhangHao">
                  <el-input v-model="dataView.faPiaoInfo.kaiHuHangZhangHao" placeholder="请输入开户行账号"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <!-- </div> -->
        <el-card v-if="dataView.qiYeBaseMessForm.zhuTiLeiXing.includes('T')">
          <div slot="header" class="clearfix">
            <span class="global-card-header-name">资质信息</span>
          </div>
          <div class="global-card-content" ref="zhiziInfo">
            <self-table
              :data="dataView.ziZhiXinXiList"
              border
              header-cell-class-name="headercell"
              style="width:100%;margin:0;"
              :fit="true"
              max-height="290"
            >
              <el-table-column type="index" label="序号" align="center" width="60px"></el-table-column>
              <el-table-column
                prop="ziZhiZhengShuName"
                label="资质证书名称"
                min-width="150px"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="ziZhiZhengShuBH"
                label="资质证书编号"
                min-width="150px"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="ziZhiZhengShuJiBie"
                label="资质证书级别"
                min-width="150px"
                show-overflow-tooltip
              >
                <!-- <template slot-scope="scope">
                  {{
                  ['初级','中级','高级'][scope.row.ziZhiZhengShuJiBie]
                  }}
                </template> -->
              </el-table-column>
              <el-table-column
                prop="ziZhiZhengShuStartTime"
                label="资质有效期开始时间"
                min-width="150px"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{
                  scope.row.ziZhiZhengShuStartTime | timestampChange
                  }}
                </template>
              </el-table-column>
              <el-table-column
                prop="ziZhiZhengShuEndTime"
                label="资质有效期结束时间"
                min-width="150px"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{
                  scope.row.ziZhiZhengShuEndTime | timestampChange
                  }}
                </template>
              </el-table-column>
              <el-table-column
                prop="ziZhiZhengShuFuJianName"
                label="资质证书附件"
                min-width="150px"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span
                    class="linkurl"
                    @click="downloadFile(scope.row.ziZhiZhengShuFuJianGuid,scope.row.ziZhiZhengShuFuJianName)"
                  >{{ scope.row.ziZhiZhengShuFuJianName }}</span>
                </template>
              </el-table-column>
              <div slot="empty" class="custom-empty"></div>
            </self-table>
          </div>
        </el-card>
        <!-- </div> -->

        <el-card v-if="dataView.qiYeBaseMessForm.zhuTiLeiXing.includes('T')">
          <div slot="header" class="clearfix">
            <span class="global-card-header-name">荣誉信息</span>
          </div>
          <div class="global-card-content" ref="honorInfo">
            <self-table
              :data="dataView.rongYuXinXiList"
              border
              header-cell-class-name="headercell"
              style="width:100%;margin:0;"
              :fit="true"
              max-height="290px"
            >
              <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
              <el-table-column
                prop="rongYuName"
                label="荣誉/奖项名称"
                min-width="150px"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="huoJiangTime"
                label="获奖时间"
                min-width="150px"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{
                  scope.row.huoJiangTime | timestampChange
                  }}
                </template>
              </el-table-column>
              <el-table-column
                prop="huoJiangDanWei"
                label="颁奖单位"
                min-width="150px"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="fuJianName"
                label="获奖证书附件"
                min-width="150px"
                show-overflow-tooltip
                align="right"
              >
                <template slot-scope="scope">
                  <span
                    class="linkurl"
                    @click="downloadFile(scope.row.fuJianGuid,scope.row.fuJianName)"
                  >{{ scope.row.fuJianName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="beiZhu"
                label="备注"
                min-width="150px"
                show-overflow-tooltip
                align="right"
              ></el-table-column>
              <div slot="empty" class="custom-empty"></div>
            </self-table>
          </div>
        </el-card>
        <el-card>
          <div slot="header" class="clearfix">
            <span class="global-card-header-name">审核记录</span>
          </div>
          <div class="global-card-content">
            <self-table
              border
              :data="dataView.shenHeJiLuVOList"
              header-cell-class-name="headercell"
              style="width:100%;margin:0;"
              :fit="true"
              max-height="290"
            >
              <el-table-column
                type="index"
                label="序号"
                width="80"
                show-overflow-tooltip
                align="center"
              ></el-table-column>
              <el-table-column
                prop="commitTime"
                label="提交时间"
                min-width="150px"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{
                  scope.row.commitTime | timestampChange
                  }}
                </template>
              </el-table-column>
              <el-table-column
                prop="is_shenHe"
                label="操作类型"
                min-width="150px"
                show-overflow-tooltip
                align="center"
              >
                <template slot-scope="scope">{{['提交','撤回','审核','审核'][scope.row.isShenHe]}}</template>
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="操作时间"
                min-width="150px"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{
                  scope.row.createTime | timestampChange
                  }}
                </template>
              </el-table-column>
              <el-table-column
                prop="shenHeRen"
                label="操作人"
                min-width="150px"
                show-overflow-tooltip
                align="left"
              ></el-table-column>
              <el-table-column
                prop="is_shenHe"
                label="操作结果"
                min-width="150px"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span
                    class="status-success"
                    v-if="scope.row.isShenHe===2"
                  >{{['提交审核','撤回审核','审核通过','审核不通过'][scope.row.isShenHe]}}</span>
                  <span
                    class="status-fail"
                    v-else-if="scope.row.isShenHe===3"
                  >{{['提交审核','撤回审核','审核通过','审核不通过'][scope.row.isShenHe]}}</span>
                  <span
                    class="status-other"
                    v-else
                  >{{['提交审核','撤回审核','审核通过','审核不通过'][scope.row.isShenHe]}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="shenHeYiJian"
                label="审核意见"
                min-width="150px"
                show-overflow-tooltip
              ></el-table-column>
              <div slot="empty" class="custom-empty"></div>
              <div slot="empty" class="custom-empty"></div>
            </self-table>
          </div>
        </el-card>
      </el-form>
    </div>
    <el-dialog
      :title="title"
      :append-to-body="true"
      :visible.sync="checkDialogVisible"
      width="800px"
      :before-close="handleClose"
    >
      <div>
        <el-form :model="dataForm" ref="dataForm" :rules="rules" size="small" label-width="120px">
          <el-form-item label="审核意见类型" prop="shenHeYiJianType">
            <el-select v-model="dataForm.shenHeYiJianType" placeholder="请选择">
              <el-option v-for="(item, index) of typeArr" :value="index" :key="index" :label="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核意见" prop="shenHeYiJian">
            <el-input v-model="dataForm.shenHeYiJian" type="textarea" :rows="4"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="handleCheckInfoOK">确 定</el-button>
      </span>
    </el-dialog>
    <InfoDialog :formID="formID" v-if="infoDialogVisible"></InfoDialog>
    <preview-dialog ref="previewDialog"></preview-dialog>
  </div>
</template>

<script>
import PageCrumb from "@/components/PageCrumb";
import bizhong from "@/service/bi";
import AnchorNav from "@/components/AnchorNav/";
import ContentHeader from "@/components/contentHeader/ContentHeader";
import {
  getEnterpriseInfo,
  checkEnterprise,
  verifyData,
  checkState
} from "@/service/enterpriseInfo";
import InfoDialog from "./infoDialog";
import Mixin from "./mixin";
import u from "@/utils/utils";
import typeData from "@/store/typeData";
import previewDialog from "@/components/Preview";
export default {
  name: "qyjbexx",
  mixins: [Mixin],
  data() {
    return {
      formID: {
        userType: false,
        qiYeName: false,
        qiYeBH: false,
        qiYeBHType: true,
        zhuCeZiJin: false,
        yeWuFanWei: false,
        provinceName: false,
        cityName: false,
        areaName: false,
        zhuCeDiZhi: false,
        qiYeEmail: false,
        zhiGongNum: false,
        fddbrName: false,
        hangYeFenLei: false,
        naShuiRenShiBieMa: false
      },
      title: "",
      type: 3,
      dataForm: {
        userGuid: "",
        shenHeYiJian: "",
        shenHeStatus: "",
        shenHeYiJianType: ""
      },
      rules: {
        shenHeYiJianType: [
          { required: true, message: "请选择审核意见类型", trigger: "change" }
        ],
        shenHeYiJian: [
          { required: true, message: "请填写审核意见", trigger: "change" }
        ]
      },
      checkDialogVisible: false,
      infoDialogVisible: false,
      arrData: [
        {
          name: "基础信息",
          id: "basicInfo"
        },
        {
          name: "法定代表人信息",
          id: "frdbInfo"
        },

        {
          name: "发票信息",
          id: "fbInfo"
        },
        {
          name: "资质信息",
          id: "zhiziInfo"
        },
        {
          name: "荣誉信息",
          id: "honorInfo"
        },
        {
          name: "审核记录",
          id: "recodList"
        }
      ],
      hData: null,
      navData: [],
      typeArr: [
        '公司名称填写有误（与营业执照不一致）',
        '法定代表人填写有误（与营业执照不一致）',
        '注册地址填写有误（与营业执照不一致）',
        '经营范围填写有误（与营业执照不一致）',
        '注册资本填写有误（注意单位是万元）',
        '注册资本填写有误（与营业执照不一致）',
        '三证合一证件号码填写有误（与营业执照不一致）',
        '营业执照上传有误，请上传清晰版营业执照扫描件',
        '营业执照上传有误，请上传营业执照彩色扫描件',
        '营业执照上传有误，请上传最新版营业执照，并将相关注册信息与营业执照保持一致',
        '营业执照上传有误，与注册信息不一致',
        '营业执照上传有误，请上传完整版营业执照扫描件（请勿部分截图）',
        '营业执照上传有误，三证合一证件扫描件请上传营业执照',
        '其他原因'
      ],
      breadcrumbList: [
        // { label: "交易用户管理", link: "" },
        { label: "基础信息审核", link: "/baseInfo/baseInfoCheck" },
        { label: "审核", link: "" }
      ],
      moneyType: bizhong,
      rongYuXinXiList: [], // 荣誉列表
      qualificationList: [], // 纸质列表
      foldMemu: true,
      records: [],
      cats: [],
      arr: [],
      catFlag: false,
      aData: {},
      typeData: [],
      showDialogVisible: false,
      loading: true,
      dataView: {
        userQiYeGuid: "",
        userGuid: "",
        shenHeStatus: 2,
        qiYeBaseMessForm: {
          userQiYeGuid: "",
          userGuid: "",
          userType: 1,
          qiYeBH: "qiYeBH",
          qiYeName: "qiYeName",
          zhuTiLeiXing: [],
          accountName: "",
          lianXiRenName: "",
          lianXiRenPhone: "",
          userName: "",
          userPhone: "",
          createTime: "",
          shenPiZhuangTai: 3,
          creatorName: "",
          qiYeBHType: 1,
          zhiZhaoFuJian: "",
          zhiZhaoFuJianName: "",
          yeWuFanWei: "",
          zhuCeZiJinDanWei: "1",
          zhuCeZiJinBiZhong: "",
          jinYingDiZhi: "1",
          zhuCeDiZhi: "1",
          zhuCeZiJin: "",
          zhuCeTime: "",
          qiYeEmail: "",
          qiYePhone: "",
          qiYeFax: "",
          jiShuRenYuanNum: "",
          zhiGongNum: "",
          youBian: "",
          shengId: "",
          provinceName: "",
          shiId: "",
          cityName: "",
          areaId: "",
          areaName: "",
          qiYeHangYeOne: "",
          qiYeHangYeTwo: "",
          qiYeHangYeThree: "",
          qiYeHangYeFourth: "",
          zhuCeYaoQingMa: "",
          isGaoXinQiYe: "",
          isWeiXiaoQiYe: "",
          beiZhu: ""
        },
        fddbrfzr: {
          fddbrName: "",
          fddbrShenFenZhengBH: "",
          fddbrPhone: "",
          fddbrMobile: "",
          fddbrEmail: "",
          fddbrQQ: "",
          fddbrMsn: "",
          fddbrWeiXin: "",
          fddbrShenFenZhengFuJian: "",
          fddbrShenFenZhengFuJianName: "",
          fddbrShenFenZhengFuJianTime: "",
          fddbrShengFenZhengType: ""
        },
        faPiaoInfo: {
          naShuiRenShiBieMa: "",
          bankJiBenHu: "",
          naShuiRenZiGeZhengShu: "",
          naShuiRenZiGeZhengShuName: "",
          zhuCePhone: "",
          kaiHuHangName: "",
          kaiHuHangBh: "",
          kaiHuHangZhangHao: "",
          kaiHuHangHangHao: "",
          zhuCeDiZhi: "1"
        },
        yeJiXinXiList: [],
        rongYuXinXiVOList: [],
        ziZhiXinXiVOList: []
      },
      selData: {
        qiyeName: false,
        zhiZhaoBh: false,
        zhuCeDiZhi: false,
        yeWuFanWei: false
      },
      saving:false
    };
  },
  components: {
    PageCrumb,
    AnchorNav,
    InfoDialog,
    ContentHeader,
    previewDialog
  },
  created() {
    this.getPageInfo();
    verifyData({ userQiYeGuid: this.$route.query.userQiYeGuid }).then(res => {
      if (res.code === 1) {
        this.formID = res.data;
      }
    });
    checkState(this.$route.query.userQiYeGuid).then(res => {
      if (res.code === 1) {
        this.selData = res.data;
      }
    });
  },
  computed: {
    logoType() {
      return JSON.parse(window.sessionStorage.getItem("vuex")).logoType == 2;
    }
  },
  methods: {
    handleClose() {
      this.$refs.dataForm.resetFields();
      this.checkDialogVisible = false;
    },
    downloadFile(guid, name) {
      const ext = name.substring(name.lastIndexOf(".")).toLowerCase();
      if (ext == ".pdf" || ext == ".png" || ext == ".jpg") {
        this.$refs["previewDialog"].dialogVisible = true;
        this.$refs["previewDialog"].guid = guid;
        this.$refs["previewDialog"].fileName = name;
      } else {
        u.getDownSrc(guid).then(res => {
          window.location.href = res;
        });
      }
    },
    handleCheckInfo(type) {
      let flag = false;
      this.dataForm.shenHeStatus = type;
      this.dataForm.userGuid = this.dataView.userGuid;
      this.dataForm.shenHeStatus = type;
      let info="";
      if(this.$store.state.logoType == 1){
        info = "该用户选择包含“招标人/采购人”或“ 招标代理”,请确认是否审核通过"
      }else{
        info = "请再次确认交易主体类型，确认是否审核通过"
      }
      if (type === 2) {
        if (
          this.dataView.qiYeBaseMessForm.zhuTiLeiXing.includes("B") ||
          this.dataView.qiYeBaseMessForm.zhuTiLeiXing.includes("A")
        ) {
          this.$confirm(
            info,
            "审核提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
          ).then(() => {
            this.saving = true;
            checkEnterprise(this.dataForm).then(res => {
              if (res.code === 1) {
                this.saving = false;
                this.$message.success("通过审核");
                this.getPageInfo();
              }
            });
          });
        } else {
          checkEnterprise(this.dataForm).then(res => {
            if (res.code === 1) {
              this.$message.success("通过审核");
              this.getPageInfo();
            }
          });
        }
      } else {
        this.checkDialogVisible = true;
        this.title = type === 2 ? "审核通过" : "审核不通过";
      }
    },
    handleCheckInfoOK() {
      this.$refs.dataForm.validate(e => {
        if (e) {
          checkEnterprise(this.dataForm).then(res => {
            if (res.code === 1) {
              const msg = this.type === 2 ? "通过审核" : "不通过审核";
              this.$message.success(msg);
              this.handleClose();
              this.getPageInfo();
            }
          });
        }
      });
    },
    getPageInfo() {
      getEnterpriseInfo({ userQiYeGuid: this.$route.query.userQiYeGuid }).then(
        res => {
          if (res.code === 1) {
            const data = res.data;

            data.qiYeBaseMessForm.zhuTiLeiXing = data.qiYeBaseMessForm
              .zhuTiLeiXing
              ? data.qiYeBaseMessForm.zhuTiLeiXing.split(",")
              : [];
            this.dataView = data;
          }
          console.log(this.dataView);
        }
      );
    },
    handleCheckDetail() {
      this.infoDialogVisible = true;
    }
  },
  watch: {
    "dataView.qiYeBaseMessForm.isShenZhenGuoQi": {
      immediate: true,
      handler(data) {
        this.typeData = [];
        if (data || data !== null) {
          if (data) {
            this.typeData = typeData.shenZhen;
          } else {
            this.typeData = typeData.other;
          }
        }
      }
    },
    "dataView.qiYeBaseMessForm.userType": {
      immediate: true,
      handler(data) {
        this.navData = this.arrData.filter(i => {
          if (data === 1) {
            return i;
          } else {
            if (i.id !== "frdbInfo") {
              return i;
            }
          }
        });
      }
    },
    "dataView.qiYeBaseMessForm.zhuTiLeiXing": {
      immediate: true,
      deep: true,
      handler(data) {
        let arrData = JSON.parse(JSON.stringify(this.arrData));
        if (this.dataView.qiYeBaseMessForm.userType !== 1) {
          arrData.splice(1, 1);
        }
        if (!data.includes("T")) {
          arrData.splice(2, 3);
        }
        this.navData = arrData;
      }
    }
  }
};
</script>

<style lang="scss">
.a_links {
  color: red;
  font-weight: bold;
}
.a_links:hover {
  text-decoration: underline;
}
.page-detail {
  background: #fff;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.container {
  width: 100%;
  background: rgba(240, 242, 245, 1);
}
.zzxxDiv {
  background: #fff;
  margin-bottom: 20px;
  li {
    width: 50%;
    float: left;
    height: 54px;
  }
  li:last-child {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    padding-right: 20px;
  }
  .topDiv {
    height: 54px;
  }
}
.btn_record {
  color: #566df4;
  border-radius: 3px;
  padding: 5px 20px;
  border: 1px solid #566df4;
  display: inline-block;
  margin-left: 20px;
  cursor: pointer;
}
.ztt_label {
  padding-right: 10px;
}
.shztSpan {
  color: #eba23c;
}
.h_row {
  padding: 10px;
}
/*头部样式*/
.qyxxglHeader {
  width: 100%;
  background: #fff;
}
.item-info {
  color: #cccccc;
}
.icon-ele {
  float: right;
  font-size: 20px;
}
.active {
  color: green;
}
.error {
  color: red;
}
.blank {
  color: #fff;
}
/*主体内容样式*/
.qyxxglContent {
  /*width: calc(100% - 18px);*/
  /*padding-right: 40px;*/
  /*padding-right: 160px;*/
  /*margin: 5PX 4PX;no*/
  .bottomLine {
    width: 100%;
    margin-bottom: 20px;
    border-bottom: 1px solid #e9e9e9;
  }
  > div {
    width: 100%;
    margin-bottom: 20px;
    background: #fff;
  }
  > div:last-child {
    margin-bottom: 0;
  }
  h3 {
    width: calc(100% - 40px);
    height: 54px;
    margin: 0 auto;
    color: #333;
    font-size: 16px;
    line-height: 55px;
  }
  .zhxxDiv {
    div {
      margin-bottom: 0;
    }
    ul {
      overflow: hidden;
      width: calc(100% - 40px);
      height: 126px;
      margin: 0 auto;
      li {
        float: left;
        width: 50%;
        height: 63px;
        span {
          display: inline-block;
          height: 63px;
          font-size: 14px;
          color: #000;
          line-height: 63px;
        }
        span:first-child {
          width: 90px;
          padding-right: 12px;
          text-align: right;
        }
        span:last-child {
          width: calc(100% - 90px);
        }
        span.shztSpan {
          padding-right: 20px;
          color: #e6a23c;
        }
        ::v-deep.el-button {
          height: 32px !important;
          color: #566df4;
          border-color: #566df4;
        }
      }
    }
  }
  .shjlxxDiv {
    .bottomLine {
      margin-bottom: 0;
    }
    ::v-deep.cell {
      padding: 0 10px;
      font-size: 14px;
    }
  }
}
.item_wrapper {
  background: #fff;
  margin-bottom: 20px;
}
.item_content {
  padding: 0 20px;
}
.el-form-item__content .el-textarea__inner {
  width: 100% !important;
}
.el-upload-list__item-name {
  color: #157edf;
}
.qyxxglContent .el-input-group__append {
  border: none !important;
  background: none !important;
}
.icon-e {
  vertical-align: middle;
  margin-right: 15px;
}
.icon-ele-simgle {
  margin-right: 22px;
}
.modeiy .el-input.is-disabled .el-input__inner,
.modeiy .el-input__inner,
.modeiy .el-upload-list__item-name {
  color: red;
}
.qyxxglContent .modeiy .el-checkbox__label {
  color: red !important;
}
</style>
