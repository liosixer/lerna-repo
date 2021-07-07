import request from '../api/index';

const cost = {
    /**
     * 用户管理-树节点查询
     * @param {Object} data 
     * @param {String} data.pid 必须 根节点  默认为0
     * @returns request
     */
    userQueryAllUserList: (data) => {
        return request({
            url: `/admin/organizationManage/queryAllUserList`,
            data: data,
            method: 'POST'
        })
    },
    /**
     * 组织架构-用户管理- 用户删除操作
     * @param {Object} data 
     * @param {String} data.userGuid 必须 根节点  默认为0
     * @returns request
     */
    userDelUser: (data) => {
        return request({
            url: `/admin/organizationManage/delUser`,
            data: data,
            method: 'GET'
        })
    },
    /**
     * 组织架构-用户管理-查询单个用户
     * @param {Object} data 
     * @param {String} data.userGuid 必须 根节点  默认为0
     * @returns request
     */
    userFindUser: (data) => {
        return request({
            url: `/admin/organizationManage/findUser`,
            data: data,
            method: 'GET'
        })
    },
    /**
     * 组织架构-用户管理- 用户编辑
     * @param {Object} data 
     * @param {String} data.userGuid 必须 根节点  默认为0
     * @returns request
     */
    userUpdateUser: (data) => {
        return request({
            url: `/admin/organizationManage/updateUser`,
            data: data,
            method: 'POST'
        })
    },
    /**
     * 用户管理-树节点查询
     * @param {Object} data 
     * @param {String} data.pid 必须 根节点  默认为0
     * @returns request
     */
    userManageList: (data) => {
        return request({
            url: `/admin/organizationManage/queryOrganizationManageList`,
            data: data,
            method: 'GET'
        })
    },
    /**
     * 用户管理-新增/修改组织
     * @param {Object} data 
     * @param {Number} data.type 必须 新增0 修改1
     * @param {Number} data.qiyeBumen 必须 组织类型 0 企业 1 部门
     * @param {Number} data.deptType 必须 部门类型
     * @param {Number} data.parentGuid 必须 父类组织id
     * @param {String} data.deptName 必须 部门类型
     * @param {String} data.qiyeDaima 必须 部门类型
     * @param {String} data.guid 必须 组织编辑时 guid 新增为空	
     * @returns request
     */
    suerSaveOrganization: (data) => {
        return request({
            url: `/admin/organizationManage/saveOrganization`,
            data: data,
            method: 'POST'
        })
    },
    /**
     * 用户管理--查看组织
     * @param {Object} data 
     * @param {Number} data.guid 必须 guid
     * @returns request
     */
    suerQueryOrganization: (data) => {
        return request({
            url: `/admin/organizationManage/queryOrganization`,
            data: data,
            method: 'GET'
        })
    },
    /**
     * 用户管理--查看组织
     * @param {Object} data 
     * @param {Number} data.guid 必须 guid
     * @returns request
     */
    suerFindOrganizationTree: (data) => {
        return request({
            url: `/admin/organizationManage/findOrganizationTree`,
            data: data,
            method: 'GET'
        })
    },
    /**
     * 用户管理-添加用户信息
     * @param {Object} data 
     * @param {String} data.accountName 非必须 注册用户名
     * @param {String} data.password 非必须 密码
     * @param {String} data.user_Name 非必须 用户名
     * @param {Number} data.isYouXiao 非必须 有效不
     * @param {Number} data.shenfen 非必须 身份类型
     * @param {String} data.user_BH 非必须 编号
     * @param {String} data.user_Email 非必须 邮件
     * @param {String} data.guid 非必须 组织id	
     * @returns request
     */
    userAddOrganization: (data) => {
        return request({
            url: `/admin/organizationManage/addUser`,
            data: data,
            method: 'POST'
        })
    },
    /**
     * 组织架构-用户管理- 用户编辑
     * @param {Object} data 
     * @param {String} data.accountName 非必须 注册用户名
     * @param {String} data.password 非必须 密码
     * @param {String} data.user_Name 非必须 用户名
     * @param {Number} data.isYouXiao 非必须 有效不
     * @param {Number} data.shenfen 非必须 身份类型
     * @param {String} data.user_BH 非必须 编号
     * @param {String} data.user_Email 非必须 邮件
     * @param {String} data.guid 非必须 组织id	
     * @returns request
     */
    userUpdateOrganization: (data) => {
        return request({
            url: `/admin/organizationManage/updateUser`,
            data: data,
            method: 'POST'
        })
    },
    /**
     * 用户管理-删除
     * @param {Object} data 
     * @param {String} data.departGuid 非必须 删除的guid
     * @returns request
     */
    userDelOrganization: (data) => {
        return request({
            url: `/admin/organizationManage/delOrganization`,
            data: data,
            method: 'GET'
        })
    },
    /**
     * 用户管理-添加用户前查询组织
     * @param {Object} data 
     * @param {String} data.guid 非必须 组织id
     * @returns request
     */
    userFindOrganizationTree: (data) => {
        return request({
            url: `/admin/organizationManage/findOrganizationTree`,
            data: data,
            method: 'GET'
        })
    },
    /**
     * 用户管理-判断身份证是否存在
     * @param {Object} data 
     * @param {String} data.roleGuid 必须 角色guid
     * @returns request
     */
    userIsIDcard: (data) => {
        return request({
            url: `/admin/roleManage/isUserBHExist`,
            data: data,
            method: 'POST'
        })
    },
    /**
     * 用户管理-判断身份证是否存在
     * @param {Object} data 
     * @param {String} data.userBH 必须 身份证号
     * @returns request
     */
    userUserBH: (data) => {
        return request({
            url: `/admin/organizationManage/yanZhengUserBH`,
            data: data,
            method: 'GET'
        })
    },
    /**
     * 组织架构-用户管理-添加用户 登录名称验证
     * @param {Object} data 
     * @param {String} data.account 必须 登录名
     * @param {String} data.guid 必须 新增无 编辑有
     * @returns request
     */
    userAccountName: (data) => {
        return request({
            url: `/admin/organizationManage/checkAccountName`,
            data: data,
            method: 'GET'
        })
    },
    /**
     * 组织架构-用户管理-添加用户 登录名称验证
     * @param {Object} data 
     * @param {String} data.roleName 非必须 用户名称
     * @param {String} data.roleNo 非必须 用户编号
     * @param {String} data.page 非必须 页面
     * @param {String} data.rows 非必须 条数
     * @returns request
     */
    roleQueryList: (data) => {
        return request({
            url: `/admin/roleManage/queryRoleList`,
            data: data,
            method: 'GET'
        })
    },
    /**
     * 角色管理-删除
     * @param {Object} data 
     * @param {String} data.guid 非必须 角色guid
     * @returns request
     */
    roleDelete: (data) => {
        return request({
            url: `/admin/roleManage/deleteRole`,
            data: data,
            method: 'GET'
        })
    },
    /**
     * 角色管理-更新
     * @param {Object} data 
     * @param {String} data.guid 非必须 角色guid
     * @param {String} data.roleName 非必须 角色名称
     * @param {String} data.beiZhu 非必须 备注
     * @param {String} data.roleNo 非必须 角色编号
     * @param {String} data.roleZhuangTai 非必须 角色状态
     * @returns request
     */
    roleUpdate: (data) => {
        return request({
            url: `/admin/roleManage/updateRole`,
            data: data,
            method: 'POST'
        })
    },
    /**
     * 角色管理-查询
     * @param {Object} data 
     * @param {String} data.guid 非必须 角色guid
     * @returns request
     */
    roleQuery: (data) => {
        return request({
            url: `/admin/roleManage/queryRole`,
            data: data,
            method: 'GET'
        })
    },
    /**
     * 角色管理-保存
     * @param {Object} data 
     * @param {String} data.guid 非必须 角色guid
     * @returns request
     */
    roleSave: (data) => {
        return request({
            url: `/admin/roleManage/saveRole`,
            data: data,
            method: 'POST'
        })
    },
    /**
     * 权限管理-查询权限组织树
     * @param {Object} data 
     * @param {String} data.subSystemId 非必须 系统id 无可不传
     * @returns request
     */
    roleAuthTree: (data) => {
        return request({
            url: `/admin/authManage/getAuthTree`,
            data: data,
            headers: {
                contentType: 'formType'
            },
            method: 'POST'
        })
    },
    /**
     * 用户管理-查询企业树
     * @param {Object} data 
     * @returns request
     */
    roleOrganizationTree: (data) => {
        return request({
            url: `/admin/organizationManage/getQiYeTree`,
            data: data,
            method: 'POST'
        })
    },
    /**
     * 角色管理-查询已分配角色用户列表
     * @param {Object} data 
     * @param {String} data.roleGuid 非必须 角色id
     * @returns request
     */
    roleDistributionRoleList: (data) => {
        return request({
            url: `/admin/roleManage/queryDistributionRoleList`,
            data: data,
            method: 'POST'
        })
    },
    /**
     * 角色管理-删除角色用户
     * @param {Object} data 
     * @param {String} data.userId 非必须 角色id
     * @param {String} data.roleId 非必须 角色id
     * @returns request
     */
    roleDeleteUser: (data) => {
        return request({
            url: `/admin/roleManage/deleteRoleUser`,
            data: data,
            headers: {
                contentType: 'formType'
            },
            method: 'POST'
        })
    },
    /**
     * 角色管理-点击添加-查询未分配的用户
     * @param {Object} data 
     * @returns request 
     */
    roleQueryUnDistriRoleList: (data) => {
        return request({
            url: `/admin/roleManage/queryUnDistributionRoleList`,
            data: data,
            headers: {
                contentType: 'formType'
            },
            method: 'POST'
        })
    },
    /**
     * 角色管理-点击添加-查询已分配的用户
     * @param {Object} data 
     * @param {Object} data.pid 
     * @param {Object} data.roleId 
     * @returns request
     */
    roleQueryUseDistri: (data) => {
        return request({
            url: `/admin/roleManage/queryRoleUseDistributioned`,
            data: data,
            method: 'POST'
        })
    },
    /**
     * 角色管理-保存分配权限
     * @param {Object} data 
     * @param {String} data.roleGuid 必须 角色guid
     * @param {Array} data.authGuid 必须 选择的分配权限  
     * @param {String} data.isHaveProject 必须 是否具有项目 范围查看  
     * @param {Array} data.isHaveProjectDepart 必须 查看部门 
     * @param {Array} data.qiYeId 必须 选择的部门id 
     * @param {String} data.isHaveMajor 必须 是否具有审核企业权限
     * @param {String} data.isHaveSubQiye 必须 是否具有 下属单位审核
     * @param {Array} data.subQiyeId 必须 下属单位的id 
     * @returns request
     */
    roleSaveFPAuth: (data) => {
        return request({
            url: `/admin/roleManage/saveFPAuth`,
            data: data,
            // headers: {
            //     contentType: 'formType'
            // },
            method: 'POST'
        })
    },
    /**
     * 权限管理-获取列表
     * @param {Object} data 
     * @param {Number} data.page 必须 页码
     * @param {Number} data.rows 必须 行数
     * @param {name} data.name 非必须 子系统名称
     * @returns request 
     */
    authorityManagementList: (data) => {
        return request({
            url: `/admin/authManage/querySubSystem.do`,
            data: data,
            headers: {
                contentType: 'formType'
            },
            method: 'POST'
        })
    },
    /**
     * 权限管理-查看子系统所有权限
     * @param {Object} data 
     * @param {subSystemId} data.subSystemId 必须 id
     * @returns request 
     */
    getSubSystemIdAuthTree: (data) => {
        return request({
            url: `/admin/authManage/getSubSystemIdAuthTree.do`,
            data: data,
            method: 'GET'
        })
    },
    /**
     * 权限管理-获取权限详细信息
     * @param {Object} data 
     * @param {guid} data.guid 必须 权限id
     * @returns request 
     */
    showAuthDetail: (data) => {
        return request({
            url: `/admin/authManage/showAuthDetail.do`,
            data: data,
            method: 'GET'
        })
    },
    /**
     * 权限管理-保存权限
     * @param {Object} data 
     * @param 
     * @returns request 
     */
    saveAuthMessage: (data) => {
        return request({
            url: `/admin/authManage/saveAuthMessage.do`,
            data: data,
            method: 'POST'
        })
    },
    /**
     * 权限管理-修改权限
     * @param {Object} data 
     * @param {guid} data.guid 必须 权限id
     * @returns request 
     */
    updateAuthDetail: (data) => {
        return request({
            url: `/admin/authManage/updateAuthDetail.do`,
            data: data,
            method: 'POST'
        })
    },
    /**
     * 权限管理-删除权限
     * @param {Object} data 
     * @param {guid} data.guid 必须 权限id
     * @returns request 
     */
    delAuth: (data) => {
        return request({
            url: `/admin/authManage/delAuth`,
            data: data,
            method: 'GET'
        })
    },
    /**
     * 租户、企业部门-列表
     * @param {Object} data 
     * @param {guid} data.pageSize data.pageNo 必须传项
     * @returns request 
     */
    getZhUserList: (data) => {
        return request({
            url: `/admin/zuHuManage/getUserList`,
            data: data,
            headers: {
                contentType: 'formType'
            },
            method: 'POST'
        })
    },
    /**
     * 租户、企业部门-详情
     * @param {Object} data 
     * @param {guid} data.pageSize data.pageNo 必须传项
     * @returns request 
     */
    getZhUserByGuid: (data) => {
        return request({
            url: `/admin/zuHuManage/getUserByGuid?guid=${data.guid}`,
            // data: data,
            // headers: {
            //     contentType: 'formType'
            // },
            method: 'GET'
        })
    },
    /**
     * 租户、企业部门-保存
     * @param {Object} data 
     * @param {guid} data内容同详情，其中编辑时，带guid表示修改，不带为新增。
     * @returns request 
     */
    saveZuHuInfo: (data) => {
        return request({
            url: `/admin/zuHuManage/saveZuHu`,
            data: data,
            headers: {
                contentType: 'formType'
            },
            method: 'POST'
        })
    },
    /**
     * 权限用户管理列表查询
     */
    queryUserList: (data) => {
        return request({
            url: `/admin/yonghu/queryAllYongHuList.do`,
            data: data,
            // headers: {
            //     contentType: 'formType'
            // },
            method: 'POST'
        })
    },
    /**
     * 用户删除
     */
    userAuthDel: (data) => {
        return request({
            url: `/admin/yonghu/delete.do`,
            data: data,
            // headers: {
            //     contentType: 'formType'
            // },
            method: 'get'
        })
    },
    /**
     * 用户信息保存
     */
    userInfoSave: (data) => {
        return request({
            url: `/admin/yonghu/save.do`,
            data: data,
            method: 'POST'
        })
    },
    /**
     * 用户信息编辑
     */
    userInfoUpdate: (data) => {
        return request({
            url: `/admin/yonghu/update.do`,
            data: data,
            method: 'POST'
        })
    },
    /**
     * 用户信息查询
     */
    userInfoDetailQuery: (data) => {
        return request({
            url: `/admin/yonghu/detail.do`,
            data: data,
            method: 'get'
        })
    },
    /**
     * 所有角色查询
     */
    allRolesQuery: (data) => {
        return request({
            url: `/admin/yonghu/allJueSe.do`,
            data: data,
            method: 'get'
        })
    },
    /**
     * 控制中心所有角色查询
     */
    allRolesQueryCtrs: (data) => {
        return request({
            url: `/admin/roleManage/queryRoleList.do`,
            data: data,
            method: 'get'
        })
    },
    /**
     * 分配角色
     */
    DisRoles: (data) => {
        return request({
            url: `/admin/yonghu/fenPeiRole.do`,
            data: data,
            method: 'get'
        })
    },
    /**
     * 查询当前用户角色
     */
    rolesQueryByUser: (data) => {
        return request({
            url: `/admin/yonghu/chooseRoles.do`,
            data: data,
            method: 'get'
        })
    },
    /**
     * 查询所有租户
     */
    zuhuQueryAll: (data) => {
        return request({
            url: `/admin/yonghu/getUserList.do`,
            data: data,
            headers: {
                contentType: 'formType'
            },
            method: 'post'
        })
    },
    /**
     * 删除角色
     */
    roleDelByUser: (data) => {
        return request({
            url: `/admin/yonghu/deletejs.do`,
            data: data,
            method: 'get'
        })
    },
}

export default cost;

export const stateUserManageList = cost.userManageList;
