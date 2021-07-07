import { regionData } from 'element-china-area-data'
import statusOptions from '@/setting/status'
import filterOption from "@/assets/js/filter";
// import {getPCC} from '@/service/enterpriseInfo'
const sfz = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
const passport = /^1[45][0-9]{7}|([P|p|S|s]\d{7})|([S|s|G|g]\d{8})|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8})|([H|h|M|m]\d{8，10})$/
export default {
	data() {
		return {
			rules: {
				userType: [
					{
						required: true,
						message: '请选择用户类别',
						trigger: 'blur',
					},
				],
				qiYe_Name: [
					{
						required: false,
						message: '请输入完整的企业名称',
						trigger: 'blur',
					},
					{
						pattern: /^[\u4e00-\u9fa5a-z\d]+$/gi,
						message: '企业名称不能包含特殊字符',
						trigger: 'blur',
					}
				],
				zhuTiLeiXing: [
					{
						required: true,
						message: '请选择交易主体类型',
						trigger: 'cahnge',
					},
				],
				qiYeBHType: [
					{
						required: true,
						message: '请选择企业代码类型',
						trigger: 'cahnge',
					},
				],
				fddbrShengFenZhengType: [
					{
						required: true,
						message: '请选择证件类型',
						trigger: 'cahnge',
					},
				],
				qiYe_BH: [
					{
						required: false,
						message: '请输入社会信用代码',
						trigger: 'blur',
					},
					{
						pattern:/[\da-zA-Z]{18}/,
						message: '请输入正确社会信用代码',
						trigger: 'blur',
					},
				],
				yeWuFanWei:[
					{
						required: true,
						message: '请输入营业范围',
						trigger: 'blur',
					},
				],
				zhuCeYaoQingMa:[
					{
						required: true,
						message: '',
						trigger: 'blur',
					},
				],
				lianXiRenPhone:[
					{
						required: true,
						message: '',
						trigger: 'blur',
					},
				],
				isGaoXinQiYe:[
					{
						required: true,
						message: '',
						trigger: 'blur',
					},
				],
				zhuCeDiZhi:[
					{
						required: true,
						message: '',
						trigger: 'blur',
					},
				],
				isWeiXiaoQiYe:[
					{
						required: true,
						message: '',
						trigger: 'blur',
					},
				],
				ziRanRenId: [
					{
						required: true,
						message: '请输入身份证号码',
						trigger: 'blur',
					},
					{
						pattern: sfz,
						message: '请输入正确的身份证号码',
						trigger: 'blur',
					},
				],
				zhiZhao_FuJian_Name: [
					{
						required: true,
						message: '请上传营业执照附件',
						trigger: 'input',
					},
				],
				yeWuFanWeiIds: [
					{
						required: true,
						message: '请选择营业范围',
						trigger: 'change',
					},
				],
				zhuCe_ZiJin: [
					{
						required: true,
						message: '请输入注册资金',
						trigger: 'blur',
					},
					{
						pattern: /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/,
						message: '请输入正确的金额',
						trigger: 'blur',
					},
				],
				arear: [
					{
						required: true,
						message: '请选择所在行政区域',
						trigger: 'cahnge',
					},
				],
				jinYing_DiZhi: [
					{
						required: true,
						message: '请输入通讯地址',
						trigger: 'blur',
					}
				],
				zhuCe_DiZhi: [
					{
						required: true,
						message: '请输入注册地址',
						trigger: 'blur',
					}
				],
				youBian: [
					{
						pattern: /^[0-9]{6}$/,
						message: '请输入正确的邮编号码',
						trigger: 'blur',
					},
				],
				lianXiRen_Name: [
					{
						required: true,
						message: '请输入联系人',
						trigger: 'blur',
					},
					{
						pattern: /^[\u4e00-\u9fa5a-z]+$/gi,
						message: '联系人不能包含数字和特殊字符',
						trigger: 'blur',
					}
				],
				lianXiRen_Phone: [
					{
						required: true,
						message: '请输入联系电话',
						trigger: 'blur',
					},
					{
						pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
						message: '手机号码格式错误',
						trigger: 'blur',
					},
				],
				qiYePhone: [
					{
						pattern: /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,
						message: '座机号码格式错误',
						trigger: 'blur',
					},
				],
				qiYeEmail: [
					{
						pattern: /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/,
						message: '邮箱格式错误',
						trigger: 'blur',
					},
				],
				qiYeFax: [
					{
						pattern: /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,
						message: '传真号码格式错误',
						trigger: 'blur',
					},
				],
				zhiGongNum: [
					{
						pattern: /^[0-9]*$/,
						message: '请输入数字',
						trigger: 'blur',
					},
				],
				jiShuRenYuanNum: [
					{
						pattern: /^[0-9]*$/,
						message: '请输入数字',
						trigger: 'blur',
					},
				],
				fddbr_Name: [
					{
						required: true,
						message: '请输入联系人',
						trigger: 'blur',
					},
					{
						pattern: /^[\u4e00-\u9fa5a-z]+$/gi,
						message: '联系人不能包含数字和特殊字符',
						trigger: 'blur',
					}
				],

				fddbr_ShenFenZheng_BH: [
					{
						required: true,
						message: '请输入法定代证件号码',
						trigger: 'blur',
					},
					{
						pattern: sfz || passport,
						message: '请输入正确的身份证号码',
						trigger: 'blur',
					},
				],
				fddbr_ShenFenZheng_FuJian_Name: [
					{
						required: true,
						message: '请上传证件附件',
						trigger: 'cahnge',
					},
				],
				yinHangName: [
					{
						required: true,
						message: '请输入开户银行名称',
						trigger: 'blur',
					},
					{
						pattern: /^[\u4e00-\u9fa5a-z]+$/gi,
						message: '开户银行名称不能包含特殊字符',
						trigger: 'blur',
					}
				],
				yinHangZhangHao: [
					{
						required: true,
						message: '请输入开户行账号',
						trigger: 'blur',
					},
					{
						pattern: /^[1-9][0-9]{10,21}$/,
						message: '银行账号格式不正确',
						trigger: 'blur',
					},
				],
				bankAddr: [
					{
						required: true,
						message: '请选择银行所在地',
						trigger: 'cahnge',
					},
				],
				yinHang_FuJian_Name: [
					{
						required: true,
						message: '请上传开户许可证附件',
						trigger: 'blur',
					},
				],
				naShuiRenShiBieMa: [
					{
						required: false,
						message: '请输入纳税人识别码',
						trigger: 'blur',
					},
					{
						pattern:/(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)|(^\d{20}$)/,
						message: '请输入正确的纳税人识别码',
						trigger: 'blur',
					}
				],
				fp_ZhuCeAddress: [
					{
						required: true,
						message: '请输入地址',
						trigger: 'blur',
					}
				],
				zhuCe_Phone: [
					{
						required: true,
						message: '请输入电话',
						trigger: 'blur',
					},
					{
						pattern: /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,
						message: '座机号码格式错误',
						trigger: 'blur',
					},
				],
				kaiHuHangName: [
					{
						required: true,
						message: '请输入开户行名称',
						trigger: 'blur',
					},
					{
						pattern: /^[\u4e00-\u9fa5a-z]+$/gi,
						message: '开户行名称不能包含特殊字符',
						trigger: 'blur',
					}
				],
				kaiHuHangZhangHao: [
					{
						required: true,
						message: '请输入开户行账号',
						trigger: 'blur',
					},
					{
						pattern:  /^[1-9][0-9]{10,21}$/,
						message: '银行账号格式不正确',
						trigger: 'blur',
					},
				],
			},
			arearOptions: regionData,
			cat: [],
			businessRange: [],
			baseInfo: { jyUser: {}, user: {} },
			checkRecords: [], //审核记录
			moneyType: [], // 货币类型
			tableHeight: 800,// table的高度
            iscollapsider: false,// 是否为展开更多搜索条件
		}
	},
	computed:{
        //判断是否大于1920 是否显示第三个搜索条件
        isWidescreen:function() {
            let isWide = false
            let w = Number(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
            if(w>=1920 && !this.iscollapsider){
                isWide = true
            }
            return isWide
        }
    },
	methods: {
		 //计算高度
		 computeTableHeight(){
            this.$nextTick(()=>{
                let titleHei = Number(this.$refs.table_title.offsetHeight)
                let searchHei = Number(this.$refs.table_search.offsetHeight)
                let paginationHei = Number(this.$refs.table_pagination.offsetHeight)
                let h = Number(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
                let w = Number(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
                let pad = Math.ceil(20*(w/1920))*2;
                if(w<=1366){
                    pad= 20
                }
                this.tableHeight = h - titleHei - searchHei - paginationHei - 100 - pad
            })
        },
		handleUserLeibieChange() {
			const f = this.formData
			const restFn = () => {
				f.qiYe_Name = ''
				f.zhuTiLeiXing = ['T']
				f.yeWuFanWeiIds = ''
				f.zhuCe_ZiJin = ''
				f.arear = []
				f.shengId = ''
				f.shiId = ''
				f.areaId = ''
				f.zhuCe_DiZhi = ''
				f.youBian = ''
				f.lianXiRen_Name = ''
				f.qiYeEmail = ''
				f.lianXiRen_Phone = ''
				f.qiYePhone = ''
				f.qiYeHangYeOne = ''
				f.qiYeHangYeTwo = ''
				f.cat = []
				f.zhiGongNum = ''
				f.jiShuRenYuanNum = ''
				f.beiZhu = ''
				f.fddbr_Name = ''
				f.jinYing_DiZhi = ''
				f.fddbr_ShenFenZheng_BH = ''
				f.fddbr_ShenFenZheng_FuJian_Name = ''
				f.fddbr_ShenFenZheng_FuJian=''
				f.yinHangName = ''
				f.yinHangZhangHao = ''
				f.yinHangAddress =''
				f.yinHang_FuJian_Name =''
				f.yinHang_FuJian = ''
				f.naShuiRenShiBieMa = ''
				f.fp_ZhuCeAddress = ''
				f.zhuCe_Phone = ''
				f.kaiHuHangName = ''
				f.kaiHuHangZhangHao = ''
                f.qiYe_BH = ''
                f.qiYeFax = ''
			}
			if (f.userLeiBie==1){
				restFn()
				f.zhuCeZiJinDanWei = '2'
				f.zhuCeZiJinBiZhong = '156'
				f.ziRanRenId = ''
			} else {
				restFn()
				f.zhuCeZiJinDanWei = ''
				f.zhuCeZiJinBiZhong = ''
			}
			this.$refs.formData.clearValidate()
		}
	},
	filters:{
		//获取对应的类型
		getTypeNameFilter: function (type,options){
			let name =''
			statusOptions[options].forEach(v=>{
				if(v.code == type){
					name = v.name
				}
			})
			return name
		},
		timestampChange: filterOption.timestampChange
	}

}
