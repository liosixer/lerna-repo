import request from '../api/index';

const zbrdb = {
    //查询招标人代表表格
    ZhaoBiaoRenDaiBiaoList: (data) => {
        return request({
            url: `/zbrdb/queryZhaoBiaoRenDaiBiaoList`,
            data: data,
            method: 'POST'
        })
    },
    //查询所属单位
    getAllZBR: (data) => {
        return request({
            url: `/zbrdb/getAllZBR`,
            data: data,
            method: 'POST'
        })
    },
    //查询所有企业
    getAllQiYe: (data) => {
        return request({
            url: `/zbrdb/getAllQiYe`,
            data: data,
            method: 'POST'
        })
    },
    //编辑时候获取默认信息
    queryZhaoBiaoRenDaiBiaoInfo: (data) => {
        return request({
            url: `/zbrdb/queryZhaoBiaoRenDaiBiaoInfo`,
            data: data,
            method: 'get'
        })
    },
    //保存以及修改招标人信息
    saveOrUpdateZhaoBiaoRenDaiBiao: (data) => {
        return request({
            url: `/zbrdb/saveOrUpdateZhaoBiaoRenDaiBiao`,
            data: data,
            method: 'post'
        })
    },
    //查询地区三级联动区域
    dictAllAreaList: (data) => {
        return request({
            url: `/qiye/dictAllAreaList`,
            data: data,
            method: 'get'
        })
    },
    //电话号重复判断
    isPhoneExist: (data) => {
        return request({
            url: `/zbrdb/isPhoneExist`,
            data: data,
            method: 'post'
        })
    },
    //租户-组织架构导入
    improtZzExcel: (data) => {
        return request({
            url: `/admin/organizationManage/improtExcel`,
            data: data,
            headers: {
                'Content-Type':'multipart/form-data'
            },
            method: 'post'
        })
    },
    //租户-删除租户
    deleteGjZuHu: (data) => {
        return request({
            url: `/admin/zuHuManage/deleteZuHu?guid=${data.guid}`,
            // data: data,
            // headers: {
            //     'Content-Type':'form-data'
            // },
            method: 'get'
        })
    },
    // 租户-组织架构-详情
    organizationJgManage: (data) => {
        return request({
            url: `/admin/organizationManage/detail?guid=${data.guid}&parentGuid=${data.parentGuid}`,
            // data: data,
            // headers: {
            //     'Content-Type':'form-data'
            // },
            method: 'get'
        })
    },
    // 租户-组织架构-编辑保存
    updateJgDept: (data) => {
        return request({
            url: `/admin/organizationManage/updateDept`,
            data: data,
            headers: {
                contentType: 'formType',
            },
            method: 'post'
        })
    }
}
export default zbrdb