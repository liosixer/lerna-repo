<template>
	<section class="container table-flex">
		<div class="procurement-plan-title global-title" ref="table_title">
			<page-crumb :d="{breadcrumbList:breadcrumbList}">
				<div class="search-btnGroud" slot="btns">
					<el-button type="text" @click="zbrdbAddFun" size="small"><i class="iconfont icon-xinzeng"></i>添加租户</el-button>
					<el-popover class="search-term" placement="bottom" width="300" trigger="click" v-model="iscollapsider">
						<el-form
						:model="zbrdbCheckData"
						ref="zbrdbCheckData"
						size="small"
						label-width="100px"
						label-position="right">
							<el-form-item label="租户名称:">
								<el-input placeholder="请输入" v-model="zbrdbCheckData.zuHuName" size="small"></el-input>
							</el-form-item>
							<el-form-item label="租户代码:">
								<el-input placeholder="请输入" v-model="zbrdbCheckData.zuHuCode" size="small"></el-input>
							</el-form-item>
							<el-form-item label="租户类型:">
								<el-select placeholder="请选择" v-model="zbrdbCheckData.zuHuType" size="small">
									<el-option value="0" label="招标/采购人"></el-option>
									<el-option value="1" label="招标代理"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="联系人:">
								<el-input placeholder="请输入" v-model="zbrdbCheckData.lianXiRen" size="small"></el-input>
							</el-form-item>
							<el-form-item label="联系电话:">
								<el-input placeholder="请输入" v-model="zbrdbCheckData.lianXiPhone" size="small"></el-input>
							</el-form-item>
								<div class="search-form-footer">
									<el-button @click.stop="handleSearch" size="small" type="primary" icon="el-icon-search">查询</el-button>
									<el-button @click.stop="resetBtn" size="small" icon="el-icon-refresh-right">重置</el-button>
								</div>
						</el-form>
						<el-button slot="reference" size="small" type="text">
							筛选条件<i class="el-icon-arrow-down"></i>
						</el-button>
					</el-popover>
				</div>
			</page-crumb>
		</div>
		<div class="global-content">
			<div class="global-content-search clearfix" ref="table_search"></div>
			<div class="global-content-detail">
				<self-table :data="zbrdbTableData"
					border
					style="width:100%;margin:0;"
					:height="tableHeight"
					:fit="true"
				>
					<el-table-column type="index" label="序号" align="center" show-overflow-tooltip width="80"></el-table-column>
					<el-table-column prop="zuHuName" label="租户名称" min-width="150" show-overflow-tooltip ></el-table-column>
					<el-table-column prop="zuHuCode" label="租户代码" min-width="150" show-overflow-tooltip ></el-table-column>
					<el-table-column prop="zuHuType" label="租户类型" min-width="100">
						<template slot-scope="{ row }" v-if="row.zuHuType">
							<span v-if="row.zuHuType == '0'">招标人/采购人</span>
							<span v-else-if="row.zuHuType == '1'">招标代理</span>
							<span v-else>招标人/采购人,招标代理</span>
						</template>
					</el-table-column>
					<el-table-column prop="lianXiRen" label="联系人" min-width="100"></el-table-column>
					<el-table-column prop="lianXiPhone" label="联系电话" min-width="100"></el-table-column>
					<el-table-column prop="createTime" label="入驻时间" min-width="150" show-overflow-tooltip >
						<template slot-scope="scope">
						{{ scope.row.createTime | timestampChange }}
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="操作" min-width="255" align="left">
						<template slot-scope="scope">
						<el-button-group class="operation-button-group">
							<el-button type="primary" plain class="operation-button" size="small" @click="zbrdbBjFun(scope.row)">
								<i class="iconfont icon-bianji2"><span>编辑</span></i>
							</el-button>
							<el-button type="info" plain class="operation-button redBtn" size="small" @click="zbrdbDeletFun(scope.row.guid)">
								<i class="iconfont icon-shanchu1"><span>删除</span></i>
							</el-button>
							<el-button type="primary" plain class="operation-button" size="small" @click="zbrdbFpqxFun(scope.row.guid)" >
								<i class="iconfont icon-fenpeiquanxian" style="font-size:18px;"><span>设置权限</span></i>
							</el-button>
							<el-button type="primary" plain class="operation-button" size="small" @click="goInstitutions(scope.row)" >
								<i class="iconfont icon-fenpeiquanxian" style="font-size:18px;"><span>组织架构</span></i>
							</el-button>
						</el-button-group>
						</template>
					</el-table-column>
				</self-table>
			</div>
			<div class="com-table-pagination clearfix" ref="table_pagination">
				<v-pagination
					:total="total"
					:page="zbrdbCheckData.pageNo"
					:limit="zbrdbCheckData.pageSize"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
				></v-pagination>
			</div>
		</div>
	</section>
</template>

<script>
	import VPagination from "@/components/VPagination";
	import PageCrumb from "@/components/PageCrumb";
	import mixins from "../mixin";
	import { getRoleList, saveRoleData, getRoleDeTail, delRole, updateRole } from '../../../service/roleAndDepartment';


	export default {
		mixins: [mixins],
		components: {
			VPagination,
			PageCrumb
		},
		data () {
			return {
				/**
				 * 分页总条数
				 */
				total: 0,
				zbrdbCheckData: {
					isZuHu: 1,
					zuHuName: '',
					zuHuCode: '',
					zuHuType: '',
					lianXiRen: '',
					lianXiPhone: '',
					pageNo: 1,
					pageSize: 10
				},
				zbrdbTableData: [],
				breadcrumbList: [
					{ label: "租户管理", link: "" }
				],
			}
		},
		created () {
			this.handleSearch()
			this.computeTableHeight()
		},
		methods: {
			/**
			 * 查询表格数据
			 */
			async roleQueryList() {
				const {data, code} = await this.portService.getZhUserList(this.zbrdbCheckData);
				if (code) {
					this.zbrdbTableData = data.rows;
					this.total = data.total;
				}
			},
			/**
			 * 查询表格数据
			 */
			async userDelOrganization(guid) {
				const {data, code} = await this.portService.deleteGjZuHu({guid: guid});
				if (code) {
					this.roleQueryList()
					// this.$message({ type: 'success', message: data.message });
				} else {
					// this.$message({ type: 'error', message: data.message });
				}
			},
			// 跳转组织架构
			goInstitutions(val) {
				this.$router.push({
					path: '/userAndQxManage/zzjg/list',
					query: {
						id: val.guid,
						name: val.zuHuName
					}
				})
			},
			handleSearch () {
				this.iscollapsider= false
				this.zbrdbCheckData.zuHuName = this.zbrdbCheckData.zuHuName
				this.zbrdbCheckData.roleZhuangTai = this.zbrdbCheckData.roleZhuangTai
				this.zbrdbCheckData.roleNo = this.zbrdbCheckData.roleNo
				this.roleQueryList()
			},
			zbrdbAddFun () {
				this.$router.push({ name: "tenantManagementDet"})
			},
			zbrdbBjFun (data) {
				this.$router.push({
					name: "tenantManagementDet" ,
					query: {
						methods: "edit",
						id: data.guid,
						isGt:data.zuHuCode == "91110000100017643K"?1:0
					}
				})
			},
			zbrdbDeletFun (guid) {
				this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功'
					});
					this.userDelOrganization(guid)
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			zbrdbFpqxFun (id) {
				this.$router.push({ name: 'permissionsDetails', query: { id } });
			},
			handleSizeChange (val) {
				this.zbrdbCheckData.pageSize = val
				this.handleSearch()
			},
			handleCurrentChange (val) {
				this.zbrdbCheckData.pageNo = val
				this.handleSearch()
			},
			resetBtn() {
				this.zbrdbCheckData.zuHuName = '';
				this.zbrdbCheckData.zuHuCode = '';
				this.zbrdbCheckData.zuHuType = '';
				this.zbrdbCheckData.lianXiRen = '';
				this.zbrdbCheckData.lianXiPhone = '';
				this.handleSearch()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: calc(100vh - 110px);
	}

	/*头部样式*/
	.zbrdbHeader {
		width: 100%;
		height: 80px;
		background: #fff;
		div {
			width: calc(100% - 40px);
			height: 40px;
			margin: 0 auto;
			h3 {
				height: 40px;
				color: #000;
				font-size: 16px;
				line-height: 40px;
			}
		}
		div:first-child {
			color: #404040;
			font-size: 14px;
			line-height: 40px;
		}
	}
	/*主体内容样式*/

	.zbrdbContent {
	margin: 5px 4px;
	> div {
		width: 100%;
		padding-bottom: 20px;
		background: #fff;
	}
	.zbrdbCheckDev {
		height: 80px;
		.zbrdbCheckForm {
			width: calc(100% - 40px);
			margin: 0 auto;
			padding-top: 20px;
			::v-deep.el-form-item {
				width: calc(100% / 3);
				height: 32px;
				margin-bottom: 30px;
				margin-right: 0;
				.el-form-item__label {
					width: 100px !important;
					padding-left: 12px;
				}
				.el-form-item__content {
					width: calc(100% - 100px);
					.el-input {
						width: 100%;
						.el-input__inner {
						width: 100%;
						}
					}
					.el-select {
						width: 100%;
					}
				}
			}
			::v-deep.el-form-item:last-child {
				text-align: right;
			}
		}
	}
	::v-deep.el-table {
		.cell {
			padding: 0;
			font-size: 14px;
		}
		.el-button {
			color: #409eff;
		}
		.redBtn {
			color: #f00;
		}
	}
	}
	.table {
		width: 100%;
		border-collapse: collapse;
		border: 1px solid #e0e0e0;
		tr {
			border-bottom: 1px solid #e0e0e0;
			td {
				padding: 10px;
			}
			th {
				width: 100px;
				text-align: right;
				background: #efefef;
				padding-right: 10px;
			}
		}
	}

	.cost-success{
		padding-left: 10px;
		position: relative;
		&::before {
			content: '';
			width: 6px;
			height: 6px;
			position: absolute;
			left: 0;
			top: 50%;
			transform: translate(0 , -50%);
			border-radius: 50%;
			background-color: #52C41A;
		}
	}
	.cost-error{
		padding-left: 10px;
		position: relative;
		&::before {
			width: 6px;
			height: 6px;
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			transform: translate(0 , -50%);
			border-radius: 50%;
			background-color: #F5222D;
		}
	}
</style>
