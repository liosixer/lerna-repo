import request, { apiPrefix } from '@/api/index';

/**
 * 获取公告
 * @param {*} data
 * @returns
 */
export function getResource(data) {
  return request({
    url: `${apiPrefix}/resource/list`,
    data: data,
    method: 'post',
    headers: {
      contentType: 'formType',
    },
  });
}
