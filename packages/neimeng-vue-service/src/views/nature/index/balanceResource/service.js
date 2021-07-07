import request, { apiPrefix } from '@/api/index';

/**
 * 获取资源
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
