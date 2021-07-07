<template>
  <section class="container page-detail">
     <page-crumb :d="{breadcrumbList:breadcrumbList}">
      <div slot="btns">
        <el-button @click="$router.back()" size="small">返回</el-button>
      </div>
     </page-crumb>
<!--    <div class="qyxxglContent" :class="{fold_content : !foldMemu}">-->
    <div class="qyxxglContent global-content" :class="{fold_content : !foldMemu}">

      <el-form
        :model="dataView"
        :rules="rules"
        ref="dataView"
        label-position="right"
        label-width="130px"
        width="100%"
        size="small"
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
                  <el-radio-group v-model="dataView.qiYeBaseMessForm.userType" disabled>
                    <el-radio :label="1">企业</el-radio>
                    <el-radio :label="2">自然人</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="企业名称"
                  prop="qiYe_Name"
                  v-if="dataView.qiYeBaseMessForm.userType == 1"
                >
                  <el-input placeholder="请输入" type="text" v-model="dataView.qiYeBaseMessForm.qiYeName" disabled></el-input>
                </el-form-item>
                <el-form-item
                  label="自然人名称"
                  v-if="dataView.qiYeBaseMessForm.userType == 2"
                  prop="qiYe_Name"
                >
                  <el-input placeholder="请输入" type="text" v-model="dataView.qiYeBaseMessForm.userName" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="交易主体类型" prop="zhuTiLeiXing">
                  <el-checkbox-group v-model="dataView.qiYeBaseMessForm.zhuTiLeiXing" disabled>
                    <el-checkbox label="T">投标人/供应商</el-checkbox>
                    <el-checkbox label="B">招标人/采购人</el-checkbox>
                    <el-checkbox label="A">招标代理</el-checkbox>
                    <!-- <el-checkbox label="B" v-if="dataView.qiYeBaseMessForm.userType == 2"
                      >采购人/招标人</el-checkbox
                    > -->
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="企业代码类型"
                  v-if="dataView.qiYeBaseMessForm.userType == 1"
                  prop="qiYeBHType"
                >
                  <el-radio-group v-model="dataView.qiYeBaseMessForm.qiYeBHType" disabled>
                    <el-radio :label="2" :value="2">统一社会信用代码</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item
                  label="证件类型"
                  prop="fddbrShengFenZhengType"
                  v-if="dataView.qiYeBaseMessForm.userType == 2"
                >
                  <el-radio-group v-model="dataView.qiYeBaseMessForm.fddbrShengFenZhengType" disabled>
                    <el-radio :label="100">居民身份证</el-radio>
                    <!-- <el-radio :label="140" disabled>其他证件</el-radio> -->
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <template v-if="logoType">
              <el-row :gutter="20" v-if="dataView.qiYeBaseMessForm.zhuTiLeiXing.includes('B')">
                <el-col :span="12">
                  <el-form-item label="是否深圳市属国企" prop="isShenZhenGuoQi">
                    <el-radio-group v-model="dataView.qiYeBaseMessForm.isShenZhenGuoQi" disabled>
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="企业类型或企业" prop="suoShuQiYeDaiMa">
                    <el-select v-model="dataView.qiYeBaseMessForm.suoShuQiYeDaiMa" disabled>
                      <el-option v-for="i of typeData" :value="i.code" :key="i.code" :label="i.text"></el-option>
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
                    disabled
                    v-model="dataView.qiYeBaseMessForm.qiYeBH"
                    type="text"
                    :disabled="$store.state.roleAnddepartment.enterPriseInfo.isHasSubmit == 1"
                    placeholder="请输入社会信用代码"
                  ></el-input>
                  <p class="item-info">填写社会信用代码，请与营业执照保持一致。</p>
                </el-form-item>
                <el-form-item label="身份证号码" prop="ziRanRenId" v-else>
                  <el-input
                    v-model="dataView.qiYeBaseMessForm.ziRanRenId"
                    disabled
                    type="text"
                    placeholder="请输入身份证号码"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="营业执照附件"
                  v-if="dataView.qiYeBaseMessForm.userType == 1"
                  prop="zhiZhao_FuJian_Name"
                >
                  <el-input
                    type="text"
                    style="display:none"
                    placeholder="请输入"
                    disabled
                    v-model="dataView.qiYeBaseMessForm.zhiZhaoFuJianName"
                  ></el-input>
                  <el-input
                    type="text"
                    style="display:none"
                    v-model="dataView.qiYeBaseMessForm.zhiZhaoFuJianName"
                  ></el-input>
                  <p><a class="el-upload-list__item-name" @click="downloadFile(dataView.qiYeBaseMessForm.zhiZhaoFuJian,dataView.qiYeBaseMessForm.zhiZhaoFuJianName)"><i class="el-icon-document"></i>{{dataView.qiYeBaseMessForm.zhiZhaoFuJianName}}</a></p>
                </el-form-item>
                <el-form-item
                  label="证件附件"
                  v-else
                  prop="fddbr_ShenFenZheng_FuJian_Name"
                >
                  <p><a class="el-upload-list__item-name" @click="downloadFile(dataView.qiYeBaseMessForm.fddbrShenFenZhengBH,dataView.qiYeBaseMessForm.fddbrShenFenZhengFuJianName)"><i class="el-icon-document"></i>{{dataView.qiYeBaseMessForm.fddbrShenFenZhengFuJianName}}</a></p>
                </el-form-item>
              </el-col>
            </el-row>
            <template v-if="dataView.qiYeBaseMessForm.userType == 1">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="营业范围">
                    <el-tooltip class="item" effect="dark" :content="dataView.qiYeBaseMessForm.yeWuFanWei" placement="top">
                      <el-input type="text" v-model="dataView.qiYeBaseMessForm.yeWuFanWei" placeholder="营业范围" disabled></el-input>
                    </el-tooltip>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="注册资金" prop="zhuCe_ZiJin">
                    <el-row :gutter="0">
                      <el-col :span="12"
                        ><div style="padding-right:10px">
                          <el-input
                            type="number"
                            disabled
                            v-model="dataView.qiYeBaseMessForm.zhuCeZiJin"
                            placeholder="请请输入注册资金"
                          ></el-input></div
                      ></el-col>
                      <el-col :span="6"
                        ><div style="padding-right:10px">
                          <el-select
                            style="width:100%"
                            disabled
                            v-model="dataView.qiYeBaseMessForm.zhuCeZiJinDanWei"
                            placeholder="请选择单位"
                            ><el-option value="1" label="元"></el-option
                            ><el-option value="2" label="万元"></el-option
                            ><el-option value="3" label="千元"></el-option
                          ></el-select></div
                      ></el-col>
                      <el-col :span="6"
                        ><div style="padding-right:10px">
                          <el-select
                            style="width:100%"
                            v-model="dataView.qiYeBaseMessForm.zhuCeZiJinBiZhong"
                            disabled
                            placeholder="请选择币种"
                            ><el-option
                              v-for="i of moneyType"
                              :value="i.huoBiDaiMaNumber"
                              :key="i.guid"
                              :label="i.huoBiDaiMa_Name"
                            ></el-option>
                          </el-select></div
                      ></el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="所在行政区域" prop="arear">
                    <div class="el-input el-input--small is-disabled"><p class="el-input__inner">{{dataView.qiYeBaseMessForm.provinceName + ',' + dataView.qiYeBaseMessForm.cityName  + ',' +  dataView.qiYeBaseMessForm.areaName}}</p></div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="通讯地址" prop="jinYing_DiZhi">
                    <el-input
                      type="text"
                      disabled
                      v-model="dataView.qiYeBaseMessForm.jinYingDiZhi"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="注册地址" prop="zhuCe_DiZhi">
                    <el-input
                    disabled
                      type="text"
                      placeholder="请输入注册地址"
                      v-model="dataView.qiYeBaseMessForm.zhuCeDiZhi"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="注册邀请码" prop="zhuCeYaoQingMa" v-if="$store.state.logoType == 1">
                    <el-input
                    disabled
                      type="text"
                      placeholder="请输入注册邀请码"
                      v-model="dataView.qiYeBaseMessForm.zhuCeYaoQingMa"
                    ></el-input>
                    <p class="item-info">如有注册邀请码，请务必填写，没有则不用填写。</p>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="联系人" prop="lianXiRen_Name">
                    <el-input
                    disabled
                      placeholder="请输入联系人"
                      v-model="dataView.qiYeBaseMessForm.lianXiRenName"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系电话" prop="lianXiRenPhone">
                    <el-input
                    disabled
                      v-model="dataView.qiYeBaseMessForm.lianXiRenPhone"
                      placeholder="请输入联系电话"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="企业电话" prop="qiYePhone">
                    <el-input
                    disabled
                      placeholder="请输入企业电话"
                      v-model="dataView.qiYeBaseMessForm.qiYePhone"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="企业邮箱" prop="qiYeEmail">
                    <el-input
                    disabled
                      v-model="dataView.qiYeBaseMessForm.qiYeEmail"
                      placeholder="请输入企业邮箱"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="企业传真" prop="qiYeFax">
                    <el-input
                    disabled
                      placeholder="请输入企业传真"
                      v-model="dataView.qiYeBaseMessForm.qiYeFax"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="行业分类">
                    <!-- <div class="el-input el-input--small is-disabled">
                      <p class="el-input__inner">{{dataView.qiYeBaseMessForm.qiYeHangYeOne}}</p>
                    </div> -->
                    <el-tooltip class="item" effect="dark" :content="dataView.qiYeBaseMessForm.qiYeHangYeOneName" placement="top">
                      <el-input type="text" disabled v-model="dataView.qiYeBaseMessForm.qiYeHangYeOneName" placeholder="行业分类"></el-input>
                    </el-tooltip>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="职工人数" prop="zhiGongNum">
                    <el-input
                    disabled
                      placeholder="请输入职工人数"
                      v-model="dataView.qiYeBaseMessForm.zhiGongNum"
                      type="text"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="技术人员人数" prop="jiShuRenYuanNum">
                    <el-input
                    disabled
                      v-model="dataView.qiYeBaseMessForm.jiShuRenYuanNum"
                      placeholder="请输入技术人员人数 "
                      type="text"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
            <template v-if="dataView.qiYeBaseMessForm.userType == 2">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="营业范围" prop="yeWuFanWeiIds">
                    <el-tooltip class="item" effect="dark" :content="dataView.qiYeBaseMessForm.yeWuFanWei" placement="top">
                      <el-input disabled type="text" v-model="dataView.qiYeBaseMessForm.yeWuFanWei" placeholder="营业范围"></el-input>
                    </el-tooltip>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所在行政区域" prop="arear">
                    <p>{{dataView.qiYeBaseMessForm.cityName}}</p>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="通讯地址" prop="jinYing_DiZhi">
                    <el-input
                    disabled
                      placeholder="请输入通讯地址"
                      v-model="dataView.qiYeBaseMessForm.jinYingDiZhi"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="邮编编码" prop="youBian">
                    <el-input
                      type="text"
                      disabled
                      v-model="dataView.qiYeBaseMessForm.youBian"
                      placeholder="请输入邮编编码"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="联系人" prop="lianXiRen_Name">
                    <el-input
                    disabled
                      placeholder="请输入联系人"
                      v-model="dataView.qiYeBaseMessForm.lianXiRenName"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系电话" prop="lianXiRen_Phone">
                    <el-input
                    disabled
                      v-model="dataView.qiYeBaseMessForm.lianXiRenPhone"
                      placeholder="请输入联系电话"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="自然人邮箱" prop="qiYeEmail">
                    <el-input
                    disabled
                      placeholder="请输入自然人邮箱"
                      v-model="dataView.qiYeBaseMessForm.qiYeEmail"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="行业分类" prop="qiYeHangYeOne">
                    <!-- <Tree
                        :nodes="cats"
                        v-if="loaded && catFlag"
                        :showCheckbox="true"
                        :checkeds="typeof dataView.qiYeBaseMessForm.qiYeHangYeOne === 'string' ? dataView.qiYeBaseMessForm.qiYeHangYeOne.split(','):dataView.qiYeBaseMessForm.qiYeHangYeOne"
                        v-model="dataView.qiYeBaseMessForm.qiYeHangYeOne"
                        treeId="hangYeFenLeiDaiMa"
                        nodeKey="hangYeFenLei"
                        refName="hangYeFenLei"
                        :defaultProps="{ children: 'children', label: 'hangYeFenLeiName' }"
                    /> -->
                    <!-- <div class="el-input el-input--small is-disabled">
                      <p class="el-input__inner">{{dataView.qiYeBaseMessForm.qiYeHangYeOne}}</p>
                    </div> -->
                    <el-tooltip class="item" effect="dark" :content="dataView.qiYeBaseMessForm.qiYeHangYeOneName" placement="top">
                      <el-input disabled type="text" v-model="dataView.qiYeBaseMessForm.qiYeHangYeOneName" placeholder="行业分类"></el-input>
                    </el-tooltip>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="是否高新企业" prop="isGaoXinQiYe">
                  <el-radio-group v-model="dataView.qiYeBaseMessForm.isGaoXinQiYe" disabled>
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否小微企业" prop="isWeiXiaoQiYe">
                  <el-radio-group v-model="dataView.qiYeBaseMessForm.isWeiXiaoQiYe" disabled>
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注" class="mian">
                  <el-input
                    type="textarea"
                    :rows="4"
                    disabled
                    placeholder="请输入备注"
                    v-model="dataView.qiYeBaseMessForm.beiZhu"
                    style="width: 100%"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
      </el-card>
        <!-- </div> -->
      <el-card v-if="dataView.qiYeBaseMessForm.userType == 1">
        <div slot="header" class="clearfix">
          <span class="global-card-header-name">法定代表人信息（负责人信息）</span>
        </div>
        <div class="global-card-content"  ref="frdbInfo">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="姓名" prop="fddbr_Name">
                  <el-input
                    type="text"
                    disabled
                    v-model="dataView.fddbrfzr.fddbrName"
                    placeholder="请输入法定代表人姓名"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证件类型" prop="fddbrShengFenZhengType">
                  <el-radio-group v-model="dataView.fddbrfzr.fddbrShengFenZhengType" disabled>
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
                    disabled
                    v-model="dataView.fddbrfzr.fddbrShenFenZhengBH"
                    placeholder="请输入法定代证件号码"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="证件附件"
                  prop="fddbr_ShenFenZheng_FuJian_Name"
                >
                  <p><a class="el-upload-list__item-name" @click="downloadFile(dataView.fddbrfzr.fddbrShenFenZhengFuJian,dataView.fddbrfzr.fddbrShenFenZhengFuJianName)"><i class="el-icon-document"></i>{{dataView.fddbrfzr.fddbrShenFenZhengFuJianName}}</a></p>
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
        <div class="global-card-content"  ref="fbInfo">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="是否一般纳税人" prop="naShuiRenShiBieMa">
                  <el-radio-group v-model="dataView.faPiaoInfo.isYiBanNaShuiRen" disabled>
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="纳税人识别码" prop="qiYe_BH" disabled>
                  <el-input v-model="dataView.faPiaoInfo.naShuiRenShiBieMa" readonly placeholder="请输入纳税人识别码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="地址" prop="zhuCeDiZhi">
                  <el-input
                          v-model="dataView.faPiaoInfo.zhuCeDiZhi" disabled
                          placeholder="请输入地址"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="电话" prop="zhuCe_Phone">
                  <el-input
                          v-model="dataView.faPiaoInfo.zhuCePhone"
                          disabled
                          placeholder="请输入电话"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="开户行" prop="kaiHuHangName">
                  <el-input
                    v-model="dataView.faPiaoInfo.kaiHuHangName"
                    disabled
                    placeholder="请输入开户行名称"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开户行账号" prop="kaiHuHangZhangHao">
                  <el-input disabled v-model="dataView.faPiaoInfo.kaiHuHangZhangHao" placeholder="请输入开户行账号"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <!-- </div> -->
        <el-card>
            <div slot="header" class="clearfix">
              <span class="global-card-header-name">业绩信息</span>
            </div>
            <div class="global-card-content" ref="bankInfo">
            <self-table :data="dataView.yeJiXinXiList"
              border
              header-cell-class-name="headercell"
              style="width:100%;margin:0;"
              :fit="true"
              max-height="290"
            >
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="80"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="xiangMuName"
                label="项目名称"
                min-width="150px"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="zhuanYeFenLeiName"
                label="行业分类"
                width="150px"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column class-name="table-column-money"
                prop="heTongJinE"
                label="合同金额（万元）"
                width="140"
                show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    {{scope.row.heTongJinE / 1000000}}
                  </template>
                </el-table-column
              >
              <el-table-column
                prop="xiangMuEndTime"
                label="合同签订时间"
                show-overflow-tooltip
              >
                <template slot-scope="scope">{{
                  scope.row.xiangMuEndTime | timestampChange
                }}</template>
              </el-table-column>
              <el-table-column
                prop="heTongQianDingFang"
                label="合同签订方"
                min-width="150px"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                      prop="xmLeiXing"
                      label="项目类型"
                      min-width="150px"
                      show-overflow-tooltip
              >
                <template slot-scope="scope">{{ ['工程','物资','服务'][scope.row.xmLeiXing] }}</template>
              </el-table-column>
              <el-table-column
                prop="xiangMuHeTongFuJianName"
                label="合同附件"
                min-width="150px"
                show-overflow-tooltip
                ><template slot-scope="scope">
                  <span
                    class="linkurl"
                    @click="downloadFile(scope.row.xiangMuHeTongFuJianGuid,scope.row.xiangMuHeTongFuJianName)"
                    >{{ scope.row.xiangMuHeTongFuJianName }}</span
                  >
                </template></el-table-column
              >
              <div slot="empty" class="custom-empty"></div>
            </self-table>
          </div>
        </el-card>
      <el-card v-if="dataView.qiYeBaseMessForm.zhuTiLeiXing.includes('T')">
        <div slot="header" class="clearfix">
          <span class="global-card-header-name">荣誉信息</span>
        </div>
        <div class="global-card-content" ref="honorInfo" >
          <self-table :data="rongYuXinXiList"
                  border
                  header-cell-class-name="headercell"
                  style="width:100%;margin:0;"
                  :fit="true"
                  max-height="290px"
          >
            <el-table-column
                    type="index"
                    label="序号"
                    align="center"
                    width="50"
            ></el-table-column>
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
              <template slot-scope="scope">{{
                scope.row.huoJiangTime | timestampChange
                }}</template>
            </el-table-column>
            <el-table-column
                    prop="huoJiangDanWei"
                    label="颁奖单位"
                    min-width="150px"
                    show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                    prop="fuJianName"
                    label="获奖证书附件"
                    min-width="150px"
                    show-overflow-tooltip
                    align="right"
            >
              <template slot-scope="scope">
                <span class="linkurl" @click="downloadFile(scope.row.ziZhiZhengShuFuJianGuid,scope.row.fuJianName)">{{ scope.row.fuJianName }}</span>
              </template></el-table-column
            >
            <el-table-column
                    prop="beiZhu"
                    label="备注"
                    min-width="150px"
                    show-overflow-tooltip
                    align="right"
            >
            </el-table-column>
            <div slot="empty" class="custom-empty"></div>
          </self-table>
        </div>
        </el-card>
      <el-card>
            <div slot="header" class="clearfix">
              <span class="global-card-header-name">供应商专业申请</span>
            </div>
            <div class="global-card-content" ref="frdbInfo">
            <self-table :data="dataView.gongYingShangList"
              border
              header-cell-class-name="headercell"
              style="width:100%;margin:0;"
              :fit="true"
              max-height="290"
            >
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="80"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="caiGouDanWei"
                label="采购单位"
                min-width="150px"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="zhuanYeFenLeiName"
                label="行业分类"
                min-width="150px"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="shenQiZiLiaoMoBanName"
                label="申请资料模板下载"
                min-width="150px"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span
                    class="linkurl"
                    @click="downloadFile(scope.row.shenQiZiLiaoMoBanGuid,scope.row.shenQiZiLiaoMoBanName)"
                    >{{ scope.row.shenQiZiLiaoMoBanName }}</span
                  >
                </template>
              </el-table-column>
              <el-table-column
                prop="shenQiZiLiaoName"
                label="申请资料上传"
                min-width="150px"
                show-overflow-tooltip
              >
                <!-- 需要补全guid -->
                <template slot-scope="scope">
                  <span
                    class="linkurl"
                    @click="downloadFile(scope.row.shenQiZiLiaoGuid,scope.row.shenQiZiLiaoName)"
                    >{{ scope.row.shenQiZiLiaoName }}</span
                  >
                </template>
              </el-table-column>
              <el-table-column
                prop="status"
                label="入库状态"
                min-width="150px"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <div v-if="scope.row.status!==null">
                    <span class="status-success" v-if="scope.row.status === 2">{{statusArr[scope.row.status]}}</span>
                    <span class="status-fail" v-else-if="scope.row.status===3">{{statusArr[scope.row.status]}}</span>
                    <span class="status-going" v-else-if="scope.row.status===1">{{statusArr[scope.row.status]}}</span>
                    <span class="status-other" v-else>{{statusArr[scope.row.status]}}</span>
                  </div>
                  <div v-else>
                    <span class="status-other">未提交</span>
                  </div>
              </template>
              </el-table-column>
              <el-table-column
                prop="isYouXiao"
                label="是否有效"
                min-width="150px"
                show-overflow-tooltip
                ><template slot-scope="scope">
                  <div v-if="scope.row.status > 1">
                    <span v-if="scope.row.status===2" class="status-success">有效</span>
                    <span v-else class="status-fail">无效</span>
                  </div>
              </template></el-table-column>
                <el-table-column fixed="right" label="操作" min-width="120" align="left">
                  <template slot-scope="scope" >
                    <el-button-group class="operation-button-group">
                      <el-button type="primary" plain class="operation-button"
                                    size="small" @click="handleShowRecord(scope.row.guid)">
                                    <i class="iconfont icon-shenpi"><span>审批记录</span></i></el-button>
                    </el-button-group>
                  </template>
                </el-table-column>
              <div slot="empty" class="custom-empty"></div>
            </self-table>
          </div>
        </el-card>
      </el-form>
      <el-card>
          <div slot="header" class="clearfix">
            <span class="global-card-header-name">供应商管理</span>
            <!-- <el-button size="small"
                 type="primary"
                 style="float:right;"
                 @click="handleAddSupplier"
                 >添加</el-button> -->
          </div>
          <div class="global-card-content" ref="fbInfo">
          <self-table :data="dataView.gongYingShangGuanLiList"
            border
            header-cell-class-name="headercell"
            style="width:100%;margin:0;"
            :fit="true"
            max-height="290"
          >
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="80"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="guanLiLeiXing"
              label="管理类型"
              min-width="150px"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="zhiXingStartTime"
              label="执行开始时间"
              min-width="150px"
              show-overflow-tooltip
            >
            <template slot-scope="scope">
                {{scope.row.zhiXingStartTime | timestampChange}}
            </template>
          </el-table-column>
            <el-table-column
              prop="zhiXingEndTime"
              label="执行结束时间"
              min-width="150px"
              show-overflow-tooltip
            ><template slot-scope="scope">
                {{scope.row.zhiXingEndTime | timestampChange}}
            </template>
            </el-table-column>
            <el-table-column
              prop="zhiXingYuanYin"
              label="执行原因"
              min-width="150px"
              show-overflow-tooltip
            >
              <template slot-scope="scope">{{scope.row.zbr}}</template>
            </el-table-column>
            <el-table-column
              prop="beiZhu"
              label="备注"
              min-width="150px"
              show-overflow-tooltip
            >
              <template slot-scope="scope">{{scope.row.zbr}}</template>
            </el-table-column>
            <el-table-column class-name="table-column-money"
              prop="zhongBiaoJinE"
              label="附件"
              min-width="150px"
              show-overflow-tooltip
              align="right"
            >
            <template slot-scope="scope">
              <span
                class="linkurl"
                @click="downloadFile(scope.row.shenQiZiLiaoMoBanGuid,scope.row.shenQiZiLiaoMoBanName)"
                >{{ scope.row.shenQiZiLiaoMoBanName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="150px"
          >
            <template slot-scope="scope">
              <el-button-group class="operation-button-group">
                <el-button type="primary" plain class="operation-button">
                  <i class="iconfont icon-bianji2"><span>编辑</span></i>
                </el-button>
                <el-button @click="handleDel(scope.row.guid)" type="info" plain class="operation-button">
                  <i class="iconfont icon-shanchu1"><span>删除</span></i>
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
          </self-table>
        </div>
      </el-card>
    </div>
    <AddSupplierDialog v-if="showSupplierDialog" @onSuccess="handleOnSuccess"></AddSupplierDialog>
    <RecordDialog :records="records" v-if="showRecordflg"></RecordDialog>
    <preview-dialog ref="previewDialog"></preview-dialog>
  </section>
</template>

<script>
import PageCrumb from "@/components/PageCrumb"
import bizhong from '@/service/bi'
import AnchorNav from '@/components/AnchorNav/'
import RecordDialog from '../checked/recordDailog'
// import ContentHeader from "@/components/contentHeader/ContentHeader";
import AddSupplierDialog from './addSupplierDialog'
import {supplierDetail, recordInfo, delSupplier} from '@/service/enterpriseInfo'
import u from '@/utils/utils'
import typeData from '@/store/typeData'
import previewDialog from "@/components/Preview";
export default {
  name: 'qyjbexx',
  data () {
    return {
      isYouXiao: ['无效', '有效'],
      statusArr: ['未提交', '审核中', '审核通过', '审核未通过'],
      title: '',
      type: 2,
      showRecordflg: false,
      showSupplierDialog: false,
      dataForm: {
        userGuid: '',
        shenHeYiJian:'',
        shenHeStatus:'',
        shenHeYiJianType:''
      },
      rules:{
        shenHeYiJianType: [
          { required: true, message: '请输选择审核意见类型', trigger: 'change' }
        ]
      },
      checkDialogVisible: false,
      arrData: [
        {
          name: '基础信息',
          id:'basicInfo'
        },
        {
          name: '法定代表人信息',
          id:'frdbInfo'
        },

        {
          name:'发票信息',
          id: 'fbInfo'
        },
        {
          name: '资质信息',
          id:'zhiziInfo'
        },
        {
          name: '荣誉信息',
          id:'honorInfo'
        },
        {
          name: '审核记录',
          id: 'recodList'
        }
      ],
      hData: null,
      navData: [],
      typeData:[],
      breadcrumbList: [
        { label: "专业供应商管理", link: "/supplier/management" },
        { label: "查看", link: "" }
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
      showDialogVisible: false,
      loading: true,
      dataView: {
       'userQiYeGuid': '',
       'userGuid': '',
       shenHeStatus: 2,
       'qiYeBaseMessForm': {
           'userQiYeGuid': '',
           'userGuid': '',
           'userType': 1,
           'qiYeBH': 'qiYeBH',
           'qiYeName': 'qiYeName',
           'zhuTiLeiXing': [],
           'accountName': '',
           'lianXiRenName': '',
           'lianXiRenPhone': '',
           'userName': '',
           'userPhone': '',
           'createTime': '',
           'shenPiZhuangTai': 3,
           'creatorName': '',
           'qiYeBHType': 1,
           'zhiZhaoFuJian': '',
           'zhiZhaoFuJianName': '',
           'yeWuFanWei': '',
           'zhuCeZiJinDanWei': '1',
           'zhuCeZiJinBiZhong': '',
           'jinYingDiZhi': '1',
           'zhuCeDiZhi': '1',
           'zhuCeZiJin': '',
           'zhuCeTime': '',
           'qiYeEmail': '',
           'qiYePhone': '',
           'qiYeFax': '',
           'jiShuRenYuanNum': '',
           'zhiGongNum': '',
           'youBian': '',
           'shengId': '',
           'provinceName': '',
           'shiId': '',
           'cityName': '',
           'areaId': '',
           'areaName': '',
           'qiYeHangYeOne': '',
           'qiYeHangYeTwo': '',
           'qiYeHangYeThree': '',
           'qiYeHangYeFourth': '',
           'zhuCeYaoQingMa': '',
           'isGaoXinQiYe': '',
           'isWeiXiaoQiYe': '',
           'beiZhu': ''
       },
       'fddbrfzr': {
           'fddbrName': '',
           'fddbrShenFenZhengBH': '',
           'fddbrPhone': '',
           'fddbrMobile': '',
           'fddbrEmail': '',
           'fddbrQQ': '',
           'fddbrMsn': '',
           'fddbrWeiXin': '',
           'fddbrShenFenZhengFuJian': '',
           'fddbrShenFenZhengFuJianName': '',
           'fddbrShenFenZhengFuJianTime': '',
           'fddbrShengFenZhengType': ''
       },
       'faPiaoInfo': {
           'naShuiRenShiBieMa': '',
           'bankJiBenHu': '',
           'naShuiRenZiGeZhengShu': '',
           'naShuiRenZiGeZhengShuName': '',
           'zhuCePhone': '',
           'kaiHuHangName': '',
           'kaiHuHangBh': '',
           'kaiHuHangZhangHao': '',
           'kaiHuHangHangHao': '',
           'zhuCeDiZhi': '1'
       },
       'yeJiXinXiList': [],
       'rongYuXinXiVOList': [],
       'ziZhiXinXiVOList': [],
       gongYingShangList:[],
       gongYingShangGuanLiList:[],
       showSupplierDialog: true
      }
    }
  },
  components: {
    PageCrumb,
    RecordDialog,
    // ContentHeader,
    AddSupplierDialog,
    previewDialog
  },
  created () {
    this.getPageInfo()
  },
  computed: {
    logoType () {
      return JSON.parse(window.sessionStorage.getItem('vuex')).logoType == 2
    }
  },
  methods: {
    handleDel (guid) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delSupplier(guid).then(res => {
            if (res.code === 1) {
              this.$message.success('删除成功')
              this.getPageInfo()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

    },
    handleOnSuccess (data) {
      this.showSupplierDialog = data
      this.getPageInfo()
    },
    handleAddSupplier () {
      this.showSupplierDialog = true
    },
    handleShowRecord (guid) {
      this.showRecordflg = true
      recordInfo({guid}).then(res => {
        if (res.code === 1) {
          this.records = res.data
        }
      })
    },
    handleClose () {
      this.$refs.dataForm.resetFields()
      this.checkDialogVisible = false
    },
    // downloadFile (guid) {
    //   u.downLoad(guid)
    // },
    downloadFile(guid, name) {
      const ext = name
        .substring(name.lastIndexOf("."))
        .toLowerCase();
      if (ext == ".pdf" || ext == ".png" || ext == ".jpg") {
        this.$refs["previewDialog"].dialogVisible = true;
        this.$refs["previewDialog"].guid = guid;
        this.$refs["previewDialog"].fileName = name;
      }else{
        u.getDownSrc(guid).then(res => {
            window.location.href = res;
          });
      }
    },
    getPageInfo () {
      supplierDetail({guid:this.$route.query.guid}).then(res => {
        if (res.code === 1) {
          const data = res.data

          data.qiYeBaseMessForm.zhuTiLeiXing = data.qiYeBaseMessForm.zhuTiLeiXing ? data.qiYeBaseMessForm.zhuTiLeiXing.split(','): []
          this.dataView = data

        }
        console.log(this.dataView)
      })
    }
  },
  watch: {
    'formData.isShenZhenGuoQi': {
      immediate: true,
      handler(data) {
        this.typeData = []
        if (data || data !== null) {
          if (data) {
            this.typeData = typeData.shenZhen
          } else {
            this.typeData = typeData.other
          }
        }
      }
    },
    'dataView.qiYeBaseMessForm.userType': {
      immediate: true,
      handler(data) {
        this.navData = this.arrData.filter(i => {
          if (data === 1){
            return i
          } else {
            if (i.id !== 'frdbInfo') {
              return i
            }
          }
        })

      }
    },
    'dataView.qiYeBaseMessForm.zhuTiLeiXing':{
      immediate: true,
      deep: true,
      handler (data) {
        let arrData = JSON.parse(JSON.stringify(this.arrData))
        if(this.dataView.qiYeBaseMessForm.userType !== 1){
          arrData.splice(1, 1)
        }
        if (!data.includes('T')){
          arrData.splice(2, 3)
        }
        this.navData = arrData
      },
    }
  }
}


</script>

<style lang="scss" scoped>
.page-detail{
  width: 100%;
  background: #fff;
  padding-top: 0;
  height: 100%;
  overflow: hidden;
}
.a_links{
  color: red;
  font-weight: bold;
}
.a_links:hover{
  text-decoration: underline;
}
.container {
  width: 100%;
  background: rgba(240, 242, 245, 1);
}
.zzxxDiv {
  background: #fff;
  margin-bottom: 20px;
  li{
    width: 50%;
    float: left;
    height: 54px;
  }
  li:last-child{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    padding-right: 20px;
  }
  .topDiv{
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
.item-info{
  color: #cccccc;
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
  > div:last-child{
    margin-bottom:0;
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
.el-form-item__content .el-textarea__inner{
  width: 100% !important;
}
.el-upload-list__item-name{
  color: #157EDF;
}
</style>
