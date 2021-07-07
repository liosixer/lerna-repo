import Vue from 'vue'

let VUE = new Vue()
const validate = {
	vdRequired: () => {
		return [
			{
				required: true,
				message: '不能为空！',
				trigger: ['blur', 'change'],
			},
			{
				validator: VUE.validate.fullAngleBack,
				trigger: 'blur',
			},
		]
	},
	vdArrayRequired: () => {
		return [
			{
				required: true,
				validator: VUE.validate.arrayValite,
				trigger: 'change',
			},
		]
	},
	vdRequiredTC: () => {
		return [
			{
				required: true,
				type: 'number',
				message: '不能为空！',
				trigger: ['change', 'focus', 'blur'],
			},
		]
	},
	vdLength: (max, required) => {
		return [
			{
				required: required,
				message: '不能为空！',
				trigger: 'blur',
			},
			{
				validator: VUE.validate.fullAngleBack,
				trigger: 'blur',
			},
			{
				max: max,
				message: `不能大于${max}位字符！`,
				trigger: 'blur',
			},
		]
	},
	// 单选框,多选框，下拉框限制
	vdRadio: (required) => {
		return [
			{ required: required, message: '请选择', trigger: 'change' },
			{ validator: VUE.validate.fullAngleBack, trigger: 'change' },
		]
	},
	// 时间限制
	vdTime: (required) => {
		return [
			{
				type: 'date',
				required: required,
				message: '请选择日期',
				trigger: 'change',
			},
			{ validator: VUE.validate.fullAngleBack, trigger: 'change' },
		]
	},
	vdTel: (required) => {
		return [
			{
				required: required,
				message: '手机号不能为空！',
				trigger: 'blur',
			},
			{
				validator: VUE.validate.fullAngleBack,
				trigger: 'blur',
			},
			{
				pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
				message: '请输入正确手机号！',
				trigger: 'blur',
			},
		]
	},
	vdEmail: (required) => {
		return [
			{
				required: required,
				message: '不能为空！',
				trigger: 'blur',
			},
			{
				validator: VUE.validate.fullAngleBack,
				trigger: 'blur',
			},
			{
				pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
				message: '请输入正确邮箱！',
				trigger: 'blur',
			},
		]
	},

	vdPassword: (required) => {
		return [
			{
				required: required,
				message: '不能为空！',
				trigger: 'blur',
			},
			{
				validator: VUE.validate.fullAngleBack,
				trigger: 'blur',
			},
			{
				pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{6,16}$/,
				message: '密码需为6-16位字母和数字的组合',
				trigger: 'blur',
			},
		]
	},

	vdNumber: (required) => {
		return [
			{
				required: required,
				message: '不能为空！',
				trigger: 'blur',
			},
			{
				validator: VUE.validate.fullAngleBack,
				trigger: 'blur',
			},
			{
				pattern: /^[0-9]*$/,
				message: '必须全为数字',
				trigger: 'blur',
			},
		]
	},
	nthDecimalRequired: (value3) => {
		return [
			{
				required: true,
				validator: VUE.validate.nthDecimal,
				trigger: 'blur',
				length: value3,
			},
		]
	},
	fullAngleBack: (rule, value, callback) => {
		if (/[\uFF00-\uFFFF]/g.test(value)) {
			callback(new Error('不能输入全角字符！'))
		} else {
			callback()
		}
	},
	arrayValite: (rule, value, callback) => {
		console.log(value, '======>>>>>>>>:::::::::::::')
		if (value.length === 0) {
			callback(new Error('不能为空！'))
		} else {
			callback()
		}
	},
	nthDecimal: (rule, value, callback) => {
		console.log(rule, value, callback)
		if (value.length === 0) {
			callback(new Error('不能为空！'))
		} else {
			callback()
		}
	},
	//注册登录账号验证
	vdZcZhangHao: (required) => {
		return [
			{
				required: required,
				message: '用户名不能为空！',
				trigger: 'blur',
			},
			{
				validator: VUE.validate.fullAngleBack,
				trigger: 'blur',
			},
			{
				pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{8,16}$/,
				message: '8-16位字母和数字的组合',
				trigger: 'blur',
			},
		]
	},
	//注册登录密码验证
	vdZcPassWord: (required) => {
		return [
			{
				required: required,
				message: '登录密码不能为空！',
				trigger: 'blur',
			},
			{
				validator: VUE.validate.fullAngleBack,
				trigger: 'blur',
			},
			{
				pattern: /((^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[\da-zA-Z\W]{8,20}$)|(^(?=.*\d)(?=.*[A-Z])(?=.*\W)[\da-zA-Z\W]{8,20}$)|(^(?=.*\d)(?=.*[a-z])(?=.*\W)[\da-zA-Z\W]{8,20}$)|(^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\da-zA-Z\W]{8,20}$))/,
				message:
					'8-20位字符,至少包含大写字母、小写字母、数字、特殊字符中的三种',
				trigger: 'blur',
			},
		]
	},
	//身份证号验证
	peopleID: (required) => {
		return [
			{
				required: required,
				message: '请输入身份证号码',
				trigger: 'blur',
			},
			{
				validator: VUE.validate.fullAngleBack,
				trigger: 'blur',
			},
			{
				pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
				message: '身份证格式错误',
				trigger: 'blur',
			},
		]
	},
	//企业社会信用代码验证
	qyshxydmJy: (required) => {
		return [
			{
				required: required,
				message: '请输入正确的社会信用代码！',
				trigger: 'blur',
			},
			{
				validator: VUE.validate.fullAngleBack,
				trigger: 'blur',
			},
			{
				pattern: /^(?![0-9]+$)(?![A-Z]+$)[0-9A-Z]{18,18}$/,
				message: '18位大写字母和数字的组合',
				trigger: 'blur',
			}
		]
	},
}
export default validate
