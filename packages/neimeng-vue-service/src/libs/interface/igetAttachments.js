/** 获取附件们，并不关注实现内容 **/
class IGetAttchments{
    // getAttachments(){}

    /** 获取附件们 **/
    async getAttachments(groupGuid, type = 1) {
        throw new Error("不能直接实现该接口【IGetAttachments】")
    }
}

export default IGetAttchments;