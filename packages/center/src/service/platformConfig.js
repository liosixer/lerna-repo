import request from '../api/index';

const platformConfig = {
  /**
   * 收费规则
   */
  // 列表
  fetchRuleList: (data) => {
    return request({
      url: `/admin/ptfwf/queryList`,
      data: data,
      method: 'POST'
    })
  },
  // 添加
  fetchRuleSave: (data) => {
    return request({
      url: `/admin/ptfwf/save`,
      data: data,
      method: 'POST'
    })
  },
  // 更新
  fetchRuleUpdate: (data) => {
    return request({
      url: `/admin/ptfwf/update`,
      data: data,
      method: 'POST'
    })
  },
  // 验证规则名称是否存在--无用
  fetchExistRuleName: (data) => {
    return request({
      url: `/admin/ptfwf/yanZhengRuleName`,
      data: data,
      method: 'POST'
    })
  },
  // 验证规则编号是否存在--无用
  costYanZhengRuleBH: (data) => {
    return request({
      url: `/admin/ptfwf/yanZhengRuleBH`,
      data: data,
      method: 'POST'
    })
  },
  // 删除规则
  fetchRuleDel: (data) => {
    return request({
      url: `/admin/ptfwf/delete`,
      data: data,
      method: 'GET'
    })
  },
  // 有效无效
  fetchRuleInvalid: (data) => {
    return request({
      url: `/admin/ptfwf/updateGz`,
      data: data,
      method: 'GET'
    })
  },
  // 获取规则详情
  fetchRuleDetail: (data) => {
    return request({
      url: `/admin/ptfwf/detail`,
      data: data,
      method: 'GET'
    })
  },
  // 获取详细列表
  fetchRuleDetailList: (data) => {
    return request({
      url: `/admin/ptfwf/getInfoListByRuleId`,
      data: data,
      method: 'GET'
    })
  },
  // 保存单条规则
  fetchSaveOneRule: (data) => {
    return request({
      url: `/admin/ptfwf/addOneRule`,
      data: data,
      method: 'POST'
    })
  },
  // 更新单条规则
  fetchUpdateOneRule: (data) => {
    return request({
      url: `/admin/ptfwf/updateOneRule`,
      data: data,
      method: 'POST'
    })
  },
  // 删除单条规则
  fetchDelOneRule: (data) => {
    return request({
      url: `/admin/ptfwf/deleteOneRule`,
      data: data,
      method: 'POST'
    })
  },
  // 平台使用费白名单列表
  fetchWhiteList: (data) => {
    return request({
      url: `/admin/baimingdan/queryAllBaiMingDan.do`,
      data: data,
      method: 'GET'
    })
  },
  // 查看所有供应商
  fetchWhiteSupplier: (data) => {
    return request({
      url: `/admin/baimingdan/allSuppliers.do`,
      data: data,
      method: 'GET'
    })
  },
  // 添加保存白名单
  fetchSaveWhiteSupplier: (data) => {
    return request({
      url: `/admin/baimingdan/saveBaiMingDan.do`,
      data: data,
      method: 'GET'
    })
  },
  // 删除白名单
  fetchDelWhiteSupplier: (data) => {
    return request({
      url: `/admin/baimingdan/deleteBaiMingDan.do`,
      data: data,
      method: 'GET'
    })
  },
  /**
   * 采购用户管理
   */
  // 列表
  fetchPurchaseUserList: (data) => {
    return request({
      // url: `/admin/zuHuManage/getUserList`,
      url: `/admin/center/queryProcurementUserList`,
      data: data,
      method: 'GET'
    })
  },
  // 详情
  fetchPurchaseUserDetail: (data) => {
    return request({
      // url: `/admin/zuHuManage/getUserByGuid`,
      url: `/admin/zuHuManage/getUserByQiYeGuid`,
      data: data,
      method: 'GET'
    })
  },
  // 保存
  fetchSavePurchaseUser: (data) => {
    return request({
      url: `/admin/zuHuManage/saveZuHu`,
      data: data,
      method: 'POST',
      headers: {
        contentType: 'formType'
      },
    })
  },
  // 规则列表
  fetchCostRuleList: (data) => {
    return request({
      url: `/admin/zuHuManage/getPTFRulerList`,
      data: data,
      method: 'POST',
      headers: {
        contentType: 'formType'
      },
    })
  },
  // 规则列表保存
  fetchSaveCostRule: (data) => {
    return request({
      url: `/admin/zuHuManage/updatePTFRuler`,
      data: data,
      method: 'POST',
      headers: {
        contentType: 'formType'
      },
    })
  },
  // 获取招标代理列表
  fetchTenderAgencyList: (data) => {
    return request({
      url: `/admin/zuHuManage/getZBDLList`,
      data: data,
      method: 'GET',
    })
  },
  // 保存
  fetchSavePurchaseUserPermission: (data) => {
    return request({
      url: `/admin/zuHuManage/saveZuHuAuthor`,
      data: data,
      method: 'POST',
      headers: {
        contentType: 'formType'
      },
    })
  },
  //协同供应商列表
  getXietongList: (data) => {
    return request({
      url: `/api/xieTongGys/queryInfoList`,
      data: data,
      method: 'POST',
      headers: {
        contentType: 'formType'
      },
    })
  },
  //协同供应商
  getXietongDetail: (data) => {
    return request({
      url: `/api/xieTongGys/queryInfoById`,
      data: data,
      method: 'GET',
    })
  },
  // 协同供应商已添加企业列表
  queryXietongDetailList: (data) => {
    return request({
      url: `/api/xieTongGys/queryDetailListById`,
      data: data,
      method: 'GET',
    })
  },
  // 协同供应商-获取企业列表
  queryXietongQiyeList: (data) => {
    return request({
      url: `/api/xieTongGys/queryQiYeList`,
      data: data,
      method: 'GET',
    })
  },
  // 协同供应商-保存企业信息
  saveXietongDetail: (data) => {
    return request({
      url: `/api/xieTongGys/saveDetail`,
      data: data,
      method: 'POST',
    })
  },
  // 删除协同供应商-保存企业信息
  deleteXietongSupplier: (data) => {
    return request({
      url: `/api/xieTongGys/deleteByDetailGuid`,
      data: data,
      method: 'GET',
    })
  },


}

export default platformConfig
