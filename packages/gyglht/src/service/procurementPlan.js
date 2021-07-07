import request from '../api/index'
const DELETE = 'GET',
	DETAIL = DELETE,
	LIST = 'POST'
const procurementPlan = {
	/**
	 * 年度采购计划
	 */
	// 列表
	yearsPP_getList: (data) => {
		return request({
			url: `/yearsProcurementPlan/getList.do`,
			data: data,
			method: 'POST',
		})
	},
	//详情
	yearsPP_getDetail: (data) => {
		return request({
			url: `/yearsProcurementPlan/getDetail.do`,
			data,
			method: 'GET',
		})
	},
	// // 年度采购明细列表
	// yearsPP_procurementDetail: (data) => {
	// 	return request({
	// 		url: `/yearsProcurementPlan/procurementDetail`,
	// 		params: data,
	// 		method: 'GET',
	// 	})
	// },
	//审批记录列表
	yearsPP_procurementAuditRecord: (data) => {
		return request({
			url: `/yearsProcurementPlan/procurementAuditRecord.do`,
			data,
			method: 'GET',
		})
	},
	//年度所有采购计划（下拉框）
	yearsPP_yearsProcurementPlanAll: (data) => {
		return request({
			url: `/yearsProcurementPlan/yearsProcurementPlanAll.do`,
			data: data,
			method: 'GET',
		})
	},
	//年度采购计划新增
	yearsPP_add: (data) => {
		return request({
			url: `/yearsProcurementPlan/add.do`,
			data,
			method: 'POST',
		})
	},
	//年度采购计划编辑
	yearsPP_edit: (data) => {
		return request({
			url: `/yearsProcurementPlan/edit.do`,
			data,
			method: 'POST',
		})
	},
	//年度采购计划删除
	yearsPP_delete: (data) => {
		return request({
			url: `/yearsProcurementPlan/delete.do`,
			data,
			method: 'GET',
		})
	},
	//年度采购计划撤回--undo
	yearsPP_recall: (data) => {
		return request({
			url: `/yearsProcurementPlan/recall.do`,
			data: data,
			method: 'GET',
		})
	},
	//年度采购计划撤销--undo
	yearsPP_undo: (data) => {
		return request({
			url: `/yearsProcurementPlan/undo.do`,
			data: data,
			method: 'GET',
		})
	},
	/**
	 * 批次采购计划
	 */
	//批次采购计划列表-done
	batchPP_getList: (data) => {
		return request({
			url: `/batchProcurementPlan/getList.do`,
			data: data,
			method: 'POST',
		})
	},
	//批次--详情-done
	batchPP_getDetail: (data) => {
		return request({
			url: `/batchProcurementPlan/getDetail.do`,
			data,
			method: DETAIL,
		})
	},
	//批次采购审核记录列表
	batchPP_procurementAuditRecord: (data) => {
		return request({
			url: `/batchProcurementPlan/procurementAuditRecord.do`,
			data,
			method: 'GET',
		})
	},
	//批次采购计划新增-done
	batchPP_add: (data) => {
		return request({
			url: `/batchProcurementPlan/add.do`,
			data,
			method: 'POST',
		})
	},
	//批次采购计划编辑-done
	batchPP_edit: (data) => {
		return request({
			url: `/batchProcurementPlan/edit.do`,
			data,
			method: 'POST',
		})
	},
	// //批次采购明细列表
	// batchPP_procurementDetail: (data) => {
	// 	return request({
	// 		url: `/batchProcurementPlan/procurementDetail`,
	// 		params: data,
	// 		method: 'GET',
	// 	})
	// },

	//批次采购计划删除-done
	batchPP_delete: (data) => {
		return request({
			url: `/batchProcurementPlan/delete.do`,
			data,
			method: 'GET',
		})
	},
	//批次采购计划立项
	batchPP_approval: (data) => {
		return request({
			url: `/batchProcurementPlan/approval`,
			data: data,
			method: 'GET',
		})
	},
	//批次--撤回--undo
	barchPP_recall: (data) => {
		return request({
			url: `/batchProcurementPlan/recall.do`,
			data: data,
			method: 'GET',
		})
	},
	//批次--撤销--undo
	barchPP_undo: (data) => {
		return request({
			url: `/batchProcurementPlan/undo.do`,
			data: data,
			method: 'GET',
		})
	},

	/**
	 * 自采计划
	 */
	// 列表--done
	selfPPList: (data) => {
		return request({
			url: '/selfProcurementPlan/getList.do',
			data,
			method: 'POST',
		})
	},
	// 详情--done
	selfPPDetail: (data) => {
		return request({
			url: '/selfProcurementPlan/getDetail.do',
			data,
			method: 'GET',
		})
	},
	//审批记录列表
	selfPP_procurementAuditRecord: (data) => {
		return request({
			url: `/selfProcurementPlan/auditRecord.do`,
			data,
			method: 'GET',
		})
	},
	// 新增-done
	selfPPListAdd: (data) => {
		return request({
			url: '/selfProcurementPlan/add.do',
			data,
			method: 'POST',
		})
	},
	// 编辑--done
	selfPPListEdit: (data) => {
		return request({
			url: '/selfProcurementPlan/edit.do',
			data,
			method: 'POST',
		})
	},
	// 删除--done
	selfPPListDelete: (data) => {
		return request({
			url: '/selfProcurementPlan/delete.do',
			data,
			method: 'GET',
		})
	},
	// 自采撤回
	selfPP_recall: (data) => {
		return request({
			url: '/selfProcurementPlan/recall.do',
			data,
			method: 'GET',
		})
	},
	// 自采撤销
	selfPP_undo: (data) => {
		return request({
			url: '/selfProcurementPlan/undo.do',
			data,
			method: 'GET',
		})
	},

	/**
	 * 采购立项
	 */
	// 列表--done
	procurementSetUpList: (data) => {
		return request({
			url: '/procurementSetUp/getList.do',
			data,
			method: 'POST',
			// headers: {
			// 	contentType: 'formType',
			// },
		})
	},
	// 详情
	procurementSetUpDetail: (data) => {
		return request({
			url: '/procurementSetUp/getDetail.do',
			data,
			method: 'GET',
		})
	},
	// 审批记录
	procurementSetUp_auditRecord: (data) => {
		return request({
			url: '/procurementSetUp/auditRecord.do',
			data,
			method: 'GET',
		})
	},
	// 采购立项--计划信息
	procurementSetUp_planInfo: (data) => {
		return request({
			url: '/procurementSetUp/planDetail.do',
			data,
			method: 'GET',
		})
	},
	// 新增
	procurementSetUp_add: (data) => {
		return request({
			url: '/procurementSetUp/add.do',
			data,
			method: 'POST',
		})
	},
	// 编辑
	procurementSetUp_edit: (data) => {
		return request({
			url: '/procurementSetUp/edit.do',
			data,
			method: 'POST',
		})
	},
	// 采购立项--删除
	procurementSetUp_delete: (data) => {
		return request({
			url: '/procurementSetUp/delete.do',
			data,
			method: DELETE,
		})
	},
	// 采购立项--撤回
	procurementSetUp_recall: (data) => {
		return request({
			url: '/procurementSetUp/recall.do',
			data,
			method: 'GET',
		})
	},
	// 采购立项--生成委托单
	procurementScwtd: (data) => {
		return request({
			url: '/procurementSetUp/createOrders.do',
			data,
			method: 'GET',
		})
	},

	/**
	 * 采购委托
	 */
	// 列表
	procurementEntrustLIst: (data) => {
		return request({
			url: '/procurementEntrust/getList.do',
			data,
			method: 'POST',
		})
	},
	// 详情
	procurementEntrust_detail: (data) => {
		return request({
			url: '/procurementEntrust/orders.do',
			data,
			method: 'GET',
		})
	},
	// 采购委托的立项信息
	procurementEntrust_setUpDetail: (data) => {
		return request({
			url: '/procurementEntrust/getDetail.do',
			data,
			method: 'GET',
		})
	},
	// 审核记录
	procurementEntrust_auditRecord: (data) => {
		return request({
			url: '/procurementEntrust/auditRecord.do',
			data,
			method: 'GET',
		})
	},
	// 获取供应商列表
	procurementEntrust_supplierList: (data) => {
		return request({
			url: '/procurementEntrust/supplierList.do',
			data,
			method: 'GET',
		})
	},
	// 采购委托--新增
	procurementEntrust_add: (data) => {
		return request({
			url: '/procurementEntrust/add.do',
			data,
			method: 'POST',
		})
	},
	// 采购委托--编辑
	procurementEntrust_edit: (data) => {
		return request({
			url: '/procurementEntrust/edit.do',
			data,
			method: 'POST',
		})
	},
	// 采购委托--删除
	procurementEntrust_delete: (data) => {
		return request({
			url: '/procurementEntrust/delete.do',
			data,
			method: DELETE,
		})
	},
	// 采购委托--撤回
	procurementEntrust_recall: (data) => {
		return request({
			url: '/procurementEntrust/recall.do',
			data,
			method: 'GET',
		})
	},
	// 采购委托--撤销
	procurementEntrust_undo: (data) => {
		return request({
			url: '/procurementEntrust/undo.do',
			data,
			method: 'GET',
		})
	},
	/**
	 * 委托合同
	 */
	// 列表
	purchaseContractList: (data) => {
		return request({
			url: '/entrustContract/getList.do',
			data,
			method: 'POST',
		})
	},
	// 详情
	purchaseContract_detail: (data) => {
		return request({
			url: '/entrustContract/contractInfo.do',
			data,
			method: 'GET',
		})
	},
	// 审核记录
	purchaseContract_auditRecord: (data) => {
		return request({
			url: '/entrustContract/auditRecord.do',
			data,
			method: 'GET',
		})
	},
	// 新增
	purchaseContract_add: (data) => {
		return request({
			url: '/entrustContract/add.do',
			data,
			method: 'POST',
		})
	},
	// 编辑+查看
	purchaseContract_edit: (data) => {
		return request({
			url: '/entrustContract/edit.do',
			data,
			method: 'POST',
		})
	},
	// 删除
	purchaseContract_delete: (data) => {
		return request({
			url: '/entrustContract/delete.do',
			data,
			method: DELETE,
		})
	},

	// 采购计划审批
	auditPlanCg: (data) => {
		return request({
			url: '/Examination/planExamination.do',
			data,
			method: "POST",
		})
	},
	// 采购立项审批列表
	auditProjectapproval: (data) => {
		return request({
			url: '/Examination/getSetUpList.do',
			data,
			method: "POST",
		})
	},
	// 采购立项审批
	ProjectapprovalSp: (data) => {
		return request({
			url: '/Examination/setUpExamination.do',
			data,
			method: "POST",
		})
	},
}

export default procurementPlan
