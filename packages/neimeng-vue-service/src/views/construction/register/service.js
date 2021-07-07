import request, { apiPrefix } from '@/api/index';

/**
 * 获取我的待办
 * @param {*} data 
 * @returns 
 */
 export function getProject(data) {
  return request({
    url: `${apiPrefix}/project/list`,
    data: data,
    method: 'post',
    headers: {
      contentType: 'formType',
    },
  });
}