import service from '../api/index'
import request from "../api";


/**
 *  ////////////////////////////////////////////
 *  ///                                      ///
 *  ///                                      ///
 *  ///           控制中心接口                 ///
 *  ///                                      ///
 *  ///                                      ///
 * ////////////////////////////////////////////
 */

// 获取注册企业列表
export const getReigsterEmtetpriseList = (data) => {
	return service({
		url: '/admin/center/queryAccountList',
		method: 'POST',
		data
	})
}
// 获取审核企业列表
export const getEnterpriseList = data => {
	return service({
		url: '/admin/center/queryUserList',
		method: 'POST',
		data
	})
}
// 获取审核企业详情
export const getEnterpriseInfo = data => {
	return service({
		url: '/admin/center/detail',
		method: 'GET',
		data
	})
}
// 审核
export const checkEnterprise = data => {
	return service({
		url: '/admin/center/approve',
		method: 'POST',
		data
	})
}

// 获取供应商列表
export const supplierList = data => {
	return service({
		url: '/zhuanYeGongYingShang/queryList',
		method: 'POST',
		data
	})
}

// 行业树
export const catList = data => {
	return service({
		url: '/admin/center/queryHangYeFenLei',
		method: 'GET',
		data
	})
}
// 供应商信息
export const supplierInfo = data => {
  return service({
    url: '/zhuanYeGongYingShang/detail',
    method: 'GET',
    data
  })
}
// 供应商审批记录
export const recordInfo = data  => {
  return service({
    url: '/zhuanYeGongYingShang/shenHeList',
    method: 'GET',
    data,
  })
}
// 审核专业供应商
export const suppilerCheck = data => {
  return service({
    url: '/zhuanYeGongYingShang/zhuanYeGongYingShangShenHe',
    method: 'POST',
    data
  })
}
// 专业供应商管理
export const supplierManegement = (data) => {
  return service({
    url: '/gongYingShangGuanLi/queryList',
    method: 'POST',
    data
  })
}
// 专业供应商管理详情
export const supplierDetail = data => {
  return service({
    url: '/gongYingShangGuanLi/detail',
    method: 'GET',
    data
  })
}

// 保存供应商
export const saveSupplierInfo = data => {
  return service({
    url: '/gongYingShangGuanLi/saveGongYingShangGuanLi.do',
    method: 'POST',
    data
  })
}
// 删除供应商
export const delSupplier = data  => {
  return service({
    url: '/gongYingShangGuanLi/deleteGongYingShangGuanLi?guanLiGuid=' + data,
    method: 'GET'
  })
}
export const compreeInfo = data => {
  return service({
    url: '/admin/center/getInfoForTianYan',
    method: 'GET',
    data
  })
}
export const verifyData = data => {
  return service({
    url:'/admin/center/getYanZhengInfo',
    method: 'GET',
    data
  })
}
// 导出列表
export const exportData = data => {
  return service({
    url: '/admin/center/queryUserListout',
    method: 'GET',
    data
  })
}
// 比对更结果
export const checkState = data => {
  return service({
    url:'/admin/center/yanZHengXiuGai?userQiYeGuid=' + data,
    method: 'GET'
  })
}
export const deleteXxcx = data => {
  return service({
    url:'/admin/center/deleteRegistInfo',
    method: 'GET',
    data
  })
}
