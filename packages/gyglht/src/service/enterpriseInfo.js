import service from '../api/index'
import request from "../api";
// 获取供应商信息
export const getSupplierInfo = (data) => {
	return service({
		url: `/gyszy/queryZhuanYeGongYingShang`,
		method: 'POST',
		data,
	})
}
// 删除供应商资质证书
export const delQualifications = (data) => {
	return service({
		url: `/zzxx/delByGuid`,
		method: 'POST',
		data,
	})
}
// 获取单位列表
export const getEnterPriseList = (data) => {
	return service({
		url: `/zbrdb/getAllZBR`,
		method: 'POST',
		data,
	})
}
export const getAllQiYe = (data) => {
	return request({
		url: `/zbrdb/getAllQiYe`,
		data: data,
		method: 'POST'
	})
}
// export const queryYeJiZhuanYeList = (data) => {
// 	return request({
// 		url: `/gyssq/queryYeJiZhuanYeList`,
// 		data: data,
// 		method: 'POST'
// 	})
// } // 获取专业分类
export const queryYeJiZhuanYeList = (data) => {
	return request({
		url: `/gyssq/queryAllZhuanYeList`,
		data: data,
		method: 'get'
	})
} // 获取专业分类
export const getSubjectCategory = () => {
	return service({
		url: `/gyssq/queryZhuanYeList`,
		method: 'POST',
	})
}
// 保存供应商专业申请
export const saveOrUpdateApp = (data) => {
	return service({
		url: `/gyssq/saveOrUpdateGongYiShangZhuanYeShengQing`,
		method: 'POST',
		data,
	})
}
//变更供应商状态
export const changePurchaseStatus = (data) => {
	return service({
		url: `/gyssq/biangeng`,
		method: 'POST',
		data,
	})
}
// 获取供应商审核记录
export const reviewRedords = (data) => {
	return service({
		url: `/gyssq/shenHeJiLuList`,
		method: 'POST',
		data,
	})
}
// 保存业绩信息
export const savePerformanceInfo = (data) => {
	return service({
		url: `/yjxx/saveOrUpdateYeJiXinXi`,
		method: 'POST',
		data,
	})
}

// 获取平台项目
export const getPlatformProjects = (data) => {
	return service({
		url: `/qiye/queryPingTaiXiangMu?page=1&rows=10000`,
		method: 'GET',
		data,
	})
}
// 获取营业范围
export const getBusinessRange = (data) => {
	return service({
		url: `/qiye/getZhuanYeFenLeiTree`,
		method: 'POST',
		data,
	})
}
// 审核供应商信息
export const checkPurchaseInfo = () => {
	return service({
		url: `/gyszy/submitZhuanYeGongYingShang`,
		method: 'POST',
	})
}
// 获取企业基本信息
export const getEnterpriseInfo = () => {
	return service({
		url: `/qiye/queryQiYeBaseInfo`,
		method: 'POST',
	})
}
// 查询是否显示专业审核权限（2级单位显示，3、4级不显示）
export const isShowSpeAuth = () => {
	return service({
		url: `/zyshqx/isShowMenu.do`,
		method: 'get',
	})
}

export const getRealEnterpriseInfo = () => {
	return service({
		url: `/qiye/zsQiYePage`,
		method: 'POST',
	})
}
// 企业基本信息保存
export const saveEnterpriseInfo = (url, data) => {
	return service({
		method: 'POST',
		data,
		url,
	})
}
// 删除业绩信息
export const deletePerformance = (data) => {
	return service({
		url: '/yjxx/delByGuid',
		data,
		method: 'POST',
	})
}
// 获取币种
export const getMoneyType = (data) => {
	return service({
		method: 'POST',
		url: '/dictdata/dictHuoBiDaiMa',
	})
}
export const saveQualifications = (data) => {
	return service({
		data,
		url: '/zzxx/saveOrUpdateZiZhiXingXi',
		method: 'POST',
	})
}
// /qiye/updateUserShenPi
export const returnData = () => {
	return service({
		url: '/qiye/updateUserShenPi',
		method: 'POST'
	})
}
// 取消变更
export const returnDataCancle = () => {
	return service({
		url: '/qiye/canelUpdateUserShenPi',
		method: 'POST'
	})
}
export const chehui = () => {
	return service({
		url: '/qiye/cheHuiShenHe',
		method: 'POST'
	})
}

// 审核记录
export const checkRecords = () => {
	return service({
		url: '/qiye/queryhenHeJiLuList',
		method: 'POST'
	})
}
// 获取二级分类
//获取文件信息
export const getCascaderCat = () => {
	return service({
		url: 'dictdata/queryHangYeFenLei',
		method: 'POST'
	})
}
// 供应商专业申请记录
export const getSubjectRecords = data => {
	return service({
		url: '/gyssq/shenHeJiLuList',
		data,
		method: 'POST'
	})
}
// 区域三级联动
export const getPCC = data => {
	return service({
		url: '/qiye/dictAllAreaList',
		method: "GET"
	})
}
//ca信息查询
export const queryCAInfo = data => {
	return request({
		url: `/caInfo/queryCAInfo`,
		data,
		method: 'get'
	})
}
// 社会信用码唯一性判断
export const checkOnlyCode = data => {
	return service({
		url: '/qiye/isRepeatUserBH',
		method: 'POST',
		data
	})
}
// 添加荣誉
export const submitHonor = data => {
	return service({
		url: '/ryxx/saveOrUpdateRongYuXinXi',
		method: 'POST',
		data
	})
}
// 查询荣誉列表
export const getHonorList = () => {
	return service({
		url: '/ryxx/queryList',
		method: 'POST'
	})
}
// 查询资质信息
export const qList = () => {
	return service({
		url: '/zzxx/queryList',
		method: 'POST'
	})
}
// 删除荣誉
export const deleteHonor = data => {
	return service({
		url: '/ryxx/delByGuid',
		method: 'POST',
		data
	})
}

// 删除供应商申请
export const delSuppliseAsk = data => {
	return service({
		url: '/gyssq/delByGuid',
		data,
		method: 'POST'
	})
}
// 撤销供应商申请
export const treatPurcase = data => {
	return service({
		url: '/gyssq/chexiao',
		data,
		method: 'POST'
	})
}
// 撤回供应商申请
export const treatPurcase2 = data => {
	return service({
		url: '/gyssq/chehui',
		data,
		method: 'POST'
	})
}
// 供应商添加根据企业编号获取行业分类
export const queryCatByQiyeHB = data => {
	return service({
		url: '/dictdata/queryHangYeFenLeiByQiYeBH',
		method: 'POST',
		data
	})
}
// 撤回供应商申请
// 供应商添加获取申请资料模板
export const fetchMaterialTemplate = data => {
	return service({
		url: '/zbrdb/getMuBanByQiYeGuid',
		data,
		method: 'GET'
	})
}