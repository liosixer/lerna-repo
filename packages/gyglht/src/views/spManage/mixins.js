export default {
    data() {
        return {
            tableHeight: 800,// table的高度
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