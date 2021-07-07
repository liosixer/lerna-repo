import request, { apiPrefix } from '@/api/index';

/**
 * 获取计划查询
 * @param {*} data
 * @returns
 */
export function getPlans(data) {
  return request({
    url: `${apiPrefix}/plan/list`,
    data: data,
    method: 'post',
    headers: {
      contentType: 'formType',
    },
  });
}
