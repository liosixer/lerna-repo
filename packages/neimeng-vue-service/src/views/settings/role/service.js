import request, { apiPrefix } from '@/api/index';

/**
 * 获取用户角色列表
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
