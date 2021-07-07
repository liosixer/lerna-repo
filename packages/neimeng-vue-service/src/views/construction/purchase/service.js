import request, { apiPrefix } from '@/api/index';

/**
 * 获取我的待办
 * @param {*} data
 * @returns
 */
export function getProjectBd(data) {
  return request({
    url: `${apiPrefix}/projectbd/list`,
    data: data,
    method: 'post',
    headers: {
      contentType: 'formType',
    },
  });
}
