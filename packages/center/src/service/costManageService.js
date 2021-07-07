import request from '../api/index';

const cost = {
    /**
     * 平台使用费设置列表
     * @param {Object} data 
     * @param {String} data.ruleName 非必须 规则名称
     * @param {String} data.ruleBH 非必须 规则编号
     * @param {Number} data.ptfwRuleType 非必须 规则类型  1标准进制 2梯度进制
     * @param {Number} data.isYouXiao 非必须 1是否有效 0无效 1有效
     * @param {Number} data.page 必须 页码
     * @param {Number} data.rows 必须 行数
     * @returns request
     */
    costQueryList: (data) => {
        return request({
            url: `/admin/ptfwf/queryList`,
            data: data,
            method: 'POST'
        })
    },
    /**
     * 代理服务费设置列表
     * @param {Object} data 
     * @param {String} data.ruleName 非必须 规则名称
     * @param {String} data.ruleBH 非必须 规则编号
     * @param {Number} data.ptfwRuleType 非必须 规则类型  1标准进制 2梯度进制
     * @param {Number} data.isYouXiao 非必须 1是否有效 0无效 1有效
     * @param {Number} data.page 必须 页码
     * @param {Number} data.rows 必须 行数
     * @returns request
     */
    costQueryDaiLi: (data) => {
        return request({
            url: `/admin/ptfwf/queryDaiLi`,
            data: data,
            method: 'POST'
        })
    },
    /**
     * 费用管理添加
     * @param {Object} data 
     * @param {String} data.ruleName 规则名称
     * @param {String} data.ruleBH 规则编号
     * @param {Number} data.ptfwType 服务费类型 1代理服务费 2 平台使用费
     * @param {Number} data.ptfwRuleType 计算规则类型 1梯度进制2标准进制
     * @param {Number} data.countAmount 金额类型 1预算价 2是成交价
     * @param {Number} data.isYouXiao 有效性 1有效 2无效
     * @returns request
     */
    costManageAdd: (data) => {
        return request({
            url: `/admin/ptfwf/save`,
            data: data,
            method: 'POST'
        })
    },
    /**
     * 费用管理添加
     * @param {Object} data 
     * @param {String} data.ruleName 规则名称
     * @param {String} data.ruleBH 规则编号
     * @param {Number} data.ptfwType 服务费类型 1代理服务费 2 平台使用费
     * @param {Number} data.ptfwRuleType 计算规则类型 1梯度进制2标准进制
     * @param {Number} data.countAmount 金额类型 1预算价 2是成交价
     * @param {Number} data.isYouXiao 有效性 1有效 2无效
     * @param {Number} data.guid 有效性 1有效 2无效
     * @returns request
     */
    costManageUpdate: (data) => {
        return request({
            url: `/admin/ptfwf/update`,
            data: data,
            method: 'POST'
        })
    },
    /**
     * 验证规则名称是否存在
     * @param {Object} data 
     * @param {String} data.ruleName 必须 规则名称
     * @param {String} data.ptfwType 必须 1 代理服务费 2 平台使用费
     * @returns request
     */
    costYanZhengRuleName: (data) => {
        return request({
            url: `/admin/ptfwf/yanZhengRuleName`,
            data: data,
            method: 'POST'
        })
    },
    /**
     * 验证规则编号是否存在
     * @param {Object} data 
     * @param {String} data.ruleBH 必须 规则编号
     * @param {String} data.ptfwType 必须 1 代理服务费 2 平台使用费
     * @returns request
     */
    costYanZhengRuleBH: (data) => {
        return request({
            url: `/admin/ptfwf/yanZhengRuleBH`,
            data: data,
            method: 'POST'
        })
    },
    /**
     * 删除费用管理规则
     * @param {Object} data 
     * @param {String} data.guid 必须 规则主键
     * @returns request
     */
    costDelete: (data) => {
        return request({
            url: `/admin/ptfwf/delete`,
            data: data,
            method: 'GET'
        })
    },
    /**
     * 获取规则详情
     * @param {Object} data 
     * @param {String} data.guid 必须 规则主键
     * @returns request
     */
    costDetail: (data) => {
        return request({
            url: `/admin/ptfwf/detail`,
            data: data,
            method: 'GET'
        })
    },
    /**
     * 获取详细列表
     * @param {Object} data 
     * @param {String, Number} data.ruleGuid 必须 规则详细guid
     * @returns request
     */
    costGetInfoListByRuleId: (data) => {
        return request({
            url: `/admin/ptfwf/getInfoListByRuleId`,
            data: data,
            method: 'GET'
        })
    },
    /**
     * 新增规则详情
     * @param {Object} data 
     * @param {String} data.feiLv 必须 费率
     * @param {String} data.maxValue 必须 最大基准
     * @param {String} data.minValue 必须 最小基准
     * @param {String} data.ruleGuid 必须 规则guid
     * @param {Number} data.sequence 必须 第几档
     * @returns request
     */
    costAddOneRule: (data) => {
        return request({
            url: `/admin/ptfwf/addOneRule`,
            data: data,
            method: 'POST'
        })
    },
    /**
     * 编辑规则详情
     * @param {Object} data 
     * @param {String} data.feiLv 必须 费率
     * @param {String} data.guid 必须 规则详细的主键
     * @param {String} data.maxValue 必须 最大基准
     * @param {String} data.minValue 必须 最小基准
     * @param {String} data.ruleGuid 必须 规则guid
     * @param {Number} data.sequence 必须 第几档
     * @returns request
     */
    costEditOneRule: (data) => {
        return request({
            url: `/admin/ptfwf/updateOneRule`,
            data: data,
            method: 'POST'
        })
    },
    /**
     * 新增规则详情是获取比邻项
     * @param {Object} data
     * @param {String} data.ruleGuid 必须 规则guid
     * @param {Number} data.sequence 必须 第几档
     * @returns request
     */
    costGetAdJionInfoForAdd: (data) => {
        return request({
            url: `/admin/ptfwf/getAdJionInfoForAdd`,
            data: data,
            method: 'GET'
        })
    },
    /**
     * 编辑规则详情是获取比邻项
     * @param {Object} data
     * @param {String} data.ruleGuid 必须 规则guid
     * @param {Number} data.sequence 必须 第几档
     * @returns request
     */
    costGetAdJionInfoForEdit: (data) => {
        return request({
            url: `/admin/ptfwf/getAdJionInfoForEdit`,
            data: data,
            method: 'GET'
        })
    },
    /**
     * 编辑规则详情是获取比邻项
     * @param {Object} data
     * @param {String} data.guid 必须 规则guid
     * @returns request
     */
    costDeleteOneRule: (data) => {
        return request({
            url: `/admin/ptfwf/deleteOneRule`,
            data: data,
            method: 'POST'
        })
    }
}

export default cost;
