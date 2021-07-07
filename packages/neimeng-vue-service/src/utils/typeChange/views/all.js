const allData={
    noticeTitle(type,source,isYs){
        if(isYs){
            return "预审公告"
        }else{
            if(type == 1){
                return "招标公告";
            }else if(type == 2 || (type == 6 && source == 2) || type == 4 || (type == 7 && source == 2)){
                return "邀请函";
            }else if(type == 6 && source == 1){
                return "询比公告"
            }else if(type == 10 && source == 1){
                return "竞价公告"
            }else if(type == 10 && source == 2){
                return "竞价邀请"
            }else if(type == 7 && source == 1){
                return "竞谈公告"
            }
        }
    },
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
    tenderPrepare(type,isYs){
        if(isYs){
            return "资审准备"
        }else{
            if(type == 10){
                return "竞价准备"
            }else{
                return "标前准备"
            }
        }
        
    },
    tenderOpen(type,isYs){
        if(isYs){
            return "开启"
        }else{
            if(type == 1 || type == 2){
                return "开标"
            }else{
                return "开启"
            }
        }
        
    },
    tenderAppraisal(type,isYs){
        if(isYs){
            return "评审"
        }else{
            if(type == 1 || type == 2){
                return "评标"
            }else if(type == 10){
                return "竞价"
            }else{
                return "评审"
            }
        }
    },
    calibration(type,isYs){
        if(isYs){
            return "资审结果"
        }else{
            if(type == 1 || type == 2){
                return "定标"
            }else{
                return "成交"
            }
        }
        
    },
    tenderAfter(type){
        if(type == 1 || type == 2){
            return "标后"
        }else{
            return "成交后"
        }
    }
    
}
export default allData