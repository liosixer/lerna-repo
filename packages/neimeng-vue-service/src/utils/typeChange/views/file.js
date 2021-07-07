const trFileData={
    fileTitle(type,isYs){
        if(isYs){
            return "预审文件"
        }else{
            if(type == 1 || type == 2){
                return "招标文件";
            }else{
                return "采购文件";
            }
        }
    },
    answerClearTitle:{ //一样

    },
    dissentTitle:{ //一样
    }
}
export default trFileData