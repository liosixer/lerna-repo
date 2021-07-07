import request from '../api/index';

const loginSvs = {
    Login: (data) => {
        return request({
            url: `/guotou-auth/oauth/token`,
            data:data,
            method: 'POST',
            headers: {
                contentType: 'formType'
            },
        })
    },
    //注册企业
    register: (data) => {
        return request({
            url: `/reg/register`,
            data: data,
            method: 'POST'
        })
    },
    //获取短信
    getUserPhoneMessage: (data) => {
        return request({
            url: `/reg/getUserPhoneMessage`,
            data: data,
            method: 'POST',
            headers: {
                contentType: 'formType'
            },
        })
    },
    //找回密码
    reModifyPassword: (data) => {
        return request({
            url: `/reg/reModifyPassword`,
            data: data,
            method: 'POST'
        })
    },
    //账号申诉
    zhangHaoShengSu: (data) => {
        return request({
            url: `/reg/zhangHaoShengSu`,
            data: data,
            method: 'POST'
        })
    },
    //查看申诉进度
    zhangHaoShengSuJinDu: (data) => {
        return request({
            url: `/reg/zhangHaoShengSuJinDu`,
            data: data,
            method: 'POST'
        })
    },
    //用户名是否存在
    isUserNameExists: (data) => {
        return request({
            url: `/reg/isUserNameExists`,
            data: data,
            method: 'POST'
        })
    },
    //账号申诉判断账号是否存在
    isZhangHaoExists: (data) => {
        return request({
            url: `/reg/isZhangHaoExists`,
            data: data,
            method: 'POST'
        })
    },
    // 注册企业名称、代码校验接口
    fetchExistQiye: (data) => {
        return request({
            url: `/reg/isQiYeNameOrBHExists`,
            data: data,
            method: 'GET'
        })
    },
}
export default loginSvs