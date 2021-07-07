import { getDepartment,  } from '@/service/roleAndDepartment'
import {getEnterpriseInfo,isShowSpeAuth} from '@/service/enterpriseInfo'
import menuList from "./menuData";
export default {
	state: {
		currentDepartment: {},
		department: [],
		enterPriseInfo: {jyUser:{
				shenPi_ZhuangTai: 0,
				accountName:''
			}},
		menuList:[],
		loaded: false,
		isShow: false,
		zhutiLeixing: []
	},
	mutations: {
		setShow(state, data) {
			state.isShow = data
		},
		setZhutiLeixing(state, data) {
			state.zhutiLeixing = data
		},
		setCurrentDepartment(state, data) {
			state.currentDepartment = data
		},
		// 设置部门数据
		setDepartment(state, data) {
			state.department = data
		},
		setEnterpriseInfo (state, data) {
			state.enterPriseInfo = data
		},
		setMenuList (state, data) {
			state.menuList = data
		},
		setLoaded (state, data) {
			state.loaded = data
		},
		// 清空state
        clearState: function (state, info) {
            for (var k in state) {
                state[k] = {}
            }
        },
	},
	actions: {
		getDepartmentData({ state, commit }) {
			getDepartment().then((res) => {
				commit('setDepartment', res)
			}).then(() => {
				if (Object.keys(state.currentDepartment).length === 0) {
					if (state.department.length > 0) commit('setCurrentDepartment', state.department[0])
				}
			})
		},
		getEnterpriseInfo({state, commit}) {
			getEnterpriseInfo().then(res => {
				if (res.data.data) {
					commit('setShow', res.data.show)
					commit('setZhutiLeixing', res.data.zsZhuTiLeiXing ? res.data.zsZhuTiLeiXing.split(',') : [])
					this.baseInfo = res.data.data
					this.baseInfo.isShow = res.data.show
					const d = JSON.parse(JSON.stringify(res.data.data))
					d.zhuTiLeiXing = d.zhuTiLeiXing ? d.zhuTiLeiXing.split(',') : []
					if (d.shengId) {
						if (d.areaId) {
							d.arear = [d.shengId ? d.shengId.toString() : null, d.shiId ? d.shiId.toString() : null, d.areaId ? d.areaId.toString() : '']
						} else {
							d.arear = [d.shengId ? d.shengId.toString() : null, d.shiId ? d.shiId.toString() : null]
						}
						// if(d.shiId){
						// 	d.arear = [d.shengId?d.shengId.toString():null,d.shiId?d.shiId.toString():null]
						// }else{
						// 	d.arear = [d.shengId?d.shengId.toString():null]
						// }

					}
					if (d.qiYeBHType == null || d.qiYeBHType === 1) {
						d.qiYeBHType = 2
					}
					// ，默认主题类别
					if (d.userLeiBie == null) {
						d.userLeiBie = 1
					}
					// 默认币种
					if (d.zhuCeZiJinBiZhong == null) {
						d.zhuCeZiJinBiZhong = '156'
					} else {
						d.zhuCeZiJinBiZhong = d.zhuCeZiJinBiZhong.toString()
					}
					//默认单位
					if (d.zhuCeZiJinDanWei == null) {
						d.zhuCeZiJinDanWei = '2'
					}
					// 默认选择身份证
					if (d.fddbrShengFenZhengType == null) {
						d.fddbrShengFenZhengType = 100
					}
					commit('setEnterpriseInfo', d)
					if (d.isHasSubmit == 1) {
						isShowSpeAuth().then(showSpeAuth=>{//判断是否有专业审核权限菜单
                            commit('setEnterpriseInfo', d)
                            const t = res.data.zsZhuTiLeiXing.split(',')
							// A为招标代理,B:招标人/采购人,T为投标人/供应商
							if (!t.includes('T')) {
								if (t.includes('B')) {
                                    let allMenu=[...menuList.baseMenu3, ...menuList.appendMenu]
                                    if(!showSpeAuth){
                                        allMenu = getMune(allMenu)
                                    }
                                    commit('setMenuList', allMenu)
								} else {
                                    let allMenu= [...menuList.baseMenu2, ...menuList.appendMenu]
                                    if(!showSpeAuth){
                                        allMenu = getMune(allMenu)
                                    }
                                    commit('setMenuList', allMenu)
								}
							} else {
								if (t.includes('T') && t.length ===1 ) {
                                    let allMenu=[...menuList.baseMenu]
                                    if(!showSpeAuth){
										allMenu = getMune(allMenu)
                                    }
                                    commit('setMenuList', allMenu)
								} else {
									if (t.includes('B')) {
                                        let allMenu=[...menuList.baseMenu4, ...menuList.appendMenu]
                                        if(!showSpeAuth){
                                            allMenu = getMune(allMenu)
                                        }
                                        commit('setMenuList', allMenu)
									} else {
                                        let allMenu=[...menuList.baseMenu, ...menuList.appendMenu]
                                        if(!showSpeAuth){
                                            allMenu = getMune(allMenu)
                                        }
                                        commit('setMenuList', allMenu)
									}
								}
							}
						})
					} else {
						const menu = [{
							name: "企业信息",
							path: "",
							icon: "icon-xinxi",
							children: [
								{
									name: "企业基本信息",
									path: "/qyxxgl/qyjbxx"
								}
							]
						}]
						commit('setMenuList', menu)
					}
					commit('setLoaded', true)
				}
			}).catch(e => {
				console.error(e)
			})
            const getMune = (munes) => {//去掉专业审核权限菜单
                let menuCur = munes
                const index = menuCur.findIndex(v => v.name == '个性化配置')
				console.log(index)
				if(index!=-1){
					menuCur[index] = {
						name: "个性化配置",
						path: "",
						icon: "icon-xiangmuguanli",
						children: [
							{
								name: "供应商专业标签",
								path: "/qyxxgl/gyszybq"
							}
						]
					}
				}
                return menuCur
            }
		}
	},
}
