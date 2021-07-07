import request, { apiPrefix } from '@/api/index';

/**
 * 获取子系统列表
 * @param {*} data
 * @returns
 */
export function getSystemList(data) {
  return request({
    url: `${apiPrefix}/system/list`,
    data: data,
    method: 'post',
    headers: {
      contentType: 'formType',
    },
  });
}

/**
 * 获取模块列表
 * @param {*} data
 * @returns
 */
export function getModuleList(data) {
  return request({
    url: `${apiPrefix}/module/list`,
    data: data,
    method: 'post',
    headers: {
      contentType: 'formType',
    },
  });
}

/**
 * 获取菜单列表
 * @param {*} data
 * @returns
 */
export function getMenuList(data) {
  return request({
    url: `${apiPrefix}/menu/list`,
    data: data,
    method: 'post',
    headers: {
      contentType: 'formType',
    },
  });
}
