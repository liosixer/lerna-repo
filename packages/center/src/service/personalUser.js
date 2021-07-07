import request from '../api/index';

const personalUser = {
  // 列表
  fetchPersonalUserList: (data) => {
    return request({
      url: `/admin/center/queryAllGerenList`,
      data: data,
      method: 'POST'
    })
  },
  // 重置密码
  fetchResetPwd: (data) => {
    return request({
      url: `/admin/center/updJyUserGeren`,
      data: data,
      method: 'GET'
    })
  },
  // 设置无效
  fetchSetInvalid: (data) => {
    return request({
      url: `/admin/center/updateJyUser`,
      data: data,
      method: 'GET'
    })
  },
  // 详情信息接口
  fetchUserInfo: (data) => {
    return request({
      url: `/admin/center/findUser`,
      data: data,
      method: 'GET'
    })
  },
  // 组织架构
  fetchOrganizationManageList: (data) => {
    return request({
      url: `/admin/center/queryOrganizationManageList`,
      data: data,
      method: 'GET'
    })
  },
  // 用户列表接口
  fetchAllUserList: (data) => {
    return request({
      url: `/admin/center/queryAllUserList`,
      data: data,
      method: 'POST'
    })
  },
}

export default personalUser