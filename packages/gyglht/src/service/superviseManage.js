import request from '../api/index';

const superviseManage = {
    //查询监督人设置列表页
    getJianDuXMList: (data) => {
        return request({
            url: `/jdgl/getJianDuXMList`,
            data: data,
            method: 'post'
        })
    },
    //查询所有监督人员
    queryAllJdr: (data) => {
        return request({
            url: `/jdgl/queryAllJdr`,
            data: data,
            method: 'post',
            headers: {
                contentType: 'formType'
            },
        })
    },
    //设置监督人
    fenPeiJdr: (data) => {
        return request({
            url: `/jdgl/fenPeiJdr`,
            data: data,
            method: 'post'
        })
    },
    //查询监督单位设置列表页
    queryJdList: (data) => {
        return request({
            url: `/jdgl/queryJdList`,
            data: data,
            method: 'post',
            headers: {
                contentType: 'formType'
            },
        })
    },
    //查询所有监督单位
    queryChooseZBRList: (data) => {
        return request({
            url: `/jdgl/queryChooseZBRList`,
            data: data,
            method: 'post',
            headers: {
                contentType: 'formType'
            },
        })
    },
    //添加监督单位
    saveJianDuDanWei: (data) => {
        return request({
            url: `/jdgl/saveJianDuDanWei`,
            data: data,
            method: 'post',
            headers: {
                contentType: 'formType'
            },
        })
    },
    //删除监督单位
    delJianDuDanWei: (data) => {
        return request({
            url: `/jdgl/delJianDuDanWei`,
            data: data,
            method: 'post'
        })
    }
}
export default superviseManage