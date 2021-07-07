// 计划状态
//  1:未提交：2：审核中，3：未通过 4：已通过  5：已使用
const planStatus = [
	{ code: 1, name: '未提交' },
	{ code: 2, name: '审核中' },
	{ code: 3, name: '未通过' },
	{ code: 4, name: '已通过' },
	{ code: 5, name: '已使用' },
]
const setUpStatus = [
	{ code: 1, name: '未提交' },
	{ code: 2, name: '审核中' },
	{ code: 3, name: '未通过' },
	{ code: 4, name: '已通过' },
	{ code: 5, name: '已建项' },
	{ code: 6, name: '未建项' },
	{ code: 7, name: '已指派' },
	{ code: 8, name: '已委托' },
	{ code: 9, name: '未接收' },
	{ code: 10, name: '已接收' },
	{ code: 11, name: '已生效' },
]
const contractStatus = [
	{ code: 1001, name: '未提交' },
	{ code: 1009, name: '审核中' },
	{ code: 1011, name: '审核不通过' },
	{ code: 1012, name: '已生效/已通过' },
	{ code: 1019, name: '已废弃' },
]

//注册账号申诉状态
const registerStatus = [
	{ code: 1, name: '未审核' },
	{ code: 2, name: '审核通过' },
	{ code: 3, name: '审核不通过' }
]

// 是否有效
const qyStatus = [
	{ code: 0, name: '有效' },
	{ code: 1, name: '无效' },
]

// 入库状态
const inventoryStatus = [
	{ code: 0, name: '未提交' },
	{ code: 1, name: '未审核' },
	{ code: 2, name: '审核通过' },
	{ code: 3, name: '审核未通过' },
]

//操作类型
const auditOptionType = [
	{ code: 1, name: '未审核' },
	{ code: 2, name: '审核通过' },
	{ code: 3, name: '撤销' }
]

export default { planStatus, setUpStatus, contractStatus, registerStatus,qyStatus,inventoryStatus,auditOptionType}
