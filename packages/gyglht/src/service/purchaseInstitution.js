import loginSvs from './login'
import request from "../api";

const portService = {
    //企业基本信息查询
    queryQiYeBaseInfo: (data) => {
        return request({
            url: `/qiye/queryQiYeBaseInfo`,
            data: data,
            method: 'post'
        })
    },
    purchaseInstitutionList(data) {
        return request({
            headers: {
                contentType: 'formType'
            },
            url: `api/caiGouZhiDu/list`,
            data: data,
            method: 'post'
        })
    },
    institutionDetail(data){
        return request({
            url: `api/caiGouZhiDu/queryById`,
            data: data,
            method: 'get'
        })
    },
    institutionSave(data){
        return request({
            url: `api/caiGouZhiDu/save`,
            data: data,
            method: 'post'
        })
    },
    submitMoban(data){
        return request({
            url: `/api/caiGouZhiDu/update `,
            data: data,
            method: 'post'
        })
    },
    institutionApprove(data){
        return request({
            url: `api/caiGouZhiDu/approve`,
            data: data,
            method: 'post'
        })
    },
    qyInfo(data){
        return request({
            headers: {
                contentType: 'formType'
            },
            url: `api/caiGouZhiDu/queryQiYeInfo`,
            data: data,
            method: 'get'
        })
    },
    cgzdShHis(data){
        return request({
            url: `api/caiGouZhiDu/cgzdRecordList`,
            data: data,
            method: 'get'
        })
    },
    systemList(data){
        return request({
            url: `api/caiGouZhiDu/banKuaiZhiDuView`,
            data: data,
            method: 'get'
        })
    },
    institutionApproveRecord(data){
        return request({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url: `/api/caiGouZhiDu/approvalRecordList`,
            data: data,
            method: 'get'
        })
    },
    ...loginSvs
};
export default portService;
