import request, { apiPrefix } from '@/api/index';

/**
 * 获取公告
 * @param {*} data
 * @returns
 */
export function getGonggao(data) {
  return request({
    url: `${apiPrefix}/gonggao/list`,
    data: data,
    method: 'post',
    headers: {
      contentType: 'formType',
    },
  });
}
