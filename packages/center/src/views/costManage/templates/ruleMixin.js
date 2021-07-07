export default {
    methods: {
        /**
         * 请求验证名称
         */
        async costYanZhengRuleName(rule, value, callback) {
            const data = await this.portService.costYanZhengRuleName({
                ruleName: value,
                ptfwType: this.$route.query.type
            });
            if (!data) {
                callback(new Error('网络验证错误！'));
            } else if (!data.code) {
                callback(new Error(data.info))
            } else {
                callback()
            }
        },
        /**
         * 请求验证-编号
         */
        async costYanZhengRuleBH(rule, value, callback) {
            const data = await this.portService.costYanZhengRuleBH({
                ruleBH: value,
                ptfwType: this.$route.query.type
            });
            if (!data) {
                callback(new Error('网络验证错误！'));
            } else if (!data.code) {
                callback(new Error(data.info))
            } else {
                callback()
            }
        },
        /**
         * 规则名称-校验规则
         */
        ruleNameRule(required) {
            return [
                { required: required, message: '不能为空！', trigger: 'blur'},
                { validator: this.validate.fullAngleBack, trigger: 'blur'},
                // { validator: this.costYanZhengRuleName, trigger: 'blur'}
            ]
        },
        /**
         * 规则编号-校验规则
         */
        ruleBHRule(required) {
            return [
                { required: required, message: '不能为空！', trigger: 'blur'},
                // { validator: this.costYanZhengRuleBH, trigger: 'blur'}
            ]
        }
    }
}