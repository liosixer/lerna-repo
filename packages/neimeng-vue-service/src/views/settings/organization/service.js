import request, { apiPrefix } from '@/api/index';

/**
 * 获取用户
 * @param {*} data
 * @returns
 */
export function getUserList(data) {
  return request({
    url: `${apiPrefix}/user/list`,
    data: data,
    method: 'post',
    headers: {
      contentType: 'formType',
    },
  });
}

/**
 * 获取用户角色
 * @param {*} data
 * @returns
 */
export function getUserRoleList(data) {
  return request({
    url: `${apiPrefix}/role/list`,
    data: data,
    method: 'post',
    headers: {
      contentType: 'formType',
    },
  });
}
