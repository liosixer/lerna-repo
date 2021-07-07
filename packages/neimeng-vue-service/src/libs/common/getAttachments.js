import util from "@/utils/utils";
import { IGetAttachments } from "../interface";

class GetAttachments extends IGetAttachments {
    constructor(){
        super();
    }

    /** 
     * 异步获取上传单文件资源 
     * @param groupGuid 文件id
     * @param type 上传类型（参考Upload的参数）
     * **/
    async getAttachments(groupGuid, type=1){
        if (!groupGuid) return [];
        let attachments = [];
        const result = await util.getFiles(groupGuid, type);
        if (result) {
            attachments = Object.assign([], result);
            return attachments;
        }
        return attachments;
    }
}

export default GetAttachments;