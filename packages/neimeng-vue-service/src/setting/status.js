// 计划状态
//  1:未提交：2：审核中，3：未通过 4：已通过  5：已使用
const planStatus = [
	{ code: 1, name: '未提交' },
	{ code: 2, name: '审核中' },
	{ code: 22, name: '审核中' },
	{ code: 3, name: '未通过' },
	{ code: 4, name: '已生效' },
	{ code: 5, name: '已使用' },
	{ code: 6, name: '已变更' },
	{ code: 7, name: '已分派' },
]
const childrenPlanStatus = [
	{ code: 1, name: '未提交' },
	{ code: 2, name: '审核中' },
	{ code: 3, name: '未通过' },
	{ code: 4, name: '已生效' },
	{ code: 5, name: '已使用' },
	{ code: 6, name: '已变更' },
	{ code: 7, name: '已分派' },
]
const executePlanStatus = [
	{ code: 1, name: '已变更' },
	{ code: 2, name: '未通过' },
	{ code: 3, name: '审核中' },
	{ code: 4, name: '已生效' },
	{ code: 5, name: '已使用' },
]
const ElectricityCoalStatus = [
	{ code: 1, name: '未提交' },
	{ code: 2, name: '审核中' },
	{ code: 21, name: '审核中' },
	{ code: 3, name: '拒绝' },
	{ code: 4, name: '通过' },
	{ code: 5, name: '已分派' },
	{ code: 6, name: '已使用' },
]

const ElectricityCoalStatusDm = [
	{ code: 1, name: '未提交' },
	{ code: 2, name: '审核中' },
	{ code: 21, name: '审核中' },
	{ code: 3, name: '拒绝' },
	{ code: 4, name: '未分派' },
	{ code: 5, name: '已生效' },
	{ code: 6, name: '已使用' },
]
const ElectricityCoalStatusDmZc = [
	{ code: 1, name: '未提交' },
	{ code: 2, name: '审核中' },
	{ code: 21, name: '审核中' },
	{ code: 3, name: '拒绝' },
	{ code: 4, name: '已生效' },
	{ code: 5, name: '已生效' },
	{ code: 6, name: '已使用' },
]

const setUpStatus = [
	{ code: 1, name: '未提交' },
	{ code: 2, name: '审核中' },
	{ code: 21, name: '审核中' },
	{ code: 22, name: '审核中' },
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
const setUpStatusSx = [
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
const weituoStatus = [
	{ code: 1, name: '未提交' },
	{ code: 2, name: '审核中' },
	{ code: 22, name: '审核中' },
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
// 审核状态
const checkType = [
	{ code: 0, name: "撤回" },
	{ code: 1, name: "撤销" },
	{ code: 2, name: "审核中" },
	{ code: 3, name: '未通过' },
	{ code: 4, name: '已通过' },
	{ code: 5, name: '已退回' },
]
// 自查报告状态
const selfReportStatus = [
	{ code: 1, name: '未提交' },
	{ code: 2, name: '审核中' },
	{ code: 3, name: '未通过' },
	{ code: 4, name: '审核通过' },
]

/** 委托合同状态 **/
const EntrustContractStatus = [
	{ code: 0, name: "未签署", },
	{ code: 1, name: "已签署" }
];

export default { planStatus, childrenPlanStatus, executePlanStatus, setUpStatus, contractStatus, checkType, weituoStatus, setUpStatusSx, ElectricityCoalStatus, ElectricityCoalStatusDm, ElectricityCoalStatusDmZc, EntrustContractStatus }
