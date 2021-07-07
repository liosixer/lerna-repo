export default {
    data() {
        return {
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
        }
    }
}