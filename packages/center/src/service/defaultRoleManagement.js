import service from '../api/index'

// 获取角色列表
export const getRoleList = (data) => {
	return service({
		url: '/role/queryRoleListDefault',
		method: 'POST',
		data,
	})
}

// 保存角色
export const saveRoleData = (data) => {
	return service({
		url: '/role/saveRoleDefault',
		method: 'POST',
		data,
	})
}

// 删除角色
export const delRole = (data) => {
	return service({
		url: '/role/deleteRoleDefault',
		method: 'POST',
		data,
	})
}

// 修改角色
export const updateRole = (data) => {
	return service({
		url: '/role/updateRoleDefault',
		method: 'POST',
		data,
	})
}

// 保存权限设置
export const saveRules = (data) => {
	return service({
		url: '/role/saveFPAuthDefault',
		method: 'POST',
		data,
	})
}

// 权限树
export const getRules = (data) => {
	return service({
		url: '/admin/authManage/getAuthTreeDefault',
		method: 'get',
		data,
	})
}

export const getUserList = (data) => {
	return service({
		url: `/user/queryUserListDefault`,
		method: 'POST',
		data,
	})
}

// 查看权限
export const getAthDetail = (data) => {
	return service({
		url: '/role/queryAuthDefault',
		method: 'POST',
		data,
	})
}

// 分配权限时候的企业列表
export const getEnterpriseListsFn = data => {
	return service({
		url:'/role/getAllZBRDefault',
		method: "POST",
		data
	})
}

// 获取部门列表
export const getDepartment = (data) => {
	return service({
		url: `/user/querydeparttreegridDefault`,
		method: 'POST',
		headers: {
			contentType: 'formType',
		},
		data,
	})
}
