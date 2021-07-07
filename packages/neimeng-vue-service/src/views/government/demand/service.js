import request, { apiPrefix } from '@/api/index';

/**
 * 获取需求列表
 * @param {*} data
 * @returns
 */
export function getDemands(data) {
  return request({
    // url: `${apiPrefix}/demand/list`,
    url: `${apiPrefix}/plan/list`,
    data: data,
    method: 'post',
    headers: {
      contentType: 'formType',
    },
  });
}
