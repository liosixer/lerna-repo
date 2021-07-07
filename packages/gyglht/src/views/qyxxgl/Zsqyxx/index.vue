<template>
  <section class="container page-detail anchor-nav">
    <div class="qyxxglHeader global-title">
      <page-crumb :d="{ breadcrumbList: breadcrumbList }">
        <div slot="btns">
<!--          <el-button size="small">返回</el-button>-->
        </div>
      </page-crumb>
      <!-- <div class="global-title-box">
        <span class="global-title-name">企业完整信息</span>
        <div class="global-title-btns fr">
          <el-button  size="small">返回</el-button>
        </div>
      </div>-->
    </div>
    <div class="qyxxglContent global-content" :class="{ fold_content: !foldMemu }">
      <el-card>
        <div slot="header" class="clearfix">
          <span class="global-card-header-name">账户信息</span>
        </div>
        <div class="global-card-content">
          <el-form label-width="100px" size="small" label-position="right">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="用户名:">
                  <span>{{ baseInfo.jyUser.accountName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="审核状态:">
                  <span class="shztSpan">
                    {{ statusArr[baseInfo.jyUser.shenPi_ZhuangTai] }}
                  </span>
                  <el-button style="margin-left: 10px;" type="primary" plain size="small" @click="hanleViewRecords">查看审核记录</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="注册手机号:">
                  <span>{{ baseInfo.jyUser.user_Phone }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="注册时间:">
                  <span>{{ baseInfo.jyUser.create_Time | timestampChange }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="企业状态:">
                  <span>{{ ["正常", "暂停+时限", "无效"][$store.state.roleAnddepartment.enterPriseInfo.qiYeStatus - 1] }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="CA认证:">
                  <span>{{ $store.state.roleAnddepartment.enterPriseInfo.caRenZhengStatus ? ["未认证", "已认证"][$store.state.roleAnddepartment.enterPriseInfo.caRenZhengStatus] : "未认证" }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!-- </div> -->
      <el-form :model="formData" :rules="rules" ref="formData" label-position="right" label-width="130px" width="100%" size="small" disabled>
        <el-card>
          <div slot="header" class="clearfix" ref="basicInfo">
            <span class="global-card-header-name">基础信息</span>
          </div>
          <div class="global-card-content">
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
                <el-form-item label="企业名称" prop="qiYe_Name" v-if="formData.userLeiBie == 1">
                  <el-input placeholder="请输入" type="text" v-model="formData.qiYe_Name"></el-input>
                </el-form-item>
                <el-form-item label="自然人名称" v-if="formData.userLeiBie == 2" prop="qiYe_Name">
                  <el-input placeholder="请输入" type="text" v-model="formData.qiYe_Name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="交易主体类型" prop="zhuTiLeiXing" @change="handleZhutiLeixing(formData.zhuTiLeiXing)">
                  <el-checkbox-group v-model="formData.zhuTiLeiXing">
                    <el-checkbox label="T">投标人/供应商</el-checkbox>
                    <el-checkbox label="B">招标人/采购人</el-checkbox>
                    <el-checkbox label="A">招标代理</el-checkbox>
                    <!-- <el-checkbox label="B" v-if="formData.userLeiBie == 2"
                        >采购人/招标人</el-checkbox
                    >-->
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="企业代码类型" v-if="formData.userLeiBie == 1" prop="qiYeBHType">
                  <el-radio-group v-model="formData.qiYeBHType">
                    <el-radio :label="2" :value="2">统一社会信用代码</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="证件类型" prop="fddbrShengFenZhengType" v-if="formData.userLeiBie == 2">
                  <el-radio-group v-model="formData.fddbrShengFenZhengType">
                    <el-radio :label="100">居民身份证</el-radio>
                    <!-- <el-radio :label="140" disabled>其他证件</el-radio> -->
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <template v-if="logoType">
              <el-row :gutter="20" v-if="formData.zhuTiLeiXing.includes('B')">
                <el-col :span="12">
                  <el-form-item label="是否深圳市属国企" prop="isShenZhenGuoQi">
                    <el-radio-group v-model="formData.isShenZhenGuoQi">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="企业类型或企业" prop="suoShuQiYeDaiMa">
                    <el-select v-model="formData.suoShuQiYeDaiMa">
                      <el-option v-for="i of typeData" :value="i.code" :key="i.code" :label="i.text"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="社会信用代码" v-if="formData.userLeiBie == 1" prop="qiYe_BH">
                  <el-input v-model="formData.qiYe_BH" type="text" :disabled="$store.state.roleAnddepartment.enterPriseInfo.isHasSubmit == 1" placeholder="请输入社会信用代码"></el-input>
                  <p class="item-info">填写社会信用代码，请与营业执照保持一致。</p>
                </el-form-item>
                <el-form-item label="身份证号码" prop="ziRanRenId" v-else>
                  <el-input v-model="formData.ziRanRenId" type="text" placeholder="请输入身份证号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="营业执照附件" v-if="formData.userLeiBie == 1" prop="zhiZhao_FuJian_Name">
                  <el-input type="text" style="display:none" placeholder="请输入" v-model="formData.zhiZhao_FuJian"></el-input>
                  <el-input type="text" style="display:none" v-model="formData.zhiZhao_FuJian_Name"></el-input>
                  <!-- <Uploader
                    action="/upload"
                    :uploadedList="formData.zhiZhao_FuJian ? [{ guid: formData.zhiZhao_FuJian, fileName: formData.zhiZhao_FuJian_Name }] : []"
                    @sucData="handleSucDataShiZhaoFuJian"
                    v-if="loaded"
                  ></Uploader> -->
                  <p>
                    <a class="el-upload-list__item-name" @click="downloadFile(formData.zhiZhao_FuJian, formData.zhiZhao_FuJian_Name)"
                      ><i class="el-icon-document"></i>{{ formData.zhiZhao_FuJian_Name }}</a
                    >
                  </p>
                </el-form-item>
                <el-form-item label="证件附件" v-else prop="fddbr_ShenFenZheng_FuJian_Name">
                  <el-input type="text" style="display:none" placeholder="请输入" v-model="formData.fddbr_ShenFenZheng_BH"></el-input>
                  <el-input type="text" style="display:none" v-model="formData.fddbr_ShenFenZheng_FuJian_Name"></el-input>
                  <!-- <Uploader
                    action="/upload"
                    @onRemoveFn="handleOnRemoveFnFddbrShenFenZhengBH"
                    :uploadedList="formData.fddbr_ShenFenZheng_BH ? [{ guid: formData.fddbr_ShenFenZheng_BH, fileName: formData.fddbr_ShenFenZheng_FuJian_Name }] : []"
                    @sucData="handleSucDataFddbrShenFenZhengBH"
                    v-if="loaded"
                  ></Uploader> -->
                  <p>
                    <a class="el-upload-list__item-name" @click="downloadFile(formData.fddbr_ShenFenZheng_BH, formData.fddbr_ShenFenZheng_FuJian_Name)"
                      ><i class="el-icon-document"></i>{{ formData.fddbr_ShenFenZheng_FuJian_Name }}</a
                    >
                  </p>
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
                      <el-col :span="12">
                        <div style="padding-right:10px">
                          <el-input type="number" v-model="formData.zhuCe_ZiJin" placeholder="请请输入注册资金"></el-input>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div style="padding-right:10px">
                          <el-select style="width:100%" v-model="formData.zhuCeZiJinDanWei" placeholder="请选择单位">
                            <el-option value="1" label="元"></el-option>
                            <el-option value="2" label="万元"></el-option>
                            <el-option value="3" label="千元"></el-option>
                          </el-select>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div style="padding-right:10px">
                          <el-select style="width:100%" v-model="formData.zhuCeZiJinBiZhong" placeholder="请选择币种">
                            <el-option v-for="i of moneyType" :value="i.huoBiDaiMaNumber" :key="i.guid" :label="i.huoBiDaiMa_Name"></el-option>
                          </el-select>
                        </div>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="所在行政区域" prop="arear">
                    <el-cascader :options="arearOptions" v-model="formData.arear" :separator="' '" ref="areaValue" style="width:100%" placeholder="请选择"></el-cascader>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="通讯地址" prop="jinYing_DiZhi">
                    <el-input type="text" v-model="formData.jinYing_DiZhi" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="注册地址" prop="zhuCe_DiZhi">
                    <el-input type="text" placeholder="请输入注册地址" v-model="formData.zhuCe_DiZhi"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="注册邀请码" prop="zhuCeYaoQingMa" v-if="$store.state.logoType == 1">
                    <el-input type="text" placeholder="请输入注册邀请码" v-model="formData.zhuCeYaoQingMa"></el-input>
                    <p class="item-info">如有注册邀请码，请务必填写，没有则不用填写。</p>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="联系人" prop="lianXiRen_Name">
                    <el-input placeholder="请输入联系人" v-model="formData.lianXiRen_Name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系电话" prop="lianXiRen_Phone">
                    <el-input v-model="formData.lianXiRen_Phone" placeholder="请输入联系电话"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="企业电话" prop="qiYePhone">
                    <el-input placeholder="请输入企业电话" v-model="formData.qiYePhone"></el-input>
                  </el-form-item>
                </el-col>
<!--                <el-col :span="12">-->
<!--                  <el-form-item label="企业邮箱" prop="qiYeEmail">-->
<!--                    <el-input v-model="formData.qiYeEmail" placeholder="请输入企业邮箱"></el-input>-->
<!--                  </el-form-item>-->
<!--                </el-col>-->
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="企业传真" prop="qiYeFax">
                    <el-input placeholder="请输入企业传真" v-model="formData.qiYeFax"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="行业分类">
                    <Tree
                      :nodes="cats"
                      v-if="loaded && catFlag"
                      :showCheckbox="true"
                      :checkeds="typeof formData.qiYeHangYeOne === 'string' ? formData.qiYeHangYeOne.split(',') : formData.qiYeHangYeOne"
                      v-model="formData.qiYeHangYeOne"
                      treeId="hangYeFenLeiDaiMa"
                      nodeKey="hangYeFenLeiDaiMa"
                      refName="hangYeFenLei"
                      :defaultProps="{ children: 'children', label: 'hangYeFenLeiName' }"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="职工人数" prop="zhiGongNum">
                    <el-input placeholder="请输入职工人数" v-model="formData.zhiGongNum" type="text"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="技术人员人数" prop="jiShuRenYuanNum">
                    <el-input v-model="formData.jiShuRenYuanNum" placeholder="请输入技术人员人数 " type="text"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
            <template v-if="formData.userLeiBie == 2">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="营业范围" prop="yeWuFanWeiIds">
                    <el-input type="text" v-model="formData.yeWuFanWeiIds" placeholder="营业范围"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所在行政区域" prop="arear">
                    <el-cascader :options="arearOptions" v-model="formData.arear" :separator="' '" ref="areaValue" style="width:100%" placeholder="请选择"></el-cascader>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="通讯地址" prop="jinYing_DiZhi">
                    <el-input placeholder="请输入通讯地址" v-model="formData.jinYing_DiZhi"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="邮编编码" prop="youBian">
                    <el-input type="text" v-model="formData.youBian" placeholder="请输入邮编编码"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="联系人" prop="lianXiRen_Name">
                    <el-input placeholder="请输入联系人" v-model="formData.lianXiRen_Name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系电话" prop="lianXiRen_Phone">
                    <el-input v-model="formData.lianXiRen_Phone" placeholder="请输入联系电话"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="自然人邮箱" prop="qiYeEmail">
                    <el-input placeholder="请输入自然人邮箱" v-model="formData.qiYeEmail"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="行业分类" prop="qiYeHangYeOne">
                    <Tree
                      :nodes="cats"
                      v-if="loaded && catFlag"
                      :showCheckbox="true"
                      :checkeds="typeof formData.qiYeHangYeOne === 'string' ? formData.qiYeHangYeOne.split(',') : formData.qiYeHangYeOne"
                      v-model="formData.qiYeHangYeOne"
                      treeId="hangYeFenLeiDaiMa"
                      nodeKey="hangYeFenLei"
                      refName="hangYeFenLei"
                      :defaultProps="{ children: 'children', label: 'hangYeFenLeiName' }"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="是否高新企业" prop="isGaoXinQiYe">
                  <el-radio-group v-model="formData.isGaoXinQiYe">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否小微企业" prop="isWeiXiaoQiYe">
                  <el-radio-group v-model="formData.isWeiXiaoQiYe">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注" class="mian">
                  <el-input type="textarea" :rows="4" placeholder="请输入备注" v-model="formData.beiZhu" style="width: 100%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <!-- </div> -->
        <el-card>
          <div slot="header" class="clearfix" ref="frdbInfo">
            <span class="global-card-header-name">法定代表人信息（负责人信息）</span>
          </div>
          <div class="global-card-content" v-if="formData.userLeiBie == 1">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="姓名" prop="fddbr_Name">
                  <el-input type="text" v-model="formData.fddbr_Name" placeholder="请输入法定代表人姓名"></el-input>
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
                  <el-input type="text" v-model="formData.fddbr_ShenFenZheng_BH" placeholder="请输入法定代证件号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证件附件" prop="fddbr_ShenFenZheng_FuJian_Name">
                  <el-input type="text" v-model="formData.fddbr_ShenFenZheng_FuJian_Name" style="display:none" placeholder="请输入"></el-input>
                  <el-input type="text" v-model="formData.fddbr_ShenFenZheng_FuJian" style="display:none" placeholder="请输入"></el-input>
                  <!-- <Uploader
                    action="/upload"
                    v-if="loaded"
                    onRemoveFn="handleonRemoveFnFddbrShenFenZhengFuJian"
                    :uploadedList="formData.fddbr_ShenFenZheng_FuJian ? [{ guid: formData.fddbr_ShenFenZheng_FuJian, fileName: formData.fddbr_ShenFenZheng_FuJian_Name }] : []"
                    @sucData="handleSucDataFddbrShenFenZhengFuJian"
                  ></Uploader> -->
                  <p>
                    <a class="el-upload-list__item-name" @click="downloadFile(formData.fddbr_ShenFenZheng_FuJian, formData.fddbr_ShenFenZheng_FuJian_Name)"
                      ><i class="el-icon-document"></i>{{ formData.fddbr_ShenFenZheng_FuJian_Name }}</a
                    >
                  </p>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <!-- </div> -->
        <el-card v-if="formData.zhuTiLeiXing.includes('T')">
          <div slot="header" class="clearfix" ref="fbInfo">
            <span class="global-card-header-name">发票信息</span>
          </div>
          <div class="global-card-content">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="是否一般纳税人" prop="naShuiRenShiBieMa">
                  <el-radio-group v-model="formData.isYiBanNaShuiRen">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="纳税人识别码" prop="qiYe_BH">
                  <el-input v-model="formData.qiYe_BH" readonly placeholder="请输入纳税人识别码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="地址" prop="fp_ZhuCeAddress">
                  <el-input v-model="formData.fp_ZhuCeAddress" placeholder="请输入地址"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="电话" prop="zhuCe_Phone">
                  <el-input v-model="formData.zhuCe_Phone" placeholder="请输入电话"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="开户行" prop="kaiHuHangName">
                  <el-input v-model="formData.kaiHuHangName" placeholder="请输入开户行名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开户行账号" prop="kaiHuHangZhangHao">
                  <el-input v-model="formData.kaiHuHangZhangHao" placeholder="请输入开户行账号"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <!-- </div> -->
        <el-card v-if="formData.zhuTiLeiXing.includes('T')">
          <div slot="header" class="clearfix" ref="qInfo">
            <span class="global-card-header-name">资质信息</span>
            <el-button size="small" type="primary" @click="handleQualification(null, 0)" style="float:right;">添加</el-button>
          </div>
          <div class="global-card-content" ref="zhiziInfo">
            <self-table :data="qualificationList" border header-cell-class-name="headercell" style="width:100%;margin:0;" :fit="true" max-height="290">
              <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
              <el-table-column prop="ziZhiZhengShuName" label="资质证书名称" min-width="150px" show-overflow-tooltip></el-table-column>
              <el-table-column prop="ziZhiZhengShuBH" label="资质证书编号" min-width="150px" show-overflow-tooltip></el-table-column>
              <el-table-column prop="ziZhiZhengShuJiBie" label="资质证书级别" min-width="150px" show-overflow-tooltip>
                <!-- <template slot-scope="scope">
                  {{ ["初级", "中级", "高级"][scope.row.ziZhiZhengShuJiBie] }}
                </template> -->
              </el-table-column>
              <el-table-column prop="ziZhiZhengShuStartTime" label="资质有效期开始时间" min-width="150px" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{ scope.row.ziZhiZhengShuStartTime | timestampChange }}
                </template>
              </el-table-column>
              <el-table-column prop="ziZhiZhengShuEndTime" label="资质有效期结束时间" min-width="150px" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{ scope.row.ziZhiZhengShuEndTime | timestampChange }}
                </template>
              </el-table-column>
              <el-table-column prop="ziZhiZhengShuFuJianName" label="资质证书附件" min-width="150px" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span class="linkurl" @click="downloadFile(scope.row.ziZhiZhengShuFuJianGuid, scope.row.ziZhiZhengShuFuJianName)">{{ scope.row.ziZhiZhengShuFuJianName }}</span>
                </template>
              </el-table-column>
              <div slot="empty" class="custom-empty"></div>
            </self-table>
          </div>
        </el-card>
        <!-- </div> -->

        <el-card v-if="formData.zhuTiLeiXing.includes('T')">
          <div slot="header" class="clearfix">
            <span class="global-card-header-name">荣誉信息</span>
          </div>
          <div class="global-card-content" ref="honorInfo">
            <self-table :data="rongYuXinXiList" border header-cell-class-name="headercell" style="width:100%;margin:0;" :fit="true" max-height="290px">
              <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
              <el-table-column prop="rongYuName" label="荣誉/奖项名称" min-width="150px" show-overflow-tooltip></el-table-column>
              <el-table-column prop="huoJiangTime" label="获奖时间" min-width="150px" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{ scope.row.huoJiangTime | timestampChange }}
                </template>
              </el-table-column>
              <el-table-column prop="huoJiangDanWei" label="颁奖单位" min-width="150px" show-overflow-tooltip></el-table-column>
              <el-table-column prop="fuJianName" label="获奖证书附件" min-width="150px" show-overflow-tooltip align="right">
                <template slot-scope="scope">
                  <span class="linkurl" @click="downloadFile(scope.row.ziZhiZhengShuFuJianGuid, scope.row.fuJianName)">{{ scope.row.fuJianName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="beiZhu" label="备注" min-width="150px" show-overflow-tooltip align="right"></el-table-column>
              <div slot="empty" class="custom-empty"></div>
            </self-table>
          </div>
        </el-card>
      </el-form>
      <el-card>
        <div slot="header" class="clearfix" ref="recodList">
          <span class="global-card-header-name">审核记录</span>
        </div>
        <div class="global-card-content">
          <self-table :data="records" border header-cell-class-name="headercell" max-height="290" style="width:100%;margin:0;" :fit="true">
            <el-table-column type="index" label="序号" width="80" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="commitTime" label="提交时间" min-width="150px" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.commitTime | timestampChange }}
              </template>
            </el-table-column>
            <el-table-column prop="is_shenHe" label="操作类型" min-width="150px" show-overflow-tooltip>
              <template slot-scope="scope">{{ ["提交", "撤回", "审核", "审核"][scope.row.is_shenHe] }}</template>
            </el-table-column>
            <el-table-column prop="createTime" label="操作时间" min-width="150px" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.createTime | timestampChange }}
              </template>
            </el-table-column>
            <el-table-column prop="shenHeRen" label="操作人" min-width="150px" show-overflow-tooltip></el-table-column>
            <el-table-column prop="is_shenHe" label="操作结果" min-width="150px" show-overflow-tooltip>
              <template slot-scope="scope">
                <span class="status-going" v-if="scope.row.is_shenHe === 0">{{ ["提交审核", "撤回审核", "审核通过", "审核不通过"][scope.row.is_shenHe] }}</span>
                <span class="status-success" v-else-if="scope.row.is_shenHe === 2">{{ ["提交审核", "撤回审核", "审核通过", "审核不通过"][scope.row.is_shenHe] }}</span>
                <span class="status-fail" v-else-if="scope.row.is_shenHe === 3">{{ ["提交审核", "撤回审核", "审核通过", "审核不通过"][scope.row.is_shenHe] }}</span>
                <span class="status-other" v-else>{{ ["提交审核", "撤回审核", "审核通过", "审核不通过"][scope.row.is_shenHe] }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="shenHeYiJian" label="审核意见" min-width="150px" show-overflow-tooltip></el-table-column>
            <div slot="empty" class="custom-empty"></div>
          </self-table>
        </div>
      </el-card>
      <el-card v-if="formData.zhuTiLeiXing.includes('T')">
        <div slot="header" class="clearfix" ref="gysInfo">
          <span class="global-card-header-name">供应商专业申请</span>
          <el-button size="small" type="primary" @click="handleshowPurchaseDailog" v-if="location">添加</el-button>
        </div>
        <div class="global-card-content">
          <self-table :data="formData2.gongYingShangList" border header-cell-class-name="headercell" style="width:100%;margin:0;" :fit="true" max-height="290">
            <el-table-column type="index" label="序号" width="80" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="caiGouDanWei" label="采购单位" min-width="150px" show-overflow-tooltip></el-table-column>
            <el-table-column prop="zhuanYeFenLeiName" label="行业分类" min-width="150px" show-overflow-tooltip></el-table-column>
            <el-table-column prop="shenQiZiLiaoMoBanName" label="申请资料模板下载" min-width="150px" show-overflow-tooltip>
              <template slot-scope="scope">
                <span class="linkurl" @click="downloadFile(scope.row.shenQiZiLiaoMoBanGuid, scope.row.shenQiZiLiaoMoBanName)">{{ scope.row.shenQiZiLiaoMoBanName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="shenQiZiLiaoName" label="申请资料上传" min-width="150px" show-overflow-tooltip>
              <!-- 需要补全guid -->
              <template slot-scope="scope">
                <span class="linkurl" @click="downloadFile(scope.row.shenQiZiLiaoGuid, scope.row.shenQiZiLiaoName)">{{ scope.row.shenQiZiLiaoName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="入库状态" min-width="150px" show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.status !== null">
                  <span class="status-success" v-if="scope.row.status === 2">{{ statusArr2[scope.row.status] }}</span>
                  <span class="status-fail" v-else-if="scope.row.status === 3">{{ statusArr2[scope.row.status] }}</span>
                  <span class="status-going" v-else-if="scope.row.status === 1">{{ statusArr2[scope.row.status] }}</span>
                  <span class="status-other" v-else>{{ statusArr2[scope.row.status] }}</span>
                </div>
                <div v-else>
                  <span class="status-other">未提交</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="isYouXiao" label="是否有效" min-width="150px" show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.status > 1">
                  <span v-if="scope.row.status === 2" class="status-success">有效</span>
                  <span v-else class="status-fail">无效</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" min-width="250" align="center">
              <template slot-scope="scope">
                <el-button-group class="operation-button-group">
                  <el-button type="primary" plain class="operation-button" v-if="scope.row.status == 2 && location" size="mini" @click="handleChangePurchaseStatus(scope.row.guid)">
                    <i class="iconfont icon-biangengguanli">
                      <span>变更</span>
                    </i>
                  </el-button>
                  <el-button type="primary" plain class="operation-button" size="mini" @click="handleEditPurcase(scope.row)" v-if="location && scope.row.status != 2">
                    <i class="iconfont icon-bianji2">
                      <span>编辑</span>
                    </i>
                  </el-button>
                  <el-button type="primary" plain class="operation-button" @click="handleShowRecord(scope.row.guid)" size="mini">
                    <i class="iconfont icon-shenhe">
                      <span>审核记录</span>
                    </i>
                  </el-button>
                  <el-button type="info" plain class="operation-button" size="mini" v-if="scope.row.status == 2 && location">
                    <i class="iconfont icon-shanchu1">
                      <span>删除</span>
                    </i>
                  </el-button>
                </el-button-group>
              </template>
            </el-table-column>
            <div slot="empty" class="custom-empty"></div>
          </self-table>
        </div>
      </el-card>
      <el-card v-if="formData.zhuTiLeiXing.includes('T')">
        <div slot="header" class="clearfix" ref="yjInfo">
          <span class="global-card-header-name">业绩信息</span>
          <el-button size="small" type="primary" @click="handleAddPerformance" v-if="location">添加</el-button>
        </div>
        <div class="global-card-content">
          <self-table :data="formData2.yeJiXinXiList" border header-cell-class-name="headercell" style="width:100%;margin:0;" :fit="true" max-height="290">
            <el-table-column type="index" label="序号" align="center" width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xiangMuName" label="项目名称" min-width="150px" show-overflow-tooltip></el-table-column>
            <el-table-column prop="zhuanYeFenLeiName" label="行业分类" width="150px" show-overflow-tooltip></el-table-column>
            <el-table-column class-name="table-column-money" prop="heTongJinE" label="合同金额（万元）" align="right" width="140" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.heTongJinE / 1000000 }}</template>
            </el-table-column>
            <el-table-column prop="xiangMuEndTime" label="合同签订时间" min-width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.xiangMuEndTime | timestampChange }}
              </template>
            </el-table-column>
            <el-table-column prop="heTongQianDingFang" label="合同签订方" min-width="150px" show-overflow-tooltip></el-table-column>
            <el-table-column prop="heTongQianDingFang" label="项目类型" min-width="150px" show-overflow-tooltip>
              <template slot-scope="scope">{{ ["工程", "物资", "服务"][scope.row.xmLeiXing] }}</template>
            </el-table-column>
            <el-table-column prop="xiangMuHeTongFuJianName" label="合同附件" min-width="150px" show-overflow-tooltip>
              <template slot-scope="scope">
                <span class="linkurl" @click="downloadFile(scope.row.xiangMuHeTongFuJianGuid, scope.row.xiangMuHeTongFuJianName)">{{ scope.row.xiangMuHeTongFuJianName }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column fixed="right" label="操作" min-width="160" align="center">
              <template slot-scope="scope" v-if="location">
                <el-button-group class="operation-button-group">
                  <el-button type="primary" plain class="operation-button" @click="handleEditPerformance(scope.row)" size="mini">
                    <i class="iconfont icon-bianji2">
                      <span>编辑</span>
                    </i>
                  </el-button>
                  <el-button type="info" plain class="operation-button" @click="deletEditPerformance(scope.row.guid)" size="mini">
                    <i class="iconfont icon-shanchu1">
                      <span>删除</span>
                    </i>
                  </el-button>
                </el-button-group>
              </template>
            </el-table-column> -->
            <div slot="empty" class="custom-empty"></div>
          </self-table>
        </div>
      </el-card>
      <el-card>
        <div slot="header" class="clearfix" ref="localInfo">
          <span class="global-card-header-name">本平台项目</span>
        </div>
        <div class="global-card-content">
          <self-table :data="platformProjects" border header-cell-class-name="headercell" style="width:100%;margin:0;" max-height="290" :fit="true">
            <el-table-column type="index" label="序号" width="80" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="gcName" label="项目名称" min-width="150px" show-overflow-tooltip></el-table-column>
            <el-table-column prop="hangYeLeiBie" label="行业类别" min-width="150px" show-overflow-tooltip></el-table-column>
            <el-table-column prop="heTongFuJianName" label="项目合同附件" min-width="150px" show-overflow-tooltip>
              <template slot-scope="scope">
                <span class="linkurl" @click="downloadFile(scope.row.heTongFuJianGuid, scope.row.heTongFuJianName)">{{ scope.row.heTongFuJianName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="zbr" label="采购人/招标人" min-width="150px" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.zbr }}</template>
            </el-table-column>
            <el-table-column prop="xmLeiXing" label="项目类型" min-width="150px" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.zbr }}</template>
            </el-table-column>
            <el-table-column class-name="table-column-money" prop="zhongBiaoJinE" label="中标/成交金额(元)" min-width="150px" show-overflow-tooltip align="right"></el-table-column>
            <el-table-column prop="zhongBiaoTime" label="中标/成交时间" min-width="150px" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.zhongBiaoTime && scope.row.zhongBiaoTime | timestampChange }}</template>
            </el-table-column>
            <el-table-column prop="gongYingShangPingJia" label="供应商评价" min-width="150px" show-overflow-tooltip></el-table-column>
            <div slot="empty" class="custom-empty"></div>
          </self-table>
        </div>
      </el-card>
    </div>
    <preview-dialog ref="previewDialog"></preview-dialog>
    <RecordDailog v-if="showRecordDailog" :records="records" @showRecord="handleShowRecordfn"></RecordDailog>
    <AnchorNav :dataArr="arrData" wapper=".global-content" :offsetTop="0" @changeFold="handleChangeFold"></AnchorNav>
  </section>
</template>

<script>
import Uploader from "@/components/Upload";
import Tree from "@/components/tree/Tree";
import PageCrumb from "@/components/PageCrumb";
import bizhong from "@/service/bi";
import u from "@/utils/util";
import {
  getSubjectCategory,
  getBusinessRange,
  getSubjectRecords,
  getHonorList,
  qList,
  getSupplierInfo,
  getEnterpriseInfo,
  saveEnterpriseInfo,
  chehui,
  returnData,
  checkRecords,
  getCascaderCat,
  getPlatformProjects,
} from "@/service/enterpriseInfo";
import Mixin from "../Qyjbxx/mixin";
import Info from "../Gyszyxx/info";
import AnchorNav from "@/components/AnchorNav/";
import RecordDailog from "../Gyszyxx/dailog/recordDailog.vue";
import TypeData from "../Qyjbxx/typeData";
import previewDialog from "@/components/Preview";
export default {
  name: "qyjbexx",
  mixins: [Mixin],
  data() {
    return {
      showRecordDailog: false,
      arrData: [
        {
          name: "基础信息",
          id: "basicInfo",
        },
        {
          name: "法定代表人信息",
          id: "frdbInfo",
        },
        {
          name: "发票信息",
          id: "fbInfo",
        },
        {
          name: "审核记录",
          id: "recodList",
        },
        {
          name: "资质信息",
          id: "qInfo",
        },
        {
          name: "供应商专业申请",
          id: "gysInfo",
        },
        {
          name: "业绩信息",
          id: "yjInfo",
        },
        {
          name: "本平台项目",
          id: "localInfo",
        },
      ],
      loaded: false,
      rongYuXinXiList: [], // 荣誉列表
      qualificationList: [], // 纸质列表
      breadcrumbList: [
        // { label: "首页", link: "/qyxxgl" },
        { label: "企业完整信息", link: "" },
      ],
      statusArr: ["注册成功", "审核中", "审核通过", "审核未通过", "信息变更中", "受理审核中"],
      moneyType: bizhong,
      formData: {
        isShenZhenGuoQi: 0, // 是否是深圳市属国庆
        isGaoXinQiYe: 1,
        isWeiXiaoQiYe: 0,
        zhuCeYaoQingMa: "",
        provinceName: "",
        isYiBanNaShuiRen: 1,
        cityName: "",
        areaName: "",
        arear: [], //所在行政区域
        ziRanRenId: "", // 自然人身份证号
        userLeiBie: 1, // 用户类别
        userQiYe_Guid: "", //企业guid
        user_Guid: "", //用户guid
        qiYe_Name: "", // 企业名称
        zhuTiLeiXing: ["A"], //交易主体类型  A：招标代理机构   B：采购人/招标人 T：供应商/投标人  例如：页面勾选招标代理机构 和 采购人/招标人  参数为：AB  依次类推
        qiYe_BH: "", //社会信用代码
        zhiZhao_FuJian: "", //营业执照附件guid
        zhiZhao_FuJian_Name: "", //营业执照附件名称
        qiYeBHType: 2, //企业代码类型：1：组织机构代码 2：社会信用代码
        qiYeShuBie: 1, // 企业归属：1:中国电子科技集团内 2：中国电子科技集团外
        neiBu_BH: "", //内部组织编号
        qiYeHangYeOne: "", //企业行业分类
        yeWuFanWeiIds: "", //营业范围ids
        lianXiRen_Name: "", //联系人
        lianXiRen_Phone: "", //联系人电话
        zhuCe_ZiJin: "", //注册资金
        zhuCeZiJinDanWei: "", //注册资金单位： 1：元   2：万元  3：千元
        zhuCeZiJinBiZhong: "", //参考数据库配置  例如156：人民币
        shengId: "", //所在行政区域-省id
        shiId: "", //所在行政区域-市id
        areaId: "", // 所在行政区域-区id
        jinYing_DiZhi: "", //通讯地址
        zhuCe_DiZhi: "", //注册地址
        qiYePhone: "", //企业电话
        qiYeEmail: "", // 企业邮箱
        qiYeFax: "", //企业传真
        youBian: "", //企业邮编
        zhiGongNum: "", //职工人数
        jiShuRenYuanNum: "", //技术人员人数
        beiZhu: "", //备注
        fddbr_Name: "", //法定代表人
        fddbrShengFenZhengType: 100, //法定代表人证件类型（100：身份证  140：护照
        fddbr_ShenFenZheng_BH: "", //法定代表人证件号码
        fddbr_ShenFenZheng_FuJian_Name: "", //法定代表人附件名称
        fddbr_ShenFenZheng_FuJian: "", //法定代表人附件guid
        yinHangName: "", //开户银行名称
        yinHangZhangHao: "", //开户银行账号
        yinHangAddress: "", //开户银行所在地
        yinHang_FuJian_Name: "", //开户许可证附件名称
        yinHang_FuJian: "", //开户许可证guid
        naShuiRenShiBieMa: "", //发票纳税人识别码
        fp_ZhuCeAddress: "", //发票注册地址
        zhuCe_Phone: "", //发票注册电话
        kaiHuHangName: "", //发票开户行
        cat: [],
        kaiHuHangZhangHao: "", //发票开户行账号
        yeWuFanWei: "",
      },
      records: [],
      foldMemu: false,
      catFlag: false,
      cats: [],
      isYouxiao: ["无效", "有效"],
      statusArr2: ["未提交", "审核中", "审核通过", "审核未通过"],
      subjectCat: [], //专业或者行业分类
      platformProjects: [],
      formData2: {
        ziZhiXinXiList: [],
        yeJiXinXiList: [],
        gongYingShangList: [],
      },
      records2: [],
    };
  },
  components: {
    Uploader,
    Tree,
    PageCrumb,
    Info,
    AnchorNav,
    RecordDailog,
    previewDialog,
  },
  computed: {
    editabled() {
      return [0, 3, 4].includes(this.baseInfo.user.shenPi_ZhuangTai);
    },
    location() {
      return this.$route.path === "/qyxxgl/gyszyxx";
    },
    token() {
      return window.sessionStorage.getItem("access_token");
    },
    logoType() {
      return JSON.parse(window.sessionStorage.getItem("vuex")).logoType == 2;
    },
  },
  created() {
    getCascaderCat().then((res) => {
      const data = res;
      data.forEach((i) => {
        if (i.children.length) {
          i.children.forEach((j) => {
            Reflect.deleteProperty(j, "children");
          });
        }
      });
      this.cats = data;
      this.catFlag = true;
    });
    getBusinessRange().then((res) => {
      this.businessRange = res;
    });
    this.getPageInfo();
    // 获取审核记录
    checkRecords().then((res) => {
      if (res.code === 1) {
        this.records = res.data.shjlList;
      }
    });

    this._getInfo();
    // 获取分类信息
    // getSubjectCategory().then(res => {
    //   if (res.code === 1) {
    //     this.subjectCat = res.data.zhuanYeList
    //   }
    // }).catch(e => {
    //   console.error(e)
    // })
    // 获取本平台的项目
    this.getQualificationList();
    this.getHonorList();
    getPlatformProjects()
      .then((res) => {
        if (res.code === 1) {
          this.platformProjects = res.data.rows;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    handleZhutiLeixing(data) {
      if (!data.includes("B")) {
        this.formData.isShenZhenGuoQi = null;
        this.formData.suoShuQiYeDaiMa = "";
      } else {
        this.formData.isShenZhenGuoQi = 0;
      }
    },
    getQualificationList() {
      this.loading = false;
      qList().then((res) => {
        if (res.code === 1) {
          this.qualificationList = res.data.data;
          this.loading = true;
        }
      });
    },
    getHonorList() {
      this.loading2 = false;
      getHonorList().then((res) => {
        if (res.code === 1) {
          this.rongYuXinXiList = res.data.data;
          this.loading2 = true;
        }
      });
    },
    handleShowRecordfn(data) {
      this.showRecordDailog = data;
    },
    handleShowRecord(guid) {
      this.records = [];
      this.showRecordDailog = true;
      getSubjectRecords({ guid })
        .then((res) => {
          if (res.code === 1) {
            this.records = res.data.shjlList;
          }
        })
        .catch((e) => {
          console.error(e);
        });
    },
    _getInfo() {
      getSupplierInfo().then((res) => {
        if (res.code === 1) {
          this.formData2 = Object.assign(this.formData2, res.data);
        }
      });
    },
    handleChangeFold(data) {
      this.foldMemu = data;
    },
    getPageInfo() {
      getEnterpriseInfo()
        .then((res) => {
          if (res.data.data) {
            this.baseInfo = res.data.data;
            const d = JSON.parse(JSON.stringify(res.data.data));
            d.zhuTiLeiXing = d.zhuTiLeiXing ? d.zhuTiLeiXing.split(",") : [];
            if (d.shengId) {
              d.arear = [d.shengId.toString(), d.shiId.toString(), d.areaId.toString()];
            }
            if (d.qiYeBHType == null) {
              d.qiYeBHType = 2;
            }
            // ，默认主题类别
            if (d.userLeiBie == null) {
              d.userLeiBie = 1;
            }
            // 默认币种
            if (d.zhuCeZiJinBiZhong == null) {
              d.zhuCeZiJinBiZhong = "156";
            } else {
              d.zhuCeZiJinBiZhong = d.zhuCeZiJinBiZhong.toString();
            }
            //默认单位
            if (d.zhuCeZiJinDanWei == null) {
              d.zhuCeZiJinDanWei = "2";
            }
            // 默认选择身份证
            if (d.fddbrShengFenZhengType == null) {
              d.fddbrShengFenZhengType = 100;
            }
            // if (d.qiYeHangYeOne === null) {
            //   d.qiYeHangYeOne = []
            // } else {
            //   d.qiYeHangYeOne = d.qiYeHangYeOne.split(',')
            // }

            // alert(d.fddbrShengFenZhengType)
            Object.assign(this.formData, d);
            this.formData.cat = [d.qiYeHangYeOne, d.qiYeHangYeTwo];
            this.loaded = true;
          }
        })
        .catch((e) => {
          console.error(e);
        });
    },
    downloadFile(guid, name) {
      console.log(name);
      const ext = name.substring(name.lastIndexOf(".")).toLowerCase();
      if (ext == ".pdf" || ext == ".png" || ext == ".jpg") {
        this.$refs["previewDialog"].dialogVisible = true;
        this.$refs["previewDialog"].guid = guid;
        this.$refs["previewDialog"].fileName = name;
      } else {
        u.getDownSrc(guid).then((res) => {
          window.location.href = res;
        });
      }
    },
    handleUpdateData() {
      this.$confirm("是否确认撤回信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          chehui().then((res) => {
            if (res.code === 1) {
              this.$message.success(res.info);
              this.getPageInfo();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消撤回",
          });
        });
    },
    handleReturnData() {
      this.$confirm("是否确认变更企业信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          returnData()
            .then((res) => {
              if (res.code === 1) {
                this.$message.success(res.info);
                this.getPageInfo();
              }
            })
            .catch((e) => {
              console.error(e);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消变更",
          });
        });
    },
    hanleViewRecords() {
      this.$refs.recodList.scrollIntoView();
    },
    handleSucDataFddbrShenFenZhengBH(data) {
      this.formData.fddbr_ShenFenZheng_BH = data.guid;
      this.formData.fddbr_ShenFenZheng_FuJian_Name = data.name;
    },
    handleSucDataShiZhaoFuJian(data) {
      this.formData.zhiZhao_FuJian = data.guid;
      this.formData.zhiZhao_FuJian_Name = data.name;
    },
    handleSucDataFddbrShenFenZhengFuJian(data) {
      this.formData.fddbr_ShenFenZheng_FuJian = data.guid;
      this.formData.fddbr_ShenFenZheng_FuJian_Name = data.name;
    },
    handleSucDataYinHangFuJianName(data) {
      this.formData.yinHang_FuJian = data.guid;
      this.formData.yinHang_FuJian_Name = data.name;
    },
    handleSaveEnterpriseInfo(flag) {
      const url = `/qiye/updateQiYeBaseMess?flag=${flag}`;
      let data = JSON.parse(JSON.stringify(this.formData));
      data.zhuTiLeiXing = this.formData.zhuTiLeiXing.map((i) => i).join(",");
      data.qiYeHangYeOne = data.cat[0];
      data.qiYeHangYeTwo = data.cat[1];
      this.$refs.formData.validate((v) => {
        if (v) {
          saveEnterpriseInfo(url, data).then((res) => {
            if (res.code === 1) {
              this.$message.success(res.info);
              this.getPageInfo();
            }
          });
        }
      });
    },
    filterCon(t) {
      this.formData.zhuTiLeiXing = this.formData.zhuTiLeiXing.filter((i) => {
        if (i !== t) {
          return i;
        }
      });
    },
  },
  watch: {
    "formData.isShenZhenGuoQi": {
      immediate: true,
      handler(data) {
        // this.formData.suoShuQiYeDaiMa = ''
        this.typeData = [];
        if (data || data !== null) {
          if (data) {
            this.typeData = TypeData.shenZhen;
          } else {
            this.typeData = TypeData.other;
          }
        }
      },
    },
    "formData.arear": {
      handler(data) {
        if (data) {
          this.formData.shengId = parseInt(data[0]);
          this.formData.shiId = parseInt(data[1]);
          this.formData.areaId = parseInt(data[2]);
        }
      },
    },
    "formData.userLeiBie": {
      immediate: true,
      handler(data) {
        this.navData = this.arrData.filter((i) => {
          if (data === 1) {
            return i;
          } else {
            if (i.id !== "frdbInfo") {
              return i;
            }
          }
        });
      },
    },
    "formData.zhuTiLeiXing": {
      immediate: true,
      deep: true,
      handler(data) {
        let arrData = JSON.parse(JSON.stringify(this.arrData));
        if (this.formData.userLeiBie !== 1) {
          arrData.splice(1, 1);
        }
        if (!data.includes("T")) {
          arrData.splice(2, 1);
          arrData.splice(3, 1);
        }
        this.navData = arrData;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.qyxxglContent .gyszyxxContent {
  margin-bottom: 20px;
  background: none;
}
.container {
  width: 100%;
  background: rgba(240, 242, 245, 1);
}
.fold_content {
  padding-right: 40px !important;
}
.btn_record {
  color: #566df4;
  border-radius: 3px;
  padding: 0px 10px;
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
/*主体内容样式*/
.qyxxglContent {
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
  .yjxxDiv {
    // padding-bottom:
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
.gyszyxxContent {
  /*width: calc(100% - 40px);*/
  // padding-right: 160px;
  // margin: 5PX 4PX; /*no*/
  // padding:20px 19px 20px 19px;
  .bottomLine {
    width: 100%;
    border-bottom: 1px solid #e9e9e9;
  }
  > div {
    width: 100%;
    margin-bottom: 20px;
    padding-bottom: 20px;
    background: #fff;
  }
  .topDiv {
    width: calc(100% - 40px);
    height: 54px;
    margin: 0 auto;
    ul {
      overflow: hidden;
      width: 100%;
      height: 54px;
      li {
        float: left;
        width: 50%;
        height: 54px;
        line-height: 54px;
        h3 {
          color: #333;
          font-size: 16px;
        }
      }
      li:last-child {
        text-align: right;
        ::v-deep.el-button {
          height: 32px !important;
          line-height: 4px;
        }
      }
    }
  }
  ::v-deep.el-table {
    .cell {
      padding: 0 10px;
      font-size: 14px;
    }
    .el-button.del {
      color: #f00;
    }
    .blueBtn {
      color: #409eff;
    }
  }
}
.el-table .cell .linkurl {
  color: cornflowerblue;
  cursor: pointer;
}
.el-table .cell .linkurl:hover {
  text-decoration: underline;
}
.page-crumb {
  .crumb-icon {
    top: 15px;
  }
}
.page-detail {
  // padding-top: 95PX
}
</style>
