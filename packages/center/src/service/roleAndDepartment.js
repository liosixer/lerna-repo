import service from '../api/index'
export const getUserList = (data) => {
	return service({
		url: `/user/queryUserList`,
		method: 'POST',
		data,
	})
}
// 获取部门列表
export const getDepartment = (data) => {
	return service({
		url: `/user/querydeparttreegrid`,
		method: 'POST',
		headers: {
			contentType: 'formType',
		},
		data,
	})
}
// 添加用户
export const saveUser = (data) => {
	return service({
		url: `/user/saveUser`,
		method: 'POST',
		data,
	})
}
// 获取用户信息
export const getUserInfo = (url) => {
	return service({
		url,
		method: 'POST',
	})
}
// 获取角色列表
export const getRoleList = (data) => {
	return service({
		url: '/role/queryRoleList',
		method: 'POST',
		data,
	})
}
// 保存用户角色
export const saveRole = (data) => {
	return service({
		url: '/user/fenPeiRoleKzt',
		method: 'POST',
		data,
	})
}
// 删除用户
export const delUser = (data) => {
	return service({
		url: '/user/delUser',
		method: 'POST',
		data,
	})
}
// 添加部门
export const saveDepartment = (data) => {
	return service({
		url: '/user/insertdepart',
		method: 'POST',
		data,
	})
}
// 更新部门名字
export const updateDepartment = (data) => {
	return service({
		url: '/user/updateDept',
		method: 'POST',
		data,
	})
}
// 保存权限设置
export const saveRules = (data) => {
	return service({
		url: '/role/saveFPAuth',
		method: 'POST',
		data,
	})
}
// 权限树
export const getRules = (data) => {
	return service({
		url: '/auth/getAuthTree',
		method: 'POST',
		data,
	})
}
// 查看权限
export const getAthDetail = (data) => {
	return service({
		url: '/role/queryAuth',
		method: 'POST',
		data,
	})
}
// 保存角色
export const saveRoleData = (data) => {
	return service({
		url: '/role/saveRole',
		method: 'POST',
		data,
	})
}
// 修改角色
export const updateRole = (data) => {
	return service({
		url: '/role/updateRole',
		method: 'POST',
		data,
	})
}
// 查看角色
export const getRoleDeTail = (data) => {
	return service({
		url: '/role/queryRoleByGuid',
		method: 'POST',
		data,
	})
}
// 删除角色
export const delRole = (data) => {
	return service({
		url: '/role/deleteRole',
		method: 'POST',
		data,
	})
}
// 添加子部门
export const addSubDepartment  = data => {
	return service({
		url:'/user/insertdepart2',
		method: 'POST',
		data,
	})
}
// 删除部门
export const delDepartment = data => {
	return service({
		url: '/user/delDepart',
		method: 'POST',
		data,
		params:{
			departGuid: data
		},
	})
}
// 分配权限时候的企业列表
export const getEnterpriseListsFn = data => {
	return service({
		url:'/role/getAllZBR',
		method: "POST",
		data
	})
}
// 身份证判断重复与否
export const isUserBHExist = (data) => {
	return service({
		url: '/user/isUserBHExist',
		method: 'POST',
		data
	})
}