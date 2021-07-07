import request from "../api";

const zsqyxx = {
    //正式企业列表
    queryAllQiYeList: (data) => {
        return request({
            url: `/admin/center/queryAllQiYeList`,
            data: data,
            method: 'POST'
        })
    },
    //正式企业重置密码
    updJyUser: (data) => {
        return request({
            url: `/admin/center/updJyUser`,
            data: data,
            method: 'GET'
        })
    },
    //正式企业设置无效
    updJyUserQiYe: (data) => {
        return request({
            url: `/admin/center/updJyUserQiYe`,
            data: data,
            method: 'GET'
        })
    },
    // 正式企业详情
    queryZSQiYeDetail: (data) => {
        return request({
            url: `/admin/center/queryZSQiYeDetail`,
            data: data,
            method: 'GET'
        })
    },

   // 查看审核列表
    queryShenHeList: (data) => {
        return request({
            url: `/admin/center/queryShenHeList`,
            data: data,
            method: 'GET'
        })
    },


};
export default zsqyxx;