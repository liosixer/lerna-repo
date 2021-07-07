<template>
    <section class="container page-detail anchor-nav">
        <div class="warn"
             v-if="$store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai == 0 && $store.state.logoType == 1">
            <img src="../../../assets/warn.png" alt=""/> 您的企业暂未进行认证，无法进行其他操作，认证通过后，您才可以作为登录交易系统进行相关操作
        </div>
        <div class="qyxxglHeader global-title">
            <page-crumb :d="{ breadcrumbList: breadcrumbList }">
                <div slot="btns">
                    <template v-if="$store.state.roleAnddepartment.enterPriseInfo.isBianGeng== 1">
                        <el-button type="primary" @click="handleReturnDataCancle" size="small">取消变更</el-button>
                    </template>
                    <template v-if="
              $store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai === 0 ||
                $store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai === 3 ||
                $store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai === 4
            "
                    >
                        <el-button type="primary" @click="handleSaveEnterpriseInfo(2)" size="small"
                                   v-loading="!canpost">提交审核
                        </el-button>
                        <el-button type="primary" @click="handleSaveEnterpriseInfo(1)" size="small"
                                   v-loading="!canpost">保存
                        </el-button>
                    </template>
                    <template v-if="$store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai === 1">
                        <el-button type="primary" @click="handleUpdateData" size="small">撤回</el-button>
                    </template>
                    <template v-if="$store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai === 2">
                        <el-button type="primary" @click="handleReturnData" size="small">变更</el-button>
                    </template>
                </div>
            </page-crumb>
        </div>
        <div class="global-content qyxx" :class="{ fold_content: !foldMemu }">
            <el-card>
                <div slot="header" class="clearfix">
                    <span class="global-card-header-name">注册信息</span>
                </div>
                <div class="global-card-content">
                    <el-form label-width="100px" size="small" label-position="right">
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="企业用户名:">
                                    <span>{{ $store.state.roleAnddepartment.enterPriseInfo.jyUser.accountName }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="审核状态:">
                  <span style="color:#F56C6C"
                        v-if="$store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai == 3">{{
                    statusArr[$store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai]
                  }}</span>
                                    <span class="shztSpan" v-else>{{ statusArr[$store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai] }}</span>
                                    <el-button style="margin-left: 10px;" type="primary" plain size="small"
                                               @click="hanleViewRecords">查看审核记录
                                    </el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="注册手机号:">
                                    <span>{{ $store.state.roleAnddepartment.enterPriseInfo.jyUser.user_Phone }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="注册时间:">
                                    <span>{{ $store.state.roleAnddepartment.enterPriseInfo.jyUser.create_Time | timestampChange }}</span>
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
                                <el-form-item label="CA认证:" v-if="$store.state.logoType == 1">
                                    <span v-if="caStatus == '未认证'" style="margin-right:20px">{{ caStatus }}</span>
                                    <span v-else style="margin-right:20px">{{ caStatus }}</span>
                                    <el-button type="primary" @click="goToOtherSystem(3)" size="small"
                                               v-if="caStatus == '未认证'"
                                               :disabled="$store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai !== 2"
                                    >认证
                                    </el-button
                                    >
                                    <el-button type="primary" @click="goToOtherSystem(3)" size="small"
                                               v-if="caStatus != '未认证'"
                                               :disabled="$store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai !== 2"
                                    >续期
                                    </el-button
                                    >
                                </el-form-item>
                                <el-form-item label="CA认证:" v-if="$store.state.logoType == 2">
                                    <span>{{ $store.state.roleAnddepartment.enterPriseInfo.caRenZhengStatus ? ["未认证", "已认证"][$store.state.roleAnddepartment.enterPriseInfo.caRenZhengStatus] : "未认证" }}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </el-card>

            <el-form
                    :model="formData"
                    :rules="rules"
                    ref="formData"
                    label-position="right"
                    label-width="140px"
                    width="100%"
                    size="small"
                    :disabled="[1, 2].includes($store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai)"
            >
                <el-card style="margin-top: 15px">
                    <div slot="header" class="clearfix" ref="basicInfo">
                        <span class="global-card-header-name">基础信息</span>
                    </div>
                    <div class="global-card-content">
                        <!-- <el-row :gutter="20">
                          <el-col :span="12">
                            <el-form-item>
                              <span>&nbsp</span>
                            </el-form-item>
                          </el-col>
                          <el-col :span="10">
                            <el-form-item label="集团内部单位编码" v-if="formData.zhuTiLeiXing.indexOf('B') > -1 || formData.zhuTiLeiXing.indexOf('A') > -1" prop="qiYeBH">
                              <el-input placeholder="请输入" type="text" v-model="formData.qiYeBH"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-button size="small" type="primary" @click="getData" v-if="formData.zhuTiLeiXing.indexOf('B') > -1 || formData.zhuTiLeiXing.indexOf('A') > -1">获取数据</el-button>
                        </el-row> -->
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="用户类别" prop="userLeiBie">
                                    <el-radio-group v-model="formData.userLeiBie"
                                                    :disabled="$store.state.roleAnddepartment.enterPriseInfo.isHasSubmit == 1"
                                                    @change="handleUserLeibieChange">
                                        <el-radio :label="1">国内企业</el-radio>
                                        <!-- <el-radio :label="2">自然人</el-radio> -->
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="企业名称" prop="qiYe_Name" v-if="formData.userLeiBie == 1">
                                    <el-input placeholder="请输入" type="text"
                                              v-model="$store.state.roleAnddepartment.enterPriseInfo.qiYe_Name"></el-input>
                                </el-form-item>
                                <el-form-item label="自然人名称" v-if="formData.userLeiBie == 2" prop="qiYe_Name">
                                    <el-input placeholder="请输入" type="text" v-model="formData.qiYe_Name"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="交易主体类型" prop="zhuTiLeiXing">
                                    <el-checkbox-group v-model="formData.zhuTiLeiXing" class="cus-check"
                                                       @change="handleZhutiLeixing(formData.zhuTiLeiXing)">
                                        <el-checkbox label="T">投标人/供应商</el-checkbox>
                                        <el-tooltip placement="top" v-if="$store.state.logoType == 1">
                                            <div slot="content">投标人/供应商可使用投标系统进行投标</div>
                                            <span style="display:inline-block;margin-right:10px"><i class="iconfont icon-bangzhu1"></i></span>
                                        </el-tooltip>
                                        <el-checkbox label="B">招标人/采购人</el-checkbox>
                                        <el-tooltip placement="top" v-if="$store.state.logoType == 1">
                                            <div slot="content">招标人/采购人可通过采购系统进行自主招标及自行采购</div>
                                            <span style="display:inline-block;margin-right:10px"><i class="iconfont icon-bangzhu1"></i></span>
                                        </el-tooltip>
                                        <el-checkbox label="A">招标代理</el-checkbox>
                                        <el-tooltip placement="top" v-if="$store.state.logoType == 1">
                                            <div slot="content">
                                                招标代理可通过采购系统在线代理招标及非招标项目
                                            </div>
                                            <span style="display:inline-block;"><i class="iconfont icon-bangzhu1"></i></span>
                                        </el-tooltip>
                                    </el-checkbox-group>
                                </el-form-item>
                            </el-col>
                            <!-- <el-col :span="12">
                              <el-form-item label="企业代码类型" v-if="formData.userLeiBie == 1" prop="qiYeBHType">
                                <el-radio-group v-model="formData.qiYeBHType">
                                  <el-radio :label="2" :value="2">统一社会信用代码</el-radio>
                                </el-radio-group>
                              </el-form-item>
                              <el-form-item label="证件类型" prop="fddbrShengFenZhengType" v-if="formData.userLeiBie == 2">
                                <el-radio-group v-model="formData.fddbrShengFenZhengType">
                                  <el-radio :label="100">居民身份证</el-radio>
                                  <el-radio :label="140" disabled>其他证件</el-radio>
                                </el-radio-group>
                              </el-form-item>
                            </el-col> -->
                            <el-col :span="12"
                                    v-if="formData.zhuTiLeiXing.indexOf('B') > -1 || formData.zhuTiLeiXing.indexOf('A') > -1">
                                <el-form-item label="注册邀请码" prop="zhuCeYaoQingMa" v-if="$store.state.logoType == 1">
                                    <el-input type="text" placeholder="请输入注册邀请码"
                                              v-model="formData.zhuCeYaoQingMa"></el-input>
                                    <p class="item-info">注册招标人、代理机构请与平台运营机构联系获取邀请码</p>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!--            <template v-if="logoType">-->
                        <!--              <el-row :gutter="20" v-if="formData.zhuTiLeiXing.includes('B')">-->
                        <!--                <el-col :span="12">-->
                        <!--                  <el-form-item label="是否深圳市属国企" prop="isShenZhenGuoQi">-->
                        <!--                    <el-radio-group v-model="formData.isShenZhenGuoQi" @change="changeisShenZhenGuoQi">-->
                        <!--                      <el-radio :label="1">是</el-radio>-->
                        <!--                      <el-radio :label="0">否</el-radio>-->
                        <!--                    </el-radio-group>-->
                        <!--                  </el-form-item>-->
                        <!--                </el-col>-->
                        <!--                <el-col :span="12">-->
                        <!--                  <el-form-item label="企业类型或企业" prop="suoShuQiYeDaiMa">-->
                        <!--                    <el-select v-model="formData.suoShuQiYeDaiMa">-->
                        <!--                      <el-option v-for="i of typeData" :value="i.code" :key="i.code" :label="i.text"></el-option>-->
                        <!--                    </el-select>-->
                        <!--                  </el-form-item>-->
                        <!--                </el-col>-->
                        <!--              </el-row>-->
                        <!--            </template>-->
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <!--                                              type="text" :disabled="qiYeBHDis" placeholder="请输入社会信用代码"></el-input>-->

                                <el-form-item label="社会信用代码" v-if="formData.userLeiBie == 1" prop="qiYe_BH">
                                    <!-- :disabled="$store.state.roleAnddepartment.enterPriseInfo.isHasSubmit == 1" -->
                                    <el-input v-model="$store.state.roleAnddepartment.enterPriseInfo.qiYe_BH"
                                              type="text" :disabled="qiYeBHDis" placeholder="请输入社会信用代码"></el-input>
                                    <!-- <p class="item-info">填写社会信用代码，请与营业执照保持一致。</p> -->
                                </el-form-item>
                                <el-form-item label="身份证号码" prop="ziRanRenId" v-else>
                                    <el-input v-model="formData.ziRanRenId" type="text"
                                              placeholder="请输入身份证号码"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="营业执照附件" v-if="formData.userLeiBie == 1" prop="zhiZhao_FuJian_Name">
                                    <el-input type="text" style="display:none" placeholder="请输入"
                                              v-model="formData.zhiZhao_FuJian"></el-input>
                                    <el-input type="text" style="display:none"
                                              v-model="formData.zhiZhao_FuJian_Name"></el-input>
                                    <Uploader
                                            action="/upload"
                                            @onRemoveFn="handleOnRemoveFnShiZhaoFuJian"
                                            :uploadedList="formData.zhiZhao_FuJian ? [{ guid: formData.zhiZhao_FuJian, fileName: formData.zhiZhao_FuJian_Name }] : []"
                                            @sucData="handleSucDataShiZhaoFuJian"
                                            :acceptType="$store.state.logoType == 1 ? '.jpg,.pdf' : '.jpg,.jpeg,.pdf,.gif,.png'"
                                            v-if="loaded && ![1, 2].includes($store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai)"
                                    >
                                    </Uploader>
                                    <p v-else>
                                        <a class="el-upload-list__item-name"
                                           @click="downloadFile(formData.zhiZhao_FuJian, formData.zhiZhao_FuJian_Name)"
                                        ><i class="el-icon-document"></i>{{ formData.zhiZhao_FuJian_Name }}</a
                                        >
                                    </p>
                                    <span>请上传JPG或PDF格式附件，建议扫描件，大小限制2M。</span>
                                    <!-- <span>请上传扫描件（支持PDF、JPEG、JPG、PNG格式）</span> -->
                                </el-form-item>
                                <el-form-item label="证件附件" v-else prop="fddbr_ShenFenZheng_FuJian_Name">
                                    <el-input type="text" style="display:none" placeholder="请输入"
                                              v-model="formData.fddbr_ShenFenZheng_BH"></el-input>
                                    <el-input type="text" style="display:none"
                                              v-model="formData.fddbr_ShenFenZheng_FuJian_Name"></el-input>
                                    <Uploader
                                            action="/upload"
                                            @onRemoveFn="handleOnRemoveFnFddbrShenFenZhengBH"
                                            :uploadedList="formData.fddbr_ShenFenZheng_BH ? [{ guid: formData.fddbr_ShenFenZheng_BH, fileName: formData.fddbr_ShenFenZheng_FuJian_Name }] : []"
                                            @sucData="handleSucDataFddbrShenFenZhengBH"
                                            :acceptType="$store.state.logoType == 1 ? '.jpg,.pdf' : '.jpg,.jpeg,.pdf,.gif,.png'"
                                            v-if="loaded && ![1, 2].includes($store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai)"
                                    ></Uploader>
                                    <p v-else>
                                        <a class="el-upload-list__item-name"
                                           @click="downloadFile(formData.fddbr_ShenFenZheng_BH, formData.fddbr_ShenFenZheng_FuJian_Name)"
                                        ><i class="el-icon-document"></i>{{ formData.fddbr_ShenFenZheng_FuJian_Name
                                            }}</a
                                        >
                                    </p>
                                    <span>请上传图片或PDF格式附件。</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <template v-if="formData.userLeiBie == 1">
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="营业范围" prop="yeWuFanWeiIds" v-if="$store.state.logoType == 2">
                                        <el-input type="textarea" v-model="formData.yeWuFanWeiIds"
                                                  placeholder="营业范围"></el-input>
                                    </el-form-item>
                                    <el-form-item label="营业范围" :prop="formData.userLeiBie == 2 ? '' : 'yeWuFanWeiIds'"
                                                  v-if="$store.state.logoType == 1">
                                        <el-input type="text" v-model="formData.yeWuFanWeiIds"
                                                  placeholder="营业范围"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="注册资金" prop="zhuCe_ZiJin">
                                        <el-row :gutter="0">
                                            <el-col :span="12"
                                            >
                                                <div style="padding-right:10px">
                                                    <el-input v-model="formData.zhuCe_ZiJin"
                                                              placeholder="请请输入注册资金"></el-input>
                                                </div
                                                >
                                            </el-col>
                                            <el-col :span="6"
                                            >
                                                <div style="padding-right:10px">
                                                    <el-select disabled="" style="width:100%"
                                                               v-model="formData.zhuCeZiJinDanWei" placeholder="请选择单位">
                                                        <el-option value="2" label="万元"></el-option>
                                                    </el-select>
                                                </div
                                                >
                                            </el-col>
                                            <el-col :span="6"
                                            >
                                                <div style="padding-right:10px">
                                                    <el-select style="width:100%" v-model="formData.zhuCeZiJinBiZhong"
                                                               placeholder="请选择币种" disabled="">
                                                        <el-option value="156" label="人民币"></el-option>
                                                        <!-- <el-option v-for="i of moneyType" :value="i.huoBiDaiMaNumber" :key="i.guid" :label="i.huoBiDaiMa_Name"></el-option> -->
                                                    </el-select>
                                                </div>
                                            </el-col
                                            >
                                        </el-row>
                                        <span>若为外币，请折算为人民币录入</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="行业分类" prop="qiYeHangYeOne">
                                        <Tree
                                                :nodes="cats"
                                                v-if="loaded && catFlag"
                                                :showCheckbox="true"
                                                fullPath
                                                :checkeds="typeof formData.qiYeHangYeOne === 'string' ? formData.qiYeHangYeOne.split(',') : formData.qiYeHangYeOne"
                                                v-model="formData.qiYeHangYeOne"
                                                treeId="hangYeFenLeiDaiMa"
                                                nodeKey="hangYeFenLeiDaiMa"
                                                refName="hangYeFenLei"
                                                :defaultProps="{ children: 'children', label: 'hangYeFenLeiName' }"
                                        />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="所在行政区域" prop="arear">
                                        <el-cascader :options="arearOptions" v-model="formData.arear" :separator="' '"
                                                     ref="areaValue" style="width:100%" placeholder="请选择"></el-cascader>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="通讯地址" prop="jinYing_DiZhi">
                                        <el-input type="text" v-model="formData.jinYing_DiZhi"
                                                  placeholder="请输入"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="注册地址" prop="zhuCe_DiZhi">
                                        <el-input type="text" placeholder="请输入注册地址"
                                                  v-model="formData.zhuCe_DiZhi"></el-input>
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
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="企业电话" prop="qiYePhone">
                                        <el-input placeholder="请输入企业电话" v-model="formData.qiYePhone"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="企业传真" prop="qiYeFax">
                                        <el-input placeholder="请输入企业传真" v-model="formData.qiYeFax"></el-input>
                                    </el-form-item>
                                </el-col>
                                <!-- <el-col :span="12">
                                  <el-form-item label="企业邮箱" prop="qiYeEmail">
                                    <el-input v-model="formData.qiYeEmail" placeholder="请输入企业邮箱"></el-input>
                                  </el-form-item>
                                </el-col> -->
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="职工人数" prop="zhiGongNum">
                                        <el-input placeholder="请输入职工人数" v-model="formData.zhiGongNum"
                                                  type="text"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="技术人员人数" prop="jiShuRenYuanNum">
                                        <el-input v-model="formData.jiShuRenYuanNum" placeholder="请输入技术人员人数 "
                                                  type="text"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </template>
                        <template v-if="formData.userLeiBie == 2">
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="营业范围" prop="yeWuFanWeiIds" v-if="$store.state.logoType == 2">
                                        <el-input type="textarea" v-model="formData.yeWuFanWeiIds"
                                                  placeholder="营业范围"></el-input>
                                    </el-form-item>
                                    <el-form-item label="营业范围" :prop="formData.userLeiBie == 2 ? '' : 'yeWuFanWeiIds'"
                                                  v-if="$store.state.logoType == 1">
                                        <el-input type="text" v-model="formData.yeWuFanWeiIds"
                                                  placeholder="营业范围"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="行业分类" prop="qiYeHangYeOne">
                                        <Tree
                                                :nodes="cats"
                                                v-if="loaded && catFlag"
                                                :showCheckbox="true"
                                                fullPath
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
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="所在行政区域" prop="arear">
                                        <el-cascader :options="arearOptions" v-model="formData.arear" :separator="' '"
                                                     ref="areaValue" style="width:100%" placeholder="请选择"></el-cascader>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="通讯地址" prop="jinYing_DiZhi">
                                        <el-input placeholder="请输入通讯地址" v-model="formData.jinYing_DiZhi"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="邮编编码" prop="youBian">
                                        <el-input type="text" v-model="formData.youBian"
                                                  placeholder="请输入邮编编码"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="紧急联系人" prop="lianXiRen_Name">
                                        <el-input placeholder="请输入联系人" v-model="formData.lianXiRen_Name"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="联系电话" prop="lianXiRen_Phone">
                                        <el-input v-model="formData.lianXiRen_Phone" placeholder="请输入联系电话"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="自然人邮箱" prop="qiYeEmail" :rules="validate.vdRequired()">
                                        <el-input placeholder="请输入自然人邮箱" v-model="formData.qiYeEmail"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
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
                        </template>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="备注" class="mian">
                                    <el-input type="textarea" :rows="4" placeholder="请输入备注" v-model="formData.beiZhu"
                                              style="width: 100%"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
                <!-- </div> -->
                <el-card>
                    <div slot="header" class="clearfix" ref="frdbInfo">
                        <span class="global-card-header-name">法人代表（负责人信息）</span>
                    </div>
                    <div class="global-card-content" v-if="formData.userLeiBie == 1">
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="姓名" prop="fddbr_Name">
                                    <el-input type="text" v-model="formData.fddbr_Name"
                                              placeholder="请输入法定代表人姓名"></el-input>
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
                                    <el-input type="text" v-model="formData.fddbr_ShenFenZheng_BH"
                                              placeholder="请输入法定代证件号码"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="证件附件" prop="fddbr_ShenFenZheng_FuJian_Name">
                                    <el-input type="text" v-model="formData.fddbr_ShenFenZheng_FuJian_Name"
                                              style="display:none" placeholder="请输入"></el-input>
                                    <el-input type="text" v-model="formData.fddbr_ShenFenZheng_FuJian"
                                              style="display:none" placeholder="请输入"></el-input>
                                    <Uploader
                                            action="/upload"
                                            v-if="loaded && ![1, 2].includes($store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai)"
                                            onRemoveFn="handleonRemoveFnFddbrShenFenZhengFuJian"
                                            :uploadedList="formData.fddbr_ShenFenZheng_FuJian ? [{ guid: formData.fddbr_ShenFenZheng_FuJian, fileName: formData.fddbr_ShenFenZheng_FuJian_Name }] : []"
                                            @sucData="handleSucDataFddbrShenFenZhengFuJian"
                                            :acceptType="$store.state.logoType == 1 ? '.jpg,.pdf' : '.jpg,.jpeg,.pdf,.gif,.png'"
                                    ></Uploader>
                                    <p v-else>
                                        <a class="el-upload-list__item-name"
                                           @click="downloadFile(formData.fddbr_ShenFenZheng_FuJian, formData.fddbr_ShenFenZheng_FuJian_Name)"
                                        ><i class="el-icon-document"></i>{{ formData.fddbr_ShenFenZheng_FuJian_Name
                                            }}</a
                                        >
                                    </p>
                                    <span style="color:red;font-weight:700;">身份证正反面彩色扫描件请扫描成一个文件上传</span>
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
                                <el-form-item label="是否一般纳税人"
                                              :prop="formData.userLeiBie == 2 ? '' : 'isYiBanNaShuiRen'">
                                    <el-radio-group v-model="formData.isYiBanNaShuiRen">
                                        <el-radio :label="1">是</el-radio>
                                        <el-radio :label="0">否</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="纳税人识别码" :prop="formData.userLeiBie == 2 ? '' : 'qiYe_BH'">
                                    <el-input v-model="$store.state.roleAnddepartment.enterPriseInfo.qiYe_BH" disabled
                                              placeholder="请输入纳税人识别码"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="地址" :prop="formData.userLeiBie == 2 ? '' : 'fp_ZhuCeAddress'">
                                    <el-input v-model="formData.fp_ZhuCeAddress" placeholder="请输入地址"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :label="$store.state.logoType == 1 ? '企业座机' : '电话'"
                                              :prop="formData.userLeiBie == 2 ? '' : 'zhuCe_Phone'">
                                    <el-input v-model="formData.zhuCe_Phone" placeholder="请输入电话"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="开户行" :prop="formData.userLeiBie == 2 ? '' : 'kaiHuHangName'">
                                    <el-input v-model="formData.kaiHuHangName" placeholder="请输入开户行名称"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="开户行账号" :prop="formData.userLeiBie == 2 ? '' : 'kaiHuHangZhangHao'">
                                    <el-input v-model="formData.kaiHuHangZhangHao" placeholder="请输入开户行账号"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
                <!-- </div> -->
                <el-card v-if="formData.zhuTiLeiXing.includes('T')">
                    <div slot="header" class="clearfix" ref="zhiziInfo">
                        <span class="global-card-header-name">资质信息</span>
                        <el-button size="small" type="primary" @click="handleQualification(null, 0)"
                                   style="float:right;">添加
                        </el-button>
                    </div>
                    <div class="global-card-content">
                        <self-table :data="qualificationList" border header-cell-class-name="headercell"
                                    style="width:100%;margin:0;" :fit="true" max-height="290">
                            <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
                            <el-table-column prop="ziZhiZhengShuName" label="资质证书名称" min-width="150px"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="ziZhiZhengShuBH" label="资质证书编号" min-width="150px"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="ziZhiZhengShuJiBie" label="资质证书级别" min-width="150px"
                                             show-overflow-tooltip>
                                <!-- <template slot-scope="scope">{{ ["初级", "中级", "高级"][scope.row.ziZhiZhengShuJiBie] }}</template> -->
                            </el-table-column>
                            <el-table-column prop="ziZhiZhengShuStartTime" label="资质有效期开始时间" min-width="150px"
                                             show-overflow-tooltip>
                                <template slot-scope="scope">{{ scope.row.ziZhiZhengShuStartTime | timestampChange }}
                                </template>
                            </el-table-column
                            >
                            <el-table-column prop="ziZhiZhengShuEndTime" label="资质有效期结束时间" min-width="150px"
                                             show-overflow-tooltip>
                                <template slot-scope="scope">{{ scope.row.ziZhiZhengShuEndTime | timestampChange }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="ziZhiZhengShuFuJianName" label="资质证书附件" min-width="150px"
                                             show-overflow-tooltip
                            >
                                <template slot-scope="scope"
                                ><span class="linkurl"
                                       @click="downloadFile(scope.row.ziZhiZhengShuFuJianGuid, scope.row.ziZhiZhengShuFuJianName)">{{ scope.row.ziZhiZhengShuFuJianName }}</span>
                                </template
                                >
                            </el-table-column
                            >
                            <el-table-column fixed="right" label="操作" min-width="160" align="left">
                                <template slot-scope="scope">
                                    <el-button-group class="operation-button-group">
                                        <el-button type="primary" plain class="operation-button" size="mini"
                                                   @click="handleQualification(scope.row)"
                                        ><i class="iconfont icon-bianji2"><span>编辑</span></i></el-button
                                        >
                                        <el-button type="info" plain class="operation-button" size="mini"
                                                   @click="handleDelQualifications(scope.row.guid)"
                                        ><i class="iconfont icon-shanchu1"><span>删除</span></i></el-button
                                        >
                                    </el-button-group>
                                </template>
                            </el-table-column>
                            <div slot="empty" class="custom-empty"></div>
                        </self-table>
                    </div>
                </el-card>
                <!-- </div> -->

                <el-card v-if="formData.zhuTiLeiXing.includes('T')">
                    <div slot="header" class="clearfix" ref="honorInfo">
                        <span class="global-card-header-name">荣誉信息</span>
                        <el-button size="small" type="primary" @click="handleAddHonor" style="float:right;">添加
                        </el-button>
                    </div>
                    <div class="global-card-content">
                        <self-table :data="rongYuXinXiList" border header-cell-class-name="headercell"
                                    style="width:100%;margin:0;" :fit="true" max-height="290px">
                            <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
                            <el-table-column prop="rongYuName" label="荣誉/奖项名称" min-width="150px"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="huoJiangTime" label="获奖时间" min-width="150px" show-overflow-tooltip>
                                <template slot-scope="scope">{{ scope.row.huoJiangTime | timestampChange }}</template>
                            </el-table-column>
                            <el-table-column prop="huoJiangDanWei" label="颁奖单位" min-width="150px"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="fuJianName" label="获奖证书附件" min-width="150px" show-overflow-tooltip
                                             align="right">
                                <template slot-scope="scope">
                                    <span class="linkurl"
                                          @click="downloadFile(scope.row.fuJianGuid, scope.row.fuJianName)">{{ scope.row.fuJianName }}</span>
                                </template>
                            </el-table-column
                            >
                            <el-table-column prop="beiZhu" label="备注" min-width="150px" show-overflow-tooltip
                                             align="right"></el-table-column>
                            <el-table-column fixed="right" label="操作" min-width="160" align="left">
                                <template slot-scope="scope">
                                    <el-button-group class="operation-button-group">
                                        <el-button type="primary" plain class="operation-button" size="mini"
                                                   @click="handleEditHonor(scope.row)"
                                        ><i class="iconfont icon-bianji2"><span>编辑</span></i></el-button
                                        >
                                        <el-button type="info" plain class="operation-button" size="mini"
                                                   @click="handleDeleteHonor(scope.row.guid)"
                                        ><i class="iconfont icon-shanchu1"><span>删除</span></i></el-button
                                        >
                                    </el-button-group>
                                </template>
                            </el-table-column>
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
                    <self-table :data="records" border header-cell-class-name="headercell" style="width:100%;margin:0;"
                                :fit="true" max-height="290">
                        <el-table-column type="index" label="序号" width="80" show-overflow-tooltip
                                         align="center"></el-table-column>
                        <el-table-column prop="commitTime" label="提交时间" min-width="150px" show-overflow-tooltip
                        >
                            <template slot-scope="scope">{{ scope.row.commitTime | timestampChange }}</template>
                        </el-table-column
                        >
                        <el-table-column prop="is_shenHe" label="操作类型" min-width="150px" show-overflow-tooltip
                                         align="center">
                            <template slot-scope="scope">
                                {{ ["提交", "撤回", "审核", "审核"][scope.row.is_shenHe] }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="createTime" label="操作时间" min-width="150px" show-overflow-tooltip
                        >
                            <template slot-scope="scope">{{ scope.row.createTime | timestampChange }}</template>
                        </el-table-column
                        >
                        <el-table-column prop="shenHeRen" label="操作人" min-width="150px" show-overflow-tooltip
                                         align="left" v-if="$store.state.logoType == 2"></el-table-column>
                        <el-table-column prop="is_shenHe" label="操作结果" min-width="150px" show-overflow-tooltip
                        >
                            <template slot-scope="scope">
                                <span class="status-going" v-if="scope.row.is_shenHe === 0">{{ ["提交审核", "撤回审核", "审核通过", "审核不通过"][scope.row.is_shenHe] }}</span>
                                <span class="status-success" v-else-if="scope.row.is_shenHe === 2">{{ ["提交审核", "撤回审核", "审核通过", "审核不通过"][scope.row.is_shenHe] }}</span>
                                <span class="status-fail" v-else-if="scope.row.is_shenHe === 3">{{ ["提交审核", "撤回审核", "审核通过", "审核不通过"][scope.row.is_shenHe] }}</span>
                                <span class="status-other" v-else>{{ ["提交审核", "撤回审核", "审核通过", "审核不通过"][scope.row.is_shenHe] }}</span>
                            </template>
                        </el-table-column
                        >
                        <el-table-column prop="shenHeYiJian" label="审核意见" min-width="150px"
                                         show-overflow-tooltip></el-table-column>
                        <div slot="empty" class="custom-empty"></div>
                        <div slot="empty" class="custom-empty"></div>
                    </self-table>
                </div>
            </el-card>
        </div>

        <preview-dialog ref="previewDialog"></preview-dialog>
        <AnchorNav :dataArr="navData" wapper=".global-content" :offsetTop="0"
                   @changeFold="handleChangeFold"></AnchorNav>
        <HonorDialog @onHonorClose="handleOnHonorClose" v-if="showHonorDialog" :hData="hData"
                     @onHonorSuccess="handleOnHonorSuccess"></HonorDialog>
        <QualificationsDailog @uploadQualification="handleUploadQualification" @onClose="handleOnClose" :qData="qData"
                              v-if="showDialogVisible"></QualificationsDailog>
    </section>
</template>

<script>
    import Uploader from "@/components/Upload";
    import Tree from "@/components/tree/Tree";
    import PageCrumb from "@/components/PageCrumb";
    import bizhong from "@/service/bi";
    import AnchorNav from "@/components/AnchorNav/";
    import HonorDialog from "./honor";
    import previewDialog from "@/components/Preview";
    import u from "@/utils/util";
    import axios from "axios";
    import QualificationsDailog from "../Gyszyxx/dailog/qualificationsDailog";
    import {
        checkOnlyCode,
        getSupplierInfo,
        getHonorList,
        deleteHonor,
        qList,
        getBusinessRange,
        delQualifications,
        saveEnterpriseInfo,
        chehui,
        returnData,
        checkRecords,
        getCascaderCat,
        queryCAInfo,
        returnDataCancle
    } from "@/service/enterpriseInfo";
    import config from "@/config/config";
    import Mixin from "./mixin";
    import TypeData from "./typeData";

    export default {
        name: "qyjbexx",
        mixins: [Mixin],
        data() {
            const regDev = RegExp(/development/);
            return {
                loading2: false,
                caStatus: "",
                arrData: [
                    {
                        name: "基础信息",
                        id: "basicInfo",
                    },
                    {
                        name: "法人代表",
                        id: "frdbInfo",
                    },

                    {
                        name: "发票信息",
                        id: "fbInfo",
                    },
                    {
                        name: "资质信息",
                        id: "zhiziInfo",
                    },
                    {
                        name: "荣誉信息",
                        id: "honorInfo",
                    },
                    {
                        name: "审核记录",
                        id: "recodList",
                    },
                ],
                hData: null,
                navData: [],
                canpost: true,
                breadcrumbList: [
                    // { label: "首页", link: "/qyxxgl" },
                    {label: "企业基本信息", link: ""},
                ],
                statusArr: ["未提交", "审核中", "审核通过", "审核未通过", "信息变更中", "受理审核中"],
                moneyType: bizhong,
                rongYuXinXiList: [], // 荣誉列表
                qualificationList: [], // 纸质列表
                typeData: [],
                formData: {
                    isShenZhenGuoQi: 0, // 是否是深圳市属国庆
                    suoShuQiYeDaiMa: "",
                    isGaoXinQiYe: 0,
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
                foldMemu: false,
                records: [],
                cats: [],
                arr: [],
                catFlag: false,
                aData: {},
                showDialogVisible: false,
                qData: [],
                showHonorDialog: false,
                loading: true,
                qiYeBHDis: true//企业编号是否可以编辑（只要审核通过一次就不可编辑）
            };
        },
        components: {
            Uploader,
            Tree,
            PageCrumb,
            AnchorNav,
            QualificationsDailog,
            HonorDialog,
            previewDialog,
        },
        computed: {
            loaded() {
                return this.$store.state.roleAnddepartment.loaded;
            },
            // typeData () {
            //   if (this.formData.isShenZhenGuoQi) {
            //     return TypeData.shenZhen
            //   }
            //   return TypeData.other
            // }
            logoType() {
                return JSON.parse(window.sessionStorage.getItem("vuex")).logoType == 2;
            },
        },
        created() {
            this.arr = this.flatten(this.arearOptions);
            this.navData = JSON.parse(JSON.stringify(this.arrData));
            getCascaderCat().then((res) => {//查行业分类
                const data = res;
                data.forEach((i) => {
                    if (i.children.length) {
                        i.children.forEach((j) => {
                            Reflect.deleteProperty(j, "children");
                        });
                    }
                });
                this.catFlag = true;
                this.cats = data;
            });
            this.getQualificationList();//查询资质信息列表
            this.getHonorList();//查询荣誉信息列表
            // getBusinessRange().then((res) => {
            //     this.businessRange = res;
            // });
            this.getPageInfo()//查询store已存入的基本信息
            checkRecords().then((res) => {// 获取审核记录
                if (res.code === 1) {
                    this.records = res.data.shjlList;
                    const flag = this.records.some(v => v.is_shenHe == 2)
                    this.qiYeBHDis = flag
                }
            });
            this.getCaInfo()//ca认证情况
        },
        methods: {
            getCaInfo() {
                queryCAInfo({qiYeBH: this.$store.state.roleAnddepartment.enterPriseInfo.jyUser.qiyeBH}).then((res) => {
                    if (res.code) {
                        this.caStatus = res.data.caStatus;
                    }
                });
            },
            handleZhutiLeixing(data) {
                if (!data.includes("B")) {
                    this.formData.isShenZhenGuoQi = null;
                    this.formData.suoShuQiYeDaiMa = "";
                } else {
                    this.formData.isShenZhenGuoQi = 0;
                }
            },
            downloadFile(guid, name) {
                const ext = name.substring(name.lastIndexOf(".")).toLowerCase();
                if (ext == ".pdf" || ext == ".png" || ext == ".jpg") {
                    this.$refs["previewDialog"].dialogVisible = true;
                    this.$refs["previewDialog"].guid = guid;
                    this.$refs["previewDialog"].fileName = name;
                    console.log(guid, name);
                } else {
                    u.getDownSrc(guid).then((res) => {
                        console.log(res);
                        window.location.href = res;
                    });
                }
            },
            handleOnHonorSuccess() {
                this.getHonorList();
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
            changeisShenZhenGuoQi(val) {
                this.formData.suoShuQiYeDaiMa = "";
                this.typeData = [];
                if (val || val !== null) {
                    if (val) {
                        this.typeData = TypeData.shenZhen;
                    } else {
                        this.typeData = TypeData.other;
                    }
                }
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
            handleAddHonor() {
                this.hData = null;
                this.showHonorDialog = true;
            },
            handleEditHonor(data) {
                this.hData = data;
                this.showHonorDialog = true;
            },
            handleDeleteHonor(guid) {
                deleteHonor({guid})
                    .then((res) => {
                        if (res.code === 1) {
                            this.$message.success(res.info);
                            this.getHonorList();
                        }
                    }).catch((e) => {
                        console.log(e);
                    });
            },
            handleOnHonorClose(data) {
                this.showHonorDialog = data;
                // this.$store.dispatch('getEnterpriseInfo')
            },
            handleDelQualifications(guid) {
                this.$confirm("此操作将永久删除该条记录, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                    .then(() => {
                        delQualifications({guid})
                            .then((res) => {
                                if (res.code === 1) {
                                    this.$message.success("删除成功");
                                    this.getQualificationList();
                                }
                            })
                            .catch((e) => {
                                console.error(e);
                            });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除",
                        });
                    });
            },
            handleOnClose(data) {
                this.showDialogVisible = data;
            },
            handleQualification(data) {
                this.showDialogVisible = true;
                this.qData = data;
            },
            handleUploadQualification(data) {
                this.showQ = false;
                this.getQualificationList();
            },
            handleChangeFold(data) {
                this.foldMemu = data;
            },
            getAreaName() {
                const p = this.formData.arear[0];
                const c = this.formData.arear[1];
                const d = this.formData.arear[2];
                this.arr.forEach((e) => {
                    if (e.value === p) {
                        this.formData.provinceName = e.label;
                    }
                    if (e.value === c) {
                        this.formData.cityName = e.label;
                    }
                    if (e.value === d) {
                        this.formData.areaName = e.label;
                    }
                });
            },
            flatten(data) {
                return data.reduce((arr, {value, label, children = []}) => arr.concat([{
                    value,
                    label
                }], this.flatten(children)), []);
            },
            async getPageInfo() {
                const info = this.$store.state.roleAnddepartment.enterPriseInfo;
                if (Object.keys(info).length) {
                    this.formData = Object.assign(this.formData, info);
                    if (this.formData.isShenZhenGuoQi) {
                        this.typeData = TypeData.shenZhen;
                    } else {
                        this.typeData = TypeData.other;
                    }
                }
                //处理默认
                this.formData.isGaoXinQiYe == null ? (this.formData.isGaoXinQiYe = 0) : "";
                this.formData.isWeiXiaoQiYe == null ? (this.formData.isWeiXiaoQiYe = 0) : "";
                return this.$store.state.roleAnddepartment.enterPriseInfo;
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
                                const msg = res.info === "已审核" ? "企业信息已经被审核，不可撤回！" : res.info;
                                this.$message.success(msg);
                                // this.getPageInfo()
                                this.$store.dispatch("getEnterpriseInfo");
                                checkRecords().then((res) => {
                                    if (res.code === 1) {
                                        this.records = res.data.shjlList;
                                    }
                                });
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
                                    // this.getPageInfo()
                                    this.$store.dispatch("getEnterpriseInfo");
                                    checkRecords().then((res) => {
                                        if (res.code === 1) {
                                            this.records = res.data.shjlList;
                                        }
                                    });
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
            handleReturnDataCancle() {
                returnDataCancle().then((res) => {
                    if (res.code === 1) {
                        this.$message.success(res.info);
                        this.$store.dispatch("getEnterpriseInfo");
                        checkRecords().then((res) => {
                            if (res.code === 1) {
                                this.records = res.data.shjlList;
                            }
                        });
                    }
                })
            },
            hanleViewRecords() {
                this.$refs.recodList.scrollIntoView();
            },
            async getData() {
                if (!this.formData.qiYeBH) {
                    this.$message({
                        type: "info",
                        message: "请输入贵单位的主数据编码!",
                    });
                    return;
                }
                //undo
            },
            handleSucDataFddbrShenFenZhengBH(data) {
                this.formData.fddbr_ShenFenZheng_BH = data.guid;
                this.formData.fddbr_ShenFenZheng_FuJian_Name = data.name;
            },
            handleOnRemoveFnFddbrShenFenZhengBH() {
                this.formData.fddbr_ShenFenZheng_BH = "";
                this.formData.fddbr_ShenFenZheng_FuJian_Name = "";
            },
            handleSucDataShiZhaoFuJian(data) {
                this.formData.zhiZhao_FuJian = data.guid;
                this.formData.zhiZhao_FuJian_Name = data.name;
            },
            handleOnRemoveFnShiZhaoFuJian() {
                this.formData.zhiZhao_FuJian = "";
                this.formData.zhiZhao_FuJian_Name = "";
            },
            handleSucDataFddbrShenFenZhengFuJian(data) {
                this.formData.fddbr_ShenFenZheng_FuJian = data.guid;
                this.formData.fddbr_ShenFenZheng_FuJian_Name = data.name;
            },
            handleonRemoveFnFddbrShenFenZhengFuJian() {
                this.formData.fddbr_ShenFenZheng_FuJian = "";
                this.formData.fddbr_ShenFenZheng_FuJian_Name = "";
            },
            handleSucDataYinHangFuJianName(data) {
                this.formData.yinHang_FuJian = data.guid;
                this.formData.yinHang_FuJian_Name = data.name;
            },
            handleOnRemoveFnYinHangFuJianName() {
                this.formData.yinHang_FuJian = "";
                this.formData.yinHang_FuJian_Name = "";
            },
            async handleCheckOnlyCode() {
                return await checkOnlyCode({qiYe_BH: this.formData.qiYe_BH});
            },
            //跳转其他系统地址
            goToOtherSystem(type) {
                if (type === 1) {
                } else if (type === 2) {
                } else if (type === 3) {
                    // ca管理
                    const url = config.caUrl+`?guid=${this.$store.state.loginCookie.userInfo.currentUserId}&type=81&xmlx=10`
                    const urlPro = config.caUrl+`Home/Index?guid=${this.$store.state.loginCookie.userInfo.currentUserId}&type=81&xmlx=10`
                    console.log(process.env.NODE_ENV)
                    process.env.NODE_ENV === 'prodgt' ? window.open(urlPro) : window.open(url)
                }
            },
            async handleSaveEnterpriseInfo(flag) {
                const a =
                    '<a target="_blank" class="a_links" style="color: red; font-width: bold; padding: 0 10px;" href="http://116.196.83.187:8093/gt-center-home-web/xxgl/helpmenu?xinXiGuanLiType=21">帮助中心</a>';
                if (!this.$store.state.roleAnddepartment.enterPriseInfo.isHasSubmit) {
                    const isOnly = await this.handleCheckOnlyCode();
                    if (isOnly.info === "重复") {
                        // this.$alert(`贵司企业信用账号已被注册，请您前往${a}查看解决办法吧`, "提示", {
                        this.$alert(`该社会信用代码已被认证，请修改！`, "提示", {
                            confirmButtonText: "确定",
                            dangerouslyUseHTMLString: true,
                        });
                        return;
                    }
                }
                const url = `/qiye/updateQiYeBaseMess?flag=${flag}`;
                let data = JSON.parse(JSON.stringify(this.formData));
                data.zhuTiLeiXing = this.formData.zhuTiLeiXing.map((i) => i).join(",");
                if (flag == 1) {
                    saveEnterpriseInfo(url, data).then((res) => {
                        if (res.code === 1) {
                            if (res.info === "企业编号重复" || res.info === "企业名称重复") {
                                // this.$alert(`贵司企业名称已被注册，请您前往${a}查看解决办法吧`, "提示", {
                                this.$alert(`该社会信用代码已被认证，请修改！`, "提示", {
                                    confirmButtonText: "确定",
                                    dangerouslyUseHTMLString: true,
                                });
                                return;
                            }

                            if (res.data.shenHeZhuangTai === "审核不通过") {
                                this.$alert(res.info, "提示", {
                                    confirmButtonText: "确定",
                                    dangerouslyUseHTMLString: true,
                                });
                                return;
                            }

                            const msg = flag === 1 ? "详细资料已经保存" : "详细资料已经提交审核，请耐心等待！";
                            this.$message.success(msg);
                            // this.getPageInfo()
                            this.$store.dispatch("getEnterpriseInfo");
                        }
                    });
                } else {
                    this.$refs.formData.validate((v) => {
                        if (v) {
                            if (!this.canpost) return;
                            this.canpost = false;
                            saveEnterpriseInfo(url, data).then((res) => {
                                if (res.code === 1) {
                                    if (res.info === "企业编号重复" || res.info === "企业名称重复") {
                                        this.$alert(`贵司企业名称已被注册，请您前往${a}查看解决办法吧`, "提示", {
                                            confirmButtonText: "确定",
                                            dangerouslyUseHTMLString: true,
                                        });
                                        return;
                                    }

                                    if (res.data.shenHeZhuangTai === "审核不通过") {
                                        this.$alert(`贵司企业信用账号已被注册，请您前往${a}查看解决办法吧`, "提示", {
                                            confirmButtonText: "确定",
                                            dangerouslyUseHTMLString: true,
                                        });
                                        return;
                                    }

                                    const msg = flag === 1 ? "详细资料已经保存" : "详细资料已经提交审核，请耐心等待！";
                                    this.$message.success(msg);
                                    // this.getPageInfo()
                                    this.$store.dispatch("getEnterpriseInfo");
                                }
                                this.canpost = true;
                            });
                            checkRecords().then((res) => {
                                if (res.code === 1) {
                                    this.records = res.data.shjlList;
                                }
                            });
                        } else {
                            this.$message.warning("必填项信息填写有误或漏填，请核实！");
                        }
                    });
                }
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
                handler(data) {
                    // console.log("data", data);
                    // this.formData.suoShuQiYeDaiMa = "";
                    // this.typeData = [];
                    // if (data || data !== null) {
                    //   if (data) {
                    //     this.typeData = TypeData.shenZhen;
                    //   } else {
                    //     this.typeData = TypeData.other;
                    //   }
                    // }
                },
            },
            "formData.arear": {
                handler(data) {
                    if (data) {
                        this.formData.shengId = parseInt(data[0]);
                        this.formData.shiId = parseInt(data[1]);
                        this.formData.areaId = parseInt(data[2]);
                        this.getAreaName();
                    }
                },
                immediate: true,
            },
            "$store.state.roleAnddepartment.enterPriseInfo": {
                handler(data) {
                    if (data) {
                        this.getPageInfo();
                        this.getCaInfo();
                    }
                },
                deep: true,
                immediate: true,
            },
            "formData.userLeiBie": {
                immediate: true,
                handler(data) {
                    if (data == 1) {
                        this.rules.qiYe_Name[0].required = false
                    }
                    if (data == 2) {
                        this.rules.qiYe_Name[0].required = true
                    }
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
                        arrData.splice(2, 3);
                    }
                    this.navData = arrData;
                },
            },
        },
    };
</script>

<style lang="scss" scoped>
    .warn {
        color: red;
        line-height: 70px;
        height: 70px;
        border: 1px solid red;
        margin: 20px 60px 20px 20px;

        img {
            vertical-align: middle;
            margin: 0 30px;
        }
    }

    .a_links {
        color: red;
        font-weight: bold;
    }

    .a_links:hover {
        text-decoration: underline;
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

    .el-card {
        overflow: visible;
    }

    .page-detail {
        // padding-top: 95PX
    }
    .cus-check {
        ::v-deep.el-checkbox {
            margin-right: 4px;
        }
        .icon-bangzhu1 {
            margin-right: 15px;
            margint-top:2px;
            color: #0A83F4;
        }
    }
</style>
