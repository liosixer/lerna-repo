<template>
  <section class="container page-detail">
    <div class="qyxxglHeader global-title">
      <page-crumb :d="{ breadcrumbList: breadcrumbList }">
        <div slot="btns">
          <template v-if="$store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai === 0 ||$store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai === 3 || $store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai === 4">
            <el-button type="primary" @click="handleSaveEnterpriseInfo(2)" size="small"
            >提交审核</el-button
            >
            <el-button type="primary" @click="handleSaveEnterpriseInfo(1)" size="small"
            >保存</el-button
            >
          </template>
          <template v-if="$store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai === 1">
            <el-button type="primary" @click="handleUpdateData" size="small"
            >撤回</el-button
            >
          </template>
          <template v-if="$store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai === 2">
            <el-button type="primary" @click="handleReturnData" size="small"
            >变更</el-button
            >
          </template>
        </div>
      </page-crumb>
      <!-- <div ref="baseInfo">
        <ul>
          <li>
            <h3>企业基本信息</h3>
          </li>
          <li> -->
            <!-- <el-button
              type="primary"
              @click="handleSaveEnterpriseInfo(2)"
              v-if="baseInfo.user.shenPi_ZhuangTai < 2"
              >提交审核</el-button
            >
            <el-button type="primary" @click="handleReturnData" v-else
              >撤回</el-button
            >
            <el-button type="primary" @click="handleSaveEnterpriseInfo(1)"
              >保存</el-button
            > -->
            <!-- 1.注册成功：【保存】【提交审核】
            2.审核中：【撤回】
            3.审核不通过：【保存】【提交审核】
            4.审核通过：【变更】
            其中 审核中和审核通过后，页面自动不可编辑
            0: 注册成功
            1： 审核中
            2：审核通过
            3：审核未通过
            4： 信息变更
            5： 受力审核中 -->

            <!-- <div class="btn-wrapper">
              <template v-if="$store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai === 0 ||$store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai === 3 || $store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai === 4">
                <el-button type="primary" @click="handleSaveEnterpriseInfo(2)" size="small"
                >提交审核</el-button
                >
                <el-button type="primary" @click="handleSaveEnterpriseInfo(1)" size="small"
                >保存</el-button
                >
              </template>
              <template v-if="$store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai === 1">
                <el-button type="primary" @click="handleUpdateData" size="small"
                >撤回</el-button
                >
              </template>
              <template v-if="$store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai === 2">
                <el-button type="primary" @click="handleReturnData" size="small"
                >变更</el-button
                >
              </template>
            </div> -->
            <!-- {{ baseInfo.jyUser.shenPi_ZhuangTai }} -->
          <!-- </li>
        </ul>
      </div> -->
    </div>
<!--    <div class="qyxxglContent" :class="{fold_content : !foldMemu}">-->
    <div class="qyxxglContent global-content">
      <div class="zhxxDiv" ref="zhxxDiv">
        <h3>账户信息</h3>
        <div class="bottomLine"></div>
        <div style="padding: 20px">
          <el-row class="h_row">
            <el-col :span="12">
              <span class="ztt_label">用户名:</span>
              <span>{{ $store.state.roleAnddepartment.enterPriseInfo.jyUser.accountName }}</span>
            </el-col>
            <el-col :span="12">
              <span class="ztt_label">审核状态:</span>
              <span class="shztSpan">{{
                statusArr[$store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai]
              }}</span>
              <span class="btn_record" @click="hanleViewRecords"
                >查看审核记录</span
              >
            </el-col>
          </el-row>
          <el-row class="h_row">
            <el-col :span="12">
              <span class="ztt_label">注册手机号:</span>
              <span>{{ $store.state.roleAnddepartment.enterPriseInfo.jyUser.user_Phone }}</span>
            </el-col>
            <el-col :span="12">
              <span class="ztt_label">注册时间:</span>
              <span>{{ $store.state.roleAnddepartment.enterPriseInfo.jyUser.create_Time | timestampChange }}</span>
            </el-col>
          </el-row>
        </div>
      </div>
      <el-form
        :model="formData"
        :rules="rules"
        ref="formData"
        label-position="right"
        label-width="120px"
        width="100%"
        size="small"
        :disabled="[1,2].includes($store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai)"
      >
        <div class="item_wrapper" ref="basicInfo">
          <h3>基础信息</h3>
          <div class="bottomLine"></div>
          <div class="item_content">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="用户类别" prop="userLeiBie">
                  <el-radio-group v-model="formData.userLeiBie" :disabled="$store.state.roleAnddepartment.enterPriseInfo.isHasSubmit == 1" @change="handleUserLeibieChange">
                    <el-radio :label="1">企业</el-radio>
                    <el-radio :label="2">自然人</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="企业名称"
                  prop="qiYe_Name"
                  v-if="formData.userLeiBie == 1"
                >
                  <el-input placeholder="请输入" type="text" v-model="formData.qiYe_Name"></el-input>
                </el-form-item>
                <el-form-item
                  label="自然人名称"
                  v-if="formData.userLeiBie == 2"
                  prop="qiYe_Name"
                >
                  <el-input placeholder="请输入" type="text" v-model="formData.qiYe_Name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="交易主体类型" prop="zhuTiLeiXing">
                  <el-checkbox-group v-model="formData.zhuTiLeiXing">
                    <el-checkbox label="T">投标人/供应商</el-checkbox>
                    <el-checkbox label="B">招标人/采购人</el-checkbox>
                    <el-checkbox label="A">招标代理</el-checkbox>
                    <!-- <el-checkbox label="B" v-if="formData.userLeiBie == 2"
                      >采购人/招标人</el-checkbox
                    > -->
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="企业代码类型"
                  v-if="formData.userLeiBie == 1"
                  prop="qiYeBHType"
                >
                  <el-radio-group v-model="formData.qiYeBHType">
                    <el-radio :label="2" :value="2">统一社会信用代码</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item
                  label="证件类型"
                  prop="fddbrShengFenZhengType"
                  v-if="formData.userLeiBie == 2"
                >
                  <el-radio-group v-model="formData.fddbrShengFenZhengType">
                    <el-radio :label="100">居民身份证</el-radio>
                    <!-- <el-radio :label="140" disabled>其他证件</el-radio> -->
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  label="社会信用代码"
                  v-if="formData.userLeiBie == 1"
                  prop="qiYe_BH"
                >
                  <el-input
                    v-model="formData.qiYe_BH"
                    type="text"
                    :disabled="$store.state.roleAnddepartment.enterPriseInfo.isHasSubmit == 1"
                    placeholder="请输入社会信用代码"
                  ></el-input>
                  <p class="item-info">填写社会信用代码，请与营业执照保持一致。</p>
                </el-form-item>
                <el-form-item label="身份证号码" prop="ziRanRenId" v-else>
                  <el-input
                    v-model="formData.ziRanRenId"
                    type="text"
                    placeholder="请输入身份证号码"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="营业执照附件"
                  v-if="formData.userLeiBie == 1"
                  prop="zhiZhao_FuJian_Name"
                >
                  <el-input
                    type="text"
                    style="display:none"
                    placeholder="请输入"
                    v-model="formData.zhiZhao_FuJian"
                  ></el-input>
                  <el-input
                    type="text"
                    style="display:none"
                    v-model="formData.zhiZhao_FuJian_Name"
                  ></el-input>
                  <Uploader
                    action="/upload"
                    @onRemoveFn="handleOnRemoveFnShiZhaoFuJian"
                    :uploadedList="formData.zhiZhao_FuJian ? [{guid:formData.zhiZhao_FuJian, fileName:formData.zhiZhao_FuJian_Name}]:[]"
                    @sucData="handleSucDataShiZhaoFuJian"
                    v-if="loaded"
                  ></Uploader>
                </el-form-item>
                <el-form-item
                  label="证件附件"
                  v-else
                  prop="fddbr_ShenFenZheng_FuJian_Name"
                >
                  <el-input
                    type="text"
                    style="display:none"
                    placeholder="请输入"
                    v-model="formData.fddbr_ShenFenZheng_BH"
                  ></el-input>
                  <el-input
                    type="text"
                    style="display:none"
                    v-model="formData.fddbr_ShenFenZheng_FuJian_Name"
                  ></el-input>
                  <Uploader
                    action="/upload"
                    @onRemoveFn="handleOnRemoveFnFddbrShenFenZhengBH"
                    :uploadedList="formData.fddbr_ShenFenZheng_BH ? [{guid:formData.fddbr_ShenFenZheng_BH, fileName: formData.fddbr_ShenFenZheng_FuJian_Name}]:[]"
                    @sucData="handleSucDataFddbrShenFenZhengBH"
                    v-if="loaded"
                  ></Uploader>
                </el-form-item>
              </el-col>
            </el-row>
            <template v-if="formData.userLeiBie == 1">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="营业范围" prop="yeWuFanWeiIds">
                    <el-input type="text" v-model="formData.yeWuFanWeiIds" placeholder="营业范围"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="注册资金" prop="zhuCe_ZiJin">
                    <el-row :gutter="0">
                      <el-col :span="12"
                        ><div style="padding-right:10px">
                          <el-input
                            type="number"
                            v-model="formData.zhuCe_ZiJin"
                            placeholder="请请输入注册资金"
                          ></el-input></div
                      ></el-col>
                      <el-col :span="6"
                        ><div style="padding-right:10px">
                          <el-select
                            style="width:100%"
                            v-model="formData.zhuCeZiJinDanWei"
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
                            v-model="formData.zhuCeZiJinBiZhong"
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
                    <el-cascader
                      :options="arearOptions"
                      v-model="formData.arear"
                      :separator="' '"
                      ref="areaValue"
                      style="width:100%"
                       placeholder="请选择"
                    ></el-cascader>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="通讯地址" prop="jinYing_DiZhi">
                    <el-input
                      type="text"
                      v-model="formData.jinYing_DiZhi"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="注册地址" prop="zhuCe_DiZhi">
                    <el-input
                      type="text"
                      placeholder="请输入注册地址"
                      v-model="formData.zhuCe_DiZhi"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="注册邀请码" prop="youBian">
                    <el-input
                      type="text"
                      placeholder="请输入注册邀请码"
                      v-model="formData.youBian"
                    ></el-input>
                    <p class="item-info">填写社会信用代码，请与营业执照保持一致。</p>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="联系人" prop="lianXiRen_Name">
                    <el-input
                      placeholder="请输入联系人"
                      v-model="formData.lianXiRen_Name"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系电话" prop="lianXiRen_Phone">
                    <el-input
                      v-model="formData.lianXiRen_Phone"
                      placeholder="请输入联系电话"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="企业电话" prop="qiYePhone">
                    <el-input
                      placeholder="请输入企业电话"
                      v-model="formData.qiYePhone"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="企业邮箱" prop="qiYeEmail">
                    <el-input
                      v-model="formData.qiYeEmail"
                      placeholder="请输入企业邮箱"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="企业传真" prop="qiYeFax">
                    <el-input
                      placeholder="请输入企业传真"
                      v-model="formData.qiYeFax"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="行业分类">
                    <!-- <el-select
                      v-model="formData.qiYeHangYeOne"
                      style="width:100%"
                    >
                      <el-option
                        v-for="i of cat"
                        :key="i.guid"
                        :label="i.hangYeFenLeiName"
                        :value="i.guid"
                      ></el-option>
                    </el-select> -->
<!--                    <el-cascader-->
<!--                      v-model="formData.cat"-->
<!--                      size="small"-->
<!--                      style="width:100%"-->
<!--                      placeholder="请选择行业分类"-->
<!--                      :props="{-->
<!--                        value: 'hangYeFenLeiDaiMa',-->
<!--                        label: 'hangYeFenLeiName'-->
<!--                      }"-->
<!--                      :options="cats"-->
<!--                    ></el-cascader>-->
<!--                    <Tree-->
<!--                            :nodes="businessRange"-->
<!--                            v-if="loaded"-->
<!--                            :showCheckbox="true"-->
<!--                            @setNode="handleSetNodeyeWuFanWei"-->
<!--                            :checkeds="formData.yeWuFanWeiIds? formData.yeWuFanWeiIds.split(','): []"-->
<!--                            v-model="formData.yeWuFanWeiIds"-->
<!--                            treeId="id"-->
<!--                            refName="tree"-->
<!--                            :defaultProps="{ children: 'children', label: 'name' }"-->
<!--                    />-->
                    <Tree
                            :nodes="cats"
                            v-if="loaded && catFlag"
                            :showCheckbox="true"
                            @setNode="handleSetNodeyeWuFanWei"
                            :checkeds="formData.cat"
                            v-model="formData.cat"
                            treeId="hangYeFenLeiDaiMa"
                            refName="hangYeFenLei"
                            :defaultProps="{ children: 'children', label: 'hangYeFenLeiName' }"
                    />
                    <h1>{{formData.cat}}</h1>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="职工人数" prop="zhiGongNum">
                    <el-input
                      placeholder="请输入职工人数"
                      v-model="formData.zhiGongNum"
                      type="text"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="技术人员人数" prop="jiShuRenYuanNum">
                    <el-input
                      v-model="formData.jiShuRenYuanNum"
                      placeholder="请输入技术人员人数 "
                      type="text"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
            <template v-if="formData.userLeiBie == 2">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="营业范围" prop="yeWuFanWeiIds">
<!--                    <Tree-->
<!--                      :nodes="businessRange"-->
<!--                      showCheckbox-->
<!--                      :checkeds="-->
<!--                        formData.yeWuFanWeiIds-->
<!--                          ? formData.yeWuFanWeiIds.split(',')-->
<!--                          : []-->
<!--                      "-->
<!--                      v-model="formData.yeWuFanWeiIds"-->
<!--                      v-if="loaded"-->
<!--                      :defaultProps="{ children: 'children', label: 'name' }"-->
<!--                    />-->
<!--                    &lt;!&ndash; {{ formData.yeWuFanWeiIds }} &ndash;&gt;-->
                    <el-input type="text" v-model="formData.yeWuFanWeiIds" placeholder="营业范围"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所在行政区域" prop="arear">
                    <el-cascader
                      :options="arearOptions"
                      v-model="formData.arear"
                      :separator="' '"
                      ref="areaValue"
                      style="width:100%"
                       placeholder="请选择"
                    ></el-cascader>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="通讯地址" prop="jinYing_DiZhi">
                    <el-input
                      placeholder="请输入通讯地址"
                      v-model="formData.jinYing_DiZhi"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="邮编编码" prop="youBian">
                    <el-input
                      type="text"
                      v-model="formData.youBian"
                      placeholder="请输入邮编编码"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="联系人" prop="lianXiRen_Name">
                    <el-input
                      placeholder="请输入联系人"
                      v-model="formData.lianXiRen_Name"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系电话" prop="lianXiRen_Phone">
                    <el-input
                      v-model="formData.lianXiRen_Phone"
                      placeholder="请输入联系电话"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="自然人邮箱" prop="qiYeEmail">
                    <el-input
                      placeholder="请输入自然人邮箱"
                      v-model="formData.qiYeEmail"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="行业分类" prop="qiYeHangYeOne">
                    <el-cascader
                            v-model="formData.cat"
                            size="small"
                            style="width:100%"
                            placeholder="请选择行业分类"
                            :props="{
                            value: 'hangYeFenLeiDaiMa',
                            label: 'hangYeFenLeiName'
                      }"
                            :options="cats"
                    ></el-cascader>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="是否高新企业">
                  <el-radio-group>
                    <el-radio label="1">是</el-radio>
                    <el-radio label="2">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否小微企业">
                  <el-radio-group>
                    <el-radio label="1">是</el-radio>
                    <el-radio label="2">否</el-radio>
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
                    placeholder="请输入备注"
                    v-model="formData.beiZhu"
                    style="width: 100%"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="item_wrapper" v-if="formData.userLeiBie == 1" ref="frdbInfo">
          <h3>法定代表人信息（负责人信息）</h3>
          <div class="bottomLine"></div>
          <div class="item_content">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="姓名" prop="fddbr_Name">
                  <el-input
                    type="text"
                    v-model="formData.fddbr_Name"
                    placeholder="请输入法定代表人姓名"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证件类型" prop="fddbrShengFenZhengType">
                  <el-radio-group v-model="formData.fddbrShengFenZhengType">
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
                    v-model="formData.fddbr_ShenFenZheng_BH"
                    placeholder="请输入法定代证件号码"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="证件附件"
                  prop="fddbr_ShenFenZheng_FuJian_Name"
                >
                  <el-input
                    type="text"
                    v-model="formData.fddbr_ShenFenZheng_FuJian_Name"
                    style="display:none"
                     placeholder="请输入"
                  ></el-input>
                  <el-input
                    type="text"
                    v-model="formData.fddbr_ShenFenZheng_FuJian"
                    style="display:none"
                     placeholder="请输入"
                  ></el-input>
                  <Uploader
                    action="/upload"
                    v-if="loaded"
                    onRemoveFn="handleonRemoveFnFddbrShenFenZhengFuJian"
                    :uploadedList="formData.fddbr_ShenFenZheng_FuJian? [{guid:formData.fddbr_ShenFenZheng_FuJian, fileName: formData.fddbr_ShenFenZheng_FuJian_Name}]: []"
                    @sucData="handleSucDataFddbrShenFenZhengFuJian"
                  ></Uploader>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
<!--        <div class="item_wrapper" v-if="formData.zhuTiLeiXing.includes('T')" ref="bankInfo">-->
<!--          <h3 >银行信息</h3>-->
<!--          <div class="bottomLine"></div>-->
<!--          <div class="item_content">-->
<!--            <el-row :gutter="20">-->
<!--              <el-col :span="12">-->
<!--                <el-form-item label="开户银行名称" prop="yinHangName">-->
<!--                  <el-input-->
<!--                    type="text"-->
<!--                    placeholder="请输入开户银行名称"-->
<!--                    v-model="formData.yinHangName"-->
<!--                  ></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--              <el-col :span="12">-->
<!--                <el-form-item label="银行账号" prop="yinHangZhangHao"-->
<!--                  ><el-input-->
<!--                    type="text"-->
<!--                    placeholder="请输入开户行账号"-->
<!--                    v-model="formData.yinHangZhangHao"-->
<!--                  ></el-input></el-form-item></el-col-->
<!--            ></el-row>-->
<!--            <el-row :gutter="20">-->
<!--              <el-col :span="12">-->
<!--                <el-form-item label="银行所在地" prop="yinHangAddress">-->
<!--                  <el-input-->
<!--                    v-model="formData.yinHangAddress"-->
<!--                    placeholder="请输入开户行所在地"-->
<!--                  ></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--              <el-col :span="12">-->
<!--                <el-form-item label="开户许可证" prop="yinHang_FuJian_Name">-->
<!--                  <el-input-->
<!--                    type="text"-->
<!--                    style="display: none"-->
<!--                    v-model="formData.yinHang_FuJian_Name"-->
<!--                     placeholder="请输入"-->
<!--                  ></el-input>-->
<!--                  <el-input-->
<!--                    type="text"-->
<!--                    style="display: none"-->
<!--                    v-model="formData.yinHang_FuJian"-->
<!--                     placeholder="请输入"-->
<!--                  ></el-input>-->
<!--                  <Uploader-->
<!--                    action="/upload"-->
<!--                    @onRemoveFn="handleOnRemoveFnYinHangFuJianName"-->
<!--                    :uploadedList="formData.yinHang_FuJian ? [{guid:formData.yinHang_FuJian, fileName:formData.yinHang_FuJian_Name}]:[]"-->
<!--                    @sucData="handleSucDataYinHangFuJianName"-->
<!--                    v-if="loaded"-->
<!--                  ></Uploader>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--          </div>-->
<!--        </div>-->
        <div class="item_wrapper" v-if="formData.zhuTiLeiXing.includes('T')" ref="fbInfo">
          <h3>发票信息</h3>
          <div class="bottomLine"></div>
          <div class="item_content">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="纳税人识别码" prop="naShuiRenShiBieMa">
                  <el-input v-model="formData.naShuiRenShiBieMa" placeholder="请输入纳税人识别码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="地址" prop="fp_ZhuCeAddress">
                      <el-input
                        v-model="formData.fp_ZhuCeAddress"
                        placeholder="请输入地址"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="电话" prop="zhuCe_Phone">
                      <el-input
                        v-model="formData.zhuCe_Phone"
                        placeholder="请输入电话"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="开户行" prop="kaiHuHangName">
                  <el-input
                    v-model="formData.kaiHuHangName"
                    placeholder="请输入开户行名称"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开户行账号" prop="kaiHuHangZhangHao">
                  <el-input v-model="formData.kaiHuHangZhangHao" placeholder="请输入开户行账号"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-form>
      <div class="shjlxxDiv" style="margin-top: 20px" ref="recodList">
        <h3 ref="checkRecord">审核记录</h3>
        <div class="bottomLine"></div>
        <self-table :data="records"
          border
          header-cell-class-name="headercell"
          height="290"
          style="width:100%;margin:0;"
          :fit="true"
        >
          <el-table-column
            type="index"
            label="序号"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="commitTime"
            label="提交时间"
            min-width="150px"
            show-overflow-tooltip
            ><template slot-scope="scope">{{
              scope.row.commitTime | timestampChange
            }}</template></el-table-column
          >
          <el-table-column
            prop="is_shenHe"
            label="操作类型"
            min-width="150px"
            show-overflow-tooltip
            align="center"
          >
            <template slot-scope="scope">
              {{['提交','撤回','审核','审核'][scope.row.is_shenHe]}}
              </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="操作时间"
            min-width="150px"
            show-overflow-tooltip
            ><template slot-scope="scope">{{
              scope.row.createTime | timestampChange
            }}</template></el-table-column
          >
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
            ><template slot-scope="scope">
            {{['提交审核','撤回审核','审核通过','审核不通过'][scope.row.is_shenHe]}}
            </template></el-table-column
          >
          <el-table-column
            prop="shenHeYiJian"
            label="审核意见"
            min-width="150px"
            show-overflow-tooltip
          ></el-table-column>
        </self-table>
      </div>
    </div>
    <AnchorNav :dataArr="navData" wapper=".qyxxglContent" :offsetTop="200" @changeFold="handleChangeFold"></AnchorNav>
  </section>
</template>

<script>
import Uploader from '@/components/Upload'
import Tree from '@/components/tree/Tree'
import PageCrumb from "@/components/PageCrumb"
import bizhong from '@/service/bi'
import AnchorNav from '@/components/AnchorNav/'
import {checkOnlyCode, getSubjectCategory, getBusinessRange, getEnterpriseInfo, saveEnterpriseInfo, chehui, returnData, checkRecords, getCascaderCat } from '@/service/enterpriseInfo'
import Mixin from './mixin'

export default {
  name: 'qyjbexx',
  mixins: [Mixin],
  data () {
    return {
      arrData: [
        {
          name: '基础信息',
          id:'basicInfo'
        },
        {
          name: '法定代表人信息',
          id:'frdbInfo'
        },
        // {
        //   name: '银行信息',
        //   id:'bankInfo'
        // },
        {
          name:'发票信息',
          id: 'fbInfo'
        },
        {
          name: '审核记录',
          id: 'recodList'
        }
      ],
      navData: [],
      breadcrumbList: [
        { label: "首页", link: "/qyxxgl" },
        { label: "交易用户管理", link: "/qyxxgl" },
        { label: "企业基本信息", link: "" }
      ],
      statusArr: ['注册成功', '审核中', '审核通过', '审核未通过', '信息变更中', '受理审核中'],
      moneyType: bizhong,
      formData: {
        provinceName:'',
        cityName: '',
        areaName: '',
        arear: [], //所在行政区域
        ziRanRenId: '', // 自然人身份证号
        userLeiBie: 1, // 用户类别
        userQiYe_Guid: '', //企业guid
        user_Guid: '', //用户guid
        qiYe_Name: '', // 企业名称
        zhuTiLeiXing: ['A'], //交易主体类型  A：招标代理机构   B：采购人/招标人 T：供应商/投标人  例如：页面勾选招标代理机构 和 采购人/招标人  参数为：AB  依次类推
        qiYe_BH: '', //社会信用代码
        zhiZhao_FuJian: '', //营业执照附件guid
        zhiZhao_FuJian_Name: '',//营业执照附件名称
        qiYeBHType: 2, //企业代码类型：1：组织机构代码 2：社会信用代码
        qiYeShuBie: 1, // 企业归属：1:中国电子科技集团内 2：中国电子科技集团外
        neiBu_BH: '', //内部组织编号
        qiYeHangYeOne: '',//企业行业分类
        yeWuFanWeiIds: '', //营业范围ids
        lianXiRen_Name: '', //联系人
        lianXiRen_Phone: '', //联系人电话
        zhuCe_ZiJin: '',	//注册资金
        zhuCeZiJinDanWei: '',//注册资金单位： 1：元   2：万元  3：千元
        zhuCeZiJinBiZhong: '', //参考数据库配置  例如156：人民币
        shengId: '', //所在行政区域-省id
        shiId: '', //所在行政区域-市id
        areaId: '', // 所在行政区域-区id
        jinYing_DiZhi: '', //通讯地址
        zhuCe_DiZhi: '',	//注册地址
        qiYePhone: '', //企业电话
        qiYeEmail: '', // 企业邮箱
        qiYeFax: '', //企业传真
        youBian: '', //企业邮编
        zhiGongNum: '', //职工人数
        jiShuRenYuanNum: '', //技术人员人数
        beiZhu: '', //备注
        fddbr_Name: '',//法定代表人
        fddbrShengFenZhengType: 100,//法定代表人证件类型（100：身份证  140：护照
        fddbr_ShenFenZheng_BH: '', //法定代表人证件号码
        fddbr_ShenFenZheng_FuJian_Name: '', //法定代表人附件名称
        fddbr_ShenFenZheng_FuJian: '',//法定代表人附件guid
        yinHangName: '',//开户银行名称
        yinHangZhangHao: '',//开户银行账号
        yinHangAddress: '',//开户银行所在地
        yinHang_FuJian_Name: '', //开户许可证附件名称
        yinHang_FuJian: '',//开户许可证guid
        naShuiRenShiBieMa: '', //发票纳税人识别码
        fp_ZhuCeAddress: '',	//发票注册地址
        zhuCe_Phone: '',//发票注册电话
        kaiHuHangName: '',//发票开户行
        cat: [],
        kaiHuHangZhangHao: '', //发票开户行账号
        yeWuFanWei:''
      },
      foldMemu: true,
      records: [],
      cats: [],
      arr: [],
      catFlag: false
    }
  },
  components: {
    Uploader,
    Tree,
    PageCrumb,
    AnchorNav
  },
  computed :{
    loaded () {
      return this.$store.state.roleAnddepartment.loaded
    }
  },
  created () {
    // getPCC().then(res => {
    //   this.arearOptions = res
    // })
    this.arr = this.flatten(this.arearOptions)
    this.navData = JSON.parse(JSON.stringify(this.arrData))
    getCascaderCat().then(res => {
      const data = res
      console.log('哈哈哈哈哈')
      data.forEach(i => {
        if (i.children.length) {
          i.children.forEach(j => {
            Reflect.deleteProperty(j, 'children')
          })
        }
      })
      this.catFlag = true
      this.cats = data
    })
    getSubjectCategory().then(res => {
      if (res.code === 1) {
        this.cat = res.data.zhuanYeList
      }
    }).catch(e => {
      console.log(e)
    })
    getBusinessRange().then(res => {
      this.businessRange = res
    })
    this.getPageInfo()
    // 获取审核记录
    checkRecords().then(res => {
      if (res.code === 1) {
        this.records = res.data.shjlList
      }
    })
  },
  methods: {
    handleChangeFold(data) {
      this.foldMemu = data
    },
    handleSetNodeyeWuFanWei(data, text){
      console.log(data)
      console.log(text)
      // this.formData.cat = text.split(',')
      // alert(text)
    },
    getAreaName () {
      const p = this.formData.arear[0]
      const c = this.formData.arear[1]
      const d = this.formData.arear[2]
      this.arr.forEach(e => {
        if (e.value === p) {
          this.formData.provinceName = e.label
        }
        if (e.value === c){
          this.formData.cityName = e.label
        }
        if (e.value === d) {
          this.formData.areaName = e.label
        }
      })
    },
    flatten(data) {
      return data.reduce((arr, {value, label, children = [] }) => arr.concat([{ value, label }], this.flatten(children)), [])
    },
    getPageInfo () {
      const info = this.$store.state.roleAnddepartment.enterPriseInfo
      if (Object.keys(info).length) {
        this.formData = Object.assign(this.formData, info)
      }
    },
    handleUpdateData () {

      this.$confirm('是否确认撤回信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        chehui().then(res => {
          if (res.code === 1) {
            const msg = res.info === '已审核' ? '企业信息已经被审核，不可撤回！' : res.info
            this.$message.success(msg)
            // this.getPageInfo()
            this.$store.dispatch('getEnterpriseInfo')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消撤回'
        })
      })

    },
    handleReturnData () {

      this.$confirm('是否确认变更企业信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        returnData().then(res => {
          if (res.code === 1) {
            this.$message.success(res.info)
            // this.getPageInfo()
            this.$store.dispatch('getEnterpriseInfo')
          }
        }).catch(e => {
          console.error(e)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消变更'
        })
      })

    },
    hanleViewRecords () {
      this.$refs.recodList.scrollIntoView()
    },
    handleSucDataFddbrShenFenZhengBH (data) {
      this.formData.fddbr_ShenFenZheng_BH = data.guid
      this.formData.fddbr_ShenFenZheng_FuJian_Name = data.name
    },
    handleOnRemoveFnFddbrShenFenZhengBH(){
      this.formData.fddbr_ShenFenZheng_BH = ''
      this.formData.fddbr_ShenFenZheng_FuJian_Name = ''
    },
    handleSucDataShiZhaoFuJian (data) {
      this.formData.zhiZhao_FuJian = data.guid
      this.formData.zhiZhao_FuJian_Name = data.name
    },
    handleOnRemoveFnShiZhaoFuJian() {
      this.formData.zhiZhao_FuJian = ''
      this.formData.zhiZhao_FuJian_Name = ''
    },
    handleSucDataFddbrShenFenZhengFuJian (data) {
      this.formData.fddbr_ShenFenZheng_FuJian = data.guid
      this.formData.fddbr_ShenFenZheng_FuJian_Name = data.name
    },
    handleonRemoveFnFddbrShenFenZhengFuJian(){
      this.formData.fddbr_ShenFenZheng_FuJian = ''
      this.formData.fddbr_ShenFenZheng_FuJian_Name = ''
    },
    handleSucDataYinHangFuJianName (data) {
      this.formData.yinHang_FuJian = data.guid
      this.formData.yinHang_FuJian_Name = data.name
    },
    handleOnRemoveFnYinHangFuJianName() {
      this.formData.yinHang_FuJian = ''
      this.formData.yinHang_FuJian_Name = ''
    },
    async handleCheckOnlyCode () {
       return  await checkOnlyCode({qiYe_BH:this.formData.qiYe_BH})
    },
    async handleSaveEnterpriseInfo (flag) {
      if (this.$store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai === 4) {
        const isOnly = await this.handleCheckOnlyCode()
        const a = '<a target="_blank" class="a_links" style="color: red; font-width: bold; padding: 0 10px;" href="https://etp.faw.cn/xxgl/toXinXiDetail?guid=0ae77995-576a-4b65-bec1-0010ce611190">帮助中心</a>'
        if (isOnly.info === '重复') {
          this.$alert(`贵司企业信用账号已被注册，请您前往${a}查看解决办法吧`, '提示', {
            confirmButtonText: '确定',
            dangerouslyUseHTMLString: true
          });
          return
        }
      }
      const url = `/qiye/updateQiYeBaseMess?flag=${flag}`
      let data = JSON.parse(JSON.stringify(this.formData))
      data.zhuTiLeiXing = this.formData.zhuTiLeiXing.map(i => i).join(',')
      data.qiYeHangYeOne = data.cat[0]
      data.qiYeHangYeTwo = data.cat[1]
      this.$refs.formData.validate(v => {
        if (v) {
          saveEnterpriseInfo(url, data).then(res => {
            if (res.code === 1) {
              const msg = flag === 1 ? '详细资料已经保存' : '详细资料已经提交审核，请耐心等待！'
              this.$message.success(msg)
              // this.getPageInfo()
              this.$store.dispatch('getEnterpriseInfo')
            }
          })
        } else {
          this.$message.warning('有表单验证未通过，请检查一些所填表单信息！')
        }
      })
    },
    filterCon (t) {
      this.formData.zhuTiLeiXing = this.formData.zhuTiLeiXing.filter(i => {
        if (i !== t) {
          return i
        }
      })
    }
  },
  watch: {
    'formData.arear': {
      handler (data) {
        if (data) {
          this.formData.shengId = parseInt(data[0])
          this.formData.shiId = parseInt(data[1])
          this.formData.areaId = parseInt(data[2])
          this.getAreaName()
        }
      },
      immediate: true
    },
    '$store.state.roleAnddepartment.enterPriseInfo': {
      handler (data) {
        if (data) {
          this.getPageInfo()
        }
      },
      deep: true,
      immediate: true
    },
    'formData.userLeiBie': {
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
    'formData.zhuTiLeiXing':{
      immediate: true,
      deep: true,
      handler (data) {
        let arrData = JSON.parse(JSON.stringify(this.arrData))
        if(this.formData.userLeiBie !== 1){
          arrData.splice(1, 1)
        }
        if (!data.includes('T')){
          arrData.splice(2, 1)
          arrData.splice(3, 1)
        }
        this.navData = arrData
      },
    }
  }
}

</script>

<style lang="scss" scoped>
  /*.fold_content{*/
  /*  padding-right: 40px !important;*/
  /*}*/
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
.qyxxglHeader .btn-wrapper{
  margin: 0;
}
.btn_record {
  color: #409eff;
  border-radius: 3px;
  padding: 5px 20px;
  border: 1px solid #409eff;
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
  height: 95px;
  line-height: 95px;
  background: #fff;
  div {
    width: calc(100% - 40px);
    height: 40px;
    margin: 0 auto;
    ul {
      overflow: hidden;
      width: 100%;
      height: 100%;
      li {
        float: left;
        width: 50%;
        height: 100%;
        h3 {
          height: 40px;
          color: #000;
          font-size: 16px;
          line-height: 40px;
        }
      }
      li:last-child {
        float: right;
        text-align: right;
        ::v-deep.el-button {
          height: 32px !important;
          line-height: 4px;
        }
      }
    }
  }
  div:first-child {
    color: #404040;
    font-size: 14px;
    line-height: 50px;
    /*margin-top:10px;*/
  }
}
.item-info{
  color: #cccccc;
}
/*主体内容样式*/
.qyxxglContent {
  width: calc(100% - 8px);
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
          line-height: 4px;
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
</style>
