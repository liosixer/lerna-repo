import request, { apiPrefix } from '@/api/index';

/**
 * 获取我的待办
 * @param {*} data
 * @returns
 */
export function getApproverecord(data) {
  return request({
    url: `${apiPrefix}/approverecord/list`,
    data: data,
    method: 'post',
    headers: {
      contentType: 'formType',
    },
  });
}
