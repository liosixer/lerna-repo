<template>
	<div class="v-pagination" :style="{ justifyContent: spread }">
		<div>
			<span class="el-pagination__total">共 {{ total }} 条记录</span>
			<span class="el-pagination__total"
				>第{{ page }}/{{
					Math.ceil(total / limit) === 0 ? 1 : Math.ceil(total / limit)
				}}页</span
			>
		</div>
		<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="page"
			:page-sizes="pageSizes"
			:page-size="limit"
			:pager-count = "5"
			layout="prev, pager, next,sizes, jumper"
			:total="total"
			background
		></el-pagination>
	</div>
</template>
<script>
export default {
	props: {
		spread: {
			//布局方式
			type: String,
			default: "space-between",
			validator(value) {
				return (
					["space-between", "flex-start", "flex-end", "center"].indexOf(
						value
					) !== -1
				);
			},
		},
		total: {
			type: Number,
			default: 0,
		},
		//页码
		page: {
			type: Number,
			default: 0,
		},
		//行数
		limit: {
			type: Number,
			default: 0,
		},
		pageSizes: {
			type: Array,
			default() {
				return [10, 20, 50, 100];
			},
		},
	},
	methods: {
		handleSizeChange(size) {
			this.$emit("size-change", size);
		},
		handleCurrentChange(page) {
			this.$emit("current-change", page);
		},
	},
};
</script>
<style lang="scss" scoped>
	.v-pagination {
		display: flex;
		align-items: center;
		/*margin-top: 20px;*/
		padding: 0 20PX 0 20PX;/*no*/
		font-weight: 400;
		.el-pagination__total{
			font-size: 14PX;/*no*/
		}
	}
	@media screen and (max-width: 1366px){
		.v-pagination {
			padding: 0 15PX 0 21PX;/*no*/
			.el-pagination__total{
				font-size: 12PX;/*no*/
			}
			::v-deep.el-pager .more::before{
				line-height: 26PX;/*no*/
			}
		}
	}
</style>

